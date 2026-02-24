// Models/SendEmailDto.cs
using System.ComponentModel.DataAnnotations;

public class SendEmailDto
{
    [Required]
    public string ToEmail { get; set; } = string.Empty;

    public string? Subject { get; set; }
    [Required]
    public string Body { get; set; } = string.Empty;

    public IFormFile? Attachment { get; set; }  // Optional
}