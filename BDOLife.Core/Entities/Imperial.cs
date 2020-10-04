using BDOLife.Core.Entities.Base;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Imperial : Entity
    {
        public string Nome { get; set; }
        public NivelHabilidadeEnum Habilidade { get; set; }
        public int NivelHabilidade { get; set; }
        public long Valor { get; set; }
        public int PorcentagemBonus { get; set; }
        public virtual List<ImperialReceita> Receitas { get; set; }
        public TipoReceitaEnum Tipo { get; set; }
        public bool Excluido { get; set; }
    }
}
