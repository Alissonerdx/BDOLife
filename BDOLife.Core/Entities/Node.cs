using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Node : Entity
    {
        public int BdoId { get; set; }
        public string Nome { get; set; }
        public string Regiao { get; set; }
        public int? Temperatura { get; set; }
        public int? Umidade { get; set; }
        public int? Agua { get; set; }
    }
}
