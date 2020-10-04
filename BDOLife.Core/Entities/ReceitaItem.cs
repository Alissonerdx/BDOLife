using BDOLife.Core.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace BDOLife.Core.Entities
{
    public class ReceitaItem : Entity
    {
        public string ReceitaReferenciaId { get; set; }

        [ForeignKey("ReceitaReferenciaId")]
        public virtual Item Receita { get; set; }
        public string ItemReferenciaId { get; set; }

        [ForeignKey("ItemReferenciaId")]
        public virtual Item Item { get; set; }
        public long Quantidade { get; set; }
        public bool Visivel { get; set; }
        public string Agrupamento { get; set; }
        public bool Excluido { get; set; }
    }
}