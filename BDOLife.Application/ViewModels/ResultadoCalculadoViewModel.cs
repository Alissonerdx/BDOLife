using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ResultadoCalculadoViewModel
    {
        public string Id { get; set; }
        public string Item { get; set; }
        public long Preco { get; set; }
        public decimal Peso { get; set; }
        public decimal PesoTotal { get; set; }
        public long Quantidade { get; set; }
        public long Total { get; set; }
        public string Img { get; set; }
        public bool Ignorar { get; set; }
        public long QuantidadePorCaixa { get; set; }
        public long QuantidadeImperial { get; set; }
        public long PrecoPorCaixa { get; set; }
        public string CaixaImperial { get; set; }
    }
}
