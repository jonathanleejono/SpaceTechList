namespace SpaceTechList.Api.Models;

public class SpaceTech
{
    public int Id { get; set; }

    public string IdCode { get; set; }

    public string Title { get; set; }

    public string Description { get; set; }

    public string Topic { get; set; }


    // valid url
    public string MediaUrl { get; set; }

    public DateTimeOffset CreatedDate { get; set; }

    public DateTimeOffset UpdatedDate { get; set; }

}

