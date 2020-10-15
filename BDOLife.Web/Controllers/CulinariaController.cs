using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class CulinariaController : Controller
    {
        private readonly IItemService _itemService;
        private readonly IMaestriaService _maestriaService;
        public CulinariaController(IItemService itemService, IMaestriaService maestriaService)
        {
            _itemService = itemService;
            _maestriaService = maestriaService;
        }

        public async Task<IActionResult> Index()
        {
            var receitas = await _itemService.ListarPorTipoReceita(TipoReceitaEnum.Culinaria);
            ViewBag.ReceitasCulinaria = receitas.Data;

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Ingredientes(string receitaReferenciaId, int quantidade, decimal procNormal)
        {
            var result = await _itemService.Ingredientes(receitaReferenciaId, quantidade, procNormal);

            return Json(result
                .OrderBy(i => i.Key.Nome)
                .Select(i => new
                {
                    Id = i.Key.ReferenciaId,
                    Item = i.Key.Nome,
                    QuantidadeTotal = i.Value,
                    PrecoMarket = i.Key.Valor,
                    PrecoTotal = (i.Key.Valor * i.Value),
                    Img = !string.IsNullOrEmpty(i.Key.ImagemUrl) ? $"Content/Image?referenciaId={i.Key.ReferenciaId}" : "",
                    Ignorar = false
                }));
        }

        [HttpPost]
        public async Task<JsonResult> TreeView(string receitaReferenciaId, int quantidade, decimal procNormal)
        {
            var result = await _itemService.TreeView(receitaReferenciaId, quantidade, procNormal);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> TreeViewSubReceita(string receitaReferenciaId, int quantidade, decimal procNormal)
        {
            var result = await _itemService.TreeViewSubReceita(receitaReferenciaId, quantidade, procNormal);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Resultados(string receitaReferenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial)
        {
            var result = await _itemService.Resultados(TipoReceitaEnum.Culinaria, receitaReferenciaId, quantidade, procNormal, procRaro, maestria, maestriaImperial);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> AlterarIngrediente(string refereciaNovoIngrediente, int quantidade, long precoUnitario, string referenciaIngredienteAntigo)
        {
            return Json(null);
        }



    }
}
