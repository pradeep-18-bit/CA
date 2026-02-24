// Controllers/ContactSettingController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/contact-setting")]
public class ContactSettingController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactSettingController(AppDbContext context)
    {
        _context = context;
    }

    // POST: Save or Update (Upsert) – Only one record
    [HttpPost]
    public async Task<ActionResult<ContactSetting>> SaveOrUpdate([FromBody] ContactSetting dto)
    {
        var existing = await _context.ContactSettings
            .FirstOrDefaultAsync(c => c.Id == 1);

        if (existing == null)
        {
            dto.Id = 1;
            _context.ContactSettings.Add(dto);
        }
        else
        {
            _context.Entry(existing).CurrentValues.SetValues(dto);
        }

        await _context.SaveChangesAsync();
        return Ok(dto);
    }

    // GET: Get the single contact settings record
    [HttpGet]
    public async Task<ActionResult<ContactSetting>> Get()
    {
        var setting = await _context.ContactSettings
            .FirstOrDefaultAsync(c => c.Id == 1);

        if (setting == null)
        {
            return Ok(new ContactSetting
            {
                Id = 1,
                StreetAddress = "",
                City = "",
                State = "",
                PinCode = "",
                PrimaryPhone = "",
                SecondaryPhone = "",
                PrimaryEmail = "",
                SupportEmail = "",
                Website = ""
            });
        }

        return Ok(setting);
    }
}