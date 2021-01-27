using BDOLife.Application.Services;
using BDOLife.Application.ViewModels;
using BDOLife.Application.ViewModels.DataTable;
using BDOLife.Application.ViewModels.Grafico;
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
        Task<ServiceResponse<ItemViewModel>> ObterPorReferenciaId(string referenciaId, bool excluidos = false);
        Task<Dictionary<ItemViewModel, long>> Ingredientes(string referenciaId, long quantidade, decimal procNormal);
        Task<IList<NodeViewModel>> TreeView(string referenciaId, long quantidade, decimal procNormal, decimal procRaro, bool semDetalhes = false, bool otimizar = false);
        Task<IList<NodeViewModel>> TreeViewSubReceita(string raiz, string referenciaId, int nivel, long quantidade, long quantidadePorReceita, decimal procNormal, decimal procRaro, bool usarProcRaro, bool semDetalhes = false, bool otimizar = false);
        Task<IList<NodeViewModel>> TreeViewRefatorado(string referenciaId, int quantidade, int maestriaId, TipoReceitaEnum tipoReceita, decimal procNormal, decimal procRaro, bool semDetalhes = false);
        Task<IList<ResultadoCalculadoViewModel>> Resultados(TipoReceitaEnum tipo, string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial);
        Task<IList<ImperialReceitaViewModel>> Imperial(string referenciaId);
        Task<IList<ReceitaResultadoViewModel>> ListarResultados(string referenciaId);
        Task<ServiceResponse<List<ItemViewModel>>> ObterPorListaDeReferenciasIds(List<string> referenciasIds);
        Task<Tuple<GraficoViewModel, GraficoViewModel>> GerarGraficoMercado(string receitaReferenciaId);
        Task<ServiceResponse<IList<ItemViewModel>>> ListarReceitasPorTipos(List<TipoReceitaEnum> tipos);
        Task<List<DependenciaViewModel>> ListarDependenciasDiretas(string referenciaId);
        Task<List<DependenciaViewModel>> ListarDependenciasIndiretas(string referenciaId);
        Task<Dictionary<ItemViewModel, long>> SubReceitasDiretas(string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestriaId, TipoReceitaEnum tipoReceita);
        Task<GraficoViewModel> ProcessarHistoricoPrecos(Item item, List<HistoricoPreco> dados);
        Task<IList<ItemViewModel>> Listar();
        Task<IList<ItemDTViewModel>> ListarDataTable();
        Task<IList<ReceitaItemViewModel>> ListarIngredientes(string referenciaId);
        Task<IList<ItemViewModel>> BuscarPorNome(string nome);
        Task<bool> Atualizar(string referenciaId, ItemViewModel item, string path = "");

    }
}
