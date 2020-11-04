using BDOLife.Application.Models.Base;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ItemViewModel : BaseViewModel
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
        public virtual List<ReceitaItemViewModel> Itens { get; set; }
        public virtual List<ReceitaItemViewModel> Receitas { get; set; }
        public virtual List<ReceitaResultadoViewModel> Resultados { get; set; }
        public virtual List<ReceitaResultadoViewModel> ResultadosEm { get; set; }
        public virtual List<HistoricoPrecoViewModel> HistoricoPrecos { get; set; }
        public virtual List<AgrupamentoItemViewModel> AgrupadoEm { get; set; }
        public virtual AgrupamentoViewModel Agrupamento { get; set; }
        public bool Excluido { get; set; }
        public decimal? ProcNormalExcessao { get; set; }
        public decimal? ProcRaroExcessao { get; set; }
        public string Grupo { get; set; }
        public AdquiridoEnum Adquirido { get; set; }
        public long? ValorNPC { get; set; }
        public string LocalizacaoNPC { get; set; }
        public bool MultiResultados { get; set; }
        public long CustoProducao { get; set; }
    }
}
