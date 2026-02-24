using ca_backend.Data;
using ca_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text.Json;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Kernel.Font;
using Microsoft.Extensions.Logging;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<InvoicesController> _logger;
    private readonly HttpClient _httpClient;

    public InvoicesController(
        AppDbContext context,
        ILogger<InvoicesController> logger,
        HttpClient httpClient)
    {
        _context = context;
        _logger = logger;
        _httpClient = httpClient;
    }

    // GET: api/invoices → Get all invoices
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Invoice>>> GetAllInvoices()
    {
        try
        {
            var invoices = await _context.Invoices
                .OrderBy(i => i.InvoiceDate)
                .ToListAsync();
            return Ok(invoices);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch invoices");
            return StatusCode(500, $"Failed to fetch invoices: {ex.Message}");
        }
    }

    // GET: api/invoices/{id} → Get single invoice
    [HttpGet("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            _logger.LogWarning("Invoice with ID {Id} not found", id);
            return NotFound($"Invoice with ID {id} not found.");
        }
        return Ok(invoice);
    }

    // GET: api/invoices/{id}/pdf → View invoice as PDF
    [HttpGet("{id}/pdf")]
    public async Task<IActionResult> GetInvoicePdf(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            _logger.LogWarning("Invoice with ID {Id} not found", id);
            return NotFound($"Invoice with ID {id} not found.");
        }

        try
        {
            // Validate invoiceitems JSON
            List<Dictionary<string, object>> items;
            try
            {
                items = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(invoice.InvoiceItems)
                    ?? new List<Dictionary<string, object>>();
                if (!items.Any())
                {
                    _logger.LogWarning("Invoice ID {Id} has empty or invalid invoiceitems", id);
                }
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Failed to parse invoiceitems for Invoice ID {Id}", id);
                return BadRequest("Invalid invoiceitems JSON format.");
            }

            // Create PDF in memory
            using var memoryStream = new MemoryStream();
            using var writer = new PdfWriter(memoryStream);
            using var pdf = new PdfDocument(writer);
            using var document = new Document(pdf);

            // Fonts
            iText.Kernel.Font.PdfFont boldFont;
            iText.Kernel.Font.PdfFont regularFont;
            try
            {
                boldFont = PdfFontFactory.CreateFont(iText.IO.Font.Constants.StandardFonts.HELVETICA_BOLD);
                regularFont = PdfFontFactory.CreateFont(iText.IO.Font.Constants.StandardFonts.HELVETICA);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to load fonts for PDF generation for Invoice ID {Id}", id);
                return StatusCode(500, $"Error generating PDF: Font loading failed.");
            }

            // Add title
            document.Add(new Paragraph("Invoice")
                .SetFont(boldFont)
                .SetFontSize(20)
                .SetTextAlignment(iText.Layout.Properties.TextAlignment.CENTER));

            // Add invoice details
            document.Add(new Paragraph($"Invoice Number: {invoice.InvoiceNumber ?? "N/A"}").SetFont(regularFont));
            document.Add(new Paragraph($"Client Name: {invoice.ClientName ?? "N/A"}").SetFont(regularFont));
            document.Add(new Paragraph($"Invoice Date: {invoice.InvoiceDate}").SetFont(regularFont));
            document.Add(new Paragraph($"Due Date: {invoice.DueDate}").SetFont(regularFont));
            document.Add(new Paragraph($"Status: {invoice.Status ?? "N/A"}").SetFont(regularFont));
            document.Add(new Paragraph("")); // Spacer

            // Create table for invoice items
            var table = new Table(UnitValue.CreatePercentArray(new float[] { 20, 30, 15, 15, 20 }))
                .UseAllAvailableWidth();
            table.AddHeaderCell(new Cell().Add(new Paragraph("Item Name").SetFont(boldFont)));
            table.AddHeaderCell(new Cell().Add(new Paragraph("Service Description").SetFont(boldFont)));
            table.AddHeaderCell(new Cell().Add(new Paragraph("Quantity").SetFont(boldFont)));
            table.AddHeaderCell(new Cell().Add(new Paragraph("Rate").SetFont(boldFont)));
            table.AddHeaderCell(new Cell().Add(new Paragraph("Amount").SetFont(boldFont)));

            decimal totalAmount = 0;
            foreach (var item in items)
            {
                var itemName = item.GetValueOrDefault("itemname")?.ToString() ?? "";
                var description = item.GetValueOrDefault("servicedescription")?.ToString() ?? "";
                var quantity = item.GetValueOrDefault("quantity")?.ToString() ?? "0";
                var rate = item.GetValueOrDefault("rate")?.ToString() ?? "0";
                var amount = item.GetValueOrDefault("amount")?.ToString() ?? "0";
                if (decimal.TryParse(amount, out var amountValue))
                    totalAmount += amountValue;
                else
                {
                    _logger.LogWarning("Invalid amount format for item in Invoice ID {Id}: {Amount}", id, amount);
                }

                table.AddCell(new Cell().Add(new Paragraph(itemName).SetFont(regularFont)));
                table.AddCell(new Cell().Add(new Paragraph(description).SetFont(regularFont)));
                table.AddCell(new Cell().Add(new Paragraph(quantity).SetFont(regularFont)));
                table.AddCell(new Cell().Add(new Paragraph(rate).SetFont(regularFont)));
                table.AddCell(new Cell().Add(new Paragraph(amount).SetFont(regularFont)));
            }

            document.Add(table);
            document.Add(new Paragraph($"Total Amount: {totalAmount:C}")
                .SetFont(boldFont)
                .SetMarginTop(20));

            document.Close();

            // Return PDF bytes
            var pdfBytes = memoryStream.ToArray();
            return File(pdfBytes, "application/pdf", $"Invoice_{invoice.InvoiceNumber}.pdf", false);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating PDF for Invoice ID {Id}", id);
            return StatusCode(500, $"Error generating PDF: {ex.Message}");
        }
    }

    // POST: api/invoices → Create new invoice
    [HttpPost]
    public async Task<ActionResult<Invoice>> CreateInvoice([FromBody] CreateInvoiceDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.InvoiceNumber))
            return BadRequest("InvoiceNumber is required.");
        if (dto.DueDate == default)
            return BadRequest("DueDate is required.");
        if (string.IsNullOrWhiteSpace(dto.InvoiceItems))
            return BadRequest("InvoiceItems is required.");
        if (string.IsNullOrWhiteSpace(dto.ClientName))
            return BadRequest("ClientName is required.");

        // Validate Status
        string status = dto.Status?.Trim() ?? "Pending";
        var validStatuses = new[] { "Completed", "Overdue", "Pending" };
        if (!validStatuses.Contains(status, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Status must be 'Completed', 'Overdue', or 'Pending'.");

        // Validate InvoiceItems JSON
        try
        {
            var items = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(dto.InvoiceItems);
            if (items == null || !items.Any())
                return BadRequest("InvoiceItems must contain at least one item.");
            foreach (var item in items)
            {
                if (!item.ContainsKey("itemname") || !item.ContainsKey("servicedescription") ||
                    !item.ContainsKey("quantity") || !item.ContainsKey("rate") || !item.ContainsKey("amount"))
                    return BadRequest("Each item must have itemname, servicedescription, quantity, rate, and amount.");
                if (!decimal.TryParse(item["quantity"].ToString(), out var quantity) || quantity <= 0)
                    return BadRequest("Quantity must be a positive number.");
                if (!decimal.TryParse(item["rate"].ToString(), out var rate) || rate <= 0)
                    return BadRequest("Rate must be a positive number.");
                if (!decimal.TryParse(item["amount"].ToString(), out var amount) || amount <= 0)
                    return BadRequest("Amount must be a positive number.");
            }
        }
        catch (JsonException ex)
        {
            _logger.LogError(ex, "Invalid invoiceitems JSON in CreateInvoice");
            return BadRequest("InvoiceItems must be a valid JSON string containing an array of items.");
        }

        var invoice = new Invoice
        {
            InvoiceNumber = dto.InvoiceNumber.Trim(),
            InvoiceDate = dto.InvoiceDate ?? DateOnly.FromDateTime(DateTime.Today),
            DueDate = dto.DueDate,
            InvoiceItems = dto.InvoiceItems,
            ClientName = dto.ClientName.Trim(),
            Status = status
        };

        try
        {
            _context.Invoices.Add(invoice);
            await _context.SaveChangesAsync();
            
            try
            {
                var payload = new
                {
                    text = $"Invoice created: {invoice.InvoiceNumber} for {invoice.ClientName} (Due: {invoice.DueDate})"
                };

                await _httpClient.PostAsJsonAsync(
                    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications",
                    payload
                );
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to send invoice notification");
            }
            return CreatedAtAction(nameof(GetInvoice), new { id = invoice.Id }, invoice);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            _logger.LogError(ex, "InvoiceNumber {InvoiceNumber} already exists", dto.InvoiceNumber);
            return Conflict("InvoiceNumber already exists.");
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Invalid Status: {Status}", dto.Status);
            return BadRequest($"Invalid Status: '{dto.Status}'");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating invoice");
            return StatusCode(500, $"Error creating invoice: {ex.Message}");
        }
    }

    // PATCH: api/invoices/{id} → Update invoice
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateInvoice(int id, [FromBody] UpdateInvoiceDto dto)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            _logger.LogWarning("Invoice with ID {Id} not found for update", id);
            return NotFound($"Invoice with ID {id} not found.");
        }

        if (!string.IsNullOrWhiteSpace(dto.InvoiceNumber))
            invoice.InvoiceNumber = dto.InvoiceNumber.Trim();
        if (dto.InvoiceDate.HasValue)
            invoice.InvoiceDate = dto.InvoiceDate.Value;
        if (dto.DueDate.HasValue)
            invoice.DueDate = dto.DueDate.Value;
        if (!string.IsNullOrWhiteSpace(dto.InvoiceItems))
        {
            try
            {
                var items = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(dto.InvoiceItems);
                if (items == null || !items.Any())
                    return BadRequest("InvoiceItems must contain at least one item.");
                foreach (var item in items)
                {
                    if (!item.ContainsKey("itemname") || !item.ContainsKey("servicedescription") ||
                        !item.ContainsKey("quantity") || !item.ContainsKey("rate") || !item.ContainsKey("amount"))
                        return BadRequest("Each item must have itemname, servicedescription, quantity, rate, and amount.");
                    if (!decimal.TryParse(item["quantity"].ToString(), out var quantity) || quantity <= 0)
                        return BadRequest("Quantity must be a positive number.");
                    if (!decimal.TryParse(item["rate"].ToString(), out var rate) || rate <= 0)
                        return BadRequest("Rate must be a positive number.");
                    if (!decimal.TryParse(item["amount"].ToString(), out var amount) || amount <= 0)
                        return BadRequest("Amount must be a positive number.");
                }
                invoice.InvoiceItems = dto.InvoiceItems;
            }
            catch (JsonException ex)
            {
                _logger.LogError(ex, "Invalid invoiceitems JSON in UpdateInvoice for ID {Id}", id);
                return BadRequest("InvoiceItems must be a valid JSON string containing an array of items.");
            }
        }
        if (!string.IsNullOrWhiteSpace(dto.ClientName))
            invoice.ClientName = dto.ClientName.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            var validStatuses = new[] { "Completed", "Overdue", "Pending" };
            var status = dto.Status.Trim();
            if (!validStatuses.Contains(status, StringComparer.OrdinalIgnoreCase))
            {
                _logger.LogWarning("Invalid Status: {Status} for Invoice ID {Id}", dto.Status, id);
                return BadRequest("Status must be 'Completed', 'Overdue', or 'Pending'.");
            }
            invoice.Status = status;
        }

        try
        {
            await _context.SaveChangesAsync();
            return Ok(invoice);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            _logger.LogError(ex, "InvoiceNumber {InvoiceNumber} already exists for ID {Id}", dto.InvoiceNumber, id);
            return Conflict("InvoiceNumber already exists.");
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Invalid Status: {Status} for ID {Id}", dto.Status, id);
            return BadRequest($"Invalid Status: '{dto.Status}'");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating invoice ID {Id}", id);
            return StatusCode(500, $"Error updating invoice: {ex.Message}");
        }
    }

    // DELETE: api/invoices/{id} → Delete invoice
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice == null)
        {
            _logger.LogWarning("Invoice with ID {Id} not found for deletion", id);
            return NotFound($"Invoice with ID {id} not found.");
        }

        _context.Invoices.Remove(invoice);
        try
        {
            await _context.SaveChangesAsync();
            return Ok(new
            {
                message = "Invoice deleted successfully.",
                id,
                invoiceNumber = invoice.InvoiceNumber,
                clientName = invoice.ClientName,
                status = invoice.Status
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting invoice ID {Id}", id);
            return StatusCode(500, $"Error deleting invoice: {ex.Message}");
        }
    }
}