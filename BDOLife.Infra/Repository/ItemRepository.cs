﻿using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BDOLife.Infra.Repository
{
    public class ItemRepository : Repository<Item>, IItemRepository
    {
        public ItemRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<Item>> ListarPorGrupo(string grupo)
        {
            return await _dbContext.Itens.Where(i => i.Grupo.Equals(grupo)).OrderBy(i => i.Nome).ToListAsync();
        }

        public async Task<IList<Item>> ListarPorTipoReceita(TipoReceitaEnum tipo)
        {
            return await _dbContext.Itens.Where(i => i.TipoReceita == tipo && i.Excluido == false).OrderBy(i => i.Nome).ToListAsync();
        }

        public async Task<Item> ObterPorReferenciaId(string referenciaId, bool excluidos = false)
        {
            var query = _dbContext.Itens
                .Include(i => i.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                //.ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item)
                .Include(i => i.Resultados)
                .ThenInclude(i => i.Resultado.ImperiaisReceitas)
                .ThenInclude(i => i.Imperial).AsQueryable();

            if (!excluidos)
                query = query.Where(i => !i.Excluido);

            return await query.SingleOrDefaultAsync(i => i.ReferenciaId.Equals(referenciaId));
        }

        public async Task<Item> ObterComReceitasPorReferenciaId(string referenciaId)
        {
            return await _dbContext.Itens
                .Include(i => i.Receitas)
                .ThenInclude(i => i.Receita.Receitas)
                .ThenInclude(i => i.Item.Receitas)
                .ThenInclude(i => i.Receita)
                .SingleOrDefaultAsync(i => i.ReferenciaId.Equals(referenciaId) && !i.Excluido);
        }

        public async Task<IList<Item>> ObterPorReferenciasIds(List<string> referenciasIds)
        {
            return await _dbContext.Itens.Where(i => referenciasIds.Contains(i.ReferenciaId) && !i.Excluido).ToListAsync();
        }

        public async Task<IList<ReceitaResultado>> ListarReceitaResultados(string receitaReferenciaId)
        {
            var receita = await _dbContext.Itens
                .Include(i => i.Resultados)
                .ThenInclude(i => i.Resultado.HistoricoPrecos)
                .SingleOrDefaultAsync(i => i.ReferenciaId == receitaReferenciaId);

            return receita?.Resultados;
        }

        public async Task<IList<ReceitaItem>> ListarReceitaItens(string receitaReferenciaId)
        {
            var receita = await _dbContext.Itens
                .Include(i => i.Itens)
                .ThenInclude(i => i.Item)
                .SingleOrDefaultAsync(i => i.ReferenciaId == receitaReferenciaId);

            return receita?.Itens;
        }

        public async Task<IList<Item>> ListarReceitasPorTipos(List<TipoReceitaEnum> tipos)
        {
            return await _dbContext.Itens.Where(i => i.TipoReceita != null && tipos.Contains(i.TipoReceita.Value) && i.Excluido == false).OrderBy(i => i.Nome).ToListAsync();
        }

        public async Task<IList<Item>> ListarReceitasPorTiposComResultado(List<TipoReceitaEnum> tipos)
        {
            return await _dbContext.Itens
                .Include(i => i.Itens)
                .ThenInclude(i => i.Item)
                .Include(i => i.Resultados)
                .ThenInclude(i => i.Resultado.HistoricoPrecos)
                .Where(i => i.TipoReceita != null && tipos.Contains(i.TipoReceita.Value) && i.Excluido == false && i.Resultados != null && i.Resultados.Count > 0).OrderBy(i => i.Nome).ToListAsync();
        }

        public async Task<IList<Item>> Listar()
        {
            return await _dbContext.Itens.ToListAsync();
        }

        public async Task<IList<Item>> BuscarPorNome(string nome)
        {
            return await _dbContext.Itens.Where(i => i.Nome.Contains(nome)).ToListAsync();
        }

        public async Task<bool> ExcluirHistoricoPorReferenciaId(string referenciaId)
        {
            var historicos = _dbContext.HistoricosPrecos.Where(h => h.ItemReferenciaId == referenciaId).ToList();
            _dbContext.HistoricosPrecos.RemoveRange(historicos);
            return await _dbContext.SaveChangesAsync() > 0;
        }
    }
}
