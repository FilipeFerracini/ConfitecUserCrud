using Confitec.Domain.Entity;
using Confitec.Domain.Repository;
using FluentValidation;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Domain.Service
{
    public interface IBaseService<TEntity> where TEntity : BaseEntity
    {
        public IBaseRepository<TEntity> IBaseRepository { get; }
        public LNotifications LNotifications { get; }
        Task Insert<TValidator>(TEntity entity) where TValidator: AbstractValidator<TEntity>;
        void Update<TValidator>(TEntity entity) where TValidator: AbstractValidator<TEntity>;
        void Remove(TEntity entity);
    }
}
