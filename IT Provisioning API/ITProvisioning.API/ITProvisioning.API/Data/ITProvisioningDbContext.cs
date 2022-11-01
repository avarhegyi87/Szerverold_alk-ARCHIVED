using ITProvisioning.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ITProvisioning.API.Data {
    public class ITProvisioningDbContext : DbContext {
        public ITProvisioningDbContext(DbContextOptions options) : base(options) {
        }

        public DbSet<Employee> Employees { get; set; }
    }
}
