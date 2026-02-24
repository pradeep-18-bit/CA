// Models/GeneralSetting.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class GeneralSetting
{
    [Key]
    public int Id { get; set; } = 1;

    [Required] public string FirmName { get; set; } = string.Empty;
    public string RegistrationNumber { get; set; } = string.Empty;
    [Required] public string PANNumber { get; set; } = string.Empty;
    public string GSTIN { get; set; } = string.Empty;
    public string FirmDescription { get; set; } = string.Empty;
    [Required] public string FinancialYear { get; set; } = "2025-2026";
    [Required] public string Currency { get; set; } = "INR";
    [Required] public string Timezone { get; set; } = "Asia/Kolkata";
    [Required] public string WorkingHours { get; set; } = "10:00 AM - 7:00 PM";
}