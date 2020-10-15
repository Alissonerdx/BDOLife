using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class TipoProcessoExperiencia : Entity
    {
        public string Descricao { get; set; }
        public int MediaXpPorCraft { get; set; }
        public decimal QtdMaterialAPorCraft { get; set; }
        public decimal? QtdMaterialBPorCraft { get; set; }
    }
}
