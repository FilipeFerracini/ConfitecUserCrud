using Confitec.Application.Configuration;
using Confitec.Domain.Models.User;
using Confitec.Domain.Repository;
using Confitec.Domain.Service;
using Confitec.Infra.Data.Repository;
using Confitec.Infra.Data.UoW;
using Confitec.Service.Context;
using Confitec.Service.Services;
using Confitec.Service.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using static Confitec.Infra.CrossCutting.Notification;

var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config
IWebHostEnvironment environment = builder.Environment;

builder.Configuration.AddJsonFile("appsettings.json", true, true)
                    .SetBasePath(environment.ContentRootPath)
                    .AddJsonFile($"appsettings.{environment.EnvironmentName}.json", true, true)
                    .AddEnvironmentVariables();

builder.Services.AddCors(options =>
{
    options.AddPolicy("Development",
          builder =>
              builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowAnyOrigin()); // allow credentials

    options.AddPolicy("Production",
        builder =>
            builder
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowAnyOrigin()); // allow credentials
});

// Add services to the container.
builder.Services.AddValidatorConfiguration();
builder.Services.AddAutoMapperConfiguration();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var connectionString = configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
                     options.UseSqlServer(connectionString)
                    .EnableSensitiveDataLogging()
                     .UseLazyLoadingProxies());


/*Notifications*/
builder.Services.AddScoped<LNotifications>();

/*Usuarios*/
builder.Services.AddScoped<IUsuarioService, UsuarioService>();
builder.Services.AddScoped<IUsuarioRepository, UsuarioRespository>();

/*Repository*/
builder.Services.AddScoped<AppDbContext>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseCors("Development");
}
else if (app.Environment.IsProduction())
{
    app.UseDeveloperExceptionPage();
    app.UseCors("Production");
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
