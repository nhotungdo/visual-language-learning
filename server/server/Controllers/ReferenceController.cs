using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReferenceController : ControllerBase
{
    private readonly AppDbContext _context;

    public ReferenceController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("languages")]
    public async Task<ActionResult<IEnumerable<Language>>> GetLanguages()
    {
        return await _context.Languages.ToListAsync();
    }

    [HttpGet("exams")]
    public async Task<ActionResult<IEnumerable<Exam>>> GetExams()
    {
        return await _context.Exams.Include(e => e.Levels).ToListAsync();
    }
}
