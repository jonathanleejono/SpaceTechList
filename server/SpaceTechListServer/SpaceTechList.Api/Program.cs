using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using SpaceTechList.Api.Db;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Repositories;
using SpaceTechList.Api.Middleware;
using SpaceTechList.Api.Validation;
using Microsoft.AspNetCore.HttpLogging;
using FluentValidation.AspNetCore;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.Net.Http.Headers;
using Microsoft.Extensions.Configuration;
using SpaceTechList.Api;
using Microsoft.Extensions.DependencyInjection;
using SpaceTechList.Api.Utils;

var builder = WebApplication.CreateBuilder(args);

var services = builder.Services;

var configuration = builder.Configuration;

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

services.AddCors(options =>
 {
     options.AddPolicy(name: MyAllowSpecificOrigins,
                       policy =>
                       {
                           policy.WithOrigins("http://localhost:3000")
                                 .AllowAnyHeader()
                                 .AllowAnyMethod()
                                 .AllowCredentials();
                       });
 });

services.AddTransient<CustomExceptionMiddleware>();

services.Configure<ApiBehaviorOptions>(options =>
{
    options.SuppressModelStateInvalidFilter = true;
});

services.AddFluentValidationAutoValidation();

services.AddFluentValidationClientsideAdapters();

services.AddValidatorsFromAssemblyContaining<UserValidator.RegisterUserValidator>();

services.AddValidatorsFromAssemblyContaining<UserValidator.UpdateUserValidator>();

services.AddValidatorsFromAssemblyContaining<SpaceTechValidator.SpaceTechDtoValidator>();

services.AddMvc(options => { options.Filters.Add(typeof(ValidateModelStateMiddleware)); });

services.AddAutoMapper(typeof(Program));

services.AddScoped<IJwtUtil, JwtUtil>();

services.AddScoped<IUserRepository, UserRepository>();

services.AddScoped<ISpaceTechRepository, SpaceTechRepository>();

services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();

services.AddSwaggerGen();

var dbConnectionString = String.Format("{0};Password={1}",
    configuration.GetConnectionString("SpaceTechListConnection"),
    configuration["DbPassword:MSSQL"]);

services.AddDbContextPool<SpaceTechListDbContext>(options =>
    options.UseSqlServer(dbConnectionString)
);

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);

app.UseHttpLogging();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseMiddleware<CustomExceptionMiddleware>();

app.UseStatusCodePages(new StatusCodePagesOptions()
{
    HandleAsync = async (ctx) =>
    {
        if (ctx.HttpContext.Response.StatusCode == 404)
        {
            await ctx.HttpContext.Response.WriteAsJsonAsync(new { message = "Route not found" });
        }

    }
});


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapGet("/ping", () => new { ping = "pong!" });

app.MapControllers();

app.Run();

