using BDOLife.Application.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IProcessoService
    {
        Task<IList<ResultadoCalculadoViewModel>> Resultados(string referenciaId, long quantidade, decimal procNormal, decimal procRaro);
        Task<IList<MaestriaProcessoViewModel>> Maestrias();
    }
}
