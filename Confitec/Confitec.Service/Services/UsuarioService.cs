using AutoMapper;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Dtos;
using Confitec.Domain.Models.User.Request;
using Confitec.Domain.Models.User.Response;
using Confitec.Domain.Repository;
using Confitec.Domain.Service;
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
    }
}
