using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using System.Security.Claims;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly AppDbContext _context;

    public UsersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/users - Get all users (for debugging)
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _context.Users
            .Select(u => new
            {
                u.Id,
                u.Email,
                u.FullName,
                u.AvatarUrl,
                u.Provider,
                u.ProviderUserId,
                u.CreatedAt,
                u.UpdatedAt,
                u.TargetLanguageId,
                u.TargetLevelId
            })
            .ToListAsync();

        return Ok(new
        {
            count = users.Count,
            users = users
        });
    }

    // GET: api/users/me - Get current user profile
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
        if (!Guid.TryParse(userIdString, out var userId))
            return Unauthorized();

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return NotFound();

        return Ok(new
        {
            id = user.Id,
            email = user.Email,
            fullName = user.FullName,
            avatarUrl = user.AvatarUrl,
            provider = user.Provider,
            targetLanguageId = user.TargetLanguageId,
            targetLevelId = user.TargetLevelId,
            createdAt = user.CreatedAt
        });
    }

    // PUT: api/users/me - Update current user profile
    [Authorize]
    [HttpPut("me")]
    public async Task<IActionResult> UpdateCurrentUser([FromBody] UpdateUserRequest request)
    {
        var userIdString = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? User.FindFirst("sub")?.Value;
        if (!Guid.TryParse(userIdString, out var userId))
            return Unauthorized();

        var user = await _context.Users.FindAsync(userId);
        if (user == null)
            return NotFound();

        // Update fields
        if (!string.IsNullOrEmpty(request.FullName))
            user.FullName = request.FullName;

        if (request.TargetLanguageId.HasValue)
            user.TargetLanguageId = request.TargetLanguageId;

        if (request.TargetLevelId.HasValue)
            user.TargetLevelId = request.TargetLevelId;

        user.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(new
        {
            id = user.Id,
            email = user.Email,
            fullName = user.FullName,
            avatarUrl = user.AvatarUrl,
            targetLanguageId = user.TargetLanguageId,
            targetLevelId = user.TargetLevelId
        });
    }
}

public class UpdateUserRequest
{
    public string? FullName { get; set; }
    public int? TargetLanguageId { get; set; }
    public int? TargetLevelId { get; set; }
}
