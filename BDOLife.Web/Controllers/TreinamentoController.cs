using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BDOLife.Application.ViewModels;
using Microsoft.AspNetCore.Mvc;

namespace BDOLife.Web.Controllers
{
    public class TreinamentoController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Cavalos()
        {
            int[] quantidades = new int[8]
            {
                2,
                4,
                6,
                17,
                15,
                21,
                9,
                5
            };

            var result = new List<CavaloViewModel>();

            for(int i = 0; i < 8; i++)
            {
                for(int j = 0; j < quantidades[i]; j++)
                {
                    result.Add(new CavaloViewModel
                    {
                        Id = $"{i + 1}{Convert.ToChar('A' + j)}",
                        Text = $"<span><img src='/Content/Cavalo?cavalo={i + 1}{Convert.ToChar('A' + j)}' class='img-flag' /> {i + 1}{Convert.ToChar('A' + j)}</span>"
                    });
                }
            }

            return Json(result);
        }

        public IActionResult Status()
        {
            //var cavalos = new List<CavaloViewModel>()
            //{
            //    new CavaloViewModel { Tier = 1, Raca = 'A' },
            //    new CavaloViewModel { Tier = 1, Raca = 'B' },
            //    new CavaloViewModel { Tier = 2, Raca = 'A' },
            //    new CavaloViewModel { Tier = 2, Raca = 'B' },
            //    new CavaloViewModel { Tier = 2, Raca = 'C' },
            //    new CavaloViewModel { Tier = 2, Raca = 'D' },
            //    new CavaloViewModel { Tier = 3, Raca = 'A' },
            //    new CavaloViewModel { Tier = 3, Raca = 'B' },
            //    new CavaloViewModel { Tier = 3, Raca = 'C' },
            //    new CavaloViewModel { Tier = 3, Raca = 'D' },
            //    new CavaloViewModel { Tier = 3, Raca = 'E' },
            //    new CavaloViewModel { Tier = 3, Raca = 'F' },
            //    new CavaloViewModel { Tier = 4, Raca = 'A' },
            //    new CavaloViewModel { Tier = 4, Raca = 'B' },
            //    new CavaloViewModel { Tier = 4, Raca = 'C' },
            //    new CavaloViewModel { Tier = 4, Raca = 'D' },
            //    new CavaloViewModel { Tier = 4, Raca = 'E' },
            //    new CavaloViewModel { Tier = 4, Raca = 'F' },
            //    new CavaloViewModel { Tier = 4, Raca = 'G' },
            //    new CavaloViewModel { Tier = 4, Raca = 'H' },
            //    new CavaloViewModel { Tier = 4, Raca = 'I' },
            //    new CavaloViewModel { Tier = 4, Raca = 'J' },
            //    new CavaloViewModel { Tier = 4, Raca = 'K' },
            //    new CavaloViewModel { Tier = 4, Raca = 'L' },
            //    new CavaloViewModel { Tier = 4, Raca = 'M' },
            //    new CavaloViewModel { Tier = 4, Raca = 'N' },
            //    new CavaloViewModel { Tier = 4, Raca = 'O' },
            //    new CavaloViewModel { Tier = 4, Raca = 'P' },
            //    new CavaloViewModel { Tier = 4, Raca = 'Q' },

            //};

            return View();
        }

        [HttpPost]
        public IActionResult Status(int tier, char raca, int nivel, double velocidade, double aceleracao, double curva, double freio)
        {
            return View();
        }
    }
}
