using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class CultivoService : ICultivoService
    {
        private readonly ICultivoRepository _cultivoRepository;
        private readonly IItemRepository _itemRepository;

        public CultivoService(ICultivoRepository cultivoRepository, IItemRepository itemRepository)
        {
            _cultivoRepository = cultivoRepository;
            _itemRepository = itemRepository;
        }

        public async Task<List<CultivoResultadoViewModel>> Calcular(int horasOnlineDia, int maximoColheitaDia, int totalSlots)
        {
            var colheitas = await _cultivoRepository.Listar();
            var frutos = await _itemRepository.ObterPorListaReferenciasIds(new List<string>
            {
                "M_5201",
                "M_5203",
                "M_5205",
                "M_5207",
                "M_5209",
                "M_5211"
            });

            var resultado = new List<CultivoResultadoViewModel>();

            var forragem = await _itemRepository.ObterPorReferenciaId("M_50804");
            var taxaPacoteEconomico = 0.845;
            var taxaForragemSementeMagicaBreed = 0.25;
            var taxaFrutasSementeMagicaBreed = 0.75;
            var taxaSementesSementeMagicaBreed = 1.55;
            var taxaColheita5Slot = 150;
            var taxaColheita10Slot = 53 * 5 / 2;

            //Breed = Coletar a Semente
            //Harvest = Coletar o Produto

            //Sementes Magicas Caixas/Mercado
            var totalSementeMagica = totalSlots / 5;
            var totalNovasSementesPorCicloMercado = totalSementeMagica / taxaSementesSementeMagicaBreed;
            var totalForragemPorCicloMercado = taxaForragemSementeMagicaBreed * totalNovasSementesPorCicloMercado;
            var totalFrutasPorCicloMercado = taxaFrutasSementeMagicaBreed * totalNovasSementesPorCicloMercado;
            var coletarPorCicloMercado = totalSementeMagica - totalNovasSementesPorCicloMercado;
            var colheita5SlotsPorCicloMercado = taxaColheita5Slot * coletarPorCicloMercado;
            var colheita10SlotsPorCicloMercado = taxaColheita10Slot * coletarPorCicloMercado;

            //Sementes Magicas NPC
            var totalNovasSementesPorCicloNPC = totalSementeMagica; //Coletar Todos os slots com Breeding (Coletar a semente)
            var totalForragemPorCicloNPC = taxaForragemSementeMagicaBreed * totalNovasSementesPorCicloNPC;
            var totalFrutasPorCicloNPC = taxaFrutasSementeMagicaBreed * totalNovasSementesPorCicloNPC;
            var sementesMagicasPorCicloNPC = taxaSementesSementeMagicaBreed * coletarPorCicloMercado;
            var forragemComTaxa = forragem.Valor * taxaPacoteEconomico;

            foreach (var colheita in colheitas)
            {
                var fruto = frutos.SingleOrDefault(c => colheita.FrutaReferenciaId == c.ReferenciaId);
                var quantidadeEspeciais = colheita.Slot == 1 ? colheita5SlotsPorCicloMercado : colheita10SlotsPorCicloMercado;
                var valorMercado = (long)((((totalForragemPorCicloMercado * forragemComTaxa) + (totalFrutasPorCicloMercado * fruto.Valor * taxaPacoteEconomico)) / colheita.Slot) + (colheita.PlantaEspecial != null ? colheita.PlantaEspecial.Valor * taxaPacoteEconomico : colheita.PlantaAltaQualidade.Valor * taxaPacoteEconomico) * quantidadeEspeciais);
                var valorNPC = (long)((totalForragemPorCicloNPC * forragemComTaxa) + (totalFrutasPorCicloNPC * fruto.Valor * taxaPacoteEconomico) + (sementesMagicasPorCicloNPC * colheita.ValorSementeMagica)) / colheita.Slot;
                var ciclosPorDia = Math.Min(maximoColheitaDia, (horasOnlineDia * 60) / colheita.TempoComFertilizante.TotalMinutes);
                resultado.Add(new CultivoResultadoViewModel
                {
                    Id = colheita.Id,
                    Img = !string.IsNullOrEmpty(colheita.Planta.ImagemUrl) ? $"Content/Image?referenciaId={colheita.PlantaReferenciaId}" : "",
                    Colheita = colheita.Planta.Nome,
                    CiclosPorDia = Math.Round(ciclosPorDia, 1),
                    ImgFruta = !string.IsNullOrEmpty(fruto.ImagemUrl) ? $"Content/Image?referenciaId={colheita.FrutaReferenciaId}" : "",
                    Fruta = fruto.Nome,
                    PrecoSementeMagica = colheita.ValorSementeMagica != null ? colheita.ValorSementeMagica.Value : 0,
                    Regiao = colheita.RegiaoIndicada,
                    TempoMinimoEmMinutos = colheita.TempoComFertilizante.TotalMinutes,
                    TempoMinimo = $"{colheita.TempoComFertilizante.Hours}h {(colheita.TempoComFertilizante.Minutes != 0 ? $"e {colheita.TempoComFertilizante.Minutes}m" : "")} ",
                    LucroMercado = (long)(valorMercado * ciclosPorDia),
                    LucroNPC = (long)(valorNPC * ciclosPorDia),
                    QuantidadeForragensNPC = Math.Round(totalForragemPorCicloNPC * ciclosPorDia, 1),
                    QuantidadeForragensMercado = Math.Round(totalForragemPorCicloMercado * ciclosPorDia, 1),
                    QuantidadeFrutosNPC = (long)(totalFrutasPorCicloNPC * ciclosPorDia),
                    QuantidadeFrutosMercado = (long)(totalFrutasPorCicloMercado * ciclosPorDia),
                    QuantidadeSementesMagicas = (long)(sementesMagicasPorCicloNPC * ciclosPorDia),
                    QuantidadePlantaEspecial = (long)(quantidadeEspeciais * ciclosPorDia),
                });
            }

            return resultado;
        }

        public async Task<List<ColheitaViewModel>> Listar()
        {
            return new ColheitaViewModel().Map(await _cultivoRepository.Listar());
        }
    }
}
