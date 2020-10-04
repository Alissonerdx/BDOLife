using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ReceitaItemViewModel : BaseViewModel
    {
        public string ReceitaReferenciaId { get; set; }
        public virtual ItemViewModel Receita { get; set; }
        public string ItemReferenciaId { get; set; }
        public virtual ItemViewModel Item { get; set; }
        public long Quantidade { get; set; }
        public bool Visivel { get; set; }
        public string Agrupamento { get; set; }
        public bool Excluido { get; set; }
    }
}
