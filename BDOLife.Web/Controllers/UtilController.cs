using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class UtilController : Controller
    {
        private readonly IUtilService _utilService;

        public UtilController(IUtilService utilService)
        {
            _utilService = utilService;
        }

        public IActionResult Index()
        {
            return View();
        }

        public async Task<IActionResult> ImportarNodes()
        {
            await _utilService.ImportarNodes();
            return View();
        }
    }
}
