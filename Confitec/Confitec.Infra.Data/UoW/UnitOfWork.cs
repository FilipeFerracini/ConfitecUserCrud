using Confitec.Domain.Entity;
using Confitec.Domain.Repository;
using Confitec.Infra.Data.Repository;
using Confitec.Service.Context;
using Microsoft.EntityFrameworkCore;

namespace Confitec.Infra.Data.UoW
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CommitAsync() => await _context.SaveChangesAsync() > 0;
        public DbContext GetContext() => _context;
        public IBaseConsultRepository<TEntity> GetRepository<TEntity>() where TEntity : BaseEntity => new BaseConsultRepository<TEntity>(GetContext());
    }
}
