// Models/UpdateStatusByCompanyTaskDto.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class UpdateStatusByCompanyTaskDto
{
    [Required] public string CompanyName { get; set; } = string.Empty;
    [Required] public string Task { get; set; } = string.Empty;
    [Required] public string Status { get; set; } = string.Empty;

    // THESE TWO LINES WERE MISSING – NOW ADDED
    public string? AssignedToName { get; set; }
    public string? AssignedToEmail { get; set; }
}