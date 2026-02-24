using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientDocumentsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly HttpClient _httpClient;

    public ClientDocumentsController(AppDbContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }

    // ================================================================
    // 1. GET: All documents (optional client filter via query)
    // ================================================================
    [HttpGet]
    public async Task<ActionResult<IEnumerable<DocumentListDto>>> GetAllDocuments(
        [FromQuery] string? client = null)
    {
        IQueryable<ClientDocument> query = _context.ClientDocuments
            .OrderByDescending(d => d.UploadDate);

        if (!string.IsNullOrWhiteSpace(client))
        {
            var trimmed = client.Trim();
            query = query.Where(d =>
                EF.Functions.Like(d.ClientName.Trim(), $"%{trimmed}%"));
        }

        var documents = await query
            .Select(d => new DocumentListDto
            {
                Id = d.Id,
                ClientName = d.ClientName,
                Category = d.Category,
                Status = d.Status,
                UploadDate = d.UploadDate,
                FileSize = d.Document.Length,
                OriginalFileName = d.OriginalFileName
            })
            .ToListAsync();

        if (documents.Count == 0)
            return NotFound("No documents found.");

        return Ok(documents);
    }

    // ================================================================
    // 2. GET: Documents for specific client (path parameter)
    // ================================================================
    [HttpGet("{client}")]
    public async Task<ActionResult<IEnumerable<DocumentListDto>>> GetDocumentsByClientPath(
        [FromRoute] string client)
    {
        if (string.IsNullOrWhiteSpace(client))
            return BadRequest("Client name is required.");

        var trimmed = client.Trim();

        var documents = await _context.ClientDocuments
            .Where(d =>
                EF.Functions.Like(d.ClientName.Trim(), $"%{trimmed}%"))
            .OrderByDescending(d => d.UploadDate)
            .Select(d => new DocumentListDto
            {
                Id = d.Id,
                ClientName = d.ClientName,
                Category = d.Category,
                Status = d.Status,
                UploadDate = d.UploadDate,
                FileSize = d.Document.Length,
                OriginalFileName = d.OriginalFileName
            })
            .ToListAsync();

        if (documents.Count == 0)
            return NotFound($"No documents found for client '{trimmed}'.");

        return Ok(documents);
    }

    // ================================================================
    // 3. POST: Upload document
    // ================================================================
    [HttpPost("upload")]
    public async Task<ActionResult> Upload([FromForm] UploadDocumentDto dto)
    {
        if (dto.Document == null || dto.Document.Length == 0)
            return BadRequest("Document file is required.");

        if (dto.Document.Length > 10 * 1024 * 1024)
            return BadRequest("File size exceeds 10 MB.");

        if (string.IsNullOrWhiteSpace(dto.ClientName))
            return BadRequest("ClientName is required.");

        var allowedCategories = new[]
        {
            "GST Documents",
            "Identity Documents",
            "Financial Documents",
            "Tax Returns",
            "Invoices"
        };

        if (!allowedCategories.Contains(dto.Category))
            return BadRequest("Invalid Category.");

        var validStatuses = new[] { "verified", "processing", "rejected" };
        var status = dto.Status?.Trim().ToLowerInvariant() ?? "processing";

        if (!validStatuses.Contains(status))
            return BadRequest("Status must be 'verified', 'processing', or 'rejected'.");

        byte[] fileBytes;
        using (var ms = new MemoryStream())
        {
            await dto.Document.CopyToAsync(ms);
            fileBytes = ms.ToArray();
        }

        var document = new ClientDocument
        {
            Document = fileBytes,
            ClientName = dto.ClientName.Trim(),
            Category = dto.Category,
            Status = status,
            UploadDate = DateTime.UtcNow,
            OriginalFileName = dto.Document.FileName
        };

        _context.ClientDocuments.Add(document);
        await _context.SaveChangesAsync();

        // 🔔 Send notification: document added
        try
        {
            var payload = new
            {
                text = $"Document added: {document.OriginalFileName} for {document.ClientName}"
            };

            await _httpClient.PostAsJsonAsync(
                "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications",
                payload
            );
        }
        catch (Exception)
        {
            // Do not break upload flow
        }


        return CreatedAtAction(
            nameof(DownloadDocument),
            new { id = document.Id },
            new
            {
                id = document.Id,
                clientName = document.ClientName,
                category = document.Category,
                status = document.Status,
                uploadDate = document.UploadDate,
                fileSize = fileBytes.Length,
                originalFileName = document.OriginalFileName
            });
    }

    // ================================================================
    // 4. GET: Preview document (Base64)
    // ================================================================
    [HttpGet("preview/{id}")]
    public async Task<IActionResult> PreviewDocument(int id)
    {
        var doc = await _context.ClientDocuments.FindAsync(id);
        if (doc == null)
            return NotFound();

        var contentType = GetContentType(doc.Document, doc.OriginalFileName);
        var fileName = doc.OriginalFileName ?? "document.bin";

        return Ok(new
        {
            fileName,
            contentType,
            base64 = Convert.ToBase64String(doc.Document)
        });
    }

    // ================================================================
    // 5. GET: Download document
    // ================================================================
    [HttpGet("download/{id}")]
    public async Task<IActionResult> DownloadDocument(int id)
    {
        var doc = await _context.ClientDocuments.FindAsync(id);
        if (doc == null)
            return NotFound();

        var contentType = GetContentType(doc.Document, doc.OriginalFileName);
        var fileName = doc.OriginalFileName ?? $"document_{id}.bin";

        return File(doc.Document, contentType, fileName);
    }

    // ================================================================
    // 6. PATCH: Update document status
    // ================================================================
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(
        int id,
        [FromBody] UpdateDocumentStatusDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Status))
            return BadRequest("Status is required.");

        var validStatuses = new[] { "verified", "processing", "rejected" };
        var status = dto.Status.Trim().ToLowerInvariant();

        if (!validStatuses.Contains(status))
            return BadRequest("Status must be 'verified', 'processing', or 'rejected'.");

        var doc = await _context.ClientDocuments.FindAsync(id);
        if (doc == null)
            return NotFound();

        doc.Status = status;
        await _context.SaveChangesAsync();

        return Ok(new { id = doc.Id, newStatus = doc.Status });
    }

    // ================================================================
    // 7. DELETE: Remove document
    // ================================================================
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDocument(int id)
    {
        var doc = await _context.ClientDocuments.FindAsync(id);
        if (doc == null)
            return NotFound();

        _context.ClientDocuments.Remove(doc);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Document deleted.", id });
    }

    // ================================================================
    // Helper: Content-Type detection (CORRECT)
    // ================================================================
    private static string GetContentType(byte[] data, string? fileName)
    {
        // 1️⃣ Prefer filename (most accurate)
        if (!string.IsNullOrWhiteSpace(fileName))
        {
            var ext = Path.GetExtension(fileName).ToLowerInvariant();
            return ext switch
            {
                ".pdf" => "application/pdf",
                ".jpg" or ".jpeg" => "image/jpeg",
                ".png" => "image/png",
                ".docx" => "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                ".xlsx" => "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                _ => "application/octet-stream"
            };
        }

        // 2️⃣ Fallback to magic numbers (best-effort)
        if (data.Length >= 4)
        {
            var header = BitConverter.ToString(data.Take(4).ToArray());
            return header switch
            {
                "25-50-44-46" => "application/pdf",
                "FF-D8-FF" => "image/jpeg",
                "89-50-4E-47" => "image/png",
                "50-4B-03-04" => "application/zip",
                _ => "application/octet-stream"
            };
        }

        return "application/octet-stream";
    }
}
