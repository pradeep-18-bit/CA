namespace ca_backend.Models;

public class PasswordChange
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public bool IsChanged { get; set; } = false; // Default to false
}