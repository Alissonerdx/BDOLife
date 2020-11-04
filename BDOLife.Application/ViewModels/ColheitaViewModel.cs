using BDOLife.Application.Models.Base;
using BDOLife.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ColheitaViewModel : BaseViewModel
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
        public virtual ItemViewModel Planta { get; set; }
        public virtual ItemViewModel PlantaEspecial { get; set; }
        public virtual ItemViewModel PlantaAltaQualidade { get; set; }
        public virtual ItemViewModel Fruta { get; set; }

        public ColheitaViewModel Map(Colheita colheita)
        {
            return new ColheitaViewModel
            {
                Id = colheita.Id,
                Alta = colheita.Alta,
                Baixa = colheita.Baixa,
                Perfeita = colheita.Perfeita,
                FrutaReferenciaId = colheita.FrutaReferenciaId,
                PlantaEspecialReferenciaId = colheita.PlantaEspecialReferenciaId,
                PlantaReferenciaId = colheita.PlantaReferenciaId,
                PlantaAltaQualidadeReferenciaId = colheita.PlantaAltaQualidadeReferenciaId,
                RegiaoIndicada = colheita.RegiaoIndicada,
                Slot = colheita.Slot,
                TempoComFertilizante = colheita.TempoComFertilizante,
                TempoPerfeito = colheita.TempoPerfeito,
                ValorCaixa = colheita.ValorCaixa,
                ValorSementeMagica = colheita.ValorSementeMagica,
                Planta = new ItemViewModel
                {
                    Id = colheita.Planta.Id,
                    BdoId = colheita.Planta.BdoId,
                    ImagemUrl = colheita.Planta.ImagemUrl,
                    ReferenciaId = colheita.Planta.ReferenciaId,
                    Valor = colheita.Planta.Valor,
                    Nome = colheita.Planta.Nome,
                },
                PlantaAltaQualidade = new ItemViewModel
                {
                    Id = colheita.PlantaAltaQualidade.Id,
                    BdoId = colheita.PlantaAltaQualidade.BdoId,
                    ImagemUrl = colheita.PlantaAltaQualidade.ImagemUrl,
                    ReferenciaId = colheita.PlantaAltaQualidade.ReferenciaId,
                    Valor = colheita.PlantaAltaQualidade.Valor,
                    Nome = colheita.PlantaAltaQualidade.Nome,
                },
                PlantaEspecial = new ItemViewModel
                {
                    Id = colheita.PlantaAltaQualidade.Id,
                    BdoId = colheita.PlantaAltaQualidade.BdoId,
                    ImagemUrl = colheita.PlantaAltaQualidade.ImagemUrl,
                    ReferenciaId = colheita.PlantaAltaQualidade.ReferenciaId,
                    Valor = colheita.PlantaAltaQualidade.Valor,
                    Nome = colheita.PlantaAltaQualidade.Nome,
                },
                Fruta = new ItemViewModel
                {
                    Id = colheita.Fruta.Id,
                    BdoId = colheita.Fruta.BdoId,
                    ImagemUrl = colheita.Fruta.ImagemUrl,
                    ReferenciaId = colheita.Fruta.ReferenciaId,
                    Valor = colheita.Fruta.Valor,
                    Nome = colheita.Fruta.Nome,
                },
            };
        }

        public List<ColheitaViewModel> Map(List<Colheita> lista)
        {
            return lista.Select(l => Map(l)).ToList();
        }
    }
}
