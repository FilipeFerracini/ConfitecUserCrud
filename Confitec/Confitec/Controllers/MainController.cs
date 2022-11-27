using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Confitec.Infra.CrossCutting.Notification;

namespace Confitec.Application.Controllers
{
    [ApiController]
    public abstract class MainController : ControllerBase
    {
        protected readonly LNotifications _notifications;

        public MainController(LNotifications notifications)
        {
            _notifications = notifications ?? new LNotifications();
        }

        [NonAction]
        public bool IsValid() => !_notifications.Any();

        [NonAction]
        protected void ClearErrors() => _notifications.Clear();

        [NonAction]
        protected async Task<IActionResult> ExecControllerAsync<T>(Func<Task<T>> func)
        {
            try
            {
                return Response(await func());
            }
            catch (Exception ex)
            {
                AddError(ex);
                return Response(null);
            }
        }

        [NonAction]
        protected async Task<IActionResult> ExecControllerAsync(Func<Task> func)
        {
            try
            {
                await func.Invoke();
                return Response(null);
            }
            catch (Exception ex)
            {
                AddError(ex);
                return Response(null);
            }
        }

        [NonAction]
        protected IActionResult ExecController(object result = null)
        {
            try
            {
                return Response(result);
            }
            catch (Exception ex)
            {
                AddError(ex);
                return Response(null);
            }
        }

        [NonAction]
        protected new IActionResult Response(object result = null)
        {
            if (IsValid())
                return Ok(new
                {
                    success = true,
                    data = result
                });

            return BadRequest(new
            {
                success = false,
                data = result,
                errors = _notifications
            });
        }

        [NonAction]
        protected void NotifyModelStateErrors()
        {
            var erros = ModelState.Values.SelectMany(v => v.Errors);
            foreach (var erro in erros)
            {
                var erroMsg = erro.Exception == null ? erro.ErrorMessage : erro.Exception.Message;
                AddError(new Notify { Message = erroMsg });

            }
        }

        [NonAction]
        protected void AddIdentityErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
                AddError(new Notify { Message = error.Description });
        }

        [NonAction]
        protected void AddError(Exception except) => _notifications.Add(new Notify { Message = except.Message });

        [NonAction]
        protected void AddError(Notify erro) => _notifications.Add(erro);


    }
}
