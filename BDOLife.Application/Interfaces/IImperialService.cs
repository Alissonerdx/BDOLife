using BDOLife.Application.ViewModels;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IImperialService
    {
        Task<IList<ImperialReceitaViewModel>> ListarImperiaisPorReceitaReferenciaId(string referenciaId);
        Task<IList<ImperialResultadoViewModel>> ListarImperiaisCulinaria(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao);
        Task<IList<ImperialResultadoViewModel>> ListarImperiaisAlquimia(NivelHabilidadeEnum? nivel, int maestriaId, int contribuicao);

    }
}
