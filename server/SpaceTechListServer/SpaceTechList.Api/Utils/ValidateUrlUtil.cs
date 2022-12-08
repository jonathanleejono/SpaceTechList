using System;
namespace SpaceTechList.Api.Utils
{
	public class ValidateUrlUtil
	{
        public static bool IsValidUrl(string url)
        {
            return Uri.IsWellFormedUriString(url, UriKind.Absolute);
        }
    }
}

