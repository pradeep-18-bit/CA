// Controllers/UserController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;
using BCrypt.Net;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    private readonly AppDbContext _context;

    public UserController(AppDbContext context)
    {
        _context = context;
    }

    // Existing: Create first admin (no auth)
    [HttpPost("create-admin")]
    public async Task<IActionResult> CreateAdmin([FromBody] CreateAdminDto createAdminDto)
    {
        if (string.IsNullOrEmpty(createAdminDto.FirstName) ||
            string.IsNullOrEmpty(createAdminDto.LastName) ||
            string.IsNullOrEmpty(createAdminDto.Email) ||
            string.IsNullOrEmpty(createAdminDto.MobileNumber) ||
            string.IsNullOrEmpty(createAdminDto.Password))
        {
            return BadRequest("All fields are required.");
        }

        if (await _context.Users.AnyAsync(u => u.Email == createAdminDto.Email))
            return Conflict("Email already exists.");

        if (await _context.Users.AnyAsync(u => u.MobileNumber == createAdminDto.MobileNumber))
            return Conflict("Mobile number already exists.");

        var user = new User
        {
            FirstName = createAdminDto.FirstName,
            LastName = createAdminDto.LastName,
            Email = createAdminDto.Email,
            MobileNumber = createAdminDto.MobileNumber,
            Password = BCrypt.Net.BCrypt.HashPassword(createAdminDto.Password),
            Role = "admin"
        };

        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var passwordChange = new PasswordChange
            {
                Email = createAdminDto.Email,
                IsChanged = false
            };
            _context.PasswordChanges.Add(passwordChange);
            await _context.SaveChangesAsync();

            return Ok("Admin user created successfully.");
        }
        catch (DbUpdateException)
        {
            return StatusCode(500, "An error occurred while creating the admin user.");
        }
    }

    // Existing: Admin creates staff/intern (kept with [Authorize])
    [Authorize]
    [HttpPost("create-user")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserDto createUserDto)
    {
        var callerRole = User.FindFirstValue(ClaimTypes.Role);
        if (callerRole != "admin")
        {
            return StatusCode(403, "Only admins can create users.");
        }

        if (string.IsNullOrEmpty(createUserDto.FirstName) ||
            string.IsNullOrEmpty(createUserDto.LastName) ||
            string.IsNullOrEmpty(createUserDto.Email) ||
            string.IsNullOrEmpty(createUserDto.MobileNumber) ||
            string.IsNullOrEmpty(createUserDto.Password) ||
            string.IsNullOrEmpty(createUserDto.Role))
        {
            return BadRequest("All fields are required.");
        }

        if (createUserDto.Role != "admin" && createUserDto.Role != "staff" && createUserDto.Role != "intern")
        {
            return BadRequest("Invalid role. Must be 'admin', 'staff', or 'intern'.");
        }

        if (await _context.Users.AnyAsync(u => u.Email == createUserDto.Email))
            return Conflict("Email already exists.");

        if (await _context.Users.AnyAsync(u => u.MobileNumber == createUserDto.MobileNumber))
            return Conflict("Mobile number already exists.");

        var user = new User
        {
            FirstName = createUserDto.FirstName,
            LastName = createUserDto.LastName,
            Email = createUserDto.Email,
            MobileNumber = createUserDto.MobileNumber,
            Password = BCrypt.Net.BCrypt.HashPassword(createUserDto.Password),
            Role = createUserDto.Role
        };

        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            var passwordChange = new PasswordChange
            {
                Email = createUserDto.Email,
                IsChanged = false
            };
            _context.PasswordChanges.Add(passwordChange);
            await _context.SaveChangesAsync();

            return Ok("User created successfully.");
        }
        catch (DbUpdateException)
        {
            return StatusCode(500, "An error occurred while creating the user.");
        }
    }

    // NEW API: Get all users – NO AUTHORIZATION REQUIRED
    [HttpGet("all")]
    public async Task<ActionResult<IEnumerable<UserListDto>>> GetAllUsers()
    {
        var users = await _context.Users
            .Select(u => new UserListDto
            {
                FirstName = u.FirstName,
                LastName = u.LastName,
                Email = u.Email,
                MobileNumber = u.MobileNumber,
                Role = u.Role
            })
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .ToListAsync();

        return Ok(users);
    }
}

