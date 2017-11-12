using AutoMapper;
using RouteSaver.EF.Entities;
using RouteSaver.WebApi.DTO;

namespace RouteSaver.WebApi.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}
