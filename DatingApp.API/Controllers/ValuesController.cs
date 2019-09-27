using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [Authorize(Roles = "Member, Admin")]
        [HttpGet]
        public IActionResult GetValues() {
            return Ok(new [] {"valor1", "valor2", "valor3"});
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{id}")]
        public IActionResult GetValue(int id) {
            return Ok(new { value = id });
        }
    }
}