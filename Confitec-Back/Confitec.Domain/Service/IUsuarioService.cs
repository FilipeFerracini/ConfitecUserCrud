using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Request;
using Confitec.Domain.Models.User.Response;

namespace Confitec.Domain.Service
{
    public interface IUsuarioService : IBaseService<Usuario>
    {
        Task<GetUsuarioResponse> GetUsuariosAsync(GetUsuarioRequest request);
        Task<InsertUsuarioResponse> InsertAsync(InsertUsuarioRequest request);
        Task<UpdateUsuarioResponse> UpdateAsync(UpdateUsuarioRequest request);
        Task<DeleteUsuarioResponse> DeleteAsync(int id);
    }
}
