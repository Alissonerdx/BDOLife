using BDOLife.Core.Entities.Base;
using System.Collections.Generic;

namespace BDOLife.Core.Entities
{
    public class Agrupamento : Entity
    {
        public string Nome { get; set; }
        public bool Ativo { get; set; }
        public virtual List<AgrupamentoItem> Itens { get; set; }
    }
}