using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class GrindController : Controller
    {
        private readonly ISpotService _spotService;
        public GrindController(ISpotService spotService)
        {
            _spotService = spotService;
        }

        public async Task<IActionResult> Index()
        {

            ViewBag.Spots = await _spotService.Listar();

            return View();
        }
    }
}
