using Confitec.Domain.Entity;
using System.Linq.Expressions;

namespace Confitec.Domain.Repository
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        void Add(TEntity entity);
        Task AddAsync(TEntity entity);
        void Update(TEntity entity);
        void Delete(TEntity entity);
        IUnitOfWork UnitOfWork { get; }
        IBaseConsultRepository<TEntity> RepositoryConsult { get; }
    }
}
