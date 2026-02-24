// Controllers/NotificationSettingController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/notification-setting")]
public class NotificationSettingController : ControllerBase
{
    private readonly AppDbContext _context;

    public NotificationSettingController(AppDbContext context)
    {
        _context = context;
    }

    // POST: Save or Update (Upsert) – Only one record
    [HttpPost]
    public async Task<ActionResult<NotificationSetting>> SaveOrUpdate([FromBody] NotificationSetting dto)
    {
        if (string.IsNullOrWhiteSpace(dto.ReminderDaysDeadline) || string.IsNullOrWhiteSpace(dto.ReminderTime))
            return BadRequest("Reminder Days Deadline and Reminder Time are required.");

        var existing = await _context.NotificationSettings
            .FirstOrDefaultAsync(n => n.Id == 1);

        if (existing == null)
        {
            dto.Id = 1;
            _context.NotificationSettings.Add(dto);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(dto);
        }

        await _context.SaveChangesAsync();
        return Ok(dto);
    }

    // GET: Get the single notification settings record
    [HttpGet]
    public async Task<ActionResult<NotificationSetting>> Get()
    {
        var setting = await _context.NotificationSettings
            .FirstOrDefaultAsync(n => n.Id == 1);

        if (setting == null)
        {
            return Ok(new NotificationSetting
            {
                Id = 1,
                GSTReturnReminders = true,
                TDSReturnReminders = true,
                ITRFilingReminders = true,
                ReminderDaysDeadline = "7",
                ReminderTime = "09:00 AM",
                EmailNotifications = true,
                SMSNotifications = false,
                WhatsAppNotifications = false
            });
        }

        return Ok(setting);
    }
}