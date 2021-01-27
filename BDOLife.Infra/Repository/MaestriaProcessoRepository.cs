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
    public class MaestriaProcessoRepository : Repository<MaestriaProcesso>, IMaestriaProcessoRepository
    {
        public MaestriaProcessoRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<MaestriaProcesso> ObterPorValor(int valor)
        {
            return await _dbContext.MaestriasProcesso.SingleOrDefaultAsync(m => m.Mastery == valor);
        }
    }
}
