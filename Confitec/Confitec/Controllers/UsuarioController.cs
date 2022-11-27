using Confitec.Domain.Models.User;
using Confitec.Domain.Models.User.Request;
using Confitec.Domain.Service;
using Microsoft.AspNetCore.Mvc;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Application.Controllers
{
    [Route("/usuario")]
    public class UsuarioController : MainController
    {
        private readonly IUsuarioService _usuarioService;

        public UsuarioController(IUsuarioService usuarioService, LNotifications notifications) : base(notifications)
        {
            _usuarioService = usuarioService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsuarios([FromQuery] GetUsuarioRequest request)
            => await ExecControllerAsync(() => _usuarioService.GetUsuariosAsync(request));

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] InsertUsuarioRequest request)
            => await ExecControllerAsync(() => _usuarioService.InsertAsync(request));

    }
}
