using ca_backend.Data;
using ca_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/time-tracker")]
public class TimeTrackerController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<TimeTrackerController> _logger;

    public TimeTrackerController(AppDbContext context, ILogger<TimeTrackerController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/time-tracker → Retrieve all time tracker entries
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TimeTracker>>> GetAllTimeTrackers()
    {
        try
        {
            var timeTrackers = await _context.TimeTracker.ToListAsync();
            _logger.LogInformation("Retrieved {Count} time tracker entries", timeTrackers.Count);
            return Ok(timeTrackers);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving time tracker entries");
            return StatusCode(500, $"Error retrieving time tracker entries: {ex.Message}");
        }
    }

    // POST: api/time-tracker → Create a new time tracker entry
    [HttpPost]
    public async Task<ActionResult<TimeTracker>> CreateTimeTracker([FromBody] CreateTimeTrackerDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.TaskDescription))
        {
            _logger.LogWarning("Invalid input: TaskDescription is required");
            return BadRequest("TaskDescription is required.");
        }
        if (string.IsNullOrWhiteSpace(dto.Client))
        {
            _logger.LogWarning("Invalid input: Client is required");
            return BadRequest("Client is required.");
        }
        if (dto.Date == default)
        {
            _logger.LogWarning("Invalid input: Date is required");
            return BadRequest("Date is required.");
        }
        if (string.IsNullOrWhiteSpace(dto.BillingType) || !Regex.IsMatch(dto.BillingType, "^(Billable|Non-Billable)$"))
        {
            _logger.LogWarning("Invalid BillingType: {BillingType}", dto.BillingType);
            return BadRequest("BillingType must be 'Billable' or 'Non-Billable'.");
        }
        if (dto.Duration != null && !Regex.IsMatch(dto.Duration, "^(\\d{1,2}:\\d{2})$"))
        {
            _logger.LogWarning("Invalid Duration: {Duration}", dto.Duration);
            return BadRequest("Duration must be in 'HH:MM' format.");
        }

        // Check for existing record with same taskDescription, client, and project
        var existingTracker = await _context.TimeTracker
            .Where(t => t.TaskDescription == dto.TaskDescription.Trim() &&
                        t.Client == dto.Client.Trim() &&
                        t.Project == (dto.Project == null ? null : dto.Project.Trim()))
            .FirstOrDefaultAsync();

        if (existingTracker != null)
        {
            _logger.LogWarning("Duplicate time tracker found: TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return BadRequest("A time tracker with the same TaskDescription, Client, and Project already exists.");
        }

        var timeTracker = new TimeTracker
        {
            TaskDescription = dto.TaskDescription.Trim(),
            Client = dto.Client.Trim(),
            Project = dto.Project?.Trim(),
            Date = dto.Date,
            BillingType = dto.BillingType,
            Duration = dto.Duration
        };

        try
        {
            _context.TimeTracker.Add(timeTracker);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Time tracker created: Id={Id}, TaskDescription={TaskDescription}, Client={Client}", timeTracker.Id, timeTracker.TaskDescription, timeTracker.Client);
            return CreatedAtAction(nameof(CreateTimeTracker), new { id = timeTracker.Id }, timeTracker);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Check constraint violation: BillingType={BillingType}, Duration={Duration}", dto.BillingType, dto.Duration);
            return BadRequest("Invalid BillingType or Duration. BillingType must be 'Billable' or 'Non-Billable', Duration must be in 'HH:MM' format.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating time tracker: TaskDescription={TaskDescription}", dto.TaskDescription);
            return StatusCode(500, $"Error creating time tracker: {ex.Message}");
        }
    }

    // PATCH: api/time-tracker → Update time tracker entry by taskDescription, client, and project
    [HttpPatch]
    public async Task<IActionResult> UpdateTimeTracker([FromBody] UpdateTimeTrackerDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.TaskDescription))
        {
            _logger.LogWarning("Invalid input: TaskDescription is required for matching");
            return BadRequest("TaskDescription is required for matching.");
        }
        if (string.IsNullOrWhiteSpace(dto.Client))
        {
            _logger.LogWarning("Invalid input: Client is required for matching");
            return BadRequest("Client is required for matching.");
        }

        var query = _context.TimeTracker
            .Where(t => t.TaskDescription == dto.TaskDescription.Trim() &&
                        t.Client == dto.Client.Trim() &&
                        t.Project == (dto.Project == null ? null : dto.Project.Trim()));
        var timeTrackers = await query.ToListAsync();

        if (!timeTrackers.Any())
        {
            _logger.LogWarning("No time tracker found for TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return NotFound("No time tracker found with the specified TaskDescription, Client, and Project.");
        }
        if (timeTrackers.Count > 1)
        {
            _logger.LogWarning("Multiple time trackers found for TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return BadRequest("Multiple time trackers match the specified TaskDescription, Client, and Project. Please refine the criteria.");
        }

        var timeTracker = timeTrackers[0];
        bool updated = false;

        if (!string.IsNullOrWhiteSpace(dto.TaskDescription) && dto.TaskDescription.Trim() != timeTracker.TaskDescription)
        {
            timeTracker.TaskDescription = dto.TaskDescription.Trim();
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.Client) && dto.Client.Trim() != timeTracker.Client)
        {
            timeTracker.Client = dto.Client.Trim();
            updated = true;
        }
        if (dto.Project != null && dto.Project.Trim() != timeTracker.Project)
        {
            timeTracker.Project = dto.Project.Trim();
            updated = true;
        }
        if (dto.Date.HasValue && dto.Date.Value != timeTracker.Date)
        {
            timeTracker.Date = dto.Date.Value;
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.BillingType))
        {
            if (!Regex.IsMatch(dto.BillingType, "^(Billable|Non-Billable)$"))
            {
                _logger.LogWarning("Invalid BillingType: {BillingType}", dto.BillingType);
                return BadRequest("BillingType must be 'Billable' or 'Non-Billable'.");
            }
            timeTracker.BillingType = dto.BillingType;
            updated = true;
        }
        if (dto.Duration != null && dto.Duration != timeTracker.Duration)
        {
            if (!Regex.IsMatch(dto.Duration, "^(\\d{1,2}:\\d{2})$"))
            {
                _logger.LogWarning("Invalid Duration: {Duration}", dto.Duration);
                return BadRequest("Duration must be in 'HH:MM' format.");
            }
            timeTracker.Duration = dto.Duration;
            updated = true;
        }

        if (!updated)
        {
            _logger.LogWarning("No fields provided for update for TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return BadRequest("At least one field must be provided for update.");
        }

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Time tracker updated: Id={Id}, TaskDescription={TaskDescription}, Client={Client}",
                timeTracker.Id, timeTracker.TaskDescription, timeTracker.Client);
            return Ok(timeTracker);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Check constraint violation: BillingType={BillingType}, Duration={Duration}",
                dto.BillingType, dto.Duration);
            return BadRequest("Invalid BillingType or Duration. BillingType must be 'Billable' or 'Non-Billable', Duration must be in 'HH:MM' format.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating time tracker: TaskDescription={TaskDescription}", dto.TaskDescription);
            return StatusCode(500, $"Error updating time tracker: {ex.Message}");
        }
    }

    // DELETE: api/time-tracker → Delete time tracker entry by taskDescription, client, and project
    [HttpDelete]
    public async Task<IActionResult> DeleteTimeTracker([FromBody] DeleteTimeTrackerDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.TaskDescription))
        {
            _logger.LogWarning("Invalid input: TaskDescription is required");
            return BadRequest("TaskDescription is required.");
        }
        if (string.IsNullOrWhiteSpace(dto.Client))
        {
            _logger.LogWarning("Invalid input: Client is required");
            return BadRequest("Client is required.");
        }

        var query = _context.TimeTracker
            .Where(t => t.TaskDescription == dto.TaskDescription.Trim() &&
                        t.Client == dto.Client.Trim() &&
                        t.Project == (dto.Project == null ? null : dto.Project.Trim()));
        var timeTrackers = await query.ToListAsync();

        if (!timeTrackers.Any())
        {
            _logger.LogWarning("No time tracker found for TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return NotFound("No time tracker found with the specified TaskDescription, Client, and Project.");
        }
        if (timeTrackers.Count > 1)
        {
            _logger.LogWarning("Multiple time trackers found for TaskDescription={TaskDescription}, Client={Client}, Project={Project}",
                dto.TaskDescription, dto.Client, dto.Project);
            return BadRequest("Multiple time trackers match the specified TaskDescription, Client, and Project. Please refine the criteria.");
        }

        var timeTracker = timeTrackers[0];

        _context.TimeTracker.Remove(timeTracker);
        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Time tracker deleted: Id={Id}, TaskDescription={TaskDescription}, Client={Client}",
                timeTracker.Id, timeTracker.TaskDescription, timeTracker.Client);
            return Ok(new
            {
                message = "Time tracker deleted successfully.",
                id = timeTracker.Id,
                taskDescription = timeTracker.TaskDescription,
                client = timeTracker.Client,
                project = timeTracker.Project
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting time tracker: TaskDescription={TaskDescription}", dto.TaskDescription);
            return StatusCode(500, $"Error deleting time tracker: {ex.Message}");
        }
    }
}