using BDOLife.Application.Interfaces;
using BDOLife.Core.Entities;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text.Json;

namespace BDOLife.Application.Services
{
    public class UtilService : IUtilService
    {
        private readonly INodeRepository _nodeRepository;

        public UtilService(INodeRepository nodeRepository)
        {
            _nodeRepository = nodeRepository;
        }

        public bool ImportarNodes()
        {
            var result = System.IO.File.ReadAllText(@".\Util\JSONs\Nodes.json");
            var nodes = JsonSerializer.Deserialize<List<Node>>(result);

            foreach(var node in nodes)
            {
                _nodeRepository.AddAsync(node);
            }

            return true;
        }
    }
}
