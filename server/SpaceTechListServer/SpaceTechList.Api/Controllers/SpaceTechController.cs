using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpaceTechList.Api.Constants;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Exceptions;
using SpaceTechList.Api.Validation;
using SpaceTechList.Api.Utils;
using SpaceTechList.Api.Attributes;
using SpaceTechList.Api.Repositories;

namespace SpaceTechList.Api.Controllers;

[Authorize]
[ApiController]
[Route(Routes.spaceTechSavedListRoute)]
public class SpaceTechController : ControllerBase
{
    private readonly ILogger<UserController> logger;

    private readonly ISpaceTechRepository spaceTechRepository;

    private readonly IJwtUtil jwtUtil;

    private readonly IConfiguration configuration;

    private readonly HttpClient client = new HttpClient();


    public SpaceTechController(ILogger<UserController> logger,
        ISpaceTechRepository spaceTechRepository,
        IJwtUtil jwtUtil,
        IConfiguration configuration
        )
    {
        this.logger = logger;

        this.spaceTechRepository = spaceTechRepository;

        this.jwtUtil = jwtUtil;

        this.configuration = configuration;

    }

    [Authorize]
    [HttpGet(Routes.spaceTechNASAApiRoute)]
    public async Task<ActionResult<IEnumerable<SpaceTechDto>>> GetSpaceTechFromPublicAPI(
        [FromQuery] string? patent,
        [FromQuery] string? software)
    {
        var nasaApiUrl = $"https://api.nasa.gov/techtransfer/patent/?engine" +
            $"&api_key={configuration["NASA:ApiKey"]}&patent={patent}&software={software}";

        var nasaApiResponse = await client.GetAsync(nasaApiUrl);

        nasaApiResponse.EnsureSuccessStatusCode();

        var nasaApiResponseBody = await nasaApiResponse.Content
            .ReadFromJsonAsync<NASAApiResultsDto<object>>();

        var spaceTechResult = nasaApiResponseBody.Results.Select(spaceTech =>
            new SpaceTechDto
            {
                IdCode = spaceTech[0].ToString(),
                Title = spaceTech[2].ToString(),
                Description = spaceTech[3].ToString(),
                Topic = spaceTech[5].ToString(),
                MediaUrl = spaceTech[10].ToString()
            }
            ).ToArray();

        return Ok(spaceTechResult);

    }

    [HttpPost]
    public async Task<ActionResult<SpaceTechDto>> AddSpaceTechToSavedList([FromBody] SpaceTechDto spaceTechDto)
    {
        Request.Cookies.TryGetValue(Cookies.cookieName, out var accessTokenCookie);

        var userId = jwtUtil.ValidateJwt(accessTokenCookie);

        var addedSpaceTech = await spaceTechRepository.AddSpaceTechToSavedList(spaceTechDto, userId);

        return Created(Routes.spaceTechSavedListRoute, addedSpaceTech);

    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<SpaceTech>>> GetSpaceTechFromSavedList()
    {
        Request.Cookies.TryGetValue(Cookies.cookieName, out var accessTokenCookie);

        var userId = jwtUtil.ValidateJwt(accessTokenCookie);

        var spaceTechFromSavedList = await spaceTechRepository
            .GetAllSpaceTechFromSavedList(userId);

        return Ok(spaceTechFromSavedList);
    }

    [HttpDelete("{spaceTechId:int}")]
    public async Task<ActionResult<OkObjectResult>> DeleteSpaceTechFromSavedList(int spaceTechId)
    {
        Request.Cookies.TryGetValue(Cookies.cookieName, out var accessTokenCookie);

        var userId = jwtUtil.ValidateJwt(accessTokenCookie);

        var deleteSpaceTechResponse = await spaceTechRepository
            .DeleteSpaceTechFromSavedList(spaceTechId, userId);

        return Ok(new JsonResult(new
        {
            message = deleteSpaceTechResponse
        }));
    }
}

