using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
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
    public class MaestriaRepository : Repository<Maestria>, IMaestriaRepository
    {
        public MaestriaRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task<IList<Maestria>> ListarPorTipoReceita(TipoMaestriaEnum tipo)
        {
            return await _dbContext.Maestrias.Where(m => m.Tipo == tipo).ToListAsync();
        }
    }
}
