using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ReceitaResultadoViewModel : BaseViewModel
    {
        public string ReceitaReferenciaId { get; set; }
        public virtual ItemViewModel Receita { get; set; }
        public string ResultadoReferenciaId { get; set; }
        public virtual ItemViewModel Resultado { get; set; }
        public bool ProcRaro { get; set; }
        public bool Excluido { get; set; }
    }
}
