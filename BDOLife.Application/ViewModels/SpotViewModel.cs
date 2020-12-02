using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class SpotViewModel : BaseViewModel
    {
        public int BdoId { get; set; }
        public string Nome { get; set; }
        public string Nivel { get; set; }
        public string PARecomendando { get; set; }
        public string Regiao { get; set; }
    }
}
