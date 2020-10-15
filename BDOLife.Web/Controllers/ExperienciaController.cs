using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class ExperienciaController : Controller
    {
        private readonly ITipoProcessoExperienciaService _tipoProcessoExperienciaService;

        public ExperienciaController(ITipoProcessoExperienciaService tipoProcessoExperienciaService)
        {
            _tipoProcessoExperienciaService = tipoProcessoExperienciaService;
        }


        public IActionResult Index()
        {
            var tiposProcessos = _tipoProcessoExperienciaService.Listar();


            return View();
        }
    }
}
