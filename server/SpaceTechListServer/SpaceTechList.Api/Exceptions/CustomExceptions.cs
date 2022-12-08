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

        public abstract class CustomUnauthorizedException : Exception
        {
            protected CustomUnauthorizedException(string message)
                : base(message)
            {
            }
        }

        public sealed class EmailExistsException : CustomBadRequestException
        {
            public EmailExistsException()
        : base("Please use a different email")
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

        public sealed class UserNotFoundException : CustomNotFoundException
        {
            public UserNotFoundException()
        : base("User not found")
            {
            }
        }

        public sealed class UnauthorizedException : CustomUnauthorizedException
        {
            public UnauthorizedException(string message)
        : base(message)
            {
            }
        }
    }
}

