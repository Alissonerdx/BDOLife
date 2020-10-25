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
    public class MaestriaAlquimiaRepository : Repository<MaestriaAlquimia>, IMaestriaAlquimiaRepository
    {
        public MaestriaAlquimiaRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<MaestriaAlquimia> ObterPorValor(int valor)
        {
            return await _dbContext.MaestriasAlquimia.SingleOrDefaultAsync(m => m.Mastery == valor);
        }
    }
}
