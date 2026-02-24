namespace ca_backend.Models;

public class DeletedClient
{
    public int Id { get; set; }
    public string ClientName { get; set; } = string.Empty;
    public string ClientType { get; set; } = string.Empty;
    public string? PanNumber { get; set; }
    public string? GstNumber { get; set; }
    public string Contact { get; set; } = string.Empty;
    public string Services { get; set; } = string.Empty;
    public DateOnly? LastActivity { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime DeletedAt { get; set; }

    public string? Email { get; set; }

    // ADD THIS CONSTRUCTOR
    public DeletedClient()
    {
        CreatedAt = DateTime.SpecifyKind(CreatedAt, DateTimeKind.Utc);
        UpdatedAt = DateTime.SpecifyKind(UpdatedAt, DateTimeKind.Utc);
        DeletedAt = DateTime.SpecifyKind(DeletedAt, DateTimeKind.Utc);
    }
}