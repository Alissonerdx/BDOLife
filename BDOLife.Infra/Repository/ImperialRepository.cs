using BDOLife.Core.Entities;
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
    }
}
