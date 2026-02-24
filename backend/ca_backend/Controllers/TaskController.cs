// Controllers/TaskController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/tasks")]
public class TaskController : ControllerBase
{
    private readonly AppDbContext _context;

    public TaskController(AppDbContext context)
    {
        _context = context;
    }

    // POST: api/tasks
    [HttpPost]
    public async Task<ActionResult<AppTask>> CreateTask([FromBody] CreateTaskDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.TaskName))
            return BadRequest("Task name is required.");

        if (string.IsNullOrWhiteSpace(dto.AssignedToEmail))
            return BadRequest("Assigned email is required.");

        var task = new AppTask
        {
            TaskName = dto.TaskName.Trim(),
            AssignedTo = dto.AssignedTo?.Trim() ?? "",
            AssignedToEmail = dto.AssignedToEmail.Trim(),
            CreatedByEmail = dto.CreatedByEmail?.Trim() ?? "",
            Description = dto.Description?.Trim(),
            Client = dto.Client?.Trim(),
            DueDate = dto.DueDate,
            Priority = dto.Priority ?? "Medium",
            EstimatedHours = dto.EstimatedHours,
            Status = dto.Status ?? "To Do"
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        // FIXED: Use the correct method name (case-sensitive)
        return CreatedAtAction(nameof(GetTaskById), new { id = task.Id }, task);
    }

    // GET: api/tasks
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppTask>>> GetAllTasks()
    {
        return Ok(await _context.Tasks.OrderBy(t => t.DueDate).ToListAsync());
    }

    // GET: api/tasks/{id}
    [HttpGet("{id}")]
    public async Task<ActionResult<AppTask>> GetTaskById(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();
        return Ok(task);
    }

    // PUT: api/tasks/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTask(int id, [FromBody] UpdateTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        if (!string.IsNullOrWhiteSpace(dto.TaskName)) task.TaskName = dto.TaskName.Trim();
        if (!string.IsNullOrWhiteSpace(dto.AssignedTo)) task.AssignedTo = dto.AssignedTo.Trim();
        if (!string.IsNullOrWhiteSpace(dto.AssignedToEmail)) task.AssignedToEmail = dto.AssignedToEmail.Trim();
        if (!string.IsNullOrWhiteSpace(dto.CreatedByEmail)) task.CreatedByEmail = dto.CreatedByEmail.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Description)) task.Description = dto.Description.Trim();
        if (!string.IsNullOrWhiteSpace(dto.Client)) task.Client = dto.Client.Trim();
        if (dto.DueDate.HasValue) task.DueDate = dto.DueDate.Value;
        if (!string.IsNullOrWhiteSpace(dto.Priority)) task.Priority = dto.Priority;
        if (dto.EstimatedHours >= 0) task.EstimatedHours = dto.EstimatedHours;
        if (!string.IsNullOrWhiteSpace(dto.Status)) task.Status = dto.Status;

        task.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(task);
    }

    // DELETE: api/tasks/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTask(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task == null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Task deleted successfully.", id });
    }
}