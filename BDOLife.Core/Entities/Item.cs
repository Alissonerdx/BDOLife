using BDOLife.Core.Entities.Base;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Item : Entity
    {
        public string ReferenciaId { get; set; }
        public int BdoId { get; set; }
        public int? AgrupamentoId { get; set; }
        public int Experiencia { get; set; }
        public string Nome { get; set; }
        public long Valor { get; set; }
        public decimal Peso { get; set; }
        public string ImagemUrl { get; set; }
        public long QuantidadeDisponivel { get; set; }
        public GrauEnum Grau { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public TipoEnum Tipo { get; set; }
        public string Categoria { get; set; }
        public TipoReceitaEnum? TipoReceita { get; set; }
        public virtual List<ReceitaItem> Itens { get; set; }
        public virtual List<ReceitaItem> Receitas { get; set; }
        public virtual List<ReceitaResultado> Resultados { get; set; }
        public virtual List<ReceitaResultado> ResultadosEm { get; set; }
        public virtual List<HistoricoPreco> HistoricoPrecos { get; set; }
        public virtual List<AgrupamentoItem> AgrupadoEm { get; set; }
        public virtual List<RankingCulinaria> RankingsCulinaria { get; set; }
        public virtual List<ImperialReceita> ImperiaisReceitas { get; set; }
        public virtual Agrupamento Agrupamento { get; set; }
        public bool Excluido { get; set; }
        public decimal? ProcNormalExcessao { get; set; }
        public decimal? ProcRaroExcessao { get; set; }
    }
}
