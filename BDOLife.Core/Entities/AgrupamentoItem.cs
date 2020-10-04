
using BDOLife.Core.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace BDOLife.Core.Entities
{
    public class AgrupamentoItem : Entity
    {
        public int AgrupamentoId { get; set; }
        public virtual Agrupamento Agrupamento { get; set; }
        public string ItemReferenciaId { get; set; }

        [ForeignKey("ItemReferenciaId")]
        public virtual Item Item { get; set; }
        public int Quantidade { get; set; }
        public bool Principal { get; set; }
    }
}