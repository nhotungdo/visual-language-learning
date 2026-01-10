using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Ensure Kestrel explicitly binds to the development URL to avoid ambiguous host binding
builder.WebHost.UseUrls("http://localhost:5000");

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


// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt");
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings["Issuer"],
        ValidAudience = jwtSettings["Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["Key"] ?? "super_secret_key_1234567890123456"))
    };
});

// Configure the HTTP request pipeline
var app = builder.Build();

var logger = app.Services.GetRequiredService<ILogger<Program>>();

// Log lifecycle events for easier debugging of unexpected shutdowns
app.Lifetime.ApplicationStarted.Register(() =>
{
    logger.LogInformation("ApplicationStarted: Listening on http://localhost:5000");
});

app.Lifetime.ApplicationStopping.Register(() =>
{
    logger.LogWarning("ApplicationStopping: Shutdown requested");
});

app.Lifetime.ApplicationStopped.Register(() =>
{
    logger.LogWarning("ApplicationStopped: Host has stopped");
});

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enable static files
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseCors("AllowReactApp");
// app.UseHttpsRedirection(); // Disable HTTPS redirect for development

app.UseAuthentication();
app.UseAuthorization();

// API endpoint for root
app.MapGet("/api", () => Results.Ok(new { 
    message = "Visual Language Learning API is running", 
    version = "1.0",
    swagger = "/swagger",
    status = "OK"
})).WithName("GetApiInfo");

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
        // Use the previously resolved logger to record migration errors
        logger.LogError(ex, "An error occurred while migrating the database.");
    }
}

app.Run();
