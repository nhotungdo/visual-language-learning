namespace server.Models;

public class VocabularyImage
{
    public int Id { get; set; }
    public int? VocabularyId { get; set; }
    public required string ImageUrl { get; set; }

    // Navigation properties
    public Vocabulary? Vocabulary { get; set; }
}
