using BDOLife.Core.Entities.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Core.Entities
{
    public class Configuracao : Entity
    {
        public bool AtualizarMarketAutomaticamente { get; set; }
        public DateTime UltimaAtualizacaoMarket { get; set; }
        public bool Manutencao { get; set; }
        public string Versao { get; set; }
        public bool Atualizando { get; set; }
        public DateTime? ProximaAtualizacaoEm { get; set; }
    }
}
