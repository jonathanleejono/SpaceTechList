using SpaceTechList.Api.Models;

namespace SpaceTechList.Api.Interfaces
{
    public interface IJwtUtil
    {
        public string GenerateJwt(User user);

        public int ValidateJwt(string token);
    }
}

