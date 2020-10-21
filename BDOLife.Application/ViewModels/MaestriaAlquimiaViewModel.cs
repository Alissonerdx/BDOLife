using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class MaestriaAlquimiaViewModel : BaseViewModel
    {
		public int Mastery { get; set; }
		public double MaxProcChance { get; set; }
		public double ChanceRegularItems { get; set; }
		public double ChanceSpecialItems { get; set; }
		public double ChanceRareItems { get; set; }
		public double ImperialBonus { get; set; }
		public double RegularProc { get; set; }
		public double RareProc { get; set; }
	}
}
