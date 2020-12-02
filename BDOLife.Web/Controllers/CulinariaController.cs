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

        public async Task<IActionResult> Index(string nomeReceita)
        {
            ViewBag.ReceitaSelecionada = nomeReceita;
            var receitas = await _itemService.ListarPorTipoReceita(TipoReceitaEnum.Culinaria);

            var receitasCulinariaSimples = await _itemService.ObterPorListaDeReferenciasIds(new List<string> {
                "R_PCS_1700", //Refeição de Frutos do Mar de Cron
                "R_PCS_1701", //Refeição Simples de Cron
                "R_PCS_1702", //Refeição de Iguarias de Cron
            });

            var data = receitas.Data.ToList();
            data.AddRange(receitasCulinariaSimples.Data);
            data.OrderBy(d => d.Nome);

            ViewBag.Receitas = data;

            return View();
        }
    }
}
