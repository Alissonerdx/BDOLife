using AspnetRun.Core.Repositories.Base;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Core.Repositories
{
    public interface IMaestriaRepository : IRepository<Maestria>
    {
        Task<IList<Maestria>> ListarPorTipoReceita(TipoMaestriaEnum tipo);
    }
}
