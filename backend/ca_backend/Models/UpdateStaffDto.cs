using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class UpdateStaffDto
{
    public string? FullName { get; set; }
    public string? EmailAddress { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Role { get; set; }
    public string? Status { get; set; }
    public DateOnly? JoiningDate { get; set; }
    public bool? ClientManagement { get; set; }
    public bool? Filing { get; set; }
    public bool? Documents { get; set; }
    public bool? Billing { get; set; }
    public bool? Reports { get; set; }
    public bool? FirmSettings { get; set; }
    public bool? UserManagement { get; set; }
    public bool? ComplianceCalendar { get; set; }
    public bool? GenerateInvoice { get; set; }
    public bool? TimeTracking { get; set; }
    public bool? TaskManagement { get; set; }
    public string? Department { get; set; }
}