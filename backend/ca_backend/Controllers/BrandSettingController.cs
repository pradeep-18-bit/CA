// Controllers/BrandingSettingController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/branding-setting")]
public class BrandingSettingController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IWebHostEnvironment _env;

    public BrandingSettingController(AppDbContext context, IWebHostEnvironment env)
    {
        _context = context;
        _env = env;
        EnsureUploadDirectory();
    }

    private void EnsureUploadDirectory()
    {
        var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
        var path = Path.Combine(webRoot, "uploads", "logos");
        Directory.CreateDirectory(path);
    }

    [HttpPost]
    public async Task<ActionResult<BrandingSetting>> SaveOrUpdate([FromForm] BrandingSettingDto dto)
    {
        var existing = await _context.BrandingSettings.FirstOrDefaultAsync(x => x.Id == 1);

        string? logoUrl = null;
        if (dto.FirmLogoFile != null && dto.FirmLogoFile.Length > 0)
        {
            var webRoot = _env.WebRootPath ?? Path.Combine(Directory.GetCurrentDirectory(), "wwwroot");
            var folder = Path.Combine(webRoot, "uploads", "logos");
            var fileName = "firm-logo-" + DateTime.Now.Ticks + Path.GetExtension(dto.FirmLogoFile.FileName);
            var filePath = Path.Combine(folder, fileName);

            using var stream = new FileStream(filePath, FileMode.Create);
            await dto.FirmLogoFile.CopyToAsync(stream);

            logoUrl = $"/uploads/logos/{fileName}";
        }

        if (existing == null)
        {
            var setting = new BrandingSetting
            {
                Id = 1,
                FirmLogoUrl = logoUrl ?? dto.FirmLogoUrl,
                PrimaryColor = dto.PrimaryColor ?? "#1e40af",
                SecondaryColor = dto.SecondaryColor ?? "#f59e0b",
                LetterheadTemplate = dto.LetterheadTemplate ?? "Default Template",
                InvoiceTemplate = dto.InvoiceTemplate ?? "Professional"
            };
            _context.BrandingSettings.Add(setting);
            await _context.SaveChangesAsync();
            return Ok(setting);
        }
        else
        {
            if (logoUrl != null) existing.FirmLogoUrl = logoUrl;
            if (!string.IsNullOrWhiteSpace(dto.PrimaryColor)) existing.PrimaryColor = dto.PrimaryColor;
            if (!string.IsNullOrWhiteSpace(dto.SecondaryColor)) existing.SecondaryColor = dto.SecondaryColor;
            if (!string.IsNullOrWhiteSpace(dto.LetterheadTemplate)) existing.LetterheadTemplate = dto.LetterheadTemplate;
            if (!string.IsNullOrWhiteSpace(dto.InvoiceTemplate)) existing.InvoiceTemplate = dto.InvoiceTemplate;

            await _context.SaveChangesAsync();
            return Ok(existing);
        }
    }

    [HttpGet]
    public async Task<ActionResult<BrandingSetting>> Get()
    {
        var setting = await _context.BrandingSettings.FirstOrDefaultAsync(x => x.Id == 1);

        return Ok(setting ?? new BrandingSetting
        {
            Id = 1,
            FirmLogoUrl = null,
            PrimaryColor = "#1e40af",
            SecondaryColor = "#f59e0b",
            LetterheadTemplate = "Default Template",
            InvoiceTemplate = "Professional"
        });
    }
}