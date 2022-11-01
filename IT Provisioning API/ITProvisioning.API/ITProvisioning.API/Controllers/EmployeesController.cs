using ITProvisioning.API.Data;
using ITProvisioning.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ITProvisioning.API.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeesController : Controller {
        private readonly ITProvisioningDbContext _itProvisioningDbContext;

        public EmployeesController(ITProvisioningDbContext itProvisioningDbContext) {
            _itProvisioningDbContext = itProvisioningDbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEmployees() {
            var employees = await _itProvisioningDbContext.Employees.ToListAsync();
            return Ok(employees);
        }

        [HttpPost]
        public async Task<IActionResult> AddEmployee([FromBody] Employee employeeRequest) {
            employeeRequest.Id = Guid.NewGuid();

            await _itProvisioningDbContext.Employees.AddAsync(employeeRequest);
            await _itProvisioningDbContext.SaveChangesAsync();

            return Ok(employeeRequest);
        }
    }
}
