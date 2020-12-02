using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Spot : Entity
    {
        public int BdoId { get; set; }
        public string Nome { get; set; }
        public string Nivel { get; set; }
        public string PARecomendando { get; set; }
        public string Regiao { get; set; }
        public virtual List<SpotDrop> Drops { get; set; }
    }
}
