using Confitec.Domain.Entity;
using Microsoft.EntityFrameworkCore;

namespace Confitec.Domain.Repository
{
    public interface IUnitOfWork
    {
        Task<bool> CommitAsync();
        DbContext GetContext();
        IBaseConsultRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity;
    }
}
