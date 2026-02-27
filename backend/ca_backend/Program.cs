using Microsoft.AspNetCore.Builder;
using ca_backend.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


// ===============================
// 1. Database Connection
// ===============================
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection")
    ));


// ===============================
// 2. CORS Policy
// ===============================
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// ===============================
// 3. JWT Configuration (FIXED)
// ===============================
var jwtKey = builder.Configuration["Jwt:Key"]?.Trim();
var jwtIssuer = builder.Configuration["Jwt:Issuer"];
var jwtAudience = builder.Configuration["Jwt:Audience"];

// 🚨 Fail fast if config missing
if (string.IsNullOrWhiteSpace(jwtKey))
{
    throw new Exception("JWT Key is missing in configuration.");
}

if (Encoding.UTF8.GetByteCount(jwtKey) < 32)
{
    throw new Exception("JWT Key must be at least 32 bytes for HS256. Set Jwt:Key / Jwt__Key to a stronger value.");
}

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters =
            new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwtIssuer,
                ValidAudience = jwtAudience,

                IssuerSigningKey =
                    new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(jwtKey)
                    )
            };
    });


// ===============================
// 4. Build App
// ===============================
var app = builder.Build();


// ===============================
// 5. Middleware Pipeline
// ===============================
var swaggerEnabled = builder.Configuration.GetValue<bool?>("Swagger:Enabled") ?? true;
if (swaggerEnabled)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseStaticFiles();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();


// ===============================
// 6. Docker Binding
// ===============================
app.Run("http://0.0.0.0:5000");
