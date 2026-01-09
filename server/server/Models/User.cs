namespace server.Models;

public class User
{
    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public required string Email { get; set; }
    public string? AvatarUrl { get; set; }
    public string Provider { get; set; } = "google";
    public required string ProviderUserId { get; set; }
    public string? PasswordHash { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public ICollection<UserProgress> UserProgresses { get; set; } = new List<UserProgress>();
    public ICollection<UserTestResult> UserTestResults { get; set; } = new List<UserTestResult>();
    public ICollection<UserSpeaking> UserSpeakings { get; set; } = new List<UserSpeaking>();
    public ICollection<UserWriting> UserWritings { get; set; } = new List<UserWriting>();
    public ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
}
