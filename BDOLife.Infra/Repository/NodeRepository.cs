using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Infra.Repository
{
    public class NodeRepository : Repository<Node>, INodeRepository
    {
        public NodeRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }
    }
}
