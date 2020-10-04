﻿using System;
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
            var image = System.IO.File.OpenRead($@"{_hostingEnvironment.WebRootPath}\imagens\itens\{referenciaId}.png");
            return File(image, "image/png");
        }
    }
}