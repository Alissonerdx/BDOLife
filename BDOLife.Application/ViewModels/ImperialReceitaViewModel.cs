using BDOLife.Application.Models.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class ImperialReceitaViewModel : BaseViewModel
    {
        public int ImperialId { get; set; }
        public virtual ImperialViewModel Imperial { get; set; }
        public int Quantidade { get; set; }
        public string ItemReferenciaId { get; set; }
        public virtual ItemViewModel Item { get; set; }
        public long ValorPorCaixa { get; set; }

        public long CalcularPreco(double? bonusImperial)
        {
            if (this != null && bonusImperial.HasValue)
            {
                var bonus = bonusImperial.HasValue ? bonusImperial.Value : 0;
                decimal valor = this.Imperial.Valor * (this.Imperial.PorcentagemBonus / 100m);
                return (long)(valor + (decimal)(this.Imperial.Valor * bonus));
            }

            return 0;
        }

        public long QuantidadeImperial(long quantidade)
        {
            return (long)(quantidade / this.Quantidade);
        }

        public long QuantidadePorCaixa()
        {
            return this.Quantidade;
        }

        public string NomeCaixaImperial()
        {
            return this.Imperial != null ? this.Imperial.Nome + $" ({this.Quantidade})" : string.Empty;
        }

       
    }
}
