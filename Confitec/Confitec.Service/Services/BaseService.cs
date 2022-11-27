using Confitec.Domain.Entity;
using Confitec.Domain.Repository;
using Confitec.Domain.Service;
using FluentValidation;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Service.Services
{
    public class BaseService<TEntity> : IBaseService<TEntity> where TEntity : BaseEntity
    {
        public IBaseRepository<TEntity> IBaseRepository { get; protected set; }
        public LNotifications LNotifications { get; protected set; }

        public BaseService(IBaseRepository<TEntity> baseRepository, LNotifications lNotification)
        {
            IBaseRepository = baseRepository;
            LNotifications = lNotification;
        }

        public void Delete(TEntity entity) => IBaseRepository.Delete(entity);
        public async Task Insert<TValidator>(TEntity entity) where TValidator : AbstractValidator<TEntity>
        {
            var validate = Validate(entity, Activator.CreateInstance<TValidator>());
            if (validate)
                await IBaseRepository.AddAsync(entity);
        }
        public void Update<TValidator>(TEntity entity) where TValidator : AbstractValidator<TEntity>
        {
            var validate = Validate(entity, Activator.CreateInstance<TValidator>());
            if (validate)
                IBaseRepository.Update(entity);
        }

        private bool Validate(TEntity entity, AbstractValidator<TEntity> validator)
        {
            if (entity == null)
                throw new Exception("Registros não encontrados!");
            var result = validator.Validate(entity);
            if (!result.Errors.Any())
                foreach (var error in result.Errors)
                {
                    LNotifications.Add(new Notify { Message = error.ErrorMessage });
                }

            return result.IsValid;
        }
    }
}
