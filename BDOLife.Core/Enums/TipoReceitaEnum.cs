using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BDOLife.Core.Enums
{
    public enum TipoReceitaEnum
    {
        [Description("N - Nenhum")]
        //[Description("Nenhum")]
        None = 0,
        [Description("A - Alquimia")]
        //[Description("Alquimia")]
        Alquimia = 1,
        [Description("C - Culinária")]
        //[Description("Culinária")]
        Culinaria = 2,
        [Description("PAS - Processo Alquimia Simples")]
        ProcessoAlquimiaSimples = 3,
        [Description("PAI - Processo Alquimia Imperial")]
        //[Description("Processo Alquimia Imperial")]
        ProcessoAlquimiaImperial = 4,
        [Description("PAQ - Processo Aquecimento")]
        //[Description("Processo Aquecimento")]
        ProcessoAquecimento = 5,
        [Description("PCH - Processo Chacoalhar")]
        //[Description("Processo Chacoalhar")]
        ProcessoChacoalhar = 6,
        [Description("PCO - Processo Corte")]
        //[Description("Processo Corte")]
        ProcessoCorte = 7,
        [Description("PCS - Processo Cozinha Simples")]
        //[Description("Processo Cozinha Simples")]
        ProcessoCozinhaSimples = 8,
        [Description("PCI - Processo Culinária Imperial")]
        //[Description("Processo Culinária Imperial")]
        ProcessoCulinariaImperial = 9,
        [Description("PDE - Processo Desidratação")]
        //[Description("Processo Desidratação")]
        ProcessoDesidratacao = 10,
        [Description("PFA - Processo Fábrica")]
        //[Description("Processo Fábrica")]
        ProcessoFabrica = 11,
        [Description("PFG - Processo Fábrica Guilda")]
        //[Description("Processo Fábrica Guilda")]
        ProcessoFabricaGuilda = 12,
        [Description("PFI - Processo Filtragem")]
        //[Description("Processo Filtragem")]
        ProcessoFiltragem = 13,
        [Description("PMO - Processo Moagem")]
        //[Description("Processo Moagem")]
        ProcessoMoagem = 14
    }
}
