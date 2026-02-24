// Models/BrandingSetting.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class BrandingSetting
{
    [Key]
    public int Id { get; set; } = 1;

    public string? FirmLogoUrl { get; set; }

    public string PrimaryColor { get; set; } = "#1e40af";

    public string SecondaryColor { get; set; } = "#f59e0b";

    public string LetterheadTemplate { get; set; } = "Default Template";

    public string InvoiceTemplate { get; set; } = "Professional";
}