using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Interfaces
{
    public interface IUtilService
    {
         Task<bool> ImportarNodes();
    }
}
