// Models/SecuritySetting.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class SecuritySetting
{
    [Key]
    public int Id { get; set; } = 1; // Only one record ever

    public bool TwoFactorAuthentication { get; set; } = false;

    [Required]
    public string SessionTimeout { get; set; } = "30"; // in minutes

    [Required]
    public string LoginAttemptLimit { get; set; } = "5";

    public string DataEncryption { get; set; } = "Enabled"; // Enabled | Disabled

    public bool AuditLogging { get; set; } = true;

    public string DataBackup { get; set; } = "Active"; // Active | Inactive
}