using Confitec.Domain.Models.User;
using Confitec.Service.Mapping;
using Microsoft.EntityFrameworkCore;

namespace Confitec.Service.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> option) : base(option)
        {
        }
        public DbSet<Usuario> Usuario{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Usuario>(new UsuarioMap().Configure);
        }
    }
}
