namespace ca_backend.Models;

public class Invoice
{
    public int Id { get; set; }
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateOnly InvoiceDate { get; set; } = DateOnly.FromDateTime(DateTime.Today);
    public DateOnly DueDate { get; set; }
    public string InvoiceItems { get; set; } = string.Empty; // JSON string
    public string ClientName { get; set; } = string.Empty;
    public string Status { get; set; } = "Pending"; // New field
}