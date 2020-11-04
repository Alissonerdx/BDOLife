using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.ViewModels
{
    public class CultivoResultadoViewModel
    {
        public int Id { get; set; }
        public string Img { get; set; }
        public string Colheita { get; set; }
        public string ImgFruta { get; set; }
        public string Fruta { get; set; }
        public string TempoMinimo { get; set; }
        public double CiclosPorDia { get; set; }
        public string Regiao { get; set; }
        public long LucroMercado { get; set; }
        public long LucroNPC { get; set; }
        public long QuantidadeFrutosNPC { get; set; }
        public long QuantidadeFrutosMercado { get; set; }
        public double QuantidadeForragensMercado { get; set; }
        public double QuantidadeForragensNPC { get; set; }
        public long QuantidadeSementesMagicas { get; set; }
        public long QuantidadePlantaEspecial { get; set; }

    }
}
