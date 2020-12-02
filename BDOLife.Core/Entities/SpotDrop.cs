using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class SpotDrop : Entity
    {
        public int SpotId { get; set; }
        public string ItemReferenciaId { get; set; }
        public bool ChanceDropAprimorado { get; set; }

        [ForeignKey("SpotId")]
        public virtual Spot Spot { get; set; }

        [ForeignKey("ItemReferenciaId")]
        public virtual Item Item { get; set; }
    }
}
