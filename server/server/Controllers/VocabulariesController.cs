using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class VocabulariesController : ControllerBase
{
    private readonly AppDbContext _context;

    public VocabulariesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/Vocabularies
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Vocabulary>>> GetVocabularies()
    {
        return await _context.Vocabularies
            .Include(v => v.VocabularyImages)
            .ToListAsync();
    }

    // GET: api/Vocabularies/5
    [HttpGet("{id}")]
    public async Task<ActionResult<Vocabulary>> GetVocabulary(int id)
    {
        var vocabulary = await _context.Vocabularies.FindAsync(id);

        if (vocabulary == null)
        {
            return NotFound();
        }

        return vocabulary;
    }

    // POST: api/Vocabularies
    [HttpPost]
    public async Task<ActionResult<Vocabulary>> PostVocabulary(Vocabulary vocabulary)
    {
        _context.Vocabularies.Add(vocabulary);
        await _context.SaveChangesAsync();

        return CreatedAtAction("GetVocabulary", new { id = vocabulary.Id }, vocabulary);
    }

    // DELETE: api/Vocabularies/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteVocabulary(int id)
    {
        var vocabulary = await _context.Vocabularies.FindAsync(id);
        if (vocabulary == null)
        {
            return NotFound();
        }

        _context.Vocabularies.Remove(vocabulary);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
