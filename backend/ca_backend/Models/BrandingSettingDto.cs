// Models/BrandingSettingDto.cs   ← correct file name & spelling
namespace ca_backend.Models;

public class BrandingSettingDto
{
    public IFormFile? FirmLogoFile { get; set; }
    public string? FirmLogoUrl { get; set; }

    public string PrimaryColor { get; set; } = "#1e40af";
    public string SecondaryColor { get; set; } = "#f59e0b";
    public string? LetterheadTemplate { get; set; }
    public string? InvoiceTemplate { get; set; }
}