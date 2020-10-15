using AspnetRun.Core.Repositories.Base;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Core.Repositories
{
    public interface IItemRepository : IRepository<Item>
    {
        Task<IList<Item>> ListarPorTipoReceita(TipoReceitaEnum tipo);
        Task<Item> ObterPorReferenciaId(string referenciaId);
        Task<IList<Item>> ListarPorGrupo(string grupo);
    }
}
