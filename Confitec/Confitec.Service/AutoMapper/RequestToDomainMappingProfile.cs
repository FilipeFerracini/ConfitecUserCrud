using AutoMapper;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Request;

namespace Confitec.Service.AutoMapper
{
    public class RequestToDomainMappingProfile : Profile
    {
        public RequestToDomainMappingProfile()
        {
            CreateMap<InsertUsuarioRequest, Usuario>();
            CreateMap<UpdateUsuarioRequest, Usuario>();
        }
    }
}
