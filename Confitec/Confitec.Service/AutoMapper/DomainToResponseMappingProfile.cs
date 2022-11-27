using AutoMapper;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confitec.Service.AutoMapper
{
    public class DomainToResponseMappingProfile : Profile
    {
        public DomainToResponseMappingProfile()
        {
            CreateMap<Usuario, InsertUsuarioResponse>();
        }
    }
}
