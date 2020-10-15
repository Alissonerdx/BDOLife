using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class TipoProcessoExperienciaViewModel : BaseViewModel
    {
        public int Descricao { get; set; }
        public bool Excluido { get; set; }
    }
}
