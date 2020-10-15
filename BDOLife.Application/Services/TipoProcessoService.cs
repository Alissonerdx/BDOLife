using BDOLife.Application.Interfaces;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.Services
{
    public class TipoProcessoService : ITipoProcessoService
    {
        private readonly ITipoProcessoRepository _tipoProcessoRepository;

        public TipoProcessoService(ITipoProcessoRepository tipoProcessoRepository)
        {
            _tipoProcessoRepository = tipoProcessoRepository;
        }
    }
}
