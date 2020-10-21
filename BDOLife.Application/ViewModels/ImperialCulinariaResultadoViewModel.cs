using BDOLife.Core.Enums;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ImperialResultadoViewModel
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public string Caixa { get; set; }
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
