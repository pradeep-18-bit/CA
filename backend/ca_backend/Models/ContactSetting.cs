// Models/ContactSetting.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class ContactSetting
{
    [Key]
    public int Id { get; set; } = 1; // Only one record ever

    public string StreetAddress { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string PinCode { get; set; } = string.Empty;

    public string PrimaryPhone { get; set; } = string.Empty;
    public string SecondaryPhone { get; set; } = string.Empty;

    public string PrimaryEmail { get; set; } = string.Empty;
    public string SupportEmail { get; set; } = string.Empty;

    public string Website { get; set; } = string.Empty;
}
