namespace server.Models;

public class UserSpeaking
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public int? QuestionId { get; set; }
    public string? AudioUrl { get; set; }
    public float? AiScore { get; set; }
    public string? Feedback { get; set; }

    // Navigation properties
    public User? User { get; set; }
    public TestQuestion? Question { get; set; }
}
