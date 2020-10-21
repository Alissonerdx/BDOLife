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
            var receitas = await _itemService.ListarPorTipoReceita(TipoReceitaEnum.Culinaria);
            ViewBag.ReceitasCulinaria = receitas.Data;

            return View();
        }
    }
}
