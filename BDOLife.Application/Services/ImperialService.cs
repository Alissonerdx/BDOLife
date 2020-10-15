using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
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
        private readonly IItemRepository _itemRepository;

        public ImperialService(IImperialRepository imperialRepository, IItemRepository itemRepository, IMaestriaCulinariaRepository maestriaCulinariaRepository)
        {
            _imperialRepository = imperialRepository;
            _itemRepository = itemRepository;
            _maestriaCulinariaRepository = maestriaCulinariaRepository;
        }

        public async Task<IList<ImperialCulinariaResultadoViewModel>> ListarImperiaisCulinaria(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao)
        {
            var maestria = await _maestriaCulinariaRepository.GetByIdAsync(maestriaId);
            if (maestria == null)
                maestria = await _maestriaCulinariaRepository.GetByIdAsync(1);

            var imperiais = await _imperialRepository.ListarImperiaisCulinaria(nivel);
            long quantidadeCaixasPorDia = contribuicao / 2;

            var lista = new List<ImperialCulinariaResultadoViewModel>();

            var imperiaisViewModel = ObjectMapper.Mapper.Map<List<ImperialViewModel>>(imperiais);
            foreach (var imperial in imperiaisViewModel)
            {
                foreach (var imperialReceita in imperial.Receitas)
                {
                    imperialReceita.Imperial = imperial;

                    var quantidadeCaixa = imperialReceita.QuantidadePorCaixa();
                    var valorPorCaixa = imperialReceita.CalcularPreco(maestria != null ? maestria.ImperialBonus : 0);
                    var custoComprandoPrimaria = (long)(imperialReceita.Item.Valor * imperialReceita.QuantidadePorCaixa() * quantidadeCaixasPorDia);
                    var custoComprandoSecundarias = imperialReceita.Item.CalcularTotalSecundarias() * (long)Math.Ceiling((quantidadeCaixasPorDia * quantidadeCaixa) / maestria.RegularProc);
                    var quantidadeTotalPrimaria = quantidadeCaixasPorDia * quantidadeCaixa;
                    var disponibilidadePrimaria = imperialReceita.Item.DisponibilidadePrimaria(quantidadeTotalPrimaria);
                    var disponibilidadesSecundarias = imperialReceita.Item.DisponibilidadesSecundarias((long)Math.Ceiling((quantidadeCaixasPorDia * quantidadeCaixa) / maestria.RegularProc));
                    var lucroBrutoPorDia = quantidadeCaixasPorDia * valorPorCaixa;

                    lista.Add(new ImperialCulinariaResultadoViewModel { 
                        Id = imperialReceita.Id,
                        Img = !string.IsNullOrEmpty(imperialReceita.Item.ImagemUrl) ? $"/Content/Imperial?nivel={(int)imperialReceita.Imperial.Habilidade}" : "",
                        Caixa = imperialReceita.NomeCaixaImperial(),
                        Valor = valorPorCaixa,
                        QuantidadePorCaixa = quantidadeCaixa,
                        Item = imperialReceita.Item.Nome,
                        ImgItem = $"<img src='{$"/Content/Image?referenciaId={imperialReceita.Item.ReferenciaId}"}' class='receita-item' data-empacotar='{quantidadeTotalPrimaria}' data-valor='{imperialReceita.Item.Valor}' data-disponivel='{imperialReceita.Item.QuantidadeDisponivel}' data-nome='{imperialReceita.Item.Nome}' data-atualizado='{imperialReceita.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm")}' style='max-width: 44px; {(disponibilidadePrimaria == 0 ? "filter: grayscale(100%); opacity: 40%;" : string.Empty)}'/>",
                        CustoComprandoPrimaria = custoComprandoPrimaria,
                        CustoComprandoSecundarias = custoComprandoSecundarias,
                        DisponibilidadePrimaria = disponibilidadePrimaria,
                        DisponibilidadesSecundarias = disponibilidadesSecundarias.Item1,
                        ItensQuantidadesNecessarias = disponibilidadesSecundarias.Item2,
                        LucroBrutoPorDia = lucroBrutoPorDia,
                        LucroLiquidoPrimaria = lucroBrutoPorDia - custoComprandoPrimaria,
                        LucroLiquidoSecundaria = lucroBrutoPorDia - custoComprandoSecundarias,
                        PossuiSubItens = disponibilidadesSecundarias.Item2.Count > 0,
                        Receita = imperialReceita.Item.Receita()
                    });
                }
            }

            return lista.OrderBy(l => l.Caixa).ToList();
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
