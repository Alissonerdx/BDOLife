using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Repository
{
    public class TipoProcessoExperienciaRepository : Repository<TipoProcessoExperiencia>, ITipoProcessoExperienciaRepository
    {
        public TipoProcessoExperienciaRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }
    }
}
