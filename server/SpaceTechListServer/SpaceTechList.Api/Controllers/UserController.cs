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

namespace SpaceTechList.Api.Controllers;

[Authorize]
[ApiController]
[Route(Routes.authBaseRoute)]
public class UserController : ControllerBase
{
    private readonly ILogger<UserController> logger;

    private readonly IUserRepository userRepository;

    private readonly IJwtUtil jwtUtil;

    private readonly IWebHostEnvironment env;

    public UserController(ILogger<UserController> logger,
        IUserRepository userRepository,
        IJwtUtil jwtUtil,
        IWebHostEnvironment env)
    {
        this.logger = logger;

        this.userRepository = userRepository;

        this.jwtUtil = jwtUtil;

        this.env = env;

    }

    [AllowAnonymous]
    [HttpPost(Routes.registerRoute)]
    public async Task<ActionResult<User>> RegisterUser([FromBody] RegisterUserDto registerUserDto)
    {
        var newUser = await userRepository.RegisterUser(registerUserDto);

        var accessToken = jwtUtil.GenerateJwt(newUser);

        Response.Cookies.Append(Cookies.cookieName, accessToken,
            new CookieOptions()
            {
                HttpOnly = env.IsProduction() ? true : false,
                SameSite = env.IsProduction() ? SameSiteMode.None : SameSiteMode.Lax,
                Secure = env.IsProduction() ? true : false,
                MaxAge = TimeSpan.FromHours(1)
            });

        return Created(Routes.registerRoute, newUser);

    }

    [AllowAnonymous]
    [HttpPost(Routes.loginRoute)]
    public async Task<ActionResult<User>> LoginUser([FromBody] LoginUserDto loginUserDto)
    {
        var loggingInUser = await userRepository.LoginUser(loginUserDto);

        var accessToken = jwtUtil.GenerateJwt(loggingInUser);

        Response.Cookies.Append(Cookies.cookieName, accessToken,
            new CookieOptions()
            {
                HttpOnly = env.IsProduction() ? true : false,
                SameSite = env.IsProduction() ? SameSiteMode.None : SameSiteMode.Lax,
                Secure = env.IsProduction() ? true : false,
                MaxAge = TimeSpan.FromHours(1)
            });

        return Ok(loggingInUser);

    }

    [HttpGet]
    public async Task<ActionResult<User>> GetUser()
    {
        Request.Cookies.TryGetValue(Cookies.cookieName, out var accessTokenCookie);

        var userId = jwtUtil.ValidateJwt(accessTokenCookie);

        var user = await userRepository.GetUser(userId);

        return Ok(user);
    }

    [HttpPatch]
    public async Task<ActionResult<User>> UpdateUser([FromBody] UpdateUserDto updateUserDto)
    {
        Request.Cookies.TryGetValue(Cookies.cookieName, out var accessTokenCookie);

        var userId = jwtUtil.ValidateJwt(accessTokenCookie);

        var user = await userRepository.UpdateUser(updateUserDto, userId);

        return Ok(user);

    }

    [HttpDelete]
    public OkObjectResult LogoutUser()
    {
        Response.Cookies.Delete(Cookies.cookieName);

        return Ok(new JsonResult(new
        {
            message = "Logout success"
        }));
    }

}

