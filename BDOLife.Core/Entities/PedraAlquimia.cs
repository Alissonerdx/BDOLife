using BDOLife.Core.Entities.Base;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class PedraAlquimia : Entity
    {
        public string Nome { get; set; }
        public CategoriaPedraAlquimiaEnum Categoria { get; set; }
        public TipoPedraAlquimiaEnum Tipo { get; set; }
        public int? BonusProcessamento { get; set; }
    }
}
