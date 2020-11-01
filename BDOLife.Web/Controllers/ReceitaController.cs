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
        public async Task<IActionResult> SubReceitas(string receitaReferenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestriaId, TipoReceitaEnum tipoReceita)
        {
            var result = await _itemService.SubReceitasDiretas(receitaReferenciaId, quantidade, procNormal, procRaro, maestriaId, tipoReceita);

            return Json(result
                .OrderBy(i => i.Item1.Nome)
                .Select(i => new
                {
                    Id = i.Item1.ReferenciaId,
                    Item = i.Item1.Nome,
                    QuantidadeTotal = i.Item2,
                    PrecoMarket = i.Item1.Valor,
                    PrecoTotal = (i.Item1.Valor * i.Item2),
                    CustoProducao = i.Item3,
                    ProduzirOuComprar = i.Item3 < i.Item1.Valor ? "PRODUZIR" : "COMPRAR",
                    Img = !string.IsNullOrEmpty(i.Item1.ImagemUrl) ? $"Content/Image?referenciaId={i.Item1.ReferenciaId}" : "",
                    QuantidadeDisponivel = i.Item1.QuantidadeDisponivel,
                    DataAtualizacao = i.Item1.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    Disponivel = i.Item1.QuantidadeDisponivel != 0,
                    Ignorar = false,
                    VendeNPC = i.Item1.ValorNPC != null,
                    LocalNPC = i.Item1.LocalizacaoNPC,
                    ValorNPC = i.Item1.ValorNPC
                }));
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
                    CustoProducao = i.Key.Valor,
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
        public async Task<JsonResult> TreeView(string receitaReferenciaId, TipoReceitaEnum tipo, int maestriaId, int quantidade, decimal procNormal, decimal procRaro)
        {
            //var result = await _itemService.TreeViewRefatorado(receitaReferenciaId, quantidade, maestriaId, tipo, procNormal, procRaro);
            var result = await _itemService.TreeView(receitaReferenciaId, quantidade, procNormal, procRaro);

            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> TreeViewSubReceita(string raiz, string receitaReferenciaId, int quantidade, int quantidadePorReceita, decimal procNormal, decimal procRaro, bool usarProcRaro)
        {
            var result = await _itemService.TreeViewSubReceita(raiz, receitaReferenciaId, quantidade, quantidadePorReceita, procNormal, procRaro, usarProcRaro);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> Resultados(TipoReceitaEnum tipoReceita, string receitaReferenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial)
        {
            var result = await _itemService.Resultados(tipoReceita, receitaReferenciaId, quantidade, procNormal, procRaro, maestria, maestriaImperial);
            return Json(result);
        }

        [HttpPost]
        public async Task<IActionResult> DadosGrafico(string receitaReferenciaId)
        {
            var resultados = await _itemService.GerarGraficoMercado(receitaReferenciaId);

            return Json(new
            {
                graficoItemNormal = resultados.Item1,
                graficoItemRaro = resultados.Item2
            });
        }
    }
}
