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
        Task<ServiceResponse<IList<ItemViewModel>>> ListarPorGrupo(string grupo);

        Task<ServiceResponse<ItemViewModel>> ObterPorReferenciaId(string referenciaId);
        Task<Dictionary<ItemViewModel, long>> Ingredientes(string referenciaId, int quantidade, decimal procNormal);
        Task<IList<NodeViewModel>> TreeView(string referenciaId, int quantidade, decimal procNormal, bool semDetalhes = false);
        Task<IList<NodeViewModel>> TreeViewSubReceita(string raiz, string referenciaId, int quantidade, int quantidadePorReceita, decimal procNormal, bool semDetalhes = false);
        Task<IList<ResultadoCalculadoViewModel>> Resultados(TipoReceitaEnum tipo, string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial);
        Task<IList<ImperialReceitaViewModel>> Imperial(string referenciaId);
        Task<ServiceResponse<List<ItemViewModel>>> ObterPorListaDeReferenciasIds(List<string> referenciasIds);
    }
}
