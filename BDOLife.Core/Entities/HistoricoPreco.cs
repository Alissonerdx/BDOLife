using BDOLife.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BDOLife.Core.Entities
{
    public class HistoricoPreco : Entity
    {
        public DateTime Data { get; set; }
        public string ItemReferenciaId { get; set; }

        [ForeignKey("ItemReferenciaId")]
        public virtual Item Item { get; set; }
        public long QuantidadeDisponivel { get; set; }
        public long Valor { get; set; }
        public long QuantidadeTotalVenda { get; set; }
    }
}