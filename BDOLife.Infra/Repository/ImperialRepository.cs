using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using BDOLife.Core.Specifications.Base;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Infra.Repository
{
    public class ImperialRepository : Repository<Imperial>, IImperialRepository
    {
        public ImperialRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<ImperialReceita>> ListarImperiaisPorReferenciasIds(List<string> referenciasIds)
        {
            return await _dbContext.ImperiaisReceitas
                .Include(i => i.Imperial)
                .Where(i => referenciasIds.Contains(i.ItemReferenciaId)).ToListAsync();
        }


        //public async Task<IList<Imperial>> ListarImperiaisCulinaria(NivelHabilidadeEnum? nivel)
        //{
        //    var query = _dbContext.Imperiais
        //        .Include(i => i.Receitas)
        //        .ThenInclude(i => i.Item.ResultadosEm)
        //        .ThenInclude(i => i.Receita.Itens)
        //        .ThenInclude(i => i.Item)
        //        .AsQueryable();

        //    if (nivel != null)
        //        return await query.Where(i => i.Habilidade == nivel.Value).ToListAsync();

        //    return await query.ToListAsync();
        //}

        public async Task<IList<ImperialReceita>> ListarReceitasImperiaisCulinaria(NivelHabilidadeEnum? nivel)
        {
            var query = _dbContext.ImperiaisReceitas
                .Include(i => i.Imperial)
                .Include(i => i.Item.ResultadosEm)
                .ThenInclude(i => i.Receita.Itens)
                .ThenInclude(i => i.Item)
                .AsQueryable();

            if (nivel != null)
                return await query.Where(i => i.Imperial.Habilidade == nivel.Value && i.Imperial.Tipo == TipoReceitaEnum.ProcessoCulinariaImperial).ToListAsync();

            return await query.Where(i => i.Imperial.Tipo == TipoReceitaEnum.ProcessoCulinariaImperial).ToListAsync();
        }

        public async Task<IList<ImperialReceita>> ListarReceitasImperiaisAlquimia(NivelHabilidadeEnum? nivel)
        {
            var query = _dbContext.ImperiaisReceitas
                .Include(i => i.Imperial)
                .Include(i => i.Item.ResultadosEm)
                .ThenInclude(i => i.Receita.Itens)
                .ThenInclude(i => i.Item)
                .AsQueryable();

            if (nivel != null)
                return await query.Where(i => i.Imperial.Habilidade == nivel.Value && i.Imperial.Tipo == TipoReceitaEnum.ProcessoAlquimiaImperial).ToListAsync();

            return await query.Where(i => i.Imperial.Tipo == TipoReceitaEnum.ProcessoAlquimiaImperial).ToListAsync();
        }
    }
}
