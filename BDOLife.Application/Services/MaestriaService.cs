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
        private readonly IMaestriaCulinariaRepository _maestriaCulinariaRepository;
        private readonly IMaestriaAlquimiaRepository _maestriaAlquimiaRepository;

        public MaestriaService(IMaestriaRepository maestriaRepository, IMaestriaCulinariaRepository maestriaCulinariaRepository, IMaestriaAlquimiaRepository maestriaAlquimiaRepository)
        {
            _maestriaCulinariaRepository = maestriaCulinariaRepository;
            _maestriaAlquimiaRepository = maestriaAlquimiaRepository;
        }

        public async Task<IList<MaestriaAlquimiaViewModel>> ListarMaestriasAlquimia()
        {
            return ObjectMapper.Mapper.Map<List<MaestriaAlquimiaViewModel>>(await _maestriaAlquimiaRepository.GetAllAsync());
        }

        public async Task<IList<MaestriaCulinariaViewModel>> ListarMaestriasCulinaria()
        {
            return ObjectMapper.Mapper.Map<List<MaestriaCulinariaViewModel>>(await _maestriaCulinariaRepository.GetAllAsync());
        }
    }
}
