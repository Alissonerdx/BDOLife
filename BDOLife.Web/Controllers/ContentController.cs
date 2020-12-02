using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ContentController : Controller
    {
        private IWebHostEnvironment _hostingEnvironment;

        public ContentController(IWebHostEnvironment hostingEnvironment)
        {
            _hostingEnvironment = hostingEnvironment;
        }

        public IActionResult Index()
        {
            return View();
        }

        [ResponseCache(CacheProfileName = "Monthly")]
        public IActionResult Image(string referenciaId) 
        {
            if(System.IO.File.Exists($@"{_hostingEnvironment.WebRootPath}\imagens\itens\{referenciaId}.png"))
            {
                var image = System.IO.File.OpenRead($@"{_hostingEnvironment.WebRootPath}\imagens\itens\{referenciaId}.png");
                return File(image, "image/png");
            }

            return File("", "image/png");
        }

        [ResponseCache(CacheProfileName = "Monthly")]
        public IActionResult Imperial(string caixa)
        {
            if (System.IO.File.Exists($@"{_hostingEnvironment.WebRootPath}\imagens\imperial\{caixa}.png"))
            {
                var image = System.IO.File.OpenRead($@"{_hostingEnvironment.WebRootPath}\imagens\imperial\{caixa}.png");
                return File(image, "image/png");
            }

            return File("", "image/png");
        }

        [ResponseCache(CacheProfileName = "Monthly")]
        public IActionResult Cavalo(string cavalo)
        {
            if (System.IO.File.Exists($@"{_hostingEnvironment.WebRootPath}\imagens\cavalos\{cavalo}.png"))
            {
                var image = System.IO.File.OpenRead($@"{_hostingEnvironment.WebRootPath}\imagens\cavalos\{cavalo}.png");
                return File(image, "image/png");
            }

            return File("", "image/png");
        }
    }
}
