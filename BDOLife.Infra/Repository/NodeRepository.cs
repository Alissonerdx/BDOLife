using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using BDOLife.Infra.Data;
using BDOLife.Infra.Repositories.Base;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Infra.Repository
{
    public class NodeRepository : Repository<Node>, INodeRepository
    {
        public NodeRepository(BDOLifeContext dbContext) : base(dbContext)
        {
        }

        public async Task Salvar(Node node)
        {
            await _dbContext.AddAsync(node);
            await _dbContext.SaveChangesAsync();
        }
    }
}
