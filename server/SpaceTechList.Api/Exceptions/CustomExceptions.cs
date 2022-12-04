namespace SpaceTechList.Api.Exceptions
{
	public class CustomExceptions
	{
        public abstract class CustomBadRequestException : Exception
        {
            protected CustomBadRequestException(string message)
                : base(message)
            {
            }
        }

        public abstract class CustomNotFoundException : Exception
        {
            protected CustomNotFoundException(string message)
                : base(message)
            {
            }
        }

        public sealed class EmailExistsException : CustomBadRequestException
        {
            public EmailExistsException(string email)
        : base($"The account with the identifier {email} does not belong to the owner with the identifier")
            {
            }
        }

        public sealed class NotFoundException : CustomNotFoundException
        {
            public NotFoundException(string message)
        : base(message)
            {
            }
        }
    }
}

