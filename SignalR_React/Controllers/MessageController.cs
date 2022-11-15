using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR_React.Hubs;
using SignalR_React.Models;
using System.Diagnostics.CodeAnalysis;
using System.Threading;
using System.Threading.Tasks;

namespace SignalR_React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        protected readonly IHubContext<MessageHub> _hubContext;
        public MessageController([NotNull]IHubContext<MessageHub> messageHub)
        {
            this._hubContext = messageHub;
        }

        [HttpPost]
        public async Task<IActionResult> Create(MessagePost message)
        {
            for (int i = 0; i < 100; i++)
            {
                await _hubContext.Clients.All.SendAsync("sendToReact", "The Message Is : " + message.Message + $" {i.ToString()}");
                Thread.Sleep(1000);
            }
            return Ok();
        }
    }
}
