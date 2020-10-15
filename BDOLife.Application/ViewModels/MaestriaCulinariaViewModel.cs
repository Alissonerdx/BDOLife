using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class MaestriaCulinariaViewModel : BaseViewModel
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
