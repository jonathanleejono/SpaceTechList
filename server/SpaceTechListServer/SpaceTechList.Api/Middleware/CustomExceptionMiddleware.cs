using System.Text.Json;
using static SpaceTechList.Api.Exceptions.CustomExceptions;

namespace SpaceTechList.Api.Middleware
{
    internal sealed class CustomExceptionMiddleware : IMiddleware
    {
        private readonly ILogger<CustomExceptionMiddleware> logger;

        public CustomExceptionMiddleware(ILogger<CustomExceptionMiddleware> logger) {
            this.logger = logger;
        }

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                logger.LogError("Error: " + e.Message);

                await HandleExceptionAsync(context, e);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext httpContext, Exception exception)
        {
            httpContext.Response.ContentType = "application/json";

            httpContext.Response.StatusCode = exception switch
            {
                CustomBadRequestException => StatusCodes.Status400BadRequest,
                CustomNotFoundException => StatusCodes.Status404NotFound,
                BadHttpRequestException => StatusCodes.Status400BadRequest,
                CustomUnauthorizedException => StatusCodes.Status401Unauthorized,
                _ => StatusCodes.Status500InternalServerError
            };

            var response = new
            {
                message = exception.Message
            };

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

