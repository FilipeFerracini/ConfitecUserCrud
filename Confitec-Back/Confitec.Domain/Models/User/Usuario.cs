using Confitec.Domain.Entity;
using Confitec.Domain.Models.Enums;

namespace Confitec.Domain.Models.User
{
    public class Usuario : EntityDataBase
    {
        public Usuario(string nome, string sobrenome, string email, DateTime dataNascimento, EEscolaridade escolaridade)
        {
            Nome = nome;
            Sobrenome = sobrenome;
            Email = email;
            DataNascimento = dataNascimento;
            Escolaridade = escolaridade;
        }

        protected Usuario() { }

        public string Nome { get; private set; } = "";
        public string Sobrenome { get; private set; } = "";
        public string Email { get; private set; } = "";
        public DateTime DataNascimento { get; private set; }
        public EEscolaridade Escolaridade { get; private set; }
    }
}
