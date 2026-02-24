// Models/UpdateTaskDto.cs
namespace ca_backend.Models;

public class UpdateTaskDto
{
    public string? TaskName { get; set; }
    public string? AssignedTo { get; set; }           // display name
    public string? AssignedToEmail { get; set; }      // email
    public string? CreatedByEmail { get; set; }       // who created (optional update)

    // New fields you added
    public string? Description { get; set; }
    public string? Client { get; set; }

    public DateOnly? DueDate { get; set; }
    public string? Priority { get; set; }             // High, Medium, Low
    public decimal EstimatedHours { get; set; } = -1; // -1 means no change
    public string? Status { get; set; }               // To Do, In Progress, Review, Completed
}