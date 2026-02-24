// ca_backend.Models/FilingTracker.cs
namespace ca_backend.Models;

public class FilingTracker
{
    public int Id { get; set; }

    public string ClientName { get; set; } = string.Empty;
    public string Service { get; set; } = string.Empty;

    public DateOnly DueDate { get; set; }
    public string Status { get; set; } = "Pending";          // Pending, In Progress, Completed, Overdue
    public string AssignedTo { get; set; } = string.Empty;   // This is usually the username or ID

    // These now exactly match your DB columns
    public string AssignedToName { get; set; } = string.Empty;   // Full name of assignee
    public string AssignedToEmail { get; set; } = string.Empty;  // Email of assignee

    public string Priority { get; set; } = "Medium";         // High, Medium, Low
}