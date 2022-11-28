using Confitec.Domain.Entity;
using Confitec.Domain.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Confitec.Infra.Data.Repository
{
    public class BaseConsultRepository<TEntity> : IBaseConsultRepository<TEntity> where TEntity : BaseEntity
    {
        readonly DbContext _context;
        protected readonly DbSet<TEntity> DbSet;

        public BaseConsultRepository(DbContext context)
        {
            _context = context;
            DbSet = _context.Set<TEntity>();
        }

        public async Task<bool> ExistsAsync(Expression<Func<TEntity, bool>> predicate) => await DbSet.AnyAsync(predicate);
        public async Task<IEnumerable<TEntity>> GetAllAsync() => await DbSet.ToListAsync();
        public async Task<TEntity> GetByIdAsync(int id) => await DbSet.FindAsync(id);
        public async Task<IEnumerable<TEntity>> SearchAsync(Expression<Func<TEntity, bool>> predicate) => await DbSet.Where(predicate).ToListAsync();
        public IQueryable<TEntity> GetQueryable() => DbSet.AsQueryable();
    }
}
