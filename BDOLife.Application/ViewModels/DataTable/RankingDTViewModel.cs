using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels.DataTable
{
    public class RankingDTViewModel
    {
        public long QuantidadeDisponivel { get; set; }
        public string DataAtualizacao { get; set; }
        public string Img { get; set; }
        public string ReferenciaId { get; set; }
        public string Receita { get; set; }
        public long Valor { get; set; }
        public double Oferta { get; set; }
        public double Demanda { get; set; }
        public double Valorizacao { get; set; }
        public long Lucro { get; set; }
        public string Ingredientes { get; set; }
        public double DisponibilidadePrimaria { get; set; }
        public double DisponibilidadesSecundarias { get; set; }
        public List<Tuple<ItemViewModel, long, bool, long>> ItensQuantidadesNecessarias { get; set; }
        public string SubItensInline { get; set; }
    }
}
