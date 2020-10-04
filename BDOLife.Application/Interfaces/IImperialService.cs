using BDOLife.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IImperialService
    {
        Task<IList<ImperialReceitaViewModel>> ListarImperiaisPorReceitaReferenciaId(string referenciaId);
    }
}
