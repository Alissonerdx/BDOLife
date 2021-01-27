using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Repository
{
    public class ReceitaResultadoRepository : Repository<ReceitaResultado>, IReceitaResultadoRepository
    {
        public ReceitaResultadoRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }
    }
}
