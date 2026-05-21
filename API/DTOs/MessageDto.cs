using System;

namespace API.DTOs;

public class MessageDto
{
    public string Id { get; set; } = null!;
    public string Content { get; set; } = null!;
    public required string SenderId { get; set; }
    public required string SenderDisplayName { get; set; } = null!;
    public string? SenderImageUrl { get; set; }
    public string RecipientId { get; set; } = null!;
    public string RecipientDisplayName { get; set; } = null!;
    public string? RecipientImageUrl { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; }
}