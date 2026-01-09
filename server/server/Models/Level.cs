namespace server.Models;

public class Level
{
    public int Id { get; set; }
    public int? ExamId { get; set; }
    public string? Code { get; set; }
    public string? Description { get; set; }

    // Navigation properties
    public Exam? Exam { get; set; }
    public ICollection<Topic> Topics { get; set; } = new List<Topic>();
    public ICollection<Vocabulary> Vocabularies { get; set; } = new List<Vocabulary>();
    public ICollection<Test> Tests { get; set; } = new List<Test>();
}
