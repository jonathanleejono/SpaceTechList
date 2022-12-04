using System.Text.Json;
using static SpaceTechList.Api.Exceptions.CustomExceptions;

namespace SpaceTechList.Api.Middleware
{
    internal sealed class CustomExceptionMiddleware : IMiddleware
    {
        private readonly ILogger<CustomExceptionMiddleware> _logger;
        public CustomExceptionMiddleware(ILogger<CustomExceptionMiddleware> logger) => _logger = logger;

        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            try
            {
                await next(context);
            }
            catch (Exception e)
            {
                _logger.LogError(e, e.Message);

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
                _ => StatusCodes.Status500InternalServerError
            };

            var response = new
            {
                error = exception.Message
            };

            await httpContext.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}

