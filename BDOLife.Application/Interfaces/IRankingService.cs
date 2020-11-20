using BDOLife.Application.ViewModels.DataTable;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IRankingService
    {
        Task<List<RankingDTViewModel>> Processar(int maestriaId);
    }
}
