namespace ca_backend.Models;

public class UpdateClientDto
{
    public string? Services { get; set; }
    public string? Status { get; set; }
    public DateOnly? LastActivity { get; set; }

    // NEW – Allow email update too
    public string? Email { get; set; }
}