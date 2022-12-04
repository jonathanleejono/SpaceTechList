using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using SpaceTechList.Api.Db;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Repositories;
using SpaceTechList.Api.Middleware;
using Microsoft.AspNetCore.HttpLogging;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var dbConnectionString = String.Format("{0};Password={1}",
    builder.Configuration.GetConnectionString("SpaceTechListConnection"),
    builder.Configuration["DbPassword:MSSQL"]);

builder.Services.AddDbContextPool<SpaceTechListDbContext>(options =>
    options.UseSqlServer(dbConnectionString)
);

builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddTransient<CustomExceptionMiddleware>();

var app = builder.Build();

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
            await ctx.HttpContext.Response.WriteAsJsonAsync(new {message = "Route not found"});
        }

    }
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

