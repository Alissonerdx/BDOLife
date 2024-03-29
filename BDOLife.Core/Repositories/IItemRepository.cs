﻿using AspnetRun.Core.Repositories.Base;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Core.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        Task<IList<Item>> ListarPorTipoReceita(TipoReceitaEnum tipo);
        Task<Item> ObterPorReferenciaId(string referenciaId, bool excluidos = false);
        Task<IList<Item>> ListarPorGrupo(string grupo);
        Task<IList<Item>> ObterPorReferenciasIds(List<string> referenciasIds);
        Task<IList<ReceitaItem>> ListarReceitaItens(string receitaReferenciaId);
        Task<IList<ReceitaResultado>> ListarReceitaResultados(string receitaReferenciaId);
        Task<IList<Item>> ListarReceitasPorTipos(List<TipoReceitaEnum> tipos);
        Task<Item> ObterComReceitasPorReferenciaId(string referenciaId);
        Task<IList<Item>> ListarReceitasPorTiposComResultado(List<TipoReceitaEnum> tipos);
        Task<IList<Item>> Listar();
        Task<IList<Item>> BuscarPorNome(string nome);
        Task<bool> ExcluirHistoricoPorReferenciaId(string referenciaId);

    }
}
