// Controllers/SecuritySettingController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/security-setting")]
public class SecuritySettingController : ControllerBase
{
    private readonly AppDbContext _context;

    public SecuritySettingController(AppDbContext context)
    {
        _context = context;
    }

    // POST: Save or Update (Upsert) – Only one record
    [HttpPost]
    public async Task<ActionResult<SecuritySetting>> SaveOrUpdate([FromBody] SecuritySetting dto)
    {
        if (string.IsNullOrWhiteSpace(dto.SessionTimeout) || string.IsNullOrWhiteSpace(dto.LoginAttemptLimit))
            return BadRequest("Session Timeout and Login Attempt Limit are required.");

        if (!new[] { "Enabled", "Disabled" }.Contains(dto.DataEncryption))
            return BadRequest("Data Encryption must be 'Enabled' or 'Disabled'.");

        if (!new[] { "Active", "Inactive" }.Contains(dto.DataBackup))
            return BadRequest("Data Backup must be 'Active' or 'Inactive'.");

        var existing = await _context.SecuritySettings
            .FirstOrDefaultAsync(s => s.Id == 1);

        if (existing == null)
        {
            dto.Id = 1;
            _context.SecuritySettings.Add(dto);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(dto);
        }

        await _context.SaveChangesAsync();
        return Ok(dto);
    }

    // GET: Get current security settings
    [HttpGet]
    public async Task<ActionResult<SecuritySetting>> Get()
    {
        var setting = await _context.SecuritySettings
            .FirstOrDefaultAsync(s => s.Id == 1);

        if (setting == null)
        {
            return Ok(new SecuritySetting
            {
                Id = 1,
                TwoFactorAuthentication = false,
                SessionTimeout = "30",
                LoginAttemptLimit = "5",
                DataEncryption = "Enabled",
                AuditLogging = true,
                DataBackup = "Active"
            });
        }

        return Ok(setting);
    }
}