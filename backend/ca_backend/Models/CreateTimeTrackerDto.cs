using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class CreateTimeTrackerDto
{
    [Required]
    public string TaskDescription { get; set; } = string.Empty;

    [Required]
    public string Client { get; set; } = string.Empty;

    public string? Project { get; set; }

    [Required]
    public DateOnly Date { get; set; }

    [Required]
    [RegularExpression("^(Billable|Non-Billable)$", ErrorMessage = "BillingType must be 'Billable' or 'Non-Billable'.")]
    public string BillingType { get; set; } = "Billable";

    [RegularExpression(@"^(\d{1,2}:\d{2})$", ErrorMessage = "Duration must be in 'HH:MM' format.")]
    public string? Duration { get; set; }
}