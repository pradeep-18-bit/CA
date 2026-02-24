public class AppTask
{
    public int Id { get; set; }
    public string TaskName { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;
    public string AssignedToEmail { get; set; } = string.Empty;
    public string? CreatedByEmail { get; set; }   // Who created the task
    public string? Description { get; set; }   // Optional task description
    public string? Client { get; set; }
    public DateOnly DueDate { get; set; }
    public string Priority { get; set; } = "Medium";
    public decimal EstimatedHours { get; set; } = 0;
    public string Status { get; set; } = "To Do";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}