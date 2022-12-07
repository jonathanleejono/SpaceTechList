namespace SpaceTechList.Api.Constants
{
	public class Routes
	{
		public const string authBaseRoute = "/api/user";

		public const string registerRoute = $"{authBaseRoute}/register";

        public const string loginRoute = $"{authBaseRoute}/login";

		public const string spaceTechRoute = "/api/space-tech";

		public const string spaceTechSavedListRoute = $"{spaceTechRoute}/saved-list";

		public const string spaceTechNASAApiRoute = $"{spaceTechRoute}/nasa-api";

    }
}

