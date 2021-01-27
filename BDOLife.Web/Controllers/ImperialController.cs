using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using BDOLife.Web.Util;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace BDOLife.Web.Controllers
{
    public class ImperialController : Controller
    {
        private readonly IImperialService _imperialService;
        private readonly IMaestriaService _maestriaService;

        public ImperialController(IImperialService imperialService, IMaestriaService maestriaService)
        {
            _imperialService = imperialService;
            _maestriaService = maestriaService;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CaixasCulinaria(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var imperiaisResultados = await _imperialService.ListarImperiaisCulinaria(nivel, maestriaId, contribuicao);
            ImperialResultadoViewModel maisLucrativaItem = null;
            long maiorLucroLiquidoItem = int.MinValue;


            ImperialResultadoViewModel maisLucrativaSubitens = null;
            long maiorLucroLiquidoSubitens = int.MinValue;

            foreach (var imperial in imperiaisResultados)
            {
                imperial.SubItensInline = await this.RenderViewToStringAsync("_ReceitaInlinePartial", imperial.ItensQuantidadesNecessarias);
                imperial.ItensQuantidadesNecessarias = null;
                if (imperial.LucroLiquidoPrimaria > maiorLucroLiquidoItem && imperial.DisponibilidadePrimaria == 100)
                {
                    maisLucrativaItem = new ImperialResultadoViewModel(imperial);
                    maiorLucroLiquidoItem = imperial.LucroLiquidoPrimaria;
                }

                if (imperial.LucroLiquidoSecundaria > maiorLucroLiquidoSubitens && imperial.LucroLiquidoSecundaria != 0)
                {
                    maisLucrativaSubitens = new ImperialResultadoViewModel(imperial);
                    maiorLucroLiquidoSubitens = imperial.LucroLiquidoSecundaria;
                }
            }

            if (maisLucrativaItem != null)
                maisLucrativaItem.Item = Regex.Replace(maisLucrativaItem.Item, @"\(\d+\)", "");

            if (maisLucrativaSubitens != null)
                maisLucrativaSubitens.Item = Regex.Replace(maisLucrativaSubitens.Item, @"\(\d+\)", "");

            return Json(new { data = imperiaisResultados.OrderByDescending(i => i.LucroLiquidoPrimaria), maisLucrativaItem, maisLucrativaSubitens });
        }

        [HttpPost]
        public async Task<IActionResult> CaixasAlquimia(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var imperiaisResultados = await _imperialService.ListarImperiaisAlquimia(nivel, maestriaId, contribuicao);

            ImperialResultadoViewModel maisLucrativaItem = null;
            long maiorLucroLiquidoItem = int.MinValue;

            ImperialResultadoViewModel maisLucrativaSubitens = null;
            long maiorLucroLiquidoSubitens = int.MinValue;

            foreach (var imperial in imperiaisResultados)
            {
                imperial.SubItensInline = await this.RenderViewToStringAsync("_ReceitaInlinePartial", imperial.ItensQuantidadesNecessarias);
                imperial.ItensQuantidadesNecessarias = null;

                imperial.ItensQuantidadesNecessarias = null;
                if (imperial.LucroLiquidoPrimaria > maiorLucroLiquidoItem && imperial.DisponibilidadePrimaria == 100)
                {
                    maisLucrativaItem = new ImperialResultadoViewModel(imperial);
                    maiorLucroLiquidoItem = imperial.LucroLiquidoPrimaria;
                }

                if (imperial.LucroLiquidoSecundaria > maiorLucroLiquidoSubitens && imperial.LucroLiquidoSecundaria != 0)
                {
                    maisLucrativaSubitens = new ImperialResultadoViewModel(imperial);
                    maiorLucroLiquidoSubitens = imperial.LucroLiquidoSecundaria;
                }
            }

            if (maisLucrativaItem != null)
                maisLucrativaItem.Item = Regex.Replace(maisLucrativaItem.Item, @"\(\d+\)", "");

            if (maisLucrativaSubitens != null)
                maisLucrativaSubitens.Item = Regex.Replace(maisLucrativaSubitens.Item, @"\(\d+\)", "");

            return Json(new { data = imperiaisResultados.OrderByDescending(i => i.LucroLiquidoPrimaria), maisLucrativaItem, maisLucrativaSubitens });
        }
    }
}
