using BDOLife.Core.Entities.Base;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace BDOLife.Core.Entities
{
    public class RankingCulinaria : Entity
    {
        public int Maestria { get; set; }
        public string ReceitaReferenciaId { get; set; }

        [ForeignKey("ReceitaReferenciaId")]
        public virtual Item Receita { get; set; }
        public long Custo { get; set; }
        public long LucroBruto { get; set; }
        public long LucroLiquido { get; set; }
        public long? QuantidadeProcNormal { get; set; }
        public long? QuantidadeProcRaro { get; set; }
        public DateTime Data { get; set; }
        public double CrescimentoProcura { get; set; }
        public double CrescimentoOferta { get; set; }
        public double CrescimentoPreco { get; set; }
        public double Resultado { get; set; }
    }
}