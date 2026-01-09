using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Vocabulary> Vocabularies { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<Vocabulary>().HasData(
            new Vocabulary
            {
                Id = 1,
                Word = "Apple",
                Translation = "Táo",
                ImageUrl = "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400",
                Example = "I eat an apple every day.",
                Category = "Fruits",
                CreatedAt = DateTime.UtcNow
            },
            new Vocabulary
            {
                Id = 2,
                Word = "Book",
                Translation = "Sách",
                ImageUrl = "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400",
                Example = "I love reading books.",
                Category = "Education",
                CreatedAt = DateTime.UtcNow
            },
            new Vocabulary
            {
                Id = 3,
                Word = "Cat",
                Translation = "Mèo",
                ImageUrl = "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
                Example = "The cat is sleeping.",
                Category = "Animals",
                CreatedAt = DateTime.UtcNow
            },
            new Vocabulary
            {
                Id = 4,
                Word = "House",
                Translation = "Ngôi nhà",
                ImageUrl = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400",
                Example = "This is my house.",
                Category = "Buildings",
                CreatedAt = DateTime.UtcNow
            },
            new Vocabulary
            {
                Id = 5,
                Word = "Car",
                Translation = "Xe hơi",
                ImageUrl = "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400",
                Example = "I drive a car to work.",
                Category = "Transportation",
                CreatedAt = DateTime.UtcNow
            }
        );
    }
}
