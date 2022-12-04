using SpaceTechList.Api.Db;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;
using Microsoft.EntityFrameworkCore;
using static SpaceTechList.Api.Exceptions.CustomExceptions;

namespace SpaceTechList.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SpaceTechListDbContext db;

        public UserRepository(SpaceTechListDbContext db)
        {
            this.db = db;
        }

        private async Task<bool> EmailExists(string email)
        {
            return await db.Users.AnyAsync(user => user.Email == email);

        }

        //public Task<User> GetUser(int userId)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<User> LoginUser(LoginUserDto loginUserDto)
        //{
        //    throw new NotImplementedException();
        //}

        //public Task<User> LogoutUser(int userId)
        //{
        //    throw new NotImplementedException();
        //}

        public async Task<User> RegisterUser(RegisterUserDto registerUserDto)
        {
            if (await EmailExists(registerUserDto.Email))
            {
                throw new EmailExistsException(registerUserDto.Email);
            }

            var result = await db.Users.AddAsync(new User
            {
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                Email = registerUserDto.Email,
                Password = registerUserDto.Password
            }
         );
            await db.SaveChangesAsync();

            return result.Entity;
        }

        //public Task<User> UpdateUser(UpdateUserDto updateUserDto)
        //{
        //    throw new NotImplementedException();
        //}
    }
}

