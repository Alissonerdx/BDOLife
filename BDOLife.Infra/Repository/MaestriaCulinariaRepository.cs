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
    public class MaestriaCulinariaRepository : Repository<MaestriaCulinaria>, IMaestriaCulinariaRepository
    {
        public MaestriaCulinariaRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<MaestriaCulinaria> ObterPorValor(int valor)
        {
            return await _dbContext.MaestriasCulinaria.SingleOrDefaultAsync(m => m.Mastery == valor);
        }
    }
}
