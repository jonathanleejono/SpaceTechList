using FluentValidation;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Utils;

namespace SpaceTechList.Api.Validation
{
	public class SpaceTechValidator
	{
		public class SpaceTechDtoValidator : AbstractValidator<SpaceTechDto>
		{
            public SpaceTechDtoValidator()
            {
                RuleFor(spaceTech => spaceTech.MediaUrl).Must(ValidateUrlUtil.IsValidUrl).WithMessage("Media url must be valid");
            }
        }
    }
}

