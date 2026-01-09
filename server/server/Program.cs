using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add DbContext with PostgreSQL
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "http://localhost:3000")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();

// API Endpoints
app.MapGet("/api/vocabularies", async (AppDbContext db) =>
{
    return await db.Vocabularies.ToListAsync();
})
.WithName("GetVocabularies")
.WithOpenApi();

app.MapGet("/api/vocabularies/{id}", async (int id, AppDbContext db) =>
{
    var vocabulary = await db.Vocabularies.FindAsync(id);
    return vocabulary is not null ? Results.Ok(vocabulary) : Results.NotFound();
})
.WithName("GetVocabularyById")
.WithOpenApi();

app.MapGet("/api/vocabularies/category/{category}", async (string category, AppDbContext db) =>
{
    var vocabularies = await db.Vocabularies
        .Where(v => v.Category.ToLower() == category.ToLower())
        .ToListAsync();
    return vocabularies;
})
.WithName("GetVocabulariesByCategory")
.WithOpenApi();

app.MapPost("/api/vocabularies", async (Vocabulary vocabulary, AppDbContext db) =>
{
    db.Vocabularies.Add(vocabulary);
    await db.SaveChangesAsync();
    return Results.Created($"/api/vocabularies/{vocabulary.Id}", vocabulary);
})
.WithName("CreateVocabulary")
.WithOpenApi();

app.MapPut("/api/vocabularies/{id}", async (int id, Vocabulary updatedVocabulary, AppDbContext db) =>
{
    var vocabulary = await db.Vocabularies.FindAsync(id);
    if (vocabulary is null) return Results.NotFound();

    vocabulary.Word = updatedVocabulary.Word;
    vocabulary.Translation = updatedVocabulary.Translation;
    vocabulary.ImageUrl = updatedVocabulary.ImageUrl;
    vocabulary.Example = updatedVocabulary.Example;
    vocabulary.Category = updatedVocabulary.Category;

    await db.SaveChangesAsync();
    return Results.Ok(vocabulary);
})
.WithName("UpdateVocabulary")
.WithOpenApi();

app.MapDelete("/api/vocabularies/{id}", async (int id, AppDbContext db) =>
{
    var vocabulary = await db.Vocabularies.FindAsync(id);
    if (vocabulary is null) return Results.NotFound();

    db.Vocabularies.Remove(vocabulary);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteVocabulary")
.WithOpenApi();

app.MapControllers();

// Initialize database with migrations
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    try
    {
        db.Database.Migrate();
    }
    catch (Exception ex)
    {
        var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

app.Run();
