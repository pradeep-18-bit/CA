// Controllers/EmailController.cs
using ca_backend.Data;
using ca_backend.Models;
using MailKit;
using MailKit.Net.Imap;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.AspNetCore.Mvc;
using MimeKit;
using PdfSharp.Drawing;
using PdfSharp.Pdf;
using System.IO;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/email")]
public class EmailController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public EmailController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST: api/email/send → Send email using fixed admin credentials from appsettings.json
    [HttpPost("send")]
    public async Task<IActionResult> SendEmail([FromForm] SendEmailDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.ToEmail) ||
            string.IsNullOrWhiteSpace(dto.Body))
            return BadRequest("ToEmail and Body are required.");

        // Read fixed admin credentials from appsettings.json
        var adminEmail = _configuration["EmailSettings:Username"];
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"]);
        var username = _configuration["EmailSettings:Username"];
        var password = _configuration["EmailSettings:Password"];

        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("", adminEmail));
        emailMessage.To.Add(new MailboxAddress("", dto.ToEmail));
        emailMessage.Subject = dto.Subject ?? "No Subject";
        emailMessage.Body = new TextPart("plain") { Text = dto.Body };

        byte[]? attachmentBytes = null;
        if (dto.Attachment != null)
        {
            using var ms = new MemoryStream();
            await dto.Attachment.CopyToAsync(ms);
            attachmentBytes = ms.ToArray();

            var mimePart = new MimePart(dto.Attachment.ContentType)
            {
                Content = new MimeContent(new MemoryStream(attachmentBytes)),
                ContentDisposition = new ContentDisposition(ContentDisposition.Attachment),
                ContentTransferEncoding = ContentEncoding.Base64,
                FileName = dto.Attachment.FileName
            };

            var multipart = new Multipart("mixed") { new TextPart("plain") { Text = dto.Body }, mimePart };
            emailMessage.Body = multipart;
        }

        try
        {
            using var smtpClient = new SmtpClient();
            // Zoho uses port 465 with SSL from start
            await smtpClient.ConnectAsync(smtpServer, smtpPort, SecureSocketOptions.SslOnConnect);
            await smtpClient.AuthenticateAsync(username, password);
            await smtpClient.SendAsync(emailMessage);
            await smtpClient.DisconnectAsync(true);

            // Save to DB
            var savedEmail = new Email
            {
                FromEmail = adminEmail,
                ToEmail = dto.ToEmail,
                Subject = dto.Subject,
                Body = dto.Body,
                SentAt = DateTime.UtcNow,
                IsSent = true,
                Attachment = attachmentBytes
            };

            _context.Emails.Add(savedEmail);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Email sent and saved",
                id = savedEmail.Id,
                fromEmail = adminEmail
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to send email: {ex.Message}");
        }
    }

    // POST: api/email/receive → Poll inbox & save new emails
    [HttpPost("receive")]
    public async Task<IActionResult> ReceiveEmails([FromBody] ReceiveEmailDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.AdminEmail))
            return BadRequest("AdminEmail is required.");

        try
        {
            var imapServer = _configuration["EmailSettings:ImapServer"];
            var imapPort = int.Parse(_configuration["EmailSettings:ImapPort"]);
            var username = _configuration["EmailSettings:Username"];
            var password = _configuration["EmailSettings:Password"];

            using var imapClient = new ImapClient();
            await imapClient.ConnectAsync(imapServer, imapPort, SecureSocketOptions.SslOnConnect);
            await imapClient.AuthenticateAsync(username, password);

            var inbox = imapClient.Inbox;
            await inbox.OpenAsync(FolderAccess.ReadWrite);

            var newEmails = new List<Email>();

            var summaries = await inbox.FetchAsync(0, -1, MessageSummaryItems.Flags | MessageSummaryItems.UniqueId);

            for (int i = 0; i < summaries.Count; i++)
            {
                var summary = summaries[i];

                if (summary.Flags?.HasFlag(MessageFlags.Seen) == true)
                    continue;

                var message = await inbox.GetMessageAsync(summary.UniqueId);

                byte[]? attachment = null;
                if (message.Attachments.Any())
                {
                    var attach = message.Attachments.First();
                    if (attach is MimePart mimePart)
                    {
                        using var ms = new MemoryStream();
                        mimePart.Content.DecodeTo(ms);
                        attachment = ms.ToArray();
                    }
                }

                var savedEmail = new Email
                {
                    FromEmail = message.From.Mailboxes.FirstOrDefault()?.Address ?? "unknown",
                    ToEmail = dto.AdminEmail,
                    Subject = message.Subject ?? "(No subject)",
                    Body = message.TextBody ?? message.HtmlBody ?? "(No body)",
                    ReceivedAt = message.Date.UtcDateTime,
                    IsSent = false,
                    Attachment = attachment
                };

                _context.Emails.Add(savedEmail);
                newEmails.Add(savedEmail);

                await inbox.AddFlagsAsync(summary.UniqueId, MessageFlags.Seen, true);
            }

            await _context.SaveChangesAsync();
            await imapClient.DisconnectAsync(true);

            return Ok(new
            {
                message = "Fetched and saved new emails",
                count = newEmails.Count,
                emails = newEmails
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Failed to receive emails: {ex.Message}");
        }
    }

    // GET: api/email/{id}/pdf → Download email as PDF
    [HttpGet("{id}/pdf")]
    public async Task<IActionResult> DownloadEmailAsPdf(int id)
    {
        var email = await _context.Emails.FindAsync(id);
        if (email == null) return NotFound();

        using var pdfDoc = new PdfDocument();
        var page = pdfDoc.AddPage();
        var gfx = XGraphics.FromPdfPage(page);
        var font = new XFont("Arial", 12);

        int y = 20;
        gfx.DrawString($"From: {email.FromEmail}", font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);
        y += 20;
        gfx.DrawString($"To: {email.ToEmail}", font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);
        y += 20;
        gfx.DrawString($"Subject: {email.Subject}", font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);
        y += 40;
        gfx.DrawString("Body:", font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);
        y += 20;
        gfx.DrawString(email.Body, font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);

        if (email.Attachment != null)
        {
            y += 60;
            gfx.DrawString("Attachment included (not in PDF)", font, XBrushes.Black, new XRect(20, y, page.Width - 40, page.Height), XStringFormats.TopLeft);
        }

        using var ms = new MemoryStream();
        pdfDoc.Save(ms, false);
        ms.Position = 0;

        return File(ms.ToArray(), "application/pdf", $"email_{id}.pdf");
    }
}