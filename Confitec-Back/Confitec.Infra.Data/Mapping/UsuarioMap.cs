using Confitec.Domain.Models.User;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Confitec.Service.Mapping
{
    public class UsuarioMap : BaseMapping<Usuario>
    {
        public override void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder.ToTable("Usuarios");

            builder.HasKey(prop => prop.Id);

            builder.Property(prop => prop.Nome)
                    .IsRequired()
                    .HasColumnName("Nome")
                    .HasColumnType("varchar(50)");

            builder.Property(prop => prop.Sobrenome)
                    .IsRequired()
                    .HasColumnName("Sobrenome")
                    .HasColumnType("varchar(100)");

            builder.Property(prop => prop.Email)
                    .IsRequired()
                    .HasColumnName("Email")
                    .HasColumnType("varchar(100)");

            builder.Property(prop => prop.DataNascimento)
                    .IsRequired()
                    .HasColumnName("DataNascimento");

            builder.Property(prop => prop.Escolaridade)
                    .IsRequired()
                    .HasColumnName("Escolaridade")
                    .HasConversion<int>();
        }
    }
}
