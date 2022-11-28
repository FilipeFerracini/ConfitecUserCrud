using Confitec.Domain.Entity;
using Confitec.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Confitec.Infra.Data.Repository
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        public IUnitOfWork UnitOfWork { get; }
        public IBaseConsultRepository<TEntity> RepositoryConsult { get; protected set; }

        protected readonly DbSet<TEntity> DbSet;

        public BaseRepository(IUnitOfWork _unitOfWork)
        {
            UnitOfWork = _unitOfWork;
            DbSet = _unitOfWork.GetContext().Set<TEntity>();
            RepositoryConsult = UnitOfWork.GetRepository<TEntity>();
        }

        public void Add(TEntity entity) => DbSet.Add(entity);
        public async Task AddAsync(TEntity entity) => await UnitOfWork.GetContext().Set<TEntity>().AddAsync(entity);
        public void Remove(TEntity entity) => DbSet.Remove(entity);
        public void Update(TEntity entity) => UnitOfWork.GetContext().Set<TEntity>().Update(entity);
    }
}
