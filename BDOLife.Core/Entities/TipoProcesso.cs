using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class TipoProcesso : Entity
    {
        public int Descricao { get; set; }
        public bool Excluido { get; set; }
    }
}
