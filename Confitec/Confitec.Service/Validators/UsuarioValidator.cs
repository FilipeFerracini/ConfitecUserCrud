using Confitec.Domain.Models.User;
using FluentValidation;

namespace Confitec.Service.Validators
{
    public class UsuarioValidator : AbstractValidator<Usuario>
    {
        public UsuarioValidator()
        {
            RuleFor(c => c.Nome)
                .NotEmpty().WithMessage("O Nome não pode ser vazio")
                .NotNull().WithMessage("O Nome não pode ser vazio");

            RuleFor(c => c.Sobrenome)
                .NotEmpty().WithMessage("O Sobrenome não pode ser vazio")
                .NotNull().WithMessage("O Sobrenome não pode ser vazio");

            RuleFor(c => c.Email)
                .NotEmpty().WithMessage("O Email não pode ser vazio")
                .NotNull().WithMessage("O Email não pode ser vazio")
                .EmailAddress().WithMessage("Insira um endereço de Email válido");
        }
    }
}
