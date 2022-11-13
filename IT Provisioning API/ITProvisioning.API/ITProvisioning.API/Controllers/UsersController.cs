using ITProvisioning.API.Helpers;
using ITProvisioning.API.Models;
using ITProvisioning.API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ITProvisioning.API.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase {
        
        private IUserService _userService;

        public UsersController(IUserService userService) {
            _userService = userService;
        }

        [HttpPost("authenticate")]
        public IActionResult Authenticate(AuthenticateRequest model) {
            var response = _userService.Authenticate(model);

            if (response == null) {
                return BadRequest(new { message = "Username or password is incorrect" });
            }

            return Ok(response);
        }

        [Helpers.Authorize]
        [HttpGet]
        public IActionResult GetAll() {
            var users = _userService.GetAll();
            return Ok(users);
        }
    }
}
