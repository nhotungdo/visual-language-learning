namespace server.Models;

public class Language
{
    public int Id { get; set; }
    public required string Code { get; set; }
    public required string Name { get; set; }

    // Navigation properties
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
    public ICollection<Vocabulary> Vocabularies { get; set; } = new List<Vocabulary>();
}
