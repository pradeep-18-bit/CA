// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ca_backend.Data;
using ca_backend.Models;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authorization;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(AppDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // GENERAL LOGIN – Admin, Staff, Intern
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
    {
        if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            return BadRequest("Email and password are required.");

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            return Unauthorized("Invalid email or password.");

        var passwordChange = await _context.PasswordChanges
            .FirstOrDefaultAsync(pc => pc.Email == loginDto.Email);

        bool isPasswordChanged = passwordChange?.IsChanged ?? false;

        var token = GenerateJwtToken(user.Email, user.Role);

        return Ok(new
        {
            token,
            email = user.Email,
            firstName = user.FirstName.Trim(),
            role = user.Role,
            isPasswordChanged
        });
    }

    // STAFF & INTERN ONLY LOGIN
    [HttpPost("staff-login")]
    public async Task<IActionResult> StaffLogin([FromBody] LoginDto loginDto)
    {
        if (string.IsNullOrWhiteSpace(loginDto.Email) || string.IsNullOrWhiteSpace(loginDto.Password))
            return BadRequest("Email and password are required.");

        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        if (user == null || !BCrypt.Net.BCrypt.Verify(loginDto.Password, user.Password))
            return Unauthorized("Invalid email or password.");

        if (user.Role != "staff" && user.Role != "intern")
            return Forbid("Only staff and interns can use this endpoint.");

        var passwordChange = await _context.PasswordChanges
            .FirstOrDefaultAsync(pc => pc.Email == loginDto.Email)
            ?? new PasswordChange { Email = user.Email, IsChanged = false };

        if (passwordChange.Id == 0)
        {
            _context.PasswordChanges.Add(passwordChange);
            await _context.SaveChangesAsync();
        }

        var token = GenerateJwtToken(user.Email, user.Role);

        return Ok(new
        {
            token,
            email = user.Email,
            firstName = user.FirstName.Trim(),
            role = user.Role,
            isPasswordChanged = passwordChange.IsChanged
        });
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.CurrentPassword) || string.IsNullOrWhiteSpace(dto.NewPassword))
            return BadRequest("Current and new password are required.");

        var email = User.FindFirstValue(JwtRegisteredClaimNames.Sub) ??
                    User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrEmpty(email))
            return Unauthorized("Invalid token.");

        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user == null)
            return Unauthorized("User not found.");

        if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.Password))
            return Unauthorized("Current password is incorrect.");

        user.Password = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);

        var pc = await _context.PasswordChanges.FirstOrDefaultAsync(x => x.Email == email);
        if (pc != null)
            pc.IsChanged = true;
        else
            _context.PasswordChanges.Add(new PasswordChange { Email = email, IsChanged = true });

        await _context.SaveChangesAsync();

        return Ok(new
        {
            message = "Password changed successfully.",
            email = user.Email,
            firstName = user.FirstName.Trim(),
            role = user.Role
        });
    }

    // 🔥 TEMP PASSWORD HASH GENERATOR (REMOVE AFTER TESTING)
    [HttpGet("generate-hash/{password}")]
    public IActionResult GenerateHash(string password)
    {
        var hash = BCrypt.Net.BCrypt.HashPassword(password);
        return Ok(hash);
    }

    private string GenerateJwtToken(string email, string role)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, email),
            new Claim(ClaimTypes.NameIdentifier, email),
            new Claim(ClaimTypes.Role, role),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
