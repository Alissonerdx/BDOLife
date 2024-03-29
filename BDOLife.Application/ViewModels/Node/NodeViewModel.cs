﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class NodeViewModel
    {
        public string id { get; set; }
        public string parent { get; set; }
        public string text { get; set; }
        public string icon { get; set; }
        public Object li_attr { get; set; }
        public Object state { get; set; }
        public string nomeItem { get; set; }
        public long quantidade { get; set; }
        public long valor { get; set; }
        public string grupo { get; set; }
        public long quantidadeDisponivel { get; set; }
        public string dataAtualizacao { get; set; }
        public bool disponivel { get; set; }
        public bool vendeNPC { get; set; }
        public string localNPC { get; set; }
        public long? valorNPC { get; set; }
        public int tipo { get; set; }
        public long custoProducao { get; set; }
        public long custoProducaoProcNormalERaro { get; set; }

        public long custoCompra { get; set; }
        public string produzirOuComprar { get; set; }
        public long quantidadePorReceita { get; set; }
        public bool usarProcRaro { get; set; }
        public decimal procNormal { get; set; }
        public decimal procRaro { get; set; }
        public string referenciaId { get; set; }
        public bool possuiProcRaro { get; set; }
        public int nivelSubReceita { get; set; }
        public decimal peso { get; set; }
        public decimal pesoTotal { get; set; }
    }
}
