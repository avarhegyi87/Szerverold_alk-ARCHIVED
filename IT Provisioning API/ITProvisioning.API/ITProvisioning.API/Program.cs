using ITProvisioning.API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//ConfigurationManager Configuration = builder.Configuration;
//builder.Services.AddDbContext<ITProvisioningDbContext>(options => options.UseNpgsql(Configuration["ConnectionStrings:ITProvisionDbConnection"]));
builder.Services.AddDbContext<ITProvisioningDbContext>(options => 
options.UseNpgsql(builder.Configuration.GetConnectionString("ITProvisionDbConnection")));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
