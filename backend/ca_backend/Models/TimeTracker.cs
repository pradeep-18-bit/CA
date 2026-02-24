using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ca_backend.Models;

public class TimeTracker
{
    [Key]
    public int Id { get; set; }

    [Column("task_description")]
    public string TaskDescription { get; set; } = string.Empty;

    [Column("client")]
    public string Client { get; set; } = string.Empty;

    [Column("project")]
    public string? Project { get; set; }

    [Column("date")]
    public DateOnly Date { get; set; }

    [Column("billing_type")]
    public string BillingType { get; set; } = "Billable"; // Billable, Non-Billable

    [Column("duration")]
    public string? Duration { get; set; }
}