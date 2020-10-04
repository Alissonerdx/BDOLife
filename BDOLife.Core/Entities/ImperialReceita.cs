using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class ImperialReceita : Entity
    {
        public int ImperialId { get; set; }
        public virtual Imperial Imperial { get; set; }
        public int Quantidade { get; set; }
        public string ItemReferenciaId { get; set; }

        [ForeignKey("ItemReferenciaId")]
        public virtual Item Item { get; set; }
    }
}
