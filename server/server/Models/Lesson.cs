namespace server.Models;

public class Lesson
{
    public int Id { get; set; }
    public int? TopicId { get; set; }
    public string? Title { get; set; }
    public string? LessonType { get; set; }
    public int? OrderIndex { get; set; }

    // Navigation properties
    public Topic? Topic { get; set; }
    public ICollection<Exercise> Exercises { get; set; } = new List<Exercise>();
    public ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();
}
