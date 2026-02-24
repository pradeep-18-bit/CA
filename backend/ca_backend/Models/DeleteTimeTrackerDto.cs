namespace ca_backend.Models;

public class DeleteTimeTrackerDto
{
    public string TaskDescription { get; set; } = string.Empty;
    public string Client { get; set; } = string.Empty;
    public string? Project { get; set; }
}