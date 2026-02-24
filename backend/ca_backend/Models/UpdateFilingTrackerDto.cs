// ca_backend.Models/UpdateFilingTrackerDto.cs
namespace ca_backend.Models;

public class UpdateFilingTrackerDto
{
    public string? ClientName { get; set; }
    public string? Service { get; set; }
    public DateOnly? DueDate { get; set; }
    public string? AssignedTo { get; set; }

    // Optional updates for name and email
    public string? AssignedToName { get; set; }
    public string? AssignedToEmail { get; set; }

    public string? Status { get; set; }
    public string? Priority { get; set; }
}