using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class CultivoController : Controller
    {
        private readonly ICultivoService _cultivoService;

        public CultivoController(ICultivoService cultivoService)
        {
            _cultivoService = cultivoService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Calcular(int horasOnlineDia, int maximoColheitaDia, int totalSlots)
        {
            var result = await _cultivoService.Calcular(horasOnlineDia, maximoColheitaDia, totalSlots);
            return Json(result.OrderBy(c => c.Colheita).ToList());
        }
    }
}
