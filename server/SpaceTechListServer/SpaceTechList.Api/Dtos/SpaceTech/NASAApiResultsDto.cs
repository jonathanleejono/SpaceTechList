
using System;
namespace SpaceTechList.Api.Models
{
	public class NASAApiResultsDto<T>
	{
        public List<List<T>> Results { get; set; }
    }
}

