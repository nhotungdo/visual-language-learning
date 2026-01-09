namespace server.Models;

public class Vocabulary
{
    public int Id { get; set; }
    public int? LanguageId { get; set; }
    public int? LevelId { get; set; }
    public string? Word { get; set; }
    public string? Pronunciation { get; set; }
    public string? Meaning { get; set; }
    public string? Example { get; set; }

    // Navigation properties
    public Language? Language { get; set; }
    public Level? Level { get; set; }
    public ICollection<VocabularyImage> VocabularyImages { get; set; } = new List<VocabularyImage>();
    public ICollection<VocabularyAudio> VocabularyAudios { get; set; } = new List<VocabularyAudio>();
}
