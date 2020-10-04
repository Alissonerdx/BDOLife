using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BDOLife.Core.Enums
{
    public enum TipoReceitaEnum
    {
        [Description("N")]
        //[Description("Nenhum")]
        None = 0,
        [Description("A")]
        //[Description("Alquimia")]
        Alquimia = 1,
        [Description("C")]
        //[Description("Culinária")]
        Culinaria = 2,
        [Description("PAS")]
        //[Description("Processo Alquimia Simples")]
        ProcessoAlquimiaSimples = 3,
        [Description("PAI")]
        //[Description("Processo Alquimia Imperial")]
        ProcessoAlquimiaImperial = 4,
        [Description("PAQ")]
        //[Description("Processo Aquecimento")]
        ProcessoAquecimento = 5,
        [Description("PCH")]
        //[Description("Processo Chacoalhar")]
        ProcessoChacoalhar = 6,
        [Description("PCO")]
        //[Description("Processo Corte")]
        ProcessoCorte = 7,
        [Description("PCS")]
        //[Description("Processo Cozinha Simples")]
        ProcessoCozinhaSimples = 8,
        [Description("PCI")]
        //[Description("Processo Culinária Imperial")]
        ProcessoCulinariaImperial = 9,
        [Description("PDE")]
        //[Description("Processo Desidratação")]
        ProcessoDesidratacao = 10,
        [Description("PFA")]
        //[Description("Processo Fábrica")]
        ProcessoFabrica = 11,
        [Description("PFG")]
        //[Description("Processo Fábrica Guilda")]
        ProcessoFabricaGuilda = 12,
        [Description("PFI")]
        //[Description("Processo Filtragem")]
        ProcessoFiltragem = 13,
        [Description("PMO")]
        //[Description("Processo Moagem")]
        ProcessoMoagem = 14
    }
}
