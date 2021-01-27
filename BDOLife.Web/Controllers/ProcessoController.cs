using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ProcessoController : Controller
    {
        private readonly IProcessoService _processoService;
        private readonly ICalculadoraService _calculadoraService;
        public ProcessoController(IProcessoService processoService, ICalculadoraService calculadoraService)
        {
            _processoService = processoService;
            _calculadoraService = calculadoraService;
        }

        public async Task<IActionResult> Index()
        {
            var maestrias = await _processoService.Maestrias();
            ViewBag.Maestrias = maestrias;

            return View();
        }


        [HttpPost]
        public async Task<IActionResult> TreeView(string referenciaId, long quantidade, int maestriaAlquimiaId)
        {
            var tree = await _calculadoraService.TreeViewProcesso(referenciaId, quantidade, maestriaAlquimiaId);
            return Json(tree);
        }

        [HttpPost]
        public async Task<IActionResult> Resultados(string referenciaId, long quantidade, decimal procNormal, decimal procRaro)
        {
            var resultados = await _calculadoraService.ResultadosProcesso(referenciaId, quantidade, 0);
            return Json(resultados);
        }

        [HttpPost]
        public async Task<IActionResult> IngredientesDiretos(string referenciaId, long quantidade, decimal procNormalAlquimia, decimal procRaroAlquimia)
        {
            var resultados = await _calculadoraService.IngredientesDiretosProcesso(referenciaId, quantidade, procNormalAlquimia, procRaroAlquimia);
            return Json(resultados
               .OrderBy(i => i.Key.Nome)
               .Select(i => new
               {
                   Id = i.Key.ReferenciaId,
                   Item = i.Key.Nome,
                   QuantidadeTotal = i.Value,
                   Peso = i.Key.Peso,
                   PesoTotal = i.Key.Peso * i.Value,
                   PrecoMarket = i.Key.Valor,
                   PrecoTotal = i.Key.Valor * i.Value,
                   CustoProducao = i.Key.CustoProducao,
                   ProduzirOuComprar = i.Key.CustoProducao < i.Key.Valor ? "PRODUZIR" : "COMPRAR",
                   Img = !string.IsNullOrEmpty(i.Key.ImagemUrl) ? $"/Content/Image?referenciaId={i.Key.ReferenciaId}" : "",
                   QuantidadeDisponivel = i.Key.QuantidadeDisponivel,
                   DataAtualizacao = i.Key.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                   Disponivel = i.Key.QuantidadeDisponivel != 0,
                   Ignorar = false,
                   VendeNPC = i.Key.ValorNPC != null,
                   LocalNPC = i.Key.LocalizacaoNPC,
                   ValorNPC = i.Key.ValorNPC
               }));
        }
    }
}
