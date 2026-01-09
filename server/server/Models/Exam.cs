namespace server.Models;

public class Exam
{
    public int Id { get; set; }
    public required string Code { get; set; }
    public string? Name { get; set; }

    // Navigation properties
    public ICollection<Level> Levels { get; set; } = new List<Level>();
    public ICollection<Test> Tests { get; set; } = new List<Test>();
}
