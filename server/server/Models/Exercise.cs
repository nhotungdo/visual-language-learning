namespace server.Models;

public class Exercise
{
    public int Id { get; set; }
    public int? LessonId { get; set; }
    public string? ExerciseType { get; set; }
    public string? Title { get; set; }

    // Navigation properties
    public Lesson? Lesson { get; set; }
    public ICollection<Question> Questions { get; set; } = new List<Question>();
}
