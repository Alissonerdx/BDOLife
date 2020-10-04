using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BDOLife.Core.Enums
{
    public enum TipoMaestriaEnum
    {
        [Description("Culinária")]
        Culinaria = 1,
        [Description("Alquimia")]
        Alquimia = 2,
        [Description("Processo")]
        Processo = 3,
        [Description("Coleta")]
        Coleta = 4,
        [Description("Pesca")]
        Pesca = 5,
        [Description("Caça")]
        Caca = 6,
    }
}
