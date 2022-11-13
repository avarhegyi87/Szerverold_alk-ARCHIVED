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

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetEmployee([FromRoute] Guid id) {
            var employee = await _itProvisioningDbContext.Employees.FirstOrDefaultAsync(x => x.Id == id);

            if (employee == null) {
                return NotFound();
            }

            return Ok(employee);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> UpdateEmployee([FromRoute] Guid id, Employee updateEmployeeRequest) {
            var employee = await _itProvisioningDbContext.Employees.FindAsync(id);

            if (employee == null) {
                return NotFound();
            }

            employee.FirstName = updateEmployeeRequest.FirstName;
            employee.LastName = updateEmployeeRequest.LastName;
            employee.Department = updateEmployeeRequest.Department;
            employee.Email = updateEmployeeRequest.Email;
            employee.Phone = updateEmployeeRequest.Phone;
            employee.Device = updateEmployeeRequest.Device;

            await _itProvisioningDbContext.SaveChangesAsync();

            return Ok(employee);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> DeleteEmployee([FromRoute] Guid id) {
            var employee = await _itProvisioningDbContext.Employees.FindAsync(id);

            if (employee == null) {
                return NotFound();
            }

            _itProvisioningDbContext.Employees.Remove(employee);
            await _itProvisioningDbContext.SaveChangesAsync();

            return Ok(employee);
        }
    }
}
