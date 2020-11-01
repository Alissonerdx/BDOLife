using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class DependenciaViewModel
    {
        public string Id { get; set; }
        public string Nome { get; set; }
        public string Img { get; set; }
        public long Preco { get; set; }
        public long QuantidadeDisponivel { get; set; }
        public bool Direta { get; set; }
    }
}
