using FluentValidation;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Utils;

namespace SpaceTechList.Api.Validation
{
	public class UserValidator 
	{
		public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
		{
            public RegisterUserValidator()
            {
                RuleFor(user => user.FirstName).Length(1, 100).WithMessage("First name must be between 1-100 characters");
                RuleFor(user => user.LastName).Length(1, 100).WithMessage("Last name must be between 1-100 characters");
                RuleFor(user => user.Email).Must(RegexValidateEmailUtil.IsValidEmail).WithMessage("Must use valid email");
                RuleFor(user => user.Password).Length(8, 100).WithMessage("Password must be between 8-100 characters");
            }
        }

        public class UpdateUserValidator : AbstractValidator<UpdateUserDto>
        {
            public UpdateUserValidator()
            {
                RuleFor(user => user.FirstName).Length(1, 100).WithMessage("First name must be between 1-100 characters")
                    .Unless(u => string.IsNullOrEmpty(u.FirstName));
                RuleFor(user => user.LastName).Length(1, 100).WithMessage("Last name must be between 1-100 characters")
                    .Unless(u => string.IsNullOrEmpty(u.LastName));
                RuleFor(user => user.Email).Must(RegexValidateEmailUtil.IsValidEmail).WithMessage("Must use valid email")
                    .Unless(u => string.IsNullOrEmpty(u.Email));
            }
        }

    }
}

