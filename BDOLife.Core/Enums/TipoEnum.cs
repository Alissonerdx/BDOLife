using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BDOLife.Core.Enums
{
    public enum TipoEnum
    {
        [Description("None")]
        None = 0,
        [Description("Item")]
        Item = 1,
        [Description("Material")]
        Material = 2,
        [Description("Receita")]
        Receita = 3
    }
}
