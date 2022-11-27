using AutoMapper;
using Azure.Core;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Dtos;
using Confitec.Domain.Models.User.Request;
using Confitec.Domain.Models.User.Response;
using Confitec.Domain.Repository;
using Confitec.Domain.Service;
using Confitec.Infra.CrossCutting;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Service.Services
{
    public class UsuarioService : BaseService<Usuario>, IUsuarioService
    {
        readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUnitOfWork _unitOfWork;
        public UsuarioService(LNotifications lNotifications, IMapper mapper, IUsuarioRepository usuarioRepository,
                                        IUnitOfWork unitOfWork) : base(usuarioRepository, lNotifications)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task<GetUsuarioResponse> GetUsuariosAsync(GetUsuarioRequest request)
        {
            var response = new GetUsuarioResponse();
            var query = await _usuarioRepository.RepositoryConsult.GetAllAsync();

            if (!string.IsNullOrEmpty(request.Nome))
                query = query.Where(x => x.Nome.Contains(request.Nome));

            if (!string.IsNullOrEmpty(request.Sobrenome))
                query = query.Where(x => x.Nome.Contains(request.Sobrenome));

            if (!string.IsNullOrEmpty(request.Email))
                query = query.Where(x => x.Nome.Contains(request.Email));

            if (request.DataNascimento.HasValue)
                query = query.Where(x => x.DataNascimento == request.DataNascimento);

            if (request.Escolaridade.HasValue)
                query = query.Where(x => x.Escolaridade == request.Escolaridade.Value);

            if (query.Any())
                foreach (var usuario in query)
                    response.Data.Add(_mapper.Map<UsuarioDto>(usuario));

            return response;
        }

        public async Task<InsertUsuarioResponse> InsertAsync(InsertUsuarioRequest request)
        {
            var usuario = _mapper.Map<Usuario>(request);
            await _usuarioRepository.AddAsync(usuario);
            if (!LNotifications.Any())
            {
                await _unitOfWork.CommitAsync();
                return _mapper.Map<InsertUsuarioResponse>(usuario);
            }
            return null;
        }

        public async Task<UpdateUsuarioResponse> UpdateAsync(UpdateUsuarioRequest request)
        {
            var usuario = _mapper.Map<Usuario>(request);
            if (!await _usuarioRepository.RepositoryConsult.ExistsAsync(u => u.Id == usuario.Id))
            {
                LNotifications.Add(new Notify { Message = " Atenção, Usuário não encontrado. Verifique." });
                return null;
            }

            _usuarioRepository.Update(usuario);
            if (!LNotifications.Any())
            {
                await _unitOfWork.CommitAsync();
                return new UpdateUsuarioResponse();
            }
            return null;
        }

        public async Task<DeleteUsuarioResponse> DeleteAsync(int id)
        {
            if (!await _usuarioRepository.RepositoryConsult.ExistsAsync(u => u.Id == id))
            {
                LNotifications.Add(new Notify { Message = " Atenção, Usuário não encontrado. Verifique." });
                return null;
            }

            var usuario = (await _usuarioRepository.RepositoryConsult.SearchAsync(u => u.Id == id)).FirstOrDefault();
            //SetDeleteEntity<Usuario>(usuario); //DELEÇÃO LÓGICA
            _usuarioRepository.Remove(usuario); //DELEÇÃO FÍSICA
            if (!LNotifications.Any())
            {
                await _unitOfWork.CommitAsync();
                return new DeleteUsuarioResponse();
            }
            return null;
        }
    }
}
