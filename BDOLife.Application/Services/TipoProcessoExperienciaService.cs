using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class TipoProcessoExperienciaService : ITipoProcessoExperienciaService
    {
        private readonly ITipoProcessoExperienciaRepository _tipoProcessoExperienciaRepository;

        public TipoProcessoExperienciaService(ITipoProcessoExperienciaRepository tipoProcessoExperienciaRepository)
        {
            _tipoProcessoExperienciaRepository = tipoProcessoExperienciaRepository;
        }

        public Task<IList<TipoProcessoExperienciaViewModel>> Listar()
        {
            throw new NotImplementedException();
        }
    }
}
