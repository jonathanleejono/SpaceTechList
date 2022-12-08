using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Interfaces
{
	public interface ISpaceTechRepository
	{
        Task<SpaceTech> AddSpaceTechToSavedList(SpaceTechDto spaceTechDto, int userId);

        Task<IEnumerable<SpaceTech>> GetAllSpaceTechFromSavedList(int userId);

        Task<string> DeleteSpaceTechFromSavedList(int spaceTechId, int userId);
    }
}

