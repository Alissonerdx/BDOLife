using BDOLife.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface ICultivoService
    {
        Task<List<ColheitaViewModel>> Listar();
        Task<List<CultivoResultadoViewModel>> Calcular(int horasOnlineDia, int maximoColheitaDia, int totalSlots);
    }
}
