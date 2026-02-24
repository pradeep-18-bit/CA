public class CreateTaskDto
{
    public string TaskName { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;           // display name
    public string AssignedToEmail { get; set; } = string.Empty;      // REQUIRED now
    public string? CreatedByEmail { get; set; }

    public string? Description { get; set; }
    public string? Client { get; set; }
    public DateOnly DueDate { get; set; }
    public string Priority { get; set; } = "Medium";
    public decimal EstimatedHours { get; set; } = 0;
    public string Status { get; set; } = "To Do";
}