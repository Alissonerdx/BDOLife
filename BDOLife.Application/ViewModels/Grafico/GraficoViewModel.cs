using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Text;

namespace BDOLife.Application.ViewModels.Grafico
{
    public class GraficoViewModel
    {
        public string[] labels { get; set; }
        public List<Object> datasets { get; set; }
        public double crescimentoProcura { get; set; }
        public double crescimentoOferta { get; set; }
        public double crescimentoPreco { get; set; }
        public string melhorDataCompra { get; set; }
        public string melhorDataVenda { get; set; }
        public long melhorPrecoVenda { get; set; } 
        public long melhorPrecoCompra { get; set; }
        public string decisaoMercadoComprar { get; set; }
        public string decisaoMercadoVender { get; set; }
        public string nomeItem { get; set; }
        public string imagemItem { get; set; }
        public long precoAtualItem { get; set; }
        public long quantidadeAtualItem { get; set; }
    }
}
