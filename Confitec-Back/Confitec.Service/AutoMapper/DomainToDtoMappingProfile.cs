using AutoMapper;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confitec.Service.AutoMapper
{
    public class DomainToDtoMappingProfile : Profile
    {
        public DomainToDtoMappingProfile()
        {
            CreateMap<Usuario, UsuarioDto>()
                .ForMember(d=> d.DataNascimentoFormatada, s=> s.MapFrom(m => m.DataNascimento.ToShortDateString()));
        }
    }
}
