using Microsoft.AspNetCore.Mvc;

namespace ca_backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class SystemController : ControllerBase
{
    [HttpGet("ping")]
    public IActionResult Ping()
    {
        return Ok(new
        {
            status = "ok",
            message = "Backend is reachable",
            serverTimeUtc = DateTime.UtcNow
        });
    }
}
