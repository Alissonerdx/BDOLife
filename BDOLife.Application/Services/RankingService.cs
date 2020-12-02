using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Application.ViewModels.DataTable;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class RankingService : IRankingService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IItemService _itemService;
        private readonly IImperialService _imperialService;

        public RankingService(IItemRepository itemRepository, IItemService itemService, IImperialService imperialService)
        {
            _itemRepository = itemRepository;
            _itemService = itemService;
            _imperialService = imperialService;
        }

        public async Task<List<RankingDTViewModel>> Processar(int maestriaId)
        {
            var lista = new List<RankingDTViewModel>();

            var receitas = await _itemRepository.ListarReceitasPorTiposComResultado(new List<TipoReceitaEnum> { TipoReceitaEnum.Alquimia, TipoReceitaEnum.Culinaria });

            foreach(var receita in receitas)
            {
                var disponibilidadePrimaria = await _imperialService.DisponibilidadePrimaria(receita, 1);
                var disponibilidadesSecundarias = await _imperialService.DisponibilidadesSecundarias(receita, 1);

                var resultadoProcNormal = receita.Resultados?.SingleOrDefault(r => !r.ProcRaro)?.Resultado;
                var resultadoProcNormalHistorico = resultadoProcNormal.HistoricoPrecos.OrderByDescending(h => h.Data).ToList();
                var grafico = await _itemService.ProcessarHistoricoPrecos(resultadoProcNormal, resultadoProcNormalHistorico);
                lista.Add(new RankingDTViewModel
                {
                    Img = $"<img src='{$"/Content/Image?referenciaId={receita.ReferenciaId}"}' class='receita-item' data-valor='{receita.Valor}' data-disponivel='{receita.QuantidadeDisponivel}' data-nome='{receita.Nome}' data-atualizado='{receita.DataAtualizacao.ToString("dd/MM/yyyy HH:mm")}' style='max-width: 44px; '/>",
                    QuantidadeDisponivel = receita.QuantidadeDisponivel,
                    DataAtualizacao = receita.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    ReferenciaId = receita.ReferenciaId,
                    Receita = receita.Nome,
                    Valor = receita.Valor,
                    Oferta = grafico == null ? 0 : Math.Truncate(grafico.crescimentoOferta),
                    Demanda = grafico == null ? 0 : Math.Truncate(grafico.crescimentoProcura),
                    Valorizacao = grafico == null ? 0 : Math.Truncate(grafico.crescimentoPreco),
                    DisponibilidadePrimaria = disponibilidadePrimaria,
                    DisponibilidadesSecundarias = disponibilidadesSecundarias.Item1,
                    ItensQuantidadesNecessarias = ObjectMapper.Mapper.Map<List<Tuple<ItemViewModel, long, bool, long>>>(disponibilidadesSecundarias.Item2),
                    Lucro = receita.Valor
                });
            }

            return lista;
        }
    }
}
