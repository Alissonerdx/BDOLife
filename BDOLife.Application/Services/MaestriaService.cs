using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class MaestriaService : IMaestriaService
    {
        private readonly IMaestriaRepository _maestriaRepository;
        public MaestriaService(IMaestriaRepository maestriaRepository)
        {
            _maestriaRepository = maestriaRepository;
        }

        public async Task<ServiceResponse<IList<MaestriaViewModel>>> ListarPorTipoReceita(TipoMaestriaEnum tipo)
        {
            var data = await _maestriaRepository.ListarPorTipoReceita(tipo);
            return new ServiceResponse<IList<MaestriaViewModel>>
            {
                Data = ObjectMapper.Mapper.Map<IList<MaestriaViewModel>>(data)
            };
        }

        public async Task<MaestriaViewModel> ObterPorId(int maestriaId)
        {
            var maestria = await _maestriaRepository.GetByIdAsync(maestriaId);
            return ObjectMapper.Mapper.Map<MaestriaViewModel>(maestria);
        }
    }
}
