using BDOLife.Core.Entities.Base;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Maestria : Entity
    {
        public int Valor { get; set; }
        public decimal? ProcNormal { get; set; }
        public decimal? ProcEspecial { get; set; }
        public decimal? ProcRaro { get; set; }
        public decimal? ImperialBonus { get; set; }
        public decimal? ProducaoBonus { get; set; }
        public int? ProcessadoPorVez { get; set; }
        public int? AumentoNumItensBasico { get; set; }
        public int? AumentoNumItensEspecial { get; set; }
        public int? AumentoNumItensRaro { get; set; }
        public int? AumentoChanceEspecial { get; set; }
        public int? AumentoChanceRaro { get; set; }
        public TipoMaestriaEnum Tipo { get; set; }
    }
}
