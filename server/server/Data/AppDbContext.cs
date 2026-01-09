using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Language> Languages { get; set; }
    public DbSet<Exam> Exams { get; set; }
    public DbSet<Level> Levels { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<Lesson> Lessons { get; set; }
    public DbSet<Vocabulary> Vocabularies { get; set; }
    public DbSet<VocabularyImage> VocabularyImages { get; set; }
    public DbSet<VocabularyAudio> VocabularyAudios { get; set; }
    public DbSet<Exercise> Exercises { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
    public DbSet<Test> Tests { get; set; }
    public DbSet<TestQuestion> TestQuestions { get; set; }
    public DbSet<UserProgress> UserProgresses { get; set; }
    public DbSet<UserTestResult> UserTestResults { get; set; }
    public DbSet<UserSpeaking> UserSpeakings { get; set; }
    public DbSet<UserWriting> UserWritings { get; set; }
    public DbSet<Achievement> Achievements { get; set; }
    public DbSet<UserAchievement> UserAchievements { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure Composite Keys
        modelBuilder.Entity<UserAchievement>()
            .HasKey(ua => new { ua.UserId, ua.AchievementId });

        // Enum conversions if needed, relationships etc here
        
        // Seed basic data
        modelBuilder.Entity<Language>().HasData(
            new Language { Id = 1, Code = "EN", Name = "English" },
            new Language { Id = 2, Code = "JP", Name = "Japanese" }
        );

        modelBuilder.Entity<Exam>().HasData(
            new Exam { Id = 1, Code = "IELTS", Name = "IELTS" },
            new Exam { Id = 2, Code = "JLPT", Name = "JLPT" }
        );

        modelBuilder.Entity<Level>().HasData(
            // IELTS
            new Level { Id = 1, ExamId = 1, Code = "5.5", Description = "Band 5.5" },
            new Level { Id = 2, ExamId = 1, Code = "6.0", Description = "Band 6.0" },
            new Level { Id = 3, ExamId = 1, Code = "6.5", Description = "Band 6.5" },
            new Level { Id = 4, ExamId = 1, Code = "7.0", Description = "Band 7.0" },
            // JLPT
            new Level { Id = 5, ExamId = 2, Code = "N5", Description = "N5" },
            new Level { Id = 6, ExamId = 2, Code = "N4", Description = "N4" },
            new Level { Id = 7, ExamId = 2, Code = "N3", Description = "N3" },
            new Level { Id = 8, ExamId = 2, Code = "N2", Description = "N2" },
            new Level { Id = 9, ExamId = 2, Code = "N1", Description = "N1" }
        );
    }
}
