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
        public async Task<JsonResult> SelectMaestriasPorTipo(TipoMaestriaEnum tipo, string search, int page)
        {
            var result = await _maestriaService.ListarPorTipoReceita(tipo);
            var response = result.Data;
            return Json(new
            {
                results = response.Select(r => new
                {
                    id = r.Id,
                    text = r.Valor,
                    procNormal = r.ProcNormal,
                    procRaro = r.ProcRaro
                })
            });
        }
    }
}
