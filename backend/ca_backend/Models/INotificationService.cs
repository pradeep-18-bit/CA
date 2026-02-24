// Services/INotificationService.cs
using ca_backend.Models;

namespace ca_backend.Services;

public interface INotificationService
{
    Task SendNotificationAsync(string text);
}