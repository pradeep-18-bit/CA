using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ca_backend.Models;

public class Staff
{
    [Key]
    public int Id { get; set; }

    [Column("full_name")]
    public string FullName { get; set; } = string.Empty;

    [Column("email_address")]
    public string EmailAddress { get; set; } = string.Empty;

    [Column("phone_number")]
    public string PhoneNumber { get; set; } = string.Empty;

    [Column("role")]
    public string Role { get; set; } = "staff"; // staff, intern

    [Column("status")]
    public string Status { get; set; } = "Active"; // Active, Inactive

    [Column("joining_date")]
    public DateOnly JoiningDate { get; set; }

    [Column("client_management")]
    public bool ClientManagement { get; set; } = false;

    [Column("filing")]
    public bool Filing { get; set; } = false;

    [Column("documents")]
    public bool Documents { get; set; } = false;

    [Column("billing")]
    public bool Billing { get; set; } = false;

    [Column("reports")]
    public bool Reports { get; set; } = false;

    [Column("firm_settings")]
    public bool FirmSettings { get; set; } = false;

    [Column("user_management")]
    public bool UserManagement { get; set; } = false;

    [Column("compliance_calendar")]
    public bool ComplianceCalendar { get; set; } = false;

    [Column("generate_invoice")]
    public bool GenerateInvoice { get; set; } = false;

    [Column("time_tracking")]
    public bool TimeTracking { get; set; } = false;

    [Column("task_management")]
    public bool TaskManagement { get; set; } = false;

    [Column("department")]
    public string Department { get; set; } = string.Empty;
}