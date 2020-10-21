using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ReceitaController : Controller
    {
        private readonly IItemService _itemService;
        public ReceitaController(IItemService itemService)
        {
            _itemService = itemService;
        }

        public IActionResult Index()
        {
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
                    QuantidadeDisponivel = i.Key.QuantidadeDisponivel,
                    DataAtualizacao = i.Key.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    Disponivel = i.Key.QuantidadeDisponivel != 0,
                    Ignorar = false,
                    VendeNPC = i.Key.ValorNPC != null,
                    LocalNPC = i.Key.LocalizacaoNPC,
                    ValorNPC = i.Key.ValorNPC
                }));
        }

        [HttpPost]
        public async Task<JsonResult> TreeView(string receitaReferenciaId, int quantidade, decimal procNormal)
        {
            var result = await _itemService.TreeView(receitaReferenciaId, quantidade, procNormal);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> TreeViewSubReceita(string raiz, string receitaReferenciaId, int quantidade, int quantidadePorReceita, decimal procNormal)
        {
            var result = await _itemService.TreeViewSubReceita(raiz, receitaReferenciaId, quantidade, quantidadePorReceita, procNormal);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Resultados(TipoReceitaEnum tipoReceita, string receitaReferenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial)
        {
            var result = await _itemService.Resultados(tipoReceita, receitaReferenciaId, quantidade, procNormal, procRaro, maestria, maestriaImperial);
            return Json(result);
        }

        [HttpGet]
        public async Task<IActionResult> AlterarIngrediente(string refereciaNovoIngrediente, int quantidade, long precoUnitario, string referenciaIngredienteAntigo)
        {
            return Json(null);
        }
    }
}
