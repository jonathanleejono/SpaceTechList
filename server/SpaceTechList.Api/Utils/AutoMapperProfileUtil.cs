using System;
using SpaceTechList.Api.Dtos;
using SpaceTechList.Api.Models;
using AutoMapper;

namespace SpaceTechList.Api.Utils
{
	public class AutoMapperProfileUtil : Profile
    {
        public AutoMapperProfileUtil()
        {

            CreateMap<UpdateUserDto, User>()
                .ForAllMembers(x => x.Condition(
                    (src, dest, prop) =>
                    {
                        // ignore null & empty string properties
                        if (prop == null) return false;

                        if (prop.GetType() == typeof(string) && string.IsNullOrEmpty((string)prop)) return false;

                        return true;
                    }
                ));
        }
    }
}

