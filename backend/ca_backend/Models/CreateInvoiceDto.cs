namespace ca_backend.Models;

public class CreateInvoiceDto
{
    public string InvoiceNumber { get; set; } = string.Empty;
    public DateOnly? InvoiceDate { get; set; }
    public DateOnly DueDate { get; set; }
    public string InvoiceItems { get; set; } = string.Empty; // JSON string
    public string ClientName { get; set; } = string.Empty; // Required
    public string? Status { get; set; } // Optional, defaults to Pending
}