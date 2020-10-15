using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class MaestriaController : Controller
    {
        private readonly IMaestriaService _maestriaService;
        public MaestriaController(IMaestriaService maestriaService)
        {
            _maestriaService = maestriaService;
        }

        [HttpGet]
        public async Task<JsonResult> SelectMaestriasCulinaria(string search, int page)
        {
            var response = await _maestriaService.ListarMaestriasCulinaria();
            return Json(new
            {
                results = response.Select(r => new
                {
                    id = r.Id,
                    text = r.Mastery,
                    procNormal = Math.Round(r.RegularProc, 2),
                    procRaro = Math.Round(r.RareProc, 2),
                    regularMaxProcChance = r.RegularMaxProcChance,
                    rareMaxProcChance = r.RareMaxProcChance
                })
            });
        }
    }
}
