using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class UploadDocumentDto
{
    [Required]
    public IFormFile Document { get; set; } = null!;

    [Required]
    public string ClientName { get; set; } = string.Empty;

    [Required]
    [RegularExpression("^(GST Documents|Identity Documents|Financial Documents|Tax Returns|Invoices)$")]
    public string Category { get; set; } = string.Empty;

    [RegularExpression("^(verified|processing|rejected)$")]
    public string? Status { get; set; }
}