public class ClientDocument
{
    public int Id { get; set; }
    public byte[] Document { get; set; } = null!;
    public string ClientName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Status { get; set; } = "processing";
    public DateTime UploadDate { get; set; } = DateTime.UtcNow;

    public string? OriginalFileName { get; set; }   // ← NEW
}