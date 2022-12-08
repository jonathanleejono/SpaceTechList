using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

namespace SpaceTechList.Api.Models;

public class User
{
    public int Id { get; set; }

    public string FirstName { get; set; }

    public string LastName { get; set; }

    [EmailAddress]
    public string Email { get; set; }

    [JsonIgnore]
    public string Password { get; set; }

    [JsonIgnore]
    public DateTimeOffset CreatedDate { get; set; }

    [JsonIgnore]
    public DateTimeOffset UpdatedDate { get; set; }

}

