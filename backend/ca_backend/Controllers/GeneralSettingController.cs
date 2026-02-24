// Controllers/GeneralSettingController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/general-setting")]
public class GeneralSettingController : ControllerBase
{
    private readonly AppDbContext _context;

    public GeneralSettingController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<ActionResult<GeneralSetting>> SaveOrUpdate([FromBody] GeneralSetting dto)
    {
        if (string.IsNullOrWhiteSpace(dto.FirmName) || string.IsNullOrWhiteSpace(dto.PANNumber))
            return BadRequest("Firm Name and PAN Number are required.");

        var existing = await _context.GeneralSettings
            .FirstOrDefaultAsync(g => g.Id == 1);

        if (existing == null)
        {
            dto.Id = 1;
            _context.GeneralSettings.Add(dto);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(dto);
        }

        await _context.SaveChangesAsync();
        return Ok(dto);
    }

    [HttpGet]
    public async Task<ActionResult<GeneralSetting>> Get()
    {
        var setting = await _context.GeneralSettings
            .FirstOrDefaultAsync(g => g.Id == 1);

        if (setting == null)
        {
            return Ok(new GeneralSetting
            {
                Id = 1,
                FirmName = "",
                RegistrationNumber = "",
                PANNumber = "",
                GSTIN = "",
                FirmDescription = "",
                FinancialYear = "2025-2026",
                Currency = "INR",
                Timezone = "Asia/Kolkata",
                WorkingHours = "10:00 AM - 7:00 PM"
            });
        }

        return Ok(setting);
    }
}