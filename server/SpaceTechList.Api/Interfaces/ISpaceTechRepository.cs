using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Interfaces
{
	public interface ISpaceTechRepository
	{
        Task<IEnumerable<SpaceTechDto>> GetSpaceTech(string apiUrl);

        Task<SpaceTechDto> AddSpaceTechToSavedList(SpaceTechDto spaceTechDto);

        Task<IEnumerable<SpaceTech>> GetSpaceTechFromSavedList();

        Task<string> DeleteSpaceTechFromSavedList(int spaceTechId);
    }
}

