using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ItemController : Controller
    {
        private readonly IItemService _itemService;
        public ItemController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<JsonResult> SelectReceitasPorTipo(TipoReceitaEnum tipo, string search, int page)
        {
            var result = await _itemService.ListarPorTipoReceita(tipo);
            var response = result.Data;
            //return Json(new
            //{
            //    results = response.Select(r => new
            //    {
            //        id = r.ReferenciaId,
            //        text = r.Nome,
            //        Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"/imagens/itens/{r.ReferenciaId}.png" : ""
            //    })
            //});
            //$"Content/Image?referenciaId={r.ReferenciaId}"
            return Json(response.Select(r => new
            {
                id = r.ReferenciaId,
                text = r.Nome,
                Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"Content/Image?referenciaId={r.ReferenciaId}" : ""
            }));
        }
    }
}
