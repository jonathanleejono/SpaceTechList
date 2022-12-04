using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SpaceTechList.Api.Constants;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Exceptions;

namespace SpaceTechList.Api.Controllers;

[ApiController]
[Route(Routes.authBaseRoute)]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> logger;
    private readonly IUserRepository userRepository;

    public UserController(ILogger<UserController> logger, IUserRepository userRepository)
    {
        this.logger = logger;
        this.userRepository = userRepository;
    }

    [HttpGet]
    public string Hello()
    {
        logger.LogInformation("test");

        return "hello";
    }

    [HttpPost(Routes.registerRoute)]
    public async Task<ActionResult<User>> RegisterUser([FromBody] RegisterUserDto registerUserDto)
    {

        logger.LogInformation("register user");

        var newUser = await userRepository.RegisterUser(registerUserDto);

        return Created(Routes.registerRoute, newUser);

    }
}

