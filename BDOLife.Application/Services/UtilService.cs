using BDOLife.Application.Interfaces;
using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class UtilService : IUtilService
    {
        private readonly INodeRepository _nodeRepository;

        public UtilService(INodeRepository nodeRepository)
        {
            _nodeRepository = nodeRepository;
        }

        public async Task<bool> ImportarNodes()
        {
            var result = System.IO.File.ReadAllText(@".\Util\JSONs\Nodes.json");
            var nodes = JsonSerializer.Deserialize<List<Node>>(result);

            foreach(var node in nodes)
            {
                await _nodeRepository.Salvar(node);
            }

            return true;
        }
    }
}
