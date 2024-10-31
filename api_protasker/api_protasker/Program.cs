using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using api_protasker.Data;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Microsoft.CodeAnalysis.Options;
using Microsoft.AspNetCore.Cors.Infrastructure;
using OfficeOpenXml;
using api_protasker.Services;

ExcelPackage.LicenseContext = LicenseContext.NonCommercial;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<api_protaskerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("api_protaskerContext") ?? throw new InvalidOperationException("Connection string 'api_protaskerContext' not found.")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS services and allow everything
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()    // Allow all origins

              .AllowAnyMethod()    // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

              .AllowAnyHeader();   // Allow all headers
    });
});

builder.Services.AddTransient<ExcelService>();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseAuthorization();

app.MapControllers();

app.Run();
