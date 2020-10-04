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
        public CulinariaController(IItemService itemService)
        {
            _itemService = itemService;
        }

        public async Task<IActionResult> Index()
        {
            var result = await _itemService.ListarPorTipoReceita(TipoReceitaEnum.Culinaria);
            ViewBag.ReceitasCulinaria = result.Data;

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
        public async Task<IActionResult> Resultados(string receitaReferenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria)
        {
            var result = await _itemService.Resultados(receitaReferenciaId, quantidade, procNormal, procRaro, maestria);
            return Json(result);
        }

        

    }
}
