using Confitec.Domain.Models.User;
using Confitec.Domain.Repository;

namespace Confitec.Infra.Data.Repository
{
    public class UsuarioRespository: BaseRepository<Usuario>, IUsuarioRepository
    {
        public UsuarioRespository(IUnitOfWork _unitOfWork) : base(_unitOfWork)
        {
        }
    }
}
