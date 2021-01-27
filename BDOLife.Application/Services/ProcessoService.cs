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
    public class ProcessoService : IProcessoService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMaestriaProcessoRepository _maestriaProcessoRepository;
        private readonly IMaestriaAlquimiaRepository _maestriaAlquimiaRepository;
        public ProcessoService(
            IItemRepository itemRepository, 
            IMaestriaProcessoRepository maestriaProcessoRepository,
            IMaestriaAlquimiaRepository maestriaAlquimiaRepository)
        {
            _itemRepository = itemRepository;
            _maestriaProcessoRepository = maestriaProcessoRepository;
            _maestriaAlquimiaRepository = maestriaAlquimiaRepository;
        }

        public async Task<IList<MaestriaProcessoViewModel>> Maestrias()
        {
            return ObjectMapper.Mapper.Map<List<MaestriaProcessoViewModel>>(await _maestriaProcessoRepository.GetAllAsync());
        }

        public async Task<IList<ResultadoCalculadoViewModel>> Resultados(string referenciaId, long quantidade, decimal procNormal, decimal procRaro)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);
            var result = new List<ResultadoCalculadoViewModel>();

            foreach(var resultado in receita.Resultados)
            {
                var proc = resultado.Tier != null && resultado.Tier.Value == TierProcessoEnum.T1 ? procNormal : procRaro;
                var quantidadeTotal = (long)(proc * quantidade);

                result.Add(new ResultadoCalculadoViewModel
                {
                    Img = !string.IsNullOrEmpty(resultado.Resultado.ImagemUrl) ? $"/Content/Image?referenciaId={resultado.Resultado.ReferenciaId}" : "",
                    Item = resultado.Resultado.Nome,
                    Quantidade = quantidadeTotal,
                    Preco = resultado.Resultado.Valor,
                    Total = quantidadeTotal * resultado.Resultado.Valor,
                });
            }

            return result;
        }
    }
}
