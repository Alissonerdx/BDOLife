using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using BDOLife.Web.Util;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BDOLife.Web.Controllers
{
    public class ImperialController : Controller
    {
        private readonly IImperialService _imperialService;
        private readonly IMaestriaService _maestriaService;

        public ImperialController(IImperialService imperialService, IMaestriaService maestriaService)
        {
            _imperialService = imperialService;
            _maestriaService = maestriaService;
        }

        public IActionResult Culinaria()
        {
            return View();
        }

        public async Task<IActionResult> CaixasCulinaria(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var imperiaisResultados = await _imperialService.ListarImperiaisCulinaria(nivel, maestriaId, contribuicao);

            foreach(var imperial in imperiaisResultados)
            {
                imperial.SubItensInline = await this.RenderViewToStringAsync("_ReceitaInlinePartial", new Tuple<ItemViewModel, List<Tuple<ItemViewModel, long, bool>>>(imperial.Receita, imperial.ItensQuantidadesNecessarias));
                imperial.Receita = null;
                imperial.ItensQuantidadesNecessarias = null;
            }

            return Json(imperiaisResultados);
        }
    }
}
