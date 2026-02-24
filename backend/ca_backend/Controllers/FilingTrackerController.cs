using ca_backend.Data;
using ca_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class FilingTrackerController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly HttpClient _httpClient;

    public FilingTrackerController(AppDbContext context, HttpClient httpClient)
    {
        _context = context;
        _httpClient = httpClient;
    }

    // GET: api/filingtracker → Get all records
    [HttpGet]
    public async Task<ActionResult<IEnumerable<FilingTracker>>> GetAllFilingTrackers()
    {
        try
        {
            var filings = await _context.FilingTrackers
                .OrderBy(f => f.DueDate)
                .ThenBy(f => f.Priority == "High" ? 0 : f.Priority == "Medium" ? 1 : 2)
                .ToListAsync();

            return Ok(filings);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to fetch data.", error = ex.Message });
        }
    }

    // GET: api/filingtracker/{id} → Get single record
    [HttpGet("{id}")]
    public async Task<ActionResult<FilingTracker>> GetFilingTrackerById(int id)
    {
        var filing = await _context.FilingTrackers.FindAsync(id);

        if (filing == null)
            return NotFound(new { message = $"Filing tracker with ID {id} not found." });

        return Ok(filing);
    }

    // POST: api/filingtracker → Create new filing tracker entry
    [HttpPost]
    public async Task<ActionResult<FilingTracker>> AddFilingTracker([FromBody] CreateFilingTrackerDto dto)
    {
        // Required field validation
        if (string.IsNullOrWhiteSpace(dto.ClientName))
            return BadRequest(new { message = "ClientName is required." });

        if (string.IsNullOrWhiteSpace(dto.Service))
            return BadRequest(new { message = "Service is required." });

        if (string.IsNullOrWhiteSpace(dto.AssignedTo))
            return BadRequest(new { message = "AssignedTo is required." });

        if (string.IsNullOrWhiteSpace(dto.AssignedToName))
            return BadRequest(new { message = "AssignedToName is required." });

        if (string.IsNullOrWhiteSpace(dto.AssignedToEmail))
            return BadRequest(new { message = "AssignedToEmail is required." });

        if (dto.DueDate == default)
            return BadRequest(new { message = "DueDate is required." });

        // Email format check
        var email = dto.AssignedToEmail.Trim();
        if (!email.Contains("@") || !email.Contains("."))
            return BadRequest(new { message = "Please provide a valid email address." });

        // Status validation
        var validStatuses = new[] { "Pending", "In Progress", "Completed", "Overdue" };
        var status = string.IsNullOrWhiteSpace(dto.Status) ? "Pending" : dto.Status.Trim();
        if (!validStatuses.Contains(status))
            return BadRequest(new { message = "Status must be one of: Pending, In Progress, Completed, Overdue." });

        // Priority validation
        var validPriorities = new[] { "High", "Medium", "Low" };
        var priority = string.IsNullOrWhiteSpace(dto.Priority) ? "Medium" : dto.Priority.Trim();
        if (!validPriorities.Contains(priority))
            return BadRequest(new { message = "Priority must be High, Medium, or Low." });

        var filing = new FilingTracker
        {
            ClientName = dto.ClientName.Trim(),
            Service = dto.Service.Trim(),
            DueDate = dto.DueDate,
            AssignedTo = dto.AssignedTo.Trim(),
            AssignedToName = dto.AssignedToName.Trim(),
            AssignedToEmail = email,
            Status = status,
            Priority = priority
        };

        try
        {
            _context.FilingTrackers.Add(filing);
            await _context.SaveChangesAsync();
            // 🔔 Send filing tracker notification
            try
            {
                var payload = new
                {
                    text =
                        $"New filing task: {filing.Service} for {filing.ClientName} " +
                        $"(Due: {filing.DueDate}, Priority: {filing.Priority})"
                };

                await _httpClient.PostAsJsonAsync(
                    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications",
                    payload
                );
            }
            catch
            {
                // Intentionally swallow — filing creation must NOT fail
            }

            return CreatedAtAction(nameof(GetFilingTrackerById), new { id = filing.Id }, filing);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Failed to create filing tracker.", error = ex.Message });
        }
    }

    // PATCH: api/filingtracker/{id} → Partially update a record
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateFilingTracker(int id, [FromBody] UpdateFilingTrackerDto dto)
    {
        var filing = await _context.FilingTrackers.FindAsync(id);
        if (filing == null)
            return NotFound(new { message = $"Filing tracker with ID {id} not found." });

        // Update only provided fields
        if (!string.IsNullOrWhiteSpace(dto.ClientName))
            filing.ClientName = dto.ClientName.Trim();

        if (!string.IsNullOrWhiteSpace(dto.Service))
            filing.Service = dto.Service.Trim();

        if (!string.IsNullOrWhiteSpace(dto.AssignedTo))
            filing.AssignedTo = dto.AssignedTo.Trim();

        if (!string.IsNullOrWhiteSpace(dto.AssignedToName))
            filing.AssignedToName = dto.AssignedToName.Trim();

        if (!string.IsNullOrWhiteSpace(dto.AssignedToEmail))
        {
            var email = dto.AssignedToEmail.Trim();
            if (!email.Contains("@") || !email.Contains("."))
                return BadRequest(new { message = "Invalid email format." });
            filing.AssignedToEmail = email;
        }

        if (dto.DueDate.HasValue)
            filing.DueDate = dto.DueDate.Value;

        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            var status = dto.Status.Trim();
            if (!new[] { "Pending", "In Progress", "Completed", "Overdue" }.Contains(status))
                return BadRequest(new { message = "Invalid Status value." });
            filing.Status = status;
        }

        if (!string.IsNullOrWhiteSpace(dto.Priority))
        {
            var priority = dto.Priority.Trim();
            if (!new[] { "High", "Medium", "Low" }.Contains(priority))
                return BadRequest(new { message = "Invalid Priority value." });
            filing.Priority = priority;
        }

        try
        {
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Filing tracker updated successfully.",
                data = new
                {
                    filing.Id,
                    filing.ClientName,
                    filing.Service,
                    filing.DueDate,
                    filing.Status,
                    filing.AssignedTo,
                    filing.AssignedToName,
                    filing.AssignedToEmail,
                    filing.Priority
                }
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error updating record.", error = ex.Message });
        }
    }

    // DELETE: api/filingtracker/{id} → Delete a record
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFilingTracker(int id)
    {
        var filing = await _context.FilingTrackers.FindAsync(id);
        if (filing == null)
            return NotFound(new { message = $"Filing tracker with ID {id} not found." });

        try
        {
            _context.FilingTrackers.Remove(filing);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Filing tracker deleted successfully.",
                deletedId = id,
                clientName = filing.ClientName,
                service = filing.Service
            });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Error deleting record.", error = ex.Message });
        }
    }
}