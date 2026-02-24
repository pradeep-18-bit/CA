using ca_backend.Data;
using ca_backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StaffController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ILogger<StaffController> _logger;

    public StaffController(AppDbContext context, ILogger<StaffController> logger)
    {
        _context = context;
        _logger = logger;
    }

    // GET: api/staff → Get all staff members
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Staff>>> GetAllStaff()
    {
        try
        {
            var staff = await _context.Staff
                .OrderBy(s => s.FullName)
                .ToListAsync();
            _logger.LogInformation("Fetched {Count} staff members", staff.Count);
            return Ok(staff);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch staff data");
            return StatusCode(500, $"Failed to fetch staff data: {ex.Message}");
        }
    }

    // POST: api/staff → Add new staff member
    [HttpPost]
    public async Task<ActionResult<Staff>> AddStaff([FromBody] CreateStaffDto dto)
    {
        // Validate required fields
        if (string.IsNullOrWhiteSpace(dto.FullName))
        {
            _logger.LogWarning("Invalid input: FullName is required");
            return BadRequest("FullName is required.");
        }
        if (string.IsNullOrWhiteSpace(dto.EmailAddress) || !Regex.IsMatch(dto.EmailAddress, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
        {
            _logger.LogWarning("Invalid input: EmailAddress is invalid or missing");
            return BadRequest("Valid EmailAddress is required.");
        }
        if (string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            _logger.LogWarning("Invalid input: PhoneNumber is required");
            return BadRequest("PhoneNumber is required.");
        }
        if (!Regex.IsMatch(dto.Role, "^(staff|intern)$", RegexOptions.IgnoreCase))
        {
            _logger.LogWarning("Invalid Role: {Role}", dto.Role);
            return BadRequest("Role must be 'staff' or 'intern'.");
        }
        if (!Regex.IsMatch(dto.Status, "^(Active|Inactive)$", RegexOptions.IgnoreCase))
        {
            _logger.LogWarning("Invalid Status: {Status}", dto.Status);
            return BadRequest("Status must be 'Active' or 'Inactive'.");
        }
        if (dto.JoiningDate == default)
        {
            _logger.LogWarning("Invalid input: JoiningDate is required");
            return BadRequest("JoiningDate is required.");
        }

        var staff = new Staff
        {
            FullName = dto.FullName.Trim(),
            EmailAddress = dto.EmailAddress.Trim(),
            PhoneNumber = dto.PhoneNumber.Trim(),
            Role = dto.Role.Trim().ToLower(),
            Status = dto.Status.Trim(),
            JoiningDate = dto.JoiningDate,
            ClientManagement = dto.ClientManagement,
            Filing = dto.Filing,
            Documents = dto.Documents,
            Billing = dto.Billing,
            Reports = dto.Reports,
            FirmSettings = dto.FirmSettings,
            UserManagement = dto.UserManagement,
            ComplianceCalendar = dto.ComplianceCalendar,
            GenerateInvoice = dto.GenerateInvoice,
            TimeTracking = dto.TimeTracking,
            TaskManagement = dto.TaskManagement,
            Department = dto.Department?.Trim() ?? string.Empty
        };

        try
        {
            _context.Staff.Add(staff);
            await _context.SaveChangesAsync();
            _logger.LogInformation("Staff created: Id={Id}, FullName={FullName}, EmailAddress={EmailAddress}, Department={Department}", staff.Id, staff.FullName, staff.EmailAddress, staff.Department);
            return CreatedAtAction(nameof(GetAllStaff), new { id = staff.Id }, staff);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            _logger.LogError(ex, "Unique constraint violation: EmailAddress={EmailAddress}, PhoneNumber={PhoneNumber}", dto.EmailAddress, dto.PhoneNumber);
            return Conflict("EmailAddress or PhoneNumber already exists.");
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Check constraint violation: Role={Role}, Status={Status}", dto.Role, dto.Status);
            return BadRequest("Invalid Role or Status. Role must be 'staff' or 'intern', Status must be 'Active' or 'Inactive'.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating staff: FullName={FullName}", dto.FullName);
            return StatusCode(500, $"Error creating staff: {ex.Message}");
        }
    }

    // PATCH: api/staff/{id} → Update staff details
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateStaff(int id, [FromBody] UpdateStaffDto dto)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null)
        {
            _logger.LogWarning("Staff with ID {Id} not found for update", id);
            return NotFound($"Staff with ID {id} not found.");
        }

        bool updated = false;

        if (!string.IsNullOrWhiteSpace(dto.FullName))
        {
            staff.FullName = dto.FullName.Trim();
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.EmailAddress))
        {
            if (!Regex.IsMatch(dto.EmailAddress, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            {
                _logger.LogWarning("Invalid EmailAddress: {EmailAddress} for Staff ID {Id}", dto.EmailAddress, id);
                return BadRequest("Valid EmailAddress is required.");
            }
            staff.EmailAddress = dto.EmailAddress.Trim();
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.PhoneNumber))
        {
            staff.PhoneNumber = dto.PhoneNumber.Trim();
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.Role))
        {
            var role = dto.Role.Trim().ToLower();
            if (!Regex.IsMatch(role, "^(staff|intern)$"))
            {
                _logger.LogWarning("Invalid Role: {Role} for Staff ID {Id}", dto.Role, id);
                return BadRequest("Role must be 'staff' or 'intern'.");
            }
            staff.Role = role;
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            var status = dto.Status.Trim();
            if (!Regex.IsMatch(status, "^(Active|Inactive)$", RegexOptions.IgnoreCase))
            {
                _logger.LogWarning("Invalid Status: {Status} for Staff ID {Id}", dto.Status, id);
                return BadRequest("Status must be 'Active' or 'Inactive'.");
            }
            staff.Status = status;
            updated = true;
        }
        if (dto.JoiningDate.HasValue)
        {
            if (dto.JoiningDate.Value > DateOnly.FromDateTime(DateTime.Today))
            {
                _logger.LogWarning("Invalid JoiningDate: {JoiningDate} is in the future for Staff ID {Id}", dto.JoiningDate, id);
                return BadRequest("JoiningDate cannot be in the future.");
            }
            staff.JoiningDate = dto.JoiningDate.Value;
            updated = true;
        }
        if (dto.ClientManagement.HasValue)
        {
            staff.ClientManagement = dto.ClientManagement.Value;
            updated = true;
        }
        if (dto.Filing.HasValue)
        {
            staff.Filing = dto.Filing.Value;
            updated = true;
        }
        if (dto.Documents.HasValue)
        {
            staff.Documents = dto.Documents.Value;
            updated = true;
        }
        if (dto.Billing.HasValue)
        {
            staff.Billing = dto.Billing.Value;
            updated = true;
        }
        if (dto.Reports.HasValue)
        {
            staff.Reports = dto.Reports.Value;
            updated = true;
        }
        if (dto.FirmSettings.HasValue)
        {
            staff.FirmSettings = dto.FirmSettings.Value;
            updated = true;
        }
        if (dto.UserManagement.HasValue)
        {
            staff.UserManagement = dto.UserManagement.Value;
            updated = true;
        }
        if (dto.ComplianceCalendar.HasValue)
        {
            staff.ComplianceCalendar = dto.ComplianceCalendar.Value;
            updated = true;
        }
        if (dto.GenerateInvoice.HasValue)
        {
            staff.GenerateInvoice = dto.GenerateInvoice.Value;
            updated = true;
        }
        if (dto.TimeTracking.HasValue)
        {
            staff.TimeTracking = dto.TimeTracking.Value;
            updated = true;
        }
        if (dto.TaskManagement.HasValue)
        {
            staff.TaskManagement = dto.TaskManagement.Value;
            updated = true;
        }
        if (!string.IsNullOrWhiteSpace(dto.Department))
        {
            staff.Department = dto.Department.Trim();
            updated = true;
        }

        if (!updated)
        {
            _logger.LogWarning("No fields provided for update for Staff ID {Id}", id);
            return BadRequest("At least one field must be provided for update.");
        }

        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Staff updated: Id={Id}, FullName={FullName}, EmailAddress={EmailAddress}, Department={Department}", staff.Id, staff.FullName, staff.EmailAddress, staff.Department);
            return Ok(staff);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            _logger.LogError(ex, "Unique constraint violation: EmailAddress={EmailAddress}, PhoneNumber={PhoneNumber}", staff.EmailAddress, staff.PhoneNumber);
            return Conflict("EmailAddress or PhoneNumber already exists.");
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            _logger.LogError(ex, "Check constraint violation: Role={Role}, Status={Status}", staff.Role, staff.Status);
            return BadRequest("Invalid Role or Status. Role must be 'staff' or 'intern', Status must be 'Active' or 'Inactive'.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating staff ID {Id}", id);
            return StatusCode(500, $"Error updating staff: {ex.Message}");
        }
    }

    // DELETE: api/staff/{id} → Delete staff member
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStaff(int id)
    {
        var staff = await _context.Staff.FindAsync(id);
        if (staff == null)
        {
            _logger.LogWarning("Staff with ID {Id} not found for deletion", id);
            return NotFound($"Staff with ID {id} not found.");
        }

        _context.Staff.Remove(staff);
        try
        {
            await _context.SaveChangesAsync();
            _logger.LogInformation("Staff deleted: Id={Id}, FullName={FullName}, EmailAddress={EmailAddress}, Department={Department}", id, staff.FullName, staff.EmailAddress, staff.Department);
            return Ok(new
            {
                message = "Staff deleted successfully.",
                id,
                fullName = staff.FullName,
                emailAddress = staff.EmailAddress,
                department = staff.Department
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting staff ID {Id}", id);
            return StatusCode(500, $"Error deleting staff: {ex.Message}");
        }
    }
}