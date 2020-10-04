using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class AgrupamentoViewModel : BaseViewModel
    {
        public string Nome { get; set; }
        public bool Ativo { get; set; }
        public virtual List<AgrupamentoItemViewModel> Itens { get; set; }
    }
}
