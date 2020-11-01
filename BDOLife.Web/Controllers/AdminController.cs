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

        public async Task<IActionResult> GerenciarReceitas()
        {
            ViewBag.Receitas = await _itemService.ListarReceitasPorTipos(new List<TipoReceitaEnum> { TipoReceitaEnum.Alquimia, TipoReceitaEnum.Culinaria });

            return View();
        }
    }
}
