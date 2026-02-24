public class DocumentListDto
{
    public int Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; }
    public int FileSize { get; set; }
    public string? OriginalFileName { get; set; }   // ← SHOWS REAL NAME
}