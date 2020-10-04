using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class HistoricoPrecoViewModel : BaseViewModel
    {
        public DateTime Data { get; set; }
        public string ItemReferenciaId { get; set; }
        public virtual ItemViewModel Item { get; set; }
        public long QuantidadeDisponivel { get; set; }
        public long Valor { get; set; }
        public long QuantidadeTotalVenda { get; set; }
    }
}
