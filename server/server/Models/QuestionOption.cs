namespace server.Models;

public class QuestionOption
{
    public int Id { get; set; }
    public int? QuestionId { get; set; }
    public string? OptionText { get; set; }
    public string? OptionImage { get; set; }
    public bool IsCorrect { get; set; } = false;

    // Navigation properties
    public Question? Question { get; set; }
}
