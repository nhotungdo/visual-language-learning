namespace server.Models;

public class UserAchievement
{
    public Guid UserId { get; set; }
    public int AchievementId { get; set; }
    public DateTime AchievedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User? User { get; set; }
    public Achievement? Achievement { get; set; }
}
