using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BDOLife.Core.Enums
{
    public enum TipoEnum
    {
        [Description("N")]
        None = 0,
        [Description("I")]
        Item = 1,
        [Description("M")]
        Material = 2,
        [Description("R")]
        Receita = 3
    }
}
