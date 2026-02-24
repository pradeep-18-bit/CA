// Models/Email.cs
namespace ca_backend.Models;

public class Email
{
    public int Id { get; set; }
    public string FromEmail { get; set; } = string.Empty;
    public string ToEmail { get; set; } = string.Empty;
    public string Subject { get; set; } = string.Empty;
    public string Body { get; set; } = string.Empty;
    public DateTime? SentAt { get; set; }
    public DateTime? ReceivedAt { get; set; }
    public bool IsSent { get; set; } = true;
    public byte[]? Attachment { get; set; }
}