// Controllers/NotificationsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;
using System.Threading.Channels;
namespace ca_backend.Controllers;

[ApiController]
[Route("api/notifications")]
public class NotificationsController : ControllerBase
{
    private readonly AppDbContext _context;
    private static readonly Channel<string> _notificationChannel = Channel.CreateUnbounded<string>();

    public NotificationsController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/notifications → Save new notification + broadcast via SSE
    [HttpPost]
    public async Task<IActionResult> CreateNotification([FromBody] CreateNotificationDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Text))
            return BadRequest("Notification text is required.");

        var notification = new Notification
        {
            Text = dto.Text.Trim()
        };

        _context.Notifications.Add(notification);
        await _context.SaveChangesAsync();

        // Broadcast to SSE clients
        await _notificationChannel.Writer.WriteAsync(notification.Text);

        return Ok(new
        {
            message = "Notification created successfully.",
            id = notification.Id,
            text = notification.Text,
            createdAt = notification.CreatedAt
        });
    }

    // GET: api/notifications/recent → Get last 15 notifications (newest first)
    [HttpGet("recent")]
    public async Task<ActionResult<IEnumerable<Notification>>> GetRecentNotifications()
    {
        var notifications = await _context.Notifications
            .OrderByDescending(n => n.CreatedAt)
            .Take(15)
            .ToListAsync();

        return Ok(notifications);
    }

    // SSE: api/notifications/sse → Stream new notifications to frontend
    [HttpGet("sse")]
    public async Task GetNotificationsSSE()
    {
        Response.ContentType = "text/event-stream";
        Response.Headers.Append("Cache-Control", "no-cache");
        Response.Headers.Append("Connection", "keep-alive");

        var reader = _notificationChannel.Reader;

        await foreach (var message in reader.ReadAllAsync())
        {
            await Response.WriteAsync($"data: {message}\n\n");
            await Response.Body.FlushAsync();
        }
    }
}