// Models/ReceiveEmailDto.cs
namespace ca_backend.Models;

public class ReceiveEmailDto
{
    public string AdminEmail { get; set; } = string.Empty;  // Admin's inbox to poll
}