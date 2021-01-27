using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using BDOLife.Core.Helper;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        private IWebHostEnvironment _hostingEnvironment;

        public ItemController(IItemService itemService, IWebHostEnvironment hostingEnvironment)
        {
            _itemService = itemService;
            _hostingEnvironment = hostingEnvironment;
        }

        [HttpGet]
        public async Task<JsonResult> SelectItensPorGrupo(string grupo, string search, int page)
        {
            if (string.IsNullOrEmpty(grupo))
                return Json(null);

            var result = await _itemService.ListarPorGrupo(grupo);
            var response = result.Data;

            return Json(response.Select(r => new
            {
                id = r.ReferenciaId,
                text = $"{r.Nome} ({(r.Tipo == TipoEnum.Receita ? "Receita" : r.Tipo == TipoEnum.Item || r.Tipo == TipoEnum.Material ? "Item" : "")})",
                valor = r.Valor,
                tipo = (int)r.Tipo,
                Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"Content/Image?referenciaId={r.ReferenciaId}" : ""
            }));
        }

        [HttpGet]
        public async Task<JsonResult> SelectReceitasPorTipo(TipoReceitaEnum tipo, string search, int page)
        {
            if (tipo == TipoReceitaEnum.None)
                return Json(null);

            var result = await _itemService.ListarPorTipoReceita(tipo);
            var response = result.Data;

            return Json(new
            {
                results = response.Select(r => new
                {
                    id = r.ReferenciaId,
                    text = r.Nome,
                    Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"Content/Image?referenciaId={r.ReferenciaId}" : ""
                })
            });
        }

        [HttpPost]
        public async Task<JsonResult> DependenciasDiretas(string referenciaId)
        {
            var result = await _itemService.ListarDependenciasDiretas(referenciaId);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> DependenciasIndiretas(string referenciaId)
        {
            var result = await _itemService.ListarDependenciasIndiretas(referenciaId);
            return Json(result);
        }

        [HttpPost]
        public async Task<JsonResult> BuscarPorNome(string nome)
        {
            var result = await _itemService.BuscarPorNome(nome);

            return Json(result.Select(r => new
            {
                nome = r.Nome,
                id = r.ReferenciaId,
                text = $"{r.Nome} ({r.Tipo.GetDescription()}{(r.TipoReceita != null ? $" {r.TipoReceita.Value.GetDescription()}" : "")})"
            }));
        }

        [HttpPost]
        public async Task<IActionResult> Atualizar(string referenciaIdOriginal, ItemViewModel item)
        {
            var resultado = await _itemService.Atualizar(referenciaIdOriginal, item, _hostingEnvironment.WebRootPath);
            return Json(new { sucesso = resultado, mensagem = resultado == true ? "Item atualizado com sucesso" : "Ocorreu ao tentar salvar o item" });
        }
    }
}
