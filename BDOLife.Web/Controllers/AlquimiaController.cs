using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class AlquimiaController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
