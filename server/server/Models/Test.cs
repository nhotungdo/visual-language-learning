namespace server.Models;

public class Test
{
    public int Id { get; set; }
    public int? ExamId { get; set; }
    public int? LevelId { get; set; }
    public string? Title { get; set; }
    public int? DurationMinutes { get; set; }

    // Navigation properties
    public Exam? Exam { get; set; }
    public Level? Level { get; set; }
    public ICollection<TestQuestion> TestQuestions { get; set; } = new List<TestQuestion>();
    public ICollection<UserTestResult> UserTestResults { get; set; } = new List<UserTestResult>();
}
