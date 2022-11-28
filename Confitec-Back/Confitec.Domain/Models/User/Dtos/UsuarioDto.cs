using Confitec.Domain.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Confitec.Domain.Models.User.Dtos
{
    public class UsuarioDto
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Sobrenome { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime DataNascimento { get; set; }
        public string DataNascimentoFormatada { get; set; } = "";
        public EEscolaridade Escolaridade { get; set; }
    }
}
