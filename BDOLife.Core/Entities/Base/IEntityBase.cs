﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities.Base
{
    public interface IEntityBase<TId>
    {
        TId Id { get; }
    }
}
