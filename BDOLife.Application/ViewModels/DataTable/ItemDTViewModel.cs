using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels.DataTable
{
    public class ItemDTViewModel
    {
        public string Img { get; set; }
        public string ReferenciaId { get; set; }
        public string Nome { get; set; }
        public long Valor { get; set; }
        public string DataAtualizacao { get; set; }
        public string Grupo { get; set; }
        public string Tipo { get; set; }
        public string TipoReceita { get; set; }
        public string Categoria { get; set; }
        public decimal? ProcNormalExcessao { get; set; }
        public decimal? ProcRaroExcessao { get; set; }

    }
}
