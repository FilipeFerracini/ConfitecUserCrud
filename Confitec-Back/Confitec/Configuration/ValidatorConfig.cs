using Confitec.Domain.Models.User;
using Confitec.Service.Validators;
using FluentValidation;

namespace Confitec.Application.Configuration
{
    public static class ValidatorConfig
    {
        public static void AddValidatorConfiguration(this IServiceCollection services)
        {
            services.AddScoped<IValidator<Usuario>, UsuarioValidator>();
        }
    }
}
