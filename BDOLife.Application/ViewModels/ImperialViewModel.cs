using BDOLife.Application.Models.Base;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ImperialViewModel : BaseViewModel
    {
        public string Nome { get; set; }
        public NivelHabilidadeEnum Habilidade { get; set; }
        public int NivelHabilidade { get; set; }
        public long Valor { get; set; }
        public int PorcentagemBonus { get; set; }
        public virtual List<ImperialReceitaViewModel> Receitas { get; set; }
        public TipoReceitaEnum Tipo { get; set; }
        public bool Excluido { get; set; }
    }
}
