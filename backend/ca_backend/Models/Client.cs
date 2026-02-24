// Models/Client.cs
using System.ComponentModel.DataAnnotations;

namespace ca_backend.Models;

public class Client
{
    public int Id { get; set; }

    [Required]
    public string ClientName { get; set; } = string.Empty;

    [Required]
    public string ClientType { get; set; } = string.Empty; // company / individual / partnership

    public string? PanNumber { get; set; }
    public string? GstNumber { get; set; }

    [Required]
    public string Contact { get; set; } = string.Empty;

    [Required]
    public string Services { get; set; } = string.Empty;

    public string Status { get; set; } = "Active";

    public DateOnly? LastActivity { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    // NEW FIELD – EMAIL
    public string? Email { get; set; }  // Optional but unique
}