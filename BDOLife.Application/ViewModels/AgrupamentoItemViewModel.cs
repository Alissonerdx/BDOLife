using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class AgrupamentoItemViewModel : BaseViewModel
    {
        public int AgrupamentoId { get; set; }
        public virtual AgrupamentoViewModel Agrupamento { get; set; }
        public string ItemReferenciaId { get; set; }
        public virtual ItemViewModel Item { get; set; }
        public int Quantidade { get; set; }
        public bool Principal { get; set; }
    }
}
