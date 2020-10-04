using BDOLife.Core.Entities.Base;
using System.ComponentModel.DataAnnotations.Schema;

namespace BDOLife.Core.Entities
{
    public class ReceitaResultado : Entity
    {
        public string ReceitaReferenciaId { get; set; }

        [ForeignKey("ReceitaReferenciaId")]
        public virtual Item Receita { get; set; }
        public string ResultadoReferenciaId { get; set; }

        [ForeignKey("ResultadoReferenciaId")]
        public virtual Item Resultado { get; set; }
        public bool ProcRaro { get; set; }
        public bool Excluido { get; set; }
    }
}