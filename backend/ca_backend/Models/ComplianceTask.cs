// Models/ComplianceTask.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class ComplianceTask
{
    [Key]
    public int ComplianceId { get; set; }

    [Required]
    public string CompanyName { get; set; } = string.Empty;

    [Required]
    public string Task { get; set; } = string.Empty;

    public string? TaskDescription { get; set; }

    [Required]
    public DateOnly Deadline { get; set; }

    public string Status { get; set; } = "Pending";

    public string? AssignedToName { get; set; }
    public string? AssignedToEmail { get; set; }
}