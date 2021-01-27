using BDOLife.Core.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ImperialResultadoViewModel
    {
        public ImperialResultadoViewModel()
        {

        }

        public ImperialResultadoViewModel(ImperialResultadoViewModel imperial)
        {
            this.Id = imperial.Id;
            this.Img = imperial.Img;
            this.Caixa = imperial.Caixa;
            this.TipoReceita = imperial.TipoReceita;
            this.Valor = imperial.Valor;
            this.QuantidadePorCaixa = imperial.QuantidadePorCaixa;
            this.Item = imperial.Item;
            this.ImgItem = imperial.ImgItem;
            this.CustoComprandoPrimaria = imperial.CustoComprandoPrimaria;
            this.CustoComprandoSecundarias = imperial.CustoComprandoSecundarias;
            this.DisponibilidadePrimaria = imperial.DisponibilidadePrimaria;
            this.DisponibilidadesSecundarias = imperial.DisponibilidadesSecundarias;
            this.LucroBrutoPorDia = imperial.LucroBrutoPorDia;
            this.LucroLiquidoPrimaria = imperial.LucroLiquidoPrimaria;
            this.LucroLiquidoSecundaria = imperial.LucroLiquidoSecundaria;
            this.PossuiSubItens = imperial.PossuiSubItens;
            this.ItensQuantidadesNecessarias = imperial.ItensQuantidadesNecessarias;
            this.SubItensInline = imperial.SubItensInline;
    }


        public int Id { get; set; }
        public string Img { get; set; }
        public string Caixa { get; set; }
        public string TipoReceita { get; set; }
        public long Valor { get; set; }
        public long QuantidadePorCaixa { get; set; }
        public string Item { get; set; }
        public string ImgItem { get; set; }
        public long CustoComprandoPrimaria { get; set; }
        public long CustoComprandoSecundarias { get; set; }
        public double DisponibilidadePrimaria { get; set; }
        public double DisponibilidadesSecundarias { get; set; }
        public long LucroBrutoPorDia { get; set; }
        public long LucroLiquidoPrimaria { get; set; }
        public long LucroLiquidoSecundaria { get; set; }
        public bool PossuiSubItens { get; set; }
        public List<Tuple<ItemViewModel, long, bool, long>> ItensQuantidadesNecessarias { get; set; }
        public string SubItensInline { get; set; }
    }
}
