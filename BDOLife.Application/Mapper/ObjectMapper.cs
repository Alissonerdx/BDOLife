using AutoMapper;
using BDOLife.Application.ViewModels;
using BDOLife.Core.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BDOLife.Application.Mapper
{
    public class ObjectMapper
    {
        public static IMapper Mapper
        {
            get
            {
                return AutoMapper.Mapper.Instance;
            }
        }
        static ObjectMapper()
        {
            CreateMap();
        }

        private static void CreateMap()
        {
            AutoMapper.Mapper.Initialize(cfg =>
            {
                cfg.CreateMap<Item, ItemViewModel>();
                cfg.CreateMap<ItemViewModel, Item>();
                cfg.CreateMap<Maestria, MaestriaViewModel>();
                cfg.CreateMap<MaestriaViewModel, Maestria>();
                cfg.CreateMap<AgrupamentoItem, AgrupamentoItemViewModel>();
                cfg.CreateMap<AgrupamentoItemViewModel, AgrupamentoItem>();
                cfg.CreateMap<Agrupamento, AgrupamentoViewModel>();
                cfg.CreateMap<AgrupamentoViewModel, Agrupamento>();
                cfg.CreateMap<HistoricoPreco, HistoricoPrecoViewModel>();
                cfg.CreateMap<HistoricoPrecoViewModel, HistoricoPreco>();
                cfg.CreateMap<ReceitaItem, ReceitaItemViewModel>();
                cfg.CreateMap<ReceitaItemViewModel, ReceitaItem>();
                cfg.CreateMap<ReceitaResultado, ReceitaResultadoViewModel>();
                cfg.CreateMap<ReceitaResultadoViewModel, ReceitaResultado>();
                cfg.CreateMap<Imperial, ImperialViewModel>();
                cfg.CreateMap<ImperialViewModel, Imperial>();
                cfg.CreateMap<ImperialReceita, ImperialReceitaViewModel>();
                cfg.CreateMap<ImperialReceitaViewModel, ImperialReceita>();
                cfg.CreateMap<MaestriaCulinaria, MaestriaCulinariaViewModel>();
                cfg.CreateMap<MaestriaCulinariaViewModel, MaestriaCulinaria>();
                cfg.CreateMap<MaestriaAlquimiaViewModel, MaestriaAlquimia>();
                cfg.CreateMap<MaestriaAlquimia, MaestriaAlquimiaViewModel>();
                cfg.CreateMap<Colheita, ColheitaViewModel>();
                cfg.CreateMap<ColheitaViewModel,Colheita>();
                cfg.CreateMap<Spot, SpotViewModel>();
                cfg.CreateMap<SpotViewModel, Spot>();

            });
        }
    }
}
