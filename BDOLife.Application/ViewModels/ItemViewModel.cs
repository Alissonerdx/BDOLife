using BDOLife.Application.Models.Base;
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

        public long CalcularTotalSecundarias()
        {
            long total = 0;


            if (Tipo == TipoEnum.Item && ResultadosEm != null && ResultadosEm.Count > 0)
            {
                var receita = ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return total;

                foreach (var secundaria in receita.Receita.Itens)
                {
                    total += (secundaria.Quantidade * secundaria.Item.Valor);
                }
            }
            else
            if (Itens != null)
            {
                foreach (var secundaria in Itens)
                {
                    total += (secundaria.Quantidade * secundaria.Item.Valor);
                }
            }

            return total;
        }

        public double DisponibilidadePrimaria(long quantidadeNecessaria)
        {
            var disponibilidade = 100.0;

            if (QuantidadeDisponivel > quantidadeNecessaria)
                return disponibilidade;

            return 0;
        }

        public Tuple<double, List<Tuple<ItemViewModel, long, bool>>> DisponibilidadesSecundarias(long quantidadeNecessaria)
        {
            var disponibilidade = 100.0;
            var itensQuantidades = new List<Tuple<ItemViewModel, long, bool>>();


            if (Tipo == TipoEnum.Item && ResultadosEm != null && ResultadosEm.Count > 0)
            {
                var receita = ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return new Tuple<double, List<Tuple<ItemViewModel, long, bool>>> (disponibilidade, new List<Tuple<ItemViewModel, long, bool>>());

                var porcentagemIndividualIngrediente = 100.0 / receita.Receita.Itens.Count();

                foreach (var secundaria in receita.Receita.Itens)
                {
                    var quantidadeTotalNecessaria = quantidadeNecessaria * secundaria.Quantidade;
                    if (secundaria.Item.QuantidadeDisponivel < quantidadeTotalNecessaria)
                    {
                        itensQuantidades.Add(new Tuple<ItemViewModel, long, bool>(secundaria.Item, quantidadeTotalNecessaria, false));
                        disponibilidade -= porcentagemIndividualIngrediente;
                    }
                    else
                        itensQuantidades.Add(new Tuple<ItemViewModel, long, bool>(secundaria.Item, quantidadeTotalNecessaria, true));
                }
            }
            else
            if (Itens != null)
            {
                var porcentagemIndividualIngrediente = 100.0 / Itens.Count();

                foreach (var secundaria in Itens)
                {
                    var quantidadeTotalNecessaria = quantidadeNecessaria * secundaria.Quantidade;
                    if (secundaria.Item.QuantidadeDisponivel < quantidadeTotalNecessaria)
                    {
                        itensQuantidades.Add(new Tuple<ItemViewModel, long, bool>(secundaria.Item, quantidadeTotalNecessaria, false));
                        disponibilidade -= porcentagemIndividualIngrediente;
                    }
                    else
                        itensQuantidades.Add(new Tuple<ItemViewModel, long, bool>(secundaria.Item, quantidadeTotalNecessaria, true));

                }
            }

            return new Tuple<double, List<Tuple<ItemViewModel, long, bool>>>(Math.Round(disponibilidade, 2), itensQuantidades);
        }

        public ItemViewModel Receita()
        {
            if (Tipo == TipoEnum.Item && ResultadosEm != null && ResultadosEm.Count > 0)
            {
                var receita = ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return null;

                return receita.Receita;
            }
            else if (Itens != null)
            {
                return this;
            }

            return null;
        }

    }
}
