using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Infra.Repository
{
    public class SpotRepository : Repository<Spot>, ISpotRepository
    {
        public SpotRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<Spot>> Listar()
        {
            return await _dbContext.Spots.ToListAsync();
        }
    }
}
