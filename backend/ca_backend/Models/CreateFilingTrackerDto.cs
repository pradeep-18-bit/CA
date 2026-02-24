// ca_backend.Models/CreateFilingTrackerDto.cs
namespace ca_backend.Models;

public class CreateFilingTrackerDto
{
    public string ClientName { get; set; } = string.Empty;
    public string Service { get; set; } = string.Empty;
    public DateOnly DueDate { get; set; }
    public string AssignedTo { get; set; } = string.Empty;  // e.g., username or staff ID

    // New required fields matching DB columns
    public string AssignedToName { get; set; } = string.Empty;
    public string AssignedToEmail { get; set; } = string.Empty;

    public string? Status { get; set; }
    public string? Priority { get; set; }
}