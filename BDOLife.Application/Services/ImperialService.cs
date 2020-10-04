using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
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
        private readonly IItemRepository _itemRepository;

        public ImperialService(IImperialRepository imperialRepository, IItemRepository itemRepository)
        {
            _imperialRepository = imperialRepository;
            _itemRepository = itemRepository;
        }

        public async Task<IList<ImperialReceitaViewModel>> ListarImperiaisPorReceitaReferenciaId(string referenciaId)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);
            if(receita != null)
            {
                var listaItensReferenciasIds = receita.Resultados.Select(i => i.ResultadoReferenciaId).ToList();
                var result = await _imperialRepository.ListarImperiaisPorReferenciasIds(listaItensReferenciasIds);
                return ObjectMapper.Mapper.Map<IList<ImperialReceitaViewModel>>(result);
            }
            return null;
        }
    }
}
