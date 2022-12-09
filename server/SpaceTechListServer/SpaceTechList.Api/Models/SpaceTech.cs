using System.ComponentModel.DataAnnotations.Schema;
using System.Reflection.Metadata;
using System.Text.Json.Serialization;

namespace SpaceTechList.Api.Models;

public class SpaceTech
{
    public int Id { get; set; }

    public string IdCode { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Topic { get; set; }

    public string MediaUrl { get; set; }

    public int UserId { get; set; }

    [JsonIgnore]
    [ForeignKey("UserId")]
    public User User { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset UpdatedDate { get; set; }

}

