// Controllers/ComplianceCalendarController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/compliancecalendar")]
public class ComplianceCalendarController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly HttpClient _httpClient;

    public ComplianceCalendarController(AppDbContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }

    // GET: api/compliancecalendar → Get all tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ComplianceTask>>> GetTasks()
    {
        var tasks = await _context.ComplianceTasks
            .OrderBy(t => t.Deadline)
            .ToListAsync();

        return Ok(tasks);
    }

    // POST: api/compliancecalendar → Create new task
    [HttpPost]
    public async Task<ActionResult<ComplianceTask>> AddTask([FromBody] CreateComplianceTaskDto? dto)
    {
        // Fix 1: Check if body is null
        if (dto == null)
            return BadRequest("Request body is required.");

        // Fix 2: Validation
        if (string.IsNullOrWhiteSpace(dto.CompanyName) ||
            string.IsNullOrWhiteSpace(dto.Task))
            return BadRequest("CompanyName and Task are required.");

        if (dto.Deadline < DateOnly.FromDateTime(DateTime.Today))
            return BadRequest("Deadline must be today or in the future.");

        var allowedTasks = new[] { "GST", "TDS", "ITR", "ROC", "Audit" };
        if (!allowedTasks.Contains(dto.Task.Trim(), StringComparer.OrdinalIgnoreCase))
            return BadRequest("Task must be GST, TDS, ITR, ROC, or Audit.");

        var task = new ComplianceTask
        {
            CompanyName = dto.CompanyName.Trim(),
            Task = dto.Task.Trim(),
            TaskDescription = dto.TaskDescription?.Trim(),
            Deadline = dto.Deadline,
            Status = "Pending",
            AssignedToName = dto.AssignedToName?.Trim(),
            AssignedToEmail = dto.AssignedToEmail?.Trim()
        };

        _context.ComplianceTasks.Add(task);
        await _context.SaveChangesAsync();

        // 🔔 Send calendar notification
        try
        {
            var payload = new
            {
                text = $"New compliance task created: {task.Task} for {task.CompanyName} (Deadline: {task.Deadline})"
            };

            await _httpClient.PostAsJsonAsync(
                "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications",
                payload
            );
        }
        catch (Exception ex)
        {
            // Do NOT break task creation
            // Optional: log if you have logger
        }


        return CreatedAtAction(
            nameof(GetTasks),
            new { id = task.ComplianceId },
            task
        );
    }

    // PATCH: api/compliancecalendar/update-status
    [HttpPatch("update-status")]
    public async Task<IActionResult> UpdateStatusByCompanyAndTask([FromBody] UpdateStatusByCompanyTaskDto? dto)
    {
        if (dto == null)
            return BadRequest("Request body is required.");

        if (string.IsNullOrWhiteSpace(dto.CompanyName) ||
            string.IsNullOrWhiteSpace(dto.Task) ||
            string.IsNullOrWhiteSpace(dto.Status))
            return BadRequest("CompanyName, Task, and Status are required.");

        var validTasks = new[] { "GST", "TDS", "ITR", "ROC", "Audit" };
        if (!validTasks.Contains(dto.Task.Trim(), StringComparer.OrdinalIgnoreCase))
            return BadRequest("Task must be GST, TDS, ITR, ROC, or Audit.");

        var validStatuses = new[] { "Pending", "Completed", "Overdue" };
        if (!validStatuses.Contains(dto.Status.Trim(), StringComparer.OrdinalIgnoreCase))
            return BadRequest("Status must be Pending, Completed, or Overdue.");

        var task = await _context.ComplianceTasks
            .FirstOrDefaultAsync(t =>
                t.CompanyName.Trim() == dto.CompanyName.Trim() &&
                t.Task.Trim() == dto.Task.Trim());

        if (task == null)
            return NotFound($"No task found for '{dto.CompanyName}' and '{dto.Task}'.");

        task.Status = dto.Status.Trim();

        if (!string.IsNullOrWhiteSpace(dto.AssignedToName))
            task.AssignedToName = dto.AssignedToName.Trim();

        if (!string.IsNullOrWhiteSpace(dto.AssignedToEmail))
            task.AssignedToEmail = dto.AssignedToEmail.Trim();

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Status updated successfully.",
            complianceId = task.ComplianceId,
            companyName = task.CompanyName,
            task = task.Task,
            newStatus = task.Status,
            assignedToName = task.AssignedToName,
            assignedToEmail = task.AssignedToEmail
        });
    }

    // DELETE: api/compliancecalendar/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.ComplianceTasks.FindAsync(id);
        if (task == null)
            return NotFound($"Compliance task with ID {id} not found.");

        _context.ComplianceTasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Compliance task deleted successfully.",
            complianceId = task.ComplianceId,
            companyName = task.CompanyName,
            task = task.Task
        });
    }
}