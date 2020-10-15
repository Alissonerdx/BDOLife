using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class MaestriaCulinaria : Entity
    {
		public int Mastery { get; set; }
		public double RegularMaxProcChance { get; set; }
		public double RareMaxProcChance { get; set; }
		public double RareAddChance { get; set; }
		public double MassProduceChance { get; set; }
		public double ImperialBonus { get; set; }
		public double RegularProc { get; set; }
		public double RareProc { get; set; }
		public double Crafts { get; set; }
	}
}
