using Confitec.Domain.Models.Enums;

namespace Confitec.Domain.Models.User.Request
{
    public class UpdateUsuarioRequest
    {
        public int Id { get; set; }
        public string Nome { get; set; } = "";
        public string Sobrenome { get; set; } = "";
        public string Email { get; set; } = "";
        public DateTime DataNascimento { get; set; }
        public EEscolaridade Escolaridade { get; set; }
    }
}
