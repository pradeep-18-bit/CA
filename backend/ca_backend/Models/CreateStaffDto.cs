using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class CreateStaffDto
{
    [Required]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    public string EmailAddress { get; set; } = string.Empty;

    [Required]
    public string PhoneNumber { get; set; } = string.Empty;

    [RegularExpression("^(staff|intern)$", ErrorMessage = "Role must be 'staff' or 'intern'.")]
    public string Role { get; set; } = "staff";

    [RegularExpression("^(Active|Inactive)$", ErrorMessage = "Status must be 'Active' or 'Inactive'.")]
    public string Status { get; set; } = "Active";

    [Required]
    public DateOnly JoiningDate { get; set; }

    public bool ClientManagement { get; set; } = false;
    public bool Filing { get; set; } = false;
    public bool Documents { get; set; } = false;
    public bool Billing { get; set; } = false;
    public bool Reports { get; set; } = false;
    public bool FirmSettings { get; set; } = false;
    public bool UserManagement { get; set; } = false;
    public bool ComplianceCalendar { get; set; } = false;
    public bool GenerateInvoice { get; set; } = false;
    public bool TimeTracking { get; set; } = false;
    public bool TaskManagement { get; set; } = false;

    public string Department { get; set; } = string.Empty;
}