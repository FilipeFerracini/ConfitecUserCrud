using AutoMapper;
using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Dtos;
using Confitec.Domain.Models.User.Request;
using Confitec.Domain.Models.User.Response;
using Confitec.Domain.Repository;
using Confitec.Domain.Service;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Service.Services
{
    public class UsuarioService : BaseService<Usuario>, IUsuarioService
    {
        readonly IMapper _mapper;
        private readonly IUsuarioRepository _usuarioRepository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IValidator<Usuario> _validator;
        public UsuarioService(LNotifications lNotifications, IMapper mapper, IUsuarioRepository usuarioRepository,
                                        IUnitOfWork unitOfWork, IValidator<Usuario> validator) : base(usuarioRepository, lNotifications)
        {
            _mapper = mapper;
            _usuarioRepository = usuarioRepository;
            _unitOfWork = unitOfWork;
            _validator = validator;
        }

        public async Task<GetUsuarioResponse> GetUsuariosAsync(GetUsuarioRequest request)
        {
            var response = new GetUsuarioResponse();
            var query = _usuarioRepository.RepositoryConsult.GetQueryable();

            if (!string.IsNullOrEmpty(request.Nome))
                query = query.Where(x => x.Nome.Contains(request.Nome));

            if (!string.IsNullOrEmpty(request.Sobrenome))
                query = query.Where(x => x.Sobrenome.Contains(request.Sobrenome));

            if (!string.IsNullOrEmpty(request.Email))
                query = query.Where(x => x.Email.Contains(request.Email));

            if (request.DataNascimento.HasValue)
                query = query.Where(x => x.DataNascimento.Date == request.DataNascimento.Value.Date
                    && x.DataNascimento.Month == request.DataNascimento.Value.Month
                    && x.DataNascimento.Year == request.DataNascimento.Value.Year);

            if (request.Escolaridade.HasValue)
                query = query.Where(x => x.Escolaridade == request.Escolaridade.Value);

            response.Data.AddRange((await query.ToListAsync()).Select(x => _mapper.Map<UsuarioDto>(x)));

            return response;
        }

        public async Task<InsertUsuarioResponse> InsertAsync(InsertUsuarioRequest request)
        {
            var usuario = _mapper.Map<Usuario>(request);
            var validacao = await _validator.ValidateAsync(usuario);
            if (!validacao.IsValid)
            {
                foreach (var error in validacao.Errors)
                    LNotifications.Add(new Notify { Message = error.ErrorMessage });

                return null;
            }

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

            var validacao = await _validator.ValidateAsync(usuario);
            if (!validacao.IsValid)
            {
                foreach (var error in validacao.Errors)
                    LNotifications.Add(new Notify { Message = error.ErrorMessage });

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
