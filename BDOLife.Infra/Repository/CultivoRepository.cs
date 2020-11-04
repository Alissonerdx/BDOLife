using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Infra.Repository
{
    public class CultivoRepository : Repository<Colheita>, ICultivoRepository
    {
        public CultivoRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<List<Colheita>> Listar()
        {
            return await _dbContext.Colheitas
                //.Include(c => c.Fruta)
                .Include(c => c.Planta)
                .Include(c => c.PlantaAltaQualidade)
                .Include(c => c.PlantaEspecial)
                .ToListAsync();
        }
    }
}
