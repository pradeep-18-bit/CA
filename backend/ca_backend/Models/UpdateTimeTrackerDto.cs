using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class UpdateTimeTrackerDto
{
    public string? TaskDescription { get; set; }
    public string? Client { get; set; }
    public string? Project { get; set; }
    public DateOnly? Date { get; set; }

    [RegularExpression("^(Billable|Non-Billable)$", ErrorMessage = "BillingType must be 'Billable' or 'Non-Billable'.")]
    public string? BillingType { get; set; }

    [RegularExpression(@"^(\d{1,2}:\d{2})$", ErrorMessage = "Duration must be in 'HH:MM' format.")]
    public string? Duration { get; set; }
}