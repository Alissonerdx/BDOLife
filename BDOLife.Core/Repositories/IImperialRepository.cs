using AspnetRun.Core.Repositories.Base;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Core.Repositories
{
    public interface IImperialRepository : IRepository<Imperial>
    {
        Task<IList<ImperialReceita>> ListarImperiaisPorReferenciasIds(List<string> referenciasIds);
        //Task<IList<Imperial>> ListarImperiaisCulinaria(NivelHabilidadeEnum? nivel);
        //Task<IList<Imperial>> ListarImperiaisAlquimia(NivelHabilidadeEnum? nivel);
        Task<IList<ImperialReceita>> ListarReceitasImperiaisCulinaria(NivelHabilidadeEnum? nivel);
        Task<IList<ImperialReceita>> ListarReceitasImperiaisAlquimia(NivelHabilidadeEnum? nivel);
    }
}
