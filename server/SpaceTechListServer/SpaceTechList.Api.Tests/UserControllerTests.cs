using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using Azure;
using FluentAssertions;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SpaceTechList.Api.Constants;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Tests;

public class UserControllerTests
{
    private readonly WebApplicationFactory<Program> factory = new SpaceTechListTestApplication();

    private HttpClient httpClient;

    private readonly JsonSerializerOptions jsonSerializerOptions = new()
    { PropertyNameCaseInsensitive = true };

    [SetUp]
    public void Setup()
    {
        httpClient = factory.WithWebHostBuilder(builder =>
                builder.ConfigureServices(services =>
                {
                    services.AddDbContextPool<Db.SpaceTechListDbContext>(options =>
                        options.UseInMemoryDatabase("Testing"));

                }))
            .CreateClient();
    }

    [Test]
    public async Task Should_Ping()
    {
        var response = await httpClient.GetAsync("/ping");

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.OK));
    }

    [Test]
    public async Task Should_Register_User()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Bob",
                LastName = "Builder",
                Email = "bob@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var expectedUserOutput =
            new User
            {
                Id = 1,
                FirstName = "Bob",
                LastName = "Builder",
                Email = "bob@gmail.com",
            };

        var response = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        var responseContent = await response.Content.ReadFromJsonAsync<User>(jsonSerializerOptions);

        var headers = response.Headers;

        Assert.Multiple(() =>
        {
            Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));

            Assert.That(headers.ToString(), Does.Contain($"Set-Cookie: {Cookies.cookieName}=ey"));
        });

        responseContent.Should().BeEquivalentTo(expectedUserOutput);
    }

    [Test]
    public async Task Should_Not_Register_User_With_Invalid_Email()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Bob",
                LastName = "Builder",
                Email = "INVALID_EMAIL",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    }

    [Test]
    public async Task Should_Not_Register_User_With_Already_Registered_Email()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "jane@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var response = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(response.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var secondRegisterRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Jane",
                LastName = "Doe",
                Email = "jane@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var secondResponse = await httpClient.PostAsync(Routes.registerRoute, secondRegisterRequestBody);

        Assert.That(secondResponse.StatusCode, Is.EqualTo(HttpStatusCode.BadRequest));
    }

    [Test]
    public async Task Should_Login_User()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Jim",
                LastName = "John",
                Email = "jim@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var registerResponse = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(registerResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var loginRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new LoginUserDto
            {
                Email = "jim@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var loginResponse = await httpClient.PostAsync(Routes.loginRoute, loginRequestBody);

        var responseContent = await loginResponse.Content.ReadFromJsonAsync<User>(jsonSerializerOptions);

        var headers = loginResponse.Headers;

        var expectedUserOutput =
            new User
            {
                Id = 1,
                FirstName = "Jim",
                LastName = "John",
                Email = "jim@gmail.com",
            };

        Assert.Multiple(() =>
        {
            Assert.That(loginResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));

            Assert.That(headers.ToString(), Does.Contain($"Set-Cookie: {Cookies.cookieName}=ey"));
        });

        responseContent.Should().BeEquivalentTo(expectedUserOutput);
    }

    [Test]
    public async Task Should_Not_Login_User_With_Wrong_Password()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Jim",
                LastName = "John",
                Email = "jim@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var registerResponse = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(registerResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var loginRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new LoginUserDto
            {
                Email = "jim@gmail.com",
                Password = "WRONG_PASSWORD"

            }), Encoding.UTF8, "application/json");

        var loginResponse = await httpClient.PostAsync(Routes.loginRoute, loginRequestBody);

        var responseContent = await loginResponse.Content.ReadFromJsonAsync<User>(jsonSerializerOptions);

        Assert.That(loginResponse.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));

    }

    [Test]
    public async Task Should_Update_User()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "Jake",
                LastName = "John",
                Email = "jake@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var registerResponse = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(registerResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var updateUserRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new UpdateUserDto
            {
                FirstName = "Jake's New Name",

            }), Encoding.UTF8, "application/json");

        var updateUserResponse = await httpClient.PatchAsync(Routes.authBaseRoute, updateUserRequestBody);

        var responseContent = await updateUserResponse.Content.ReadFromJsonAsync<User>(jsonSerializerOptions);

        var expectedUserOutput =
            new User
            {
                Id = 1,
                FirstName = "Jake's New Name",
                LastName = "John",
                Email = "jake@gmail.com",
            };

        Assert.That(updateUserResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        responseContent.Should().BeEquivalentTo(expectedUserOutput);
    }

    [Test]
    public async Task Should_Get_User()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "John",
                LastName = "John",
                Email = "johnjohn@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var registerResponse = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(registerResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var getResponse = await httpClient.GetAsync(Routes.authBaseRoute);

        var responseContent = await getResponse.Content.ReadFromJsonAsync<User>(jsonSerializerOptions);

        var headers = getResponse.Headers;

        var expectedUserOutput =
            new User
            {
                Id = 1,
                FirstName = "John",
                LastName = "John",
                Email = "johnjohn@gmail.com",
            };

        Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        responseContent.Should().BeEquivalentTo(expectedUserOutput);
    }

    [Test]
    public async Task Should_Logout_User()
    {
        var registerRequestBody = new StringContent(
        JsonSerializer.Serialize(
            new RegisterUserDto
            {
                FirstName = "John",
                LastName = "John",
                Email = "johnjohn@gmail.com",
                Password = "password123"

            }), Encoding.UTF8, "application/json");

        var registerResponse = await httpClient.PostAsync(Routes.registerRoute, registerRequestBody);

        Assert.That(registerResponse.StatusCode, Is.EqualTo(HttpStatusCode.Created));

        var deleteResponse = await httpClient.DeleteAsync(Routes.authBaseRoute);

        Assert.That(deleteResponse.StatusCode, Is.EqualTo(HttpStatusCode.OK));

        var getResponse = await httpClient.GetAsync(Routes.authBaseRoute);

        Assert.That(getResponse.StatusCode, Is.EqualTo(HttpStatusCode.Unauthorized));

    }


}
