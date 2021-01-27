using BDOLife.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface ICalculadoraService
    {
        Task<IList<NodeViewModel>> TreeViewProcesso(string receitaReferenciaId, long quantidade, int? maestriaAlquimiaId);
        Task<IList<ResultadoCalculadoViewModel>> ResultadosProcesso(string receitaReferenciaId, long quantidade, int nivelProcesso);
        Task<Dictionary<ItemViewModel, long>> IngredientesDiretosProcesso(string receitaReferenciaId, long quantidade, decimal procNormalAlquimia, decimal procRaroAlquimia);
    }
}
