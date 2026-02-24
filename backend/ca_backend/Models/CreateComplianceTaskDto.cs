// Models/CreateComplianceTaskDto.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class CreateComplianceTaskDto
{
    [Required] public string CompanyName { get; set; } = string.Empty;
    [Required]
    [RegularExpression("^(GST|TDS|ITR|ROC|Audit)$")]
    public string Task { get; set; } = string.Empty;

    public string? TaskDescription { get; set; }
    [Required] public DateOnly Deadline { get; set; }

    public string? AssignedToName { get; set; }
    public string? AssignedToEmail { get; set; }
}