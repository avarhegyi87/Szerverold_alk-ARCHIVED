using ITProvisioning.API.Data;
using ITProvisioning.API.Helpers;
using ITProvisioning.API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

var services = builder.Services;
services.AddCors();
services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.Configure<AppSettings>(builder.Configuration.GetSection("AppSettings"));
services.AddScoped<IUserService, UserService>();

services.AddDbContext<ITProvisioningDbContext>(options => 
options.UseNpgsql(builder.Configuration.GetConnectionString("ITProvisionDbConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(policy => policy.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

app.UseAuthorization();

app.UseMiddleware<JwtMiddleware>();

app.MapControllers();

app.Run();
