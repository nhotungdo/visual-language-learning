namespace server.Models;

public class UserTestResult
{
    public int Id { get; set; }
    public Guid? UserId { get; set; }
    public int? TestId { get; set; }
    public float? Score { get; set; }
    public string? BandEstimate { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    public User? User { get; set; }
    public Test? Test { get; set; }
}
