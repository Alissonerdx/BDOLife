using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class AdminController : Controller
    {
        private readonly IItemService _itemService;
        public AdminController(IItemService itemService)
        {
            _itemService = itemService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> GerenciarItens()
        {
            //ViewBag.Receitas = await _itemService.ListarReceitasPorTipos(new List<TipoReceitaEnum> { TipoReceitaEnum.Alquimia, TipoReceitaEnum.Culinaria });

            return View();
        }

        [HttpGet]
        public async Task<IActionResult> Itens()
        {
            var itens = await _itemService.ListarDataTable();
            return Json(itens);
        }


        [HttpGet]
        public async Task<IActionResult> Ingredientes(string referenciaId)
        {
            var itens = await _itemService.ListarIngredientes(referenciaId);
            return Json(itens.Select(i => new { 
                img = !string.IsNullOrEmpty(i.Item.ImagemUrl) ? $"/Content/Image?referenciaId={i.ItemReferenciaId}" : "", 
                itemReferenciaId = i.ItemReferenciaId,
                nome = i.Item.Nome,
                quantidade = i.Quantidade 
            }));
        }


        [HttpGet]
        public async Task<IActionResult> Resultados(string referenciaId)
        {
            var itens = await _itemService.ListarResultados(referenciaId);
            return Json(itens.Select(i => new {
                img = !string.IsNullOrEmpty(i.Resultado.ImagemUrl) ? $"/Content/Image?referenciaId={i.ResultadoReferenciaId}" : "",
                itemReferenciaId = i.ResultadoReferenciaId,
                nome = i.Resultado.Nome,
                ProcRaro = i.ProcRaro ? "SIM" : "NÃO",
                ProcNormalExcessao = i.Resultado.ProcNormalExcessao,
                ProcRaroExcessao = i.Resultado.ProcRaroExcessao
            }));
        }

        [HttpGet]
        public async Task<IActionResult> EditarItem(string referenciaId)
        {
            var item = await _itemService.ObterPorReferenciaId(referenciaId, true);
            return View(item.Data);
        }

    }
}
