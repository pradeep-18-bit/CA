namespace ca_backend.Models;

public class UpdateInvoiceDto
{
    public string? InvoiceNumber { get; set; }
    public DateOnly? InvoiceDate { get; set; }
    public DateOnly? DueDate { get; set; }
    public string? InvoiceItems { get; set; } // JSON string
    public string? ClientName { get; set; }
    public string? Status { get; set; } // Optional
}