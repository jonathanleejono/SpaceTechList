﻿using System;
namespace SpaceTechList.Api.Dtos
{
	public class RegisterUserDto
	{
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}

