using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> RegisterUser(RegisterUserDto registerUserDto);

        Task<User> LoginUser(LoginUserDto loginUserDto);

        Task<User> UpdateUser(UpdateUserDto updateUserDto, int userId);

        Task<User> GetUser(int userId);
    }
}

