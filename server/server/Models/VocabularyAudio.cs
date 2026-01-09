namespace server.Models;

public class VocabularyAudio
{
    public int Id { get; set; }
    public int? VocabularyId { get; set; }
    public string? AudioUrl { get; set; }

    // Navigation properties
    public Vocabulary? Vocabulary { get; set; }
}
