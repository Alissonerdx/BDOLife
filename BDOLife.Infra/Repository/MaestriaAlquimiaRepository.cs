using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Repository
{
    public class MaestriaAlquimiaRepository : Repository<MaestriaAlquimia>, IMaestriaAlquimiaRepository
    {
        public MaestriaAlquimiaRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }
    }
}
