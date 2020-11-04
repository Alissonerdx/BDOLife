using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class AlquimiaController : Controller
    {
        private readonly IItemService _itemService;
        private readonly IMaestriaService _maestriaService;
        public AlquimiaController(IItemService itemService, IMaestriaService maestriaService)
        {
            _itemService = itemService;
            _maestriaService = maestriaService;
        }

        public async Task<IActionResult> Index()
        {
            var receitas = await _itemService.ListarPorTipoReceita(TipoReceitaEnum.Alquimia);

            var receitasAlquimiaSimples = await _itemService.ObterPorListaDeReferenciasIds(new List<string> {
                "R_PAS_1703", //Folha Verde
                "R_PAS_1942", //Avanço
                "R_PAS_1704", //Fera
                "R_PAS_1705", //Gigante
                "R_PAS_1843", //Barbaridade
                "R_PAS_2455", //Avanço Gigantesco
                "R_PAS_1775" //Elixir do Alvoroço

            });

            var data = receitas.Data.ToList();
            data.AddRange(receitasAlquimiaSimples.Data);
            data.OrderBy(d => d.Nome);

            ViewBag.Receitas = data;

            return View();
        }
    }
}
