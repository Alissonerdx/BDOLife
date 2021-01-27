using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Entities;
using BDOLife.Core.Entities.Base;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class ImperialService : IImperialService
    {
        private readonly IImperialRepository _imperialRepository;
        private readonly IMaestriaCulinariaRepository _maestriaCulinariaRepository;
        private readonly IMaestriaAlquimiaRepository _maestriaAlquimiaRepository;
        private readonly IItemRepository _itemRepository;

        public ImperialService(IImperialRepository imperialRepository,
            IItemRepository itemRepository,
            IMaestriaCulinariaRepository maestriaCulinariaRepository,
            IMaestriaAlquimiaRepository maestriaAlquimiaRepository)
        {
            _imperialRepository = imperialRepository;
            _itemRepository = itemRepository;
            _maestriaCulinariaRepository = maestriaCulinariaRepository;
            _maestriaAlquimiaRepository = maestriaAlquimiaRepository;
        }

        private long CalcularPreco(Imperial imperial, double? bonusImperial)
        {
            if (this != null && bonusImperial.HasValue)
            {
                var bonus = bonusImperial.HasValue ? bonusImperial.Value : 0;
                decimal valor = imperial.Valor * (imperial.PorcentagemBonus / 100m);
                return (long)(valor + (decimal)(imperial.Valor * bonus));
            }

            return 0;
        }

        private long QuantidadeImperial(ImperialReceita receita, long quantidade)
        {
            return (long)(quantidade / receita.Quantidade);
        }

        private long QuantidadePorCaixa(ImperialReceita receita)
        {
            return receita.Quantidade;
        }

        private string NomeItemImperial(ImperialReceita receita)
        {
            return receita.Imperial != null ? receita.Item.Nome + $" ({receita.Quantidade})" : string.Empty;
        }
        private string NomeCaixaImperial(ImperialReceita receita)
        {
            var nomeCaixa = receita.Imperial.Nome.Replace("Caixa de Culinária do ", "").Replace("Caixa de Remédios do ", "");
            return receita.Imperial != null ? nomeCaixa : string.Empty;
        }

        public long CalcularTotalSecundarias(Item item)
        {
            long total = 0;


            if (item.Tipo == TipoEnum.Item && item.ResultadosEm != null && item.ResultadosEm.Count > 0)
            {
                var receita = item.ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return total;

                foreach (var secundaria in receita.Receita.Itens)
                {
                    total += (secundaria.Quantidade * secundaria.Item.Valor);
                }
            }
            else
            if (item.Itens != null)
            {
                foreach (var secundaria in item.Itens)
                {
                    total += (secundaria.Quantidade * secundaria.Item.Valor);
                }
            }

            return total;
        }

        public async Task<double> DisponibilidadePrimaria(Item item, long quantidadeNecessaria)
        {
            var disponibilidade = 100.0;

            if (item.QuantidadeDisponivel > quantidadeNecessaria)
                return disponibilidade;

            return 0;
        }

        //Item, Quantidade Disponivel, Disponivel (True, False), Quantidade
        public async Task<Tuple<double, List<Tuple<Item, long, bool, long>>>> DisponibilidadesSecundarias(Item item, long quantidadeNecessaria)
        {
            var disponibilidade = 100.0;
            var itensQuantidades = new List<Tuple<Item, long, bool, long>>();


            if (item.Tipo == TipoEnum.Item && item.ResultadosEm != null && item.ResultadosEm.Count > 0)
            {
                var receita = item.ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return new Tuple<double, List<Tuple<Item, long, bool, long>>>(receita.Resultado.QuantidadeDisponivel > quantidadeNecessaria ? 100 : 0, new List<Tuple<Item, long, bool, long>>());

                var porcentagemIndividualIngrediente = 100.0 / receita.Receita.Itens.Count();

                foreach (var secundaria in receita.Receita.Itens)
                {
                    var quantidadeTotalNecessaria = quantidadeNecessaria * secundaria.Quantidade;
                    if (secundaria.Item.QuantidadeDisponivel < quantidadeTotalNecessaria)
                    {
                        itensQuantidades.Add(new Tuple<Item, long, bool, long>(secundaria.Item, quantidadeTotalNecessaria, false, secundaria.Quantidade));
                        disponibilidade -= porcentagemIndividualIngrediente;
                    }
                    else
                        itensQuantidades.Add(new Tuple<Item, long, bool, long>(secundaria.Item, quantidadeTotalNecessaria, true, secundaria.Quantidade));
                }
            }
            else
            if (item.Itens != null)
            {
                var porcentagemIndividualIngrediente = 100.0 / item.Itens.Count();

                foreach (var secundaria in item.Itens)
                {
                    var quantidadeTotalNecessaria = quantidadeNecessaria * secundaria.Quantidade;
                    if (secundaria.Item.QuantidadeDisponivel < quantidadeTotalNecessaria)
                    {
                        itensQuantidades.Add(new Tuple<Item, long, bool, long>(secundaria.Item, quantidadeTotalNecessaria, false, secundaria.Quantidade));
                        disponibilidade -= porcentagemIndividualIngrediente;
                    }
                    else
                        itensQuantidades.Add(new Tuple<Item, long, bool, long>(secundaria.Item, quantidadeTotalNecessaria, true, secundaria.Quantidade));

                }
            }

            return new Tuple<double, List<Tuple<Item, long, bool, long>>>(Math.Round(disponibilidade, 2), itensQuantidades);
        }

        public Item Receita(Item item)
        {
            if (item.Tipo == TipoEnum.Item && item.ResultadosEm != null && item.ResultadosEm.Count > 0)
            {
                var receita = item.ResultadosEm.FirstOrDefault();

                if (receita.ProcRaro)
                    return null;

                return receita.Receita;
            }
            else if (item.Itens != null)
                return item;

            return null;
        }

        private async Task<List<ImperialResultadoViewModel>> ProcessarCaixasImperial(int contribuicao, IList<ImperialReceita> imperiaisReceitas, MaestriaCulinaria maestriaCulinaria, MaestriaAlquimia maestriaAlquimia, TipoReceitaEnum? tipoReceita = null)
        {

            double regularProc = maestriaCulinaria != null ? maestriaCulinaria.RegularProc : maestriaAlquimia != null ? maestriaAlquimia.RegularProc : 0.0;
            double imperialBonus = maestriaCulinaria != null ? maestriaCulinaria.ImperialBonus : maestriaAlquimia != null ? maestriaAlquimia.ImperialBonus : 0.0;

            long quantidadeCaixasPorDia = contribuicao / 2;

            var lista = new List<ImperialResultadoViewModel>();

            foreach (var imperialReceita in imperiaisReceitas)
            {
                var quantidadeCaixa = QuantidadePorCaixa(imperialReceita);
                var valorPorCaixa = CalcularPreco(imperialReceita.Imperial, imperialBonus);
                var custoComprandoPrimaria = (long)(imperialReceita.Item.Valor * QuantidadePorCaixa(imperialReceita) * quantidadeCaixasPorDia);
                var custoComprandoSecundarias = CalcularTotalSecundarias(imperialReceita.Item) * (long)Math.Ceiling((quantidadeCaixasPorDia * quantidadeCaixa) / regularProc);
                var quantidadeTotalPrimaria = quantidadeCaixasPorDia * quantidadeCaixa;
                var disponibilidadePrimaria = await DisponibilidadePrimaria(imperialReceita.Item, quantidadeTotalPrimaria);
                var disponibilidadesSecundarias = await DisponibilidadesSecundarias(imperialReceita.Item, (long)Math.Ceiling((quantidadeCaixasPorDia * quantidadeCaixa) / regularProc));
                var lucroBrutoPorDia = quantidadeCaixasPorDia * valorPorCaixa;

                var itensQuantidadesNecessarias = ObjectMapper.Mapper.Map<List<Tuple<ItemViewModel, long, bool, long>>>(disponibilidadesSecundarias.Item2);
                var receita = ObjectMapper.Mapper.Map<ItemViewModel>(Receita(imperialReceita.Item));

                lista.Add(new ImperialResultadoViewModel
                {
                    Id = imperialReceita.Id,
                    Item = NomeItemImperial(imperialReceita),
                    DisponibilidadePrimaria = disponibilidadePrimaria,
                    DisponibilidadesSecundarias = disponibilidadesSecundarias.Item1,
                    TipoReceita = tipoReceita != null ? $"{(int)tipoReceita.Value}" : "",
                    Img = !string.IsNullOrEmpty(imperialReceita.Item.ImagemUrl) ? $"/Content/Imperial?caixa={(maestriaAlquimia != null ? "CAI_" : maestriaCulinaria != null ? "CCI_" : "")}{(int)imperialReceita.Imperial.Habilidade}" : "",
                    Caixa = NomeCaixaImperial(imperialReceita),
                    Valor = valorPorCaixa,
                    QuantidadePorCaixa = quantidadeCaixa,
                    ImgItem = $"<img src='{$"/Content/Image?referenciaId={imperialReceita.Item.ReferenciaId}"}' class='receita-item' data-empacotar='{quantidadeTotalPrimaria}' data-valor='{imperialReceita.Item.Valor}' data-disponivel='{imperialReceita.Item.QuantidadeDisponivel}' data-nome='{imperialReceita.Item.Nome}' data-atualizado='{imperialReceita.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm")}' style='max-width: 32px; {(disponibilidadePrimaria == 0 ? "filter: grayscale(100%); opacity: 40%;" : string.Empty)}'/>",
                    CustoComprandoPrimaria = custoComprandoPrimaria,
                    CustoComprandoSecundarias = custoComprandoSecundarias,
                    ItensQuantidadesNecessarias = itensQuantidadesNecessarias,
                    LucroBrutoPorDia = lucroBrutoPorDia,
                    LucroLiquidoPrimaria = lucroBrutoPorDia - custoComprandoPrimaria,
                    LucroLiquidoSecundaria = disponibilidadesSecundarias.Item2 == null || disponibilidadesSecundarias.Item2.Count == 0 ? 0 : lucroBrutoPorDia - custoComprandoSecundarias,
                    PossuiSubItens = disponibilidadesSecundarias.Item2.Count > 0,
                });
            }

            return lista.OrderBy(l => l.Caixa).ToList();
        }

        public async Task<IList<ImperialResultadoViewModel>> ListarImperiaisAlquimia(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var maestria = await _maestriaAlquimiaRepository.GetByIdAsync(maestriaId == 0 ? 1 : maestriaId);

            var imperiais = await _imperialRepository.ListarReceitasImperiaisAlquimia(nivel);

            return await ProcessarCaixasImperial(contribuicao, imperiais, null, maestria, TipoReceitaEnum.Alquimia);
        }

        public async Task<IList<ImperialResultadoViewModel>> ListarImperiaisCulinaria(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var maestria = await _maestriaCulinariaRepository.GetByIdAsync(maestriaId == 0 ? 1 : maestriaId);

            var imperiais = await _imperialRepository.ListarReceitasImperiaisCulinaria(nivel);

            return await ProcessarCaixasImperial(contribuicao, imperiais, maestria, null, TipoReceitaEnum.Culinaria);
        }

        public async Task<IList<ImperialReceitaViewModel>> ListarImperiaisPorReceitaReferenciaId(string referenciaId)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);
            if (receita != null)
            {
                var listaItensReferenciasIds = receita.Resultados.Select(i => i.ResultadoReferenciaId).ToList();
                var result = await _imperialRepository.ListarImperiaisPorReferenciasIds(listaItensReferenciasIds);
                return ObjectMapper.Mapper.Map<IList<ImperialReceitaViewModel>>(result);
            }
            return null;
        }
    }
}
