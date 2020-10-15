using BDOLife.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface ITipoProcessoExperienciaService
    {
        Task<IList<TipoProcessoExperienciaViewModel>> Listar();
    }
}
