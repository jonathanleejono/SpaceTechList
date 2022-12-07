using System;
using SpaceTechList.Api.Db;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;
using SpaceTechList.Api.Utils;
using static SpaceTechList.Api.Exceptions.CustomExceptions;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

namespace SpaceTechList.Api.Repositories
{
    public class SpaceTechRepository : ISpaceTechRepository
    {
        private readonly SpaceTechListDbContext db;

        public SpaceTechRepository(SpaceTechListDbContext db)
        {
            this.db = db;
        }

        private async Task<bool> SpaceTechExists(string idCode)
        {
            return await db.SpaceTech.AnyAsync(spaceTech => spaceTech.IdCode == idCode);

        }

        public async Task<SpaceTech> AddSpaceTechToSavedList(SpaceTechDto spaceTechDto, int userId)
        {
            if (await SpaceTechExists(spaceTechDto.IdCode))
            {
                throw new BadHttpRequestException("Duplicate error, space tech already saved");
            }

            var result = await db.SpaceTech.AddAsync(new SpaceTech
            {
                IdCode = spaceTechDto.IdCode,
                Title = spaceTechDto.Title,
                Description = spaceTechDto.Description,
                Topic = spaceTechDto.Topic,
                MediaUrl = spaceTechDto.MediaUrl,
                UserId = userId
            }
         );

            await db.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<string> DeleteSpaceTechFromSavedList(int spaceTechId, int userId)
        {
            var spaceTech = await db.SpaceTech.SingleOrDefaultAsync(
                spaceTech => spaceTech.Id == spaceTechId);

            if (spaceTech == null)
            {
                throw new NotFoundException("Space tech not found");
            }

            if (spaceTech.UserId != userId)
            {
                throw new AccessViolationException("Forbidden action");
            }

            db.SpaceTech.Remove(spaceTech);

            await db.SaveChangesAsync();

            return "Deleted space tech from saved list!";
        }

        public async Task<IEnumerable<SpaceTech>> GetAllSpaceTechFromSavedList(int userId)
        {
            return await (from spaceTech in db.SpaceTech
                          where spaceTech.UserId == userId
                          select new SpaceTech
                          {
                              Id = spaceTech.Id,
                              IdCode = spaceTech.IdCode,
                              Title = spaceTech.Title,
                              Description = spaceTech.Description,
                              Topic = spaceTech.Topic,
                              MediaUrl = spaceTech.MediaUrl,
                              CreatedDate = spaceTech.CreatedDate,
                              UpdatedDate = spaceTech.UpdatedDate

                          }).ToListAsync();
        }
    }
}

