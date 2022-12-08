using SpaceTechList.Api.Db;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Interfaces;
using SpaceTechList.Api.Models;
using Microsoft.EntityFrameworkCore;
using static SpaceTechList.Api.Exceptions.CustomExceptions;
using SpaceTechList.Api.Validation;
using FluentValidation.Results;
using SpaceTechList.Api.Utils;
using SpaceTechList.Api.Controllers;
using Microsoft.AspNetCore.Identity;
using AutoMapper;

namespace SpaceTechList.Api.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly SpaceTechListDbContext db;
        private readonly IMapper mapper;

        public UserRepository(SpaceTechListDbContext db, IMapper mapper)
        {
            this.db = db;
            this.mapper = mapper;

        }

        private async Task<bool> EmailExists(string email)
        {
            return await db.Users.AnyAsync(user => user.Email == email);

        }

        public async Task<User> GetUser(int userId)
        {
            var user = await db.Users.SingleOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new UserNotFoundException();
            }

            return user;
        }

        public async Task<User> LoginUser(LoginUserDto loginUserDto)
        {
            var user = await db.Users.SingleOrDefaultAsync(u => u.Email == loginUserDto.Email);

            if (user == null)
            {
                throw new UserNotFoundException();
            }

            if (!PasswordUtil.VerifyPassword(loginUserDto.Password, user.Password))
            {
                throw new UnauthorizedException("Incorrect credentials, please try again");
            }

            return user;

        }

        public async Task<User> RegisterUser(RegisterUserDto registerUserDto)
        {
            if (await EmailExists(registerUserDto.Email))
            {
                throw new EmailExistsException();
            }

            var hashedPassword = PasswordUtil.HashPassword(registerUserDto.Password);

            var result = await db.Users.AddAsync(new User
            {
                FirstName = registerUserDto.FirstName,
                LastName = registerUserDto.LastName,
                Email = registerUserDto.Email,
                Password = hashedPassword
            }
         );

            await db.SaveChangesAsync();

            return result.Entity;
        }

        public async Task<User> UpdateUser(UpdateUserDto updateUserDto, int userId)
        {
            var user = await db.Users.FindAsync(userId);

            if (user == null)
            {
                throw new UserNotFoundException();
            }

            if (user.Email != updateUserDto.Email &&
                await EmailExists(updateUserDto.Email))
            {
                throw new EmailExistsException();
            }

            mapper.Map(updateUserDto, user);

            db.Users.Update(user);

            await db.SaveChangesAsync();

            return user;
        }
    }
}

