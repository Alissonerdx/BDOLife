using BDOLife.Application.Services;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IMaestriaService
    {
        Task<IList<MaestriaCulinariaViewModel>> ListarMaestriasCulinaria();
    }
}
