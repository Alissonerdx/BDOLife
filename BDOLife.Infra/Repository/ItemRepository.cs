using BDOLife.Core.Entities;
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
            return await _dbContext.Itens.Where(i => i.TipoReceita == tipo).OrderBy(i => i.Nome).ToListAsync();
        }

        public async Task<Item> ObterPorReferenciaId(string referenciaId)
        {
            return await _dbContext.Itens
                .Include(i => i.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item.Itens)
                .ThenInclude(i => i.Item)
                .Include(i => i.Resultados)
                .ThenInclude(i => i.Resultado.ImperiaisReceitas)
                .ThenInclude(i => i.Imperial)
                .SingleOrDefaultAsync(i => i.ReferenciaId.Equals(referenciaId) && !i.Excluido);
        }
    }
}
