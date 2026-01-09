namespace server.Models;

public class TestQuestion
{
    public int Id { get; set; }
    public int? TestId { get; set; }
    public string? QuestionText { get; set; }
    public string? Skill { get; set; }

    // Navigation properties
    public Test? Test { get; set; }
    public ICollection<UserSpeaking> UserSpeakings { get; set; } = new List<UserSpeaking>();
    public ICollection<UserWriting> UserWritings { get; set; } = new List<UserWriting>();
}
