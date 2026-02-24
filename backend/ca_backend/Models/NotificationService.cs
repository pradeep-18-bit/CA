// Services/NotificationService.cs
using ca_backend.Models;
using Microsoft.Extensions.Logging;
using System.Net.Http.Json;

namespace ca_backend.Services;

public class NotificationService : INotificationService
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<NotificationService> _logger;

    public NotificationService(HttpClient httpClient, ILogger<NotificationService> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task SendNotificationAsync(string text)
    {
        try
        {
            var payload = new { text };
            await _httpClient.PostAsJsonAsync("https://your-ngrok-url/api/notifications", payload);
            _logger.LogInformation("Notification sent: {Text}", text);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to send notification: {Text}", text);
        }
    }
}