using System.ComponentModel.DataAnnotations;

namespace server.Models;

public class GoogleLoginRequest
{
    [Required]
    public string IdToken { get; set; } = string.Empty;
}

public class AuthResponse
{
    public string Token { get; set; } = string.Empty;
    public UserDto User { get; set; } = new UserDto();
    public string RefreshToken { get; set; } = string.Empty;
}

public class RefreshTokenRequest
{
    public string AccessToken { get; set; } = string.Empty;
    public string RefreshToken { get; set; } = string.Empty;
}

public class UserDto
{
    public Guid Id { get; set; }
    public string? FullName { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? AvatarUrl { get; set; }
    public int? TargetLanguageId { get; set; }
    public int? TargetLevelId { get; set; }
}

public class UpdateProfileRequest
{
    public string? FullName { get; set; }
    public int? TargetLanguageId { get; set; }
    public int? TargetLevelId { get; set; }
}
