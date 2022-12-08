using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();

            if (allowAnonymous)
            {
                return;
            }

            context.HttpContext.Request.Cookies.TryGetValue("STL-Access-Token", out var accessTokenCookie);

            if (accessTokenCookie == null)
            {
                context.Result = new JsonResult(new
                { message = "Error, please login again" })
                { StatusCode = StatusCodes.Status401Unauthorized };
            }

        }
    }
}

