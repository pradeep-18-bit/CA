// Controllers/ClientsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;
using Npgsql;
using System.Net.Http;
using System.Text.RegularExpressions;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly HttpClient _httpClient;
    private readonly ILogger<ClientsController> _logger;

    public ClientsController(
        AppDbContext context,
        ILogger<ClientsController> logger,
        HttpClient httpClient)
    {
        _context = context;
        _logger = logger;
        _httpClient = httpClient;
    }

    // GET: api/clients → Active clients (sorted by recent activity)
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients()
    {
        try
        {
            var list = await _context.Clients
                .Where(c => c.Status == "Active")
                .OrderByDescending(c => c.LastActivity)
                .ToListAsync();

            _logger.LogInformation("Fetched {Count} active clients", list.Count);
            return Ok(list);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch active clients");
            return StatusCode(500, $"Failed to fetch active clients: {ex.Message}");
        }
    }

    // GET: api/clients/all → Full table
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<Client>>> GetAllClients()
    {
        try
        {
            var clients = await _context.Clients
                .OrderBy(c => c.Id)
                .ToListAsync();

            _logger.LogInformation("Fetched {Count} clients (all)", clients.Count);
            return Ok(clients);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch full client table");
            return StatusCode(500, $"Failed to fetch full table: {ex.Message}");
        }
    }

    // POST: api/clients → Add new client (with email)
    [HttpPost]
    public async Task<ActionResult<Client>> AddClient([FromBody] CreateClientDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.ClientName) ||
            string.IsNullOrWhiteSpace(dto.ClientType) ||
            string.IsNullOrWhiteSpace(dto.Contact) ||
            string.IsNullOrWhiteSpace(dto.Services))
        {
            return BadRequest("ClientName, ClientType, Contact, and Services are required.");
        }

        string type = dto.ClientType.Trim().ToLower();
        var allowedTypes = new[] { "company", "individual", "partnership" };
        if (!allowedTypes.Contains(type))
            return BadRequest("ClientType must be 'company', 'individual', or 'partnership'.");

        string status = (dto.Status ?? "Active").Trim();
        var validStatuses = new[] { "Active", "Inactive" };
        if (!validStatuses.Contains(status, StringComparer.OrdinalIgnoreCase))
            return BadRequest("Status must be 'Active' or 'Inactive'.");

        string? pan = dto.PanNumber?.Trim().ToUpper();
        string? gst = dto.GstNumber?.Trim().ToUpper();
        string? email = dto.Email?.Trim().ToLower();

        // Validate formats
        if (pan != null && !Regex.IsMatch(pan, @"^[A-Z]{5}[0-9]{4}[A-Z]{1}$"))
            return BadRequest("Invalid PAN format. Must be like ABCDE1234F.");

        if (gst != null && !Regex.IsMatch(gst, @"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"))
            return BadRequest("Invalid GST format. Must be 15 chars like 22ABCDE1234F1Z5.");

        if (email != null && !Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
            return BadRequest("Invalid email format.");

        // Check duplicates
        var errors = new List<string>();
        if (pan != null && await _context.Clients.AnyAsync(c => c.PanNumber == pan))
            errors.Add("PAN already exists.");
        if (gst != null && await _context.Clients.AnyAsync(c => c.GstNumber == gst))
            errors.Add("GST already exists.");
        if (email != null && await _context.Clients.AnyAsync(c => c.Email == email))
            errors.Add("Email already exists.");

        if (errors.Count > 0)
            return Conflict(string.Join(" ", errors));

        var client = new Client
        {
            ClientName = dto.ClientName.Trim(),
            ClientType = type,
            PanNumber = pan,
            GstNumber = gst,
            Contact = dto.Contact.Trim(),
            Services = dto.Services.Trim(),
            Status = status,
            LastActivity = dto.LastActivity ?? DateOnly.FromDateTime(DateTime.Today),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Email = email
        };

        try
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();

            // Notification
            try
            {
                var payload = new { text = $"New client onboarded: {client.ClientName}" };
                await _httpClient.PostAsJsonAsync(
                    "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications",
                    payload
                );
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to send notification for ClientId={ClientId}", client.Id);
            }

            return CreatedAtAction(nameof(GetClients), new { id = client.Id }, client);
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23514")
        {
            return BadRequest("Database constraint violation. Check ClientType, Status, or email format.");
        }
        catch (DbUpdateException ex) when (ex.InnerException is PostgresException pgEx && pgEx.SqlState == "23505")
        {
            return Conflict("Duplicate PAN, GST, or Email.");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating client: ClientName={ClientName}", dto.ClientName);
            return StatusCode(500, $"Error creating client: {ex.Message}");
        }
    }

    // PATCH: api/clients/{id} → Update Services, Status, LastActivity, Email
    [HttpPatch("{id}")]
    public async Task<IActionResult> UpdateClient(int id, [FromBody] UpdateClientDto dto)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client == null)
            return NotFound($"Client with ID {id} not found.");

        bool updated = false;

        if (!string.IsNullOrWhiteSpace(dto.Services))
        {
            client.Services = dto.Services.Trim();
            updated = true;
        }

        if (!string.IsNullOrWhiteSpace(dto.Status))
        {
            var validStatuses = new[] { "Active", "Inactive" };
            var status = dto.Status.Trim();
            if (!validStatuses.Contains(status, StringComparer.OrdinalIgnoreCase))
                return BadRequest("Status must be 'Active' or 'Inactive'.");

            client.Status = status;
            updated = true;
        }

        if (dto.LastActivity.HasValue)
        {
            if (dto.LastActivity.Value > DateOnly.FromDateTime(DateTime.Today))
                return BadRequest("LastActivity cannot be in the future.");

            client.LastActivity = dto.LastActivity.Value;
            updated = true;
        }

        if (!string.IsNullOrWhiteSpace(dto.Email))
        {
            var email = dto.Email.Trim().ToLower();
            if (!Regex.IsMatch(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$"))
                return BadRequest("Invalid email format.");

            if (await _context.Clients.AnyAsync(c => c.Email == email && c.Id != id))
                return Conflict("Email already exists.");

            client.Email = email;
            updated = true;
        }

        if (!updated)
            return BadRequest("At least one field must be provided for update.");

        client.UpdatedAt = DateTime.UtcNow;

        try
        {
            await _context.SaveChangesAsync();
            return Ok(new
            {
                id = client.Id,
                clientName = client.ClientName,
                services = client.Services,
                status = client.Status,
                lastActivity = client.LastActivity,
                email = client.Email,
                updatedAt = client.UpdatedAt
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating client ID {Id}", id);
            return StatusCode(500, $"Error updating client: {ex.Message}");
        }
    }

    // DELETE: api/clients/{id} – SOFT DELETE (with email copied)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteClient(int id)
    {
        var client = await _context.Clients.FindAsync(id);
        if (client == null)
        {
            _logger.LogWarning("Client with ID {Id} not found for deletion", id);
            return NotFound($"Client with ID {id} not found.");
        }

        var deleted = new DeletedClient
        {
            ClientName = client.ClientName,
            ClientType = client.ClientType,
            PanNumber = client.PanNumber,
            GstNumber = client.GstNumber,
            Contact = client.Contact,
            Services = client.Services,
            LastActivity = client.LastActivity,
            CreatedAt = client.CreatedAt,
            UpdatedAt = client.UpdatedAt,
            DeletedAt = DateTime.UtcNow,
            Email = client.Email  // ← Email copied
        };

        using var transaction = await _context.Database.BeginTransactionAsync();

        try
        {
            _context.DeletedClients.Add(deleted);
            _context.Clients.Remove(client);
            await _context.SaveChangesAsync();
            await transaction.CommitAsync();

            _logger.LogInformation("Client soft-deleted: Id={Id}, ClientName={ClientName}, Email={Email}",
                id, client.ClientName, client.Email);

            return Ok(new
            {
                message = "Client moved to deleted history successfully.",
                originalId = id,
                clientName = client.ClientName,
                email = client.Email,
                deletedAt = deleted.DeletedAt
            });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "Error soft-deleting client ID {Id}", id);

            return StatusCode(500, new
            {
                message = "Failed to delete client",
                error = ex.Message,
                clientId = id
            });
        }
    }

    // GET: api/clients/deleted → Get all soft-deleted clients
    [HttpGet("deleted")]
    public async Task<ActionResult<IEnumerable<DeletedClient>>> GetDeletedClients()
    {
        try
        {
            var deleted = await _context.DeletedClients
                .OrderByDescending(d => d.DeletedAt)
                .ToListAsync();

            _logger.LogInformation("Fetched {Count} deleted clients", deleted.Count);
            return Ok(deleted);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch deleted clients");
            return StatusCode(500, $"Failed to fetch deleted clients: {ex.Message}");
        }
    }
}