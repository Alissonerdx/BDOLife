using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Repository
{
    public class ReceitaItemRepository : Repository<ReceitaItem>, IReceitaItemRepository
    {
        public ReceitaItemRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }
    }
}
