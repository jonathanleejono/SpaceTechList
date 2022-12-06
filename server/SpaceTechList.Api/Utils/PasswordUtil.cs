using System;
using System.Security.Cryptography;
using System.Text;

namespace SpaceTechList.Api.Utils
{
	public class PasswordUtil
	{
        const int keySize = 64;

        const int iterations = 350000;

        static readonly HashAlgorithmName hashAlgorithm = HashAlgorithmName.SHA512;

        static readonly byte[] salt = RandomNumberGenerator.GetBytes(keySize);

        public static string HashPassword(string password)
        {
            byte[] salt = RandomNumberGenerator.GetBytes(keySize);

            var hash = Rfc2898DeriveBytes.Pbkdf2(
                Encoding.UTF8.GetBytes(password),
                salt,
                iterations,
                hashAlgorithm,
                keySize);

            return Convert.ToHexString(hash);
        }

        public static bool VerifyPassword(string password, string hashedPassword)
        {

            var hashToCompare = Rfc2898DeriveBytes.Pbkdf2(password, salt, iterations, hashAlgorithm, keySize);

            return hashToCompare.SequenceEqual(Convert.FromHexString(hashedPassword));
        }
    }
}

