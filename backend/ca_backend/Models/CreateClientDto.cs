namespace ca_backend.Models;

public class CreateClientDto
{
    public string ClientName { get; set; } = string.Empty;
    public string ClientType { get; set; } = string.Empty;
    public string? PanNumber { get; set; }
    public string? GstNumber { get; set; }
    public string Contact { get; set; } = string.Empty;
    public string Services { get; set; } = string.Empty;
    public string? Status { get; set; }
    public DateOnly? LastActivity { get; set; }

    // NEW – EMAIL
    public string? Email { get; set; }
}