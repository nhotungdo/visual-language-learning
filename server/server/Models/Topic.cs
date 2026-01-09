namespace server.Models;

public class Topic
{
    public int Id { get; set; }
    public int? LanguageId { get; set; }
    public int? LevelId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }

    // Navigation properties
    public Language? Language { get; set; }
    public Level? Level { get; set; }
    public ICollection<Lesson> Lessons { get; set; } = new List<Lesson>();
}
