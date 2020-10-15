using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class NivelProfissao : Entity
    {
        public string Descricao { get; set; }
        public int Nivel { get; set; }
        public decimal ExperienciaProximoLevel { get; set; }
        public decimal ExperienciaTotal { get; set; }
        public int Maestria { get; set; }
    }
}
