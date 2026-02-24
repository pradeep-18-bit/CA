// Models/NotificationSetting.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class NotificationSetting
{
    [Key]
    public int Id { get; set; } = 1; // Only one record

    public bool GSTReturnReminders { get; set; } = true;
    public bool TDSReturnReminders { get; set; } = true;
    public bool ITRFilingReminders { get; set; } = true;

    [Required]
    public string ReminderDaysDeadline { get; set; } = "7"; // e.g., "7" for 7 days before

    [Required]
    public string ReminderTime { get; set; } = "09:00 AM"; // e.g., "09:00 AM"

    public bool EmailNotifications { get; set; } = true;
    public bool SMSNotifications { get; set; } = false;
    public bool WhatsAppNotifications { get; set; } = false;
}