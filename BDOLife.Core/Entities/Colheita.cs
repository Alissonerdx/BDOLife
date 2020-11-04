using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Colheita : Entity
    {
        public string FrutaReferenciaId { get; set; }
        public string PlantaReferenciaId { get; set; }
        public string PlantaEspecialReferenciaId { get; set; }
        public string PlantaAltaQualidadeReferenciaId { get; set; }

        public decimal Baixa { get; set; }
        public decimal Perfeita { get; set; }
        public decimal Alta { get; set; }
        public TimeSpan TempoPerfeito { get; set; }
        public TimeSpan TempoComFertilizante { get; set; }
        public string RegiaoIndicada { get; set; }
        public int Slot { get; set; }
        public long? ValorCaixa { get; set; }
        public long? ValorSementeMagica { get; set; }

        [ForeignKey("PlantaReferenciaId")]
        public virtual Item Planta { get; set; }

        [ForeignKey("PlantaEspecialReferenciaId")]
        public virtual Item PlantaEspecial { get; set; }

        [ForeignKey("PlantaAltaQualidadeReferenciaId")]
        public virtual Item PlantaAltaQualidade { get; set; }

        [ForeignKey("FrutaReferenciaId")]
        public virtual Item Fruta { get; set; }
    }
}
