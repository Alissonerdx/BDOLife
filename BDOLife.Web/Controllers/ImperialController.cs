using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Core.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ImperialController : Controller
    {
        private readonly IImperialService _imperialService;
        private readonly IItemService _itemService;
        private readonly IMaestriaService _maestriaService;

        public ImperialController(IImperialService imperialService, IMaestriaService maestriaService)
        {
            _imperialService = imperialService;
            _maestriaService = maestriaService;
        }


        private long CalcularPrecoImperial(long valor, int imperialBonus, decimal maestriaBonus)
        {
            valor = valor * (imperialBonus / 100);
            return valor + (long)(valor * (maestriaBonus / 100));
        }

        [HttpPost]
        public async Task<IActionResult> Caixas(string receitaReferenciaId, int maestriaId)
        {
            var result = await _imperialService.ListarImperiaisPorReceitaReferenciaId(receitaReferenciaId);
            var maestria = await _maestriaService.ObterPorId(maestriaId);

            return Json(result?.Select(c => new {
                Img = "",
                Caixa = c.Imperial.Nome,
                Quantidade = c.Quantidade,
                Preco = CalcularPrecoImperial(c.Imperial.Valor, c.Imperial.PorcentagemBonus, maestria != null ? maestria.ImperialBonus.Value : 0),
                ItemReferenciaId = c.ItemReferenciaId,
                QuantidadeDeCaixas = "",
                Lucro = "",
                Total = ""
            }));
        }

        public IActionResult Index()
        {
            return View();
        }
    }
}
