using Confitec.Domain.Models.User.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confitec.Domain.Models.User.Response
{
    public class GetUsuarioResponse
    {
        public List<UsuarioDto> Data { get; set; }

        public GetUsuarioResponse()
        {
            Data = new List<UsuarioDto>();
        }
    }
}
