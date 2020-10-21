using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ImperialReceitaViewModel : BaseViewModel
    {
        public int ImperialId { get; set; }
        public virtual ImperialViewModel Imperial { get; set; }
        public int Quantidade { get; set; }
        public string ItemReferenciaId { get; set; }
        public virtual ItemViewModel Item { get; set; }
        public long ValorPorCaixa { get; set; }

        

       
    }
}
