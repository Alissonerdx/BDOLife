using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO.Compression;
using System.Linq;
using System.Threading.Tasks;
using AspnetRun.Core.Repositories.Base;
using BDOLife.Application.Interfaces;
using BDOLife.Application.Services;
using BDOLife.Core.Configuration;
using BDOLife.Core.Interfaces;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Logging;
using BDOLife.Infra.Repositories.Base;
using BDOLife.Infra.Repository;
using BDOLife.Web.Middlewares;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Net.Http.Headers;

namespace BDOLife.Web
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();

            ConfigureBDOLifeServices(services);

            services.AddResponseCompression();

            services.Configure<BrotliCompressionProviderOptions>(options =>
            {
                options.Level = CompressionLevel.Fastest;
            });

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = Microsoft.AspNetCore.Http.SameSiteMode.None;
            });


            services.AddMvcCore(options =>
            {
                options.CacheProfiles.Add("Monthly", new CacheProfile { Duration = 60 * 60 * 24 * 7 });
            }).AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            //app.UseMiddleware<AdminSafeListMiddleware>(Configuration["AdminSafeList"]);

            app.Use(async (context, next) =>
            {
                context.Response.Headers.Add("X-Frame-Options", "AllowAll");
                await next();
            });

            app.UseCors(builder => builder.AllowAnyOrigin());

            app.UseResponseCompression();

            var supportedCultures = new[] { new CultureInfo("pt-BR") };
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(culture: "pt-BR", uiCulture: "pt-BR"),
                SupportedCultures = supportedCultures,
                SupportedUICultures = supportedCultures
            });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseHttpsRedirection();
            //app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions
            {
                ServeUnknownFileTypes = false,
                OnPrepareResponse = ctx =>
                {
                    const int durationInSeconds = 60 * 60 * 24 * 7;
                    ctx.Context.Response.Headers[HeaderNames.CacheControl] =
                        "public,max-age=" + durationInSeconds;
                }
            });
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private void ConfigureBDOLifeServices(IServiceCollection services)
        {
            // Add Core Layer
            services.Configure<BDOLifeSettings>(Configuration);

            // Add Infrastructure Layer
            ConfigureDatabases(services);
            ConfigureIdentity(services);

            services.AddScoped(typeof(IAppLogger<>), typeof(LoggerAdapter<>));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));


            // Add Application Layer
            services.AddScoped<IItemService, ItemService>();
            services.AddScoped<IMaestriaService, MaestriaService>();
            services.AddScoped<IImperialService, ImperialService>();
            services.AddScoped<ITipoProcessoService, TipoProcessoService>();
            services.AddScoped<ITipoProcessoExperienciaService, TipoProcessoExperienciaService>();
            services.AddScoped<ICultivoService, CultivoService>();
            services.AddScoped<IUtilService, UtilService>();
            services.AddScoped<IRankingService, RankingService>();



            // Add Repository Layer
            services.AddScoped<IItemRepository, ItemRepository>();
            services.AddScoped<IMaestriaRepository, MaestriaRepository>();
            services.AddScoped<IImperialRepository, ImperialRepository>();
            services.AddScoped<ITipoProcessoRepository, TipoProcessoRepository>();
            services.AddScoped<ITipoProcessoExperienciaRepository, TipoProcessoExperienciaRepository>();
            services.AddScoped<IMaestriaCulinariaRepository, MaestriaCulinariaRepository>();
            services.AddScoped<IMaestriaAlquimiaRepository, MaestriaAlquimiaRepository>();
            services.AddScoped<ICultivoRepository, CultivoRepository>();
            services.AddScoped<INodeRepository, NodeRepository>();

        }

        public void ConfigureDatabases(IServiceCollection services)
        {
            //// use in-memory database
            //services.AddDbContext<AspnetRunContext>(c =>
            //    c.UseSql("AspnetRunConnection"));

            // use real database
            services.AddDbContext<BDOLifeContext>(c =>
                c.UseSqlServer(Configuration.GetConnectionString("BDOLifeConnection"), x => x.MigrationsAssembly("BDOLife.Web")).UseLazyLoadingProxies(false));
        }

        public void ConfigureIdentity(IServiceCollection services)
        {
            services.AddDefaultIdentity<IdentityUser>()
                .AddDefaultUI()
                .AddEntityFrameworkStores<BDOLifeContext>();

            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = false;
                options.Password.RequireLowercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequiredLength = 6;
                options.Password.RequiredUniqueChars = 1;
            });
        }
    }
}
