using AspnetRun.Core.Repositories.Base;
using BDOLife.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Core.Repositories
{
    public interface IMaestriaProcessoRepository : IRepository<MaestriaProcesso>
    {
        Task<MaestriaProcesso> ObterPorValor(int valor);
    }
}
