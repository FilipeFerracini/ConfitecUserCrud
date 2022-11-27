using Confitec.Service.AutoMapper;

namespace Confitec.Application.Configuration
{
    public static class AutoMapperConfig
    {
        public static void AddAutoMapperConfiguration(this IServiceCollection services)
        {
            if (services == null) throw new ArgumentNullException(nameof(services));

            services.AddAutoMapper(typeof(DomainToDtoMappingProfile),
                                    typeof(RequestToDomainMappingProfile),
                                    typeof(DomainToResponseMappingProfile));
        }
    }
}
