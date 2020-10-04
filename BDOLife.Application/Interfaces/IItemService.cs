using BDOLife.Application.Services;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IItemService
    {
        Task<ServiceResponse<IList<ItemViewModel>>> ListarPorTipoReceita(TipoReceitaEnum tipo);
        Task<ServiceResponse<ItemViewModel>> ObterPorReferenciaId(string referenciaId);
        Task<Dictionary<ItemViewModel, long>> Ingredientes(string referenciaId, int quantidade, decimal procNormal);
        Task<IList<NodeViewModel>> TreeView(string referenciaId, int quantidade, decimal procNormal, bool semDetalhes = false);
        Task<IList<ResultadoCalculadoViewModel>> Resultados(string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria);
        Task<IList<ImperialReceitaViewModel>> Imperial(string referenciaId);
    }
}
