namespace server.Models;

public class Question
{
    public int Id { get; set; }
    public int? ExerciseId { get; set; }
    public string? QuestionText { get; set; }
    public string? QuestionType { get; set; }

    // Navigation properties
    public Exercise? Exercise { get; set; }
    public ICollection<QuestionOption> QuestionOptions { get; set; } = new List<QuestionOption>();
}
