using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class CalculoSubReceita
    {
        public ReceitaItem Principal { get; set; }
        public ReceitaItem SubReceita { get; set; }
    }
}
