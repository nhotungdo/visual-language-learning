namespace server.Models;

public class UserProgress
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public int? LessonId { get; set; }
    public int ProgressPercent { get; set; } = 0;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User? User { get; set; }
    public Lesson? Lesson { get; set; }
}
