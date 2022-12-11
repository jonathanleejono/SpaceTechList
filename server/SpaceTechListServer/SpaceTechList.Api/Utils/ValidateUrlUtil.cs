using System;
using System.Globalization;

namespace SpaceTechList.Api.Utils
{
	public class ValidateUrlUtil
	{
        public static bool IsValidUrl(string url)
        {
            return Uri.IsWellFormedUriString(url.ToLower(CultureInfo.InvariantCulture), UriKind.RelativeOrAbsolute);
        }
    }
}

