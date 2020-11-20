using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
using BDOLife.Application.ViewModels;
using BDOLife.Application.ViewModels.Grafico;
using BDOLife.Core.Entities;
using BDOLife.Core.Enums;
using BDOLife.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BDOLife.Application.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMaestriaRepository _maestriaRepository;
        private readonly IMaestriaCulinariaRepository _maestriaCulinariaRepository;
        private readonly IMaestriaAlquimiaRepository _maestriaAlquimiaRepository;

        public ItemService(IItemRepository itemRepository,
            IMaestriaRepository maestriaRepository,
            IMaestriaCulinariaRepository maestriaCulinariaRepository,
            IMaestriaAlquimiaRepository maestriaAlquimiaRepository)
        {
            _itemRepository = itemRepository;
            _maestriaRepository = maestriaRepository;
            _maestriaAlquimiaRepository = maestriaAlquimiaRepository;
            _maestriaCulinariaRepository = maestriaCulinariaRepository;
        }



        public async Task<ServiceResponse<IList<ItemViewModel>>> ListarPorTipoReceita(TipoReceitaEnum tipo)
        {
            var data = await _itemRepository.ListarPorTipoReceita(tipo);
            return new ServiceResponse<IList<ItemViewModel>>
            {
                Data = ObjectMapper.Mapper.Map<IList<ItemViewModel>>(data)
            };
        }

        private bool EhProcesso(Item receita)
        {
            switch (receita.TipoReceita)
            {
                case TipoReceitaEnum.ProcessoAlquimiaImperial:
                    return true;
                case TipoReceitaEnum.ProcessoAlquimiaSimples:
                    return true;
                case TipoReceitaEnum.ProcessoAquecimento:
                    return true;
                case TipoReceitaEnum.ProcessoChacoalhar:
                    return true;
                case TipoReceitaEnum.ProcessoCorte:
                    return true;
                case TipoReceitaEnum.ProcessoCozinhaSimples:
                    return true;
                case TipoReceitaEnum.ProcessoCulinariaImperial:
                    return true;
                case TipoReceitaEnum.ProcessoDesidratacao:
                    return true;
                case TipoReceitaEnum.ProcessoFabrica:
                    return true;
                case TipoReceitaEnum.ProcessoFabricaGuilda:
                    return true;
                case TipoReceitaEnum.ProcessoFiltragem:
                    return true;
                case TipoReceitaEnum.ProcessoMoagem:
                    return true;
                default:
                    return false;
            }
        }

        public async Task<GraficoViewModel> ProcessarHistoricoPrecos(Item item, List<HistoricoPreco> dados)
        {
            double crescimentoProcura = 0.0;
            double crescimentoOferta = 0.0;
            double crescimentoPreco = 0.0;
            var decisaoMercadoComprar = "";
            var decisaoMercadoVender = "";
            long melhorPrecoCompra = 0;
            long melhorPrecoVenda = 0;
            var melhorDataCompra = DateTime.MinValue;
            var melhorDataVenda = DateTime.MinValue;

            if (dados.Count > 2)
            {
                var dadosTemp = dados.Take(120).ToList();

                var dadosAgrupadosPorDia = dadosTemp.GroupBy(d => $"{d.Data.Day}_{d.Data.Month}");

                var demandaMediasDia = new Dictionary<string, MediaItemViewModel>();
                var dataProcessamento = DateTime.Now;
                var dataAnterior = DateTime.Now.AddDays(-1);

                double mediaDemandaTodosDias = 0.0;
                double mediaOfertaTodosDias = 0.0;
                double mediaPrecoTodosDias = 0.0;

                var index = 0;
                foreach (var grupo in dadosAgrupadosPorDia)
                {
                    demandaMediasDia.Add(grupo.Key, new MediaItemViewModel { MediaDemanda = 0, MediaOferta = 0, MediaPreco = 0 });
                    foreach (var demanda in grupo)
                    {
                        demandaMediasDia[grupo.Key].MediaDemanda += demanda.QuantidadeTotalVenda;
                        demandaMediasDia[grupo.Key].MediaOferta += demanda.QuantidadeDisponivel;
                        demandaMediasDia[grupo.Key].MediaPreco += demanda.Valor;
                    }

                    demandaMediasDia[grupo.Key].MediaDemanda /= grupo.Count();
                    demandaMediasDia[grupo.Key].MediaOferta /= grupo.Count();
                    demandaMediasDia[grupo.Key].MediaPreco /= grupo.Count();


                    if (index > 1)
                    {
                        mediaDemandaTodosDias += demandaMediasDia[grupo.Key].MediaDemanda;
                        mediaOfertaTodosDias += demandaMediasDia[grupo.Key].MediaOferta;
                        mediaPrecoTodosDias += demandaMediasDia[grupo.Key].MediaPreco;
                    }

                    index++;
                }

                mediaDemandaTodosDias /= (dadosAgrupadosPorDia.Count() - 2);
                mediaOfertaTodosDias /= (dadosAgrupadosPorDia.Count() - 2);
                mediaPrecoTodosDias /= (dadosAgrupadosPorDia.Count() - 2);


                var ultimaAtt = dadosTemp[0];
                var ultimaMediaDia = demandaMediasDia.ElementAt(1);



                //for(int i = 1; i < dadosTemp.Count; i++)
                //{
                //    mediaProcura += dadosTemp[i].QuantidadeTotalVenda;
                //    mediaOferta += dadosTemp[i].QuantidadeDisponivel;
                //    mediaPreco += dadosTemp[i].Valor;
                //}

                //mediaProcura /= (dadosTemp.Count - 1);
                //mediaOferta /= (dadosTemp.Count - 1);
                //mediaPreco /= (dadosTemp.Count - 1);

                //crescimentoProcura = ((double)((ultimaAtt.QuantidadeTotalVenda - penultimaAtt.QuantidadeTotalVenda) - mediaProcura) / (mediaProcura == 0 ? 1 : mediaProcura)) * 100.0;
                //crescimentoProcura = ((double)(ultimaAtt.QuantidadeTotalVenda - mediaProcura) / (mediaProcura == 0 ? 1 : mediaProcura)) * 100.0;
                //crescimentoOferta = ((double)(ultimaAtt.QuantidadeDisponivel - mediaOferta) / (mediaOferta == 0 ? 1 : mediaOferta)) * 100.0;
                //crescimentoPreco = ((double)(ultimaAtt.Valor - mediaPreco) / (mediaPreco == 0 ? 1 : mediaPreco)) * 100.0;

                crescimentoProcura = ((double)(ultimaMediaDia.Value.MediaDemanda - mediaDemandaTodosDias) / (mediaDemandaTodosDias == 0 ? 1 : mediaDemandaTodosDias)) * 100.0;
                crescimentoOferta = ((double)(ultimaMediaDia.Value.MediaOferta - mediaOfertaTodosDias) / (mediaOfertaTodosDias == 0 ? 1 : mediaOfertaTodosDias)) * 100.0;
                crescimentoPreco = ((double)(ultimaMediaDia.Value.MediaPreco - mediaPrecoTodosDias) / (mediaPrecoTodosDias == 0 ? 1 : mediaPrecoTodosDias)) * 100.0;


                dados = dados.Take(120).ToList();
                dados = dados.OrderBy(h => h.Data).ToList();

                var precoAtual = ultimaAtt.Valor;
                var dataAtual = ultimaAtt.Data;
                var maiorPreco = precoAtual;
                var maiorData = dataAtual;
                var menorPreco = precoAtual;
                var menorData = dataAtual;

                for (var i = 0; i < dados.Count(); i++)
                {
                    if (i > 1)
                    {
                        var preco = dados[i].Valor;
                        var data = dados[i].Data;
                        if (preco >= maiorPreco)
                        {
                            maiorPreco = preco;
                            maiorData = data;
                        }

                        if (preco <= menorPreco)
                        {
                            menorPreco = preco;
                            menorData = data;
                        }
                    }
                }

                melhorDataCompra = menorData;
                melhorPrecoCompra = menorPreco;

                melhorDataVenda = maiorData;
                melhorPrecoVenda = maiorPreco;

                decisaoMercadoComprar = melhorDataCompra == ultimaAtt.Data ? "Boa hora para comprar" : $"Boa data para comprar foi em {melhorDataCompra.ToString("dd/MM/yyyy HH:mm")} por {melhorPrecoCompra} pratas";
                decisaoMercadoVender = melhorDataVenda == ultimaAtt.Data ? "Boa hora para vender" : $"Boa data para vender foi em {melhorDataVenda.ToString("dd/MM/yyyy HH:mm")} por {melhorPrecoVenda} pratas";
            }

            return new GraficoViewModel
            {
                labels = dados.Select(d => d.Data.ToString("dd/MM/yyyy HH:mm")).ToArray(),
                datasets = new List<Object> {
                            new {
                                label = "Preço Médio",
                                data = dados.Select(d => d.Valor).ToArray(),
                                backgroundColor = "transparent",
                                borderColor = "#1DE9B6",
                                borderWidth = 2,
                                pointColor = "#fff",
                                pointBorderColor = "#494C56",
                                pointBackgroundColor = "#fff",
                                pointBorderWidth = 3,
                                pointHoverBorderWidth = 4,
                                pointRadius = 2
                            },
                            new
                            {
                                label = "Quantidade Disponível",
                                data = dados.Select(d => d.QuantidadeDisponivel).ToArray(),
                                backgroundColor = "transparent",
                                borderColor = "#F0A748",
                                borderWidth = 2,
                                pointColor = "#fff",
                                pointBorderColor = "#494C56",
                                pointBackgroundColor = "#fff",
                                pointBorderWidth = 3,
                                pointHoverBorderWidth = 4,
                                pointRadius = 2
                            }
                        },
                crescimentoProcura = crescimentoProcura,
                crescimentoOferta = crescimentoOferta,
                crescimentoPreco = crescimentoPreco,
                melhorDataCompra = melhorDataCompra != DateTime.MinValue ? melhorDataCompra.ToString("dd/MM/yyyy HH:mm") : "",
                melhorPrecoCompra = melhorPrecoCompra,
                melhorDataVenda = melhorDataVenda != DateTime.MinValue ? melhorDataVenda.ToString("dd/MM/yyyy HH:mm") : "",
                melhorPrecoVenda = melhorPrecoVenda,
                decisaoMercadoComprar = decisaoMercadoComprar,
                decisaoMercadoVender = decisaoMercadoVender,
                nomeItem = item.Nome,
                imagemItem = $"Content/Image?referenciaId={item.ReferenciaId}",
                precoAtualItem = item.Valor,
                quantidadeAtualItem = item.QuantidadeDisponivel
            };
        }

        public async Task<Tuple<GraficoViewModel, GraficoViewModel>> GerarGraficoMercado(string receitaReferenciaId)
        {
            var receitaResultados = await _itemRepository.ListarReceitaResultados(receitaReferenciaId);
            GraficoViewModel resultadoNormal = null;
            GraficoViewModel resultadoRaro = null;

            if (receitaResultados != null)
            {
                var itemNormal = receitaResultados.SingleOrDefault(r => r.ProcRaro == false);
                if (itemNormal != null)
                {
                    var dados = itemNormal.Resultado.HistoricoPrecos?.OrderByDescending(h => h.Data)?.ToList();
                    if (dados != null)
                    {
                        resultadoNormal = await ProcessarHistoricoPrecos(itemNormal.Resultado, dados);
                    }
                }

                var itemRaro = receitaResultados.SingleOrDefault(r => r.ProcRaro);

                if (itemRaro != null)
                {
                    var dados = itemRaro.Resultado.HistoricoPrecos?.OrderByDescending(h => h.Data)?.ToList();
                    if (dados != null)
                    {
                        resultadoRaro = await ProcessarHistoricoPrecos(itemRaro.Resultado, dados);
                    }
                }
            }

            return new Tuple<GraficoViewModel, GraficoViewModel>(resultadoNormal, resultadoRaro);
        }

        public async Task<ServiceResponse<ItemViewModel>> ObterPorReferenciaId(string referenciaId)
        {
            var data = await _itemRepository.ObterPorReferenciaId(referenciaId);
            return new ServiceResponse<ItemViewModel>
            {
                Data = ObjectMapper.Mapper.Map<ItemViewModel>(data)
            };
        }

        public async Task<ServiceResponse<List<ItemViewModel>>> ObterPorListaDeReferenciasIds(List<string> referenciasIds)
        {
            var data = await _itemRepository.ObterPorListaReferenciasIds(referenciasIds);
            return new ServiceResponse<List<ItemViewModel>>
            {
                Data = ObjectMapper.Mapper.Map<List<ItemViewModel>>(data)
            };
        }


        //Item, QuantidadeTotal, CustoProducao
        public async Task<Dictionary<ItemViewModel, long>> SubReceitasDiretas(string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestriaId, TipoReceitaEnum tipoReceita)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            var subreceitas = new Dictionary<ItemViewModel, long>();

            if (receita != null && receita.Itens != null && receita.Itens.Count > 0)
            {
                foreach (var ingrediente in receita.Itens)
                {
                    if (ingrediente.Excluido == false && ingrediente.Item.Excluido == false)
                    {
                        var custoProducaoPorUnidadeProcNormal = CalcularValorSubReceitaRecursivo(ingrediente.Item, procNormal, 0);
                        var custoProducaoPorUnidadeProcNormalERaro = CalcularValorSubReceitaRecursivo(ingrediente.Item, procNormal, procRaro);

                        var item = new ItemViewModel
                        {
                            Id = ingrediente.Item.Id,
                            Nome = ingrediente.Item.Nome,
                            Adquirido = ingrediente.Item.Adquirido,
                            AgrupamentoId = ingrediente.Item.AgrupamentoId,
                            BdoId = ingrediente.Item.BdoId,
                            Categoria = ingrediente.Item.Categoria,
                            Excluido = ingrediente.Item.Excluido,
                            Experiencia = ingrediente.Item.Experiencia,
                            Grau = ingrediente.Item.Grau,
                            Grupo = ingrediente.Item.Grupo,
                            ImagemUrl = ingrediente.Item.ImagemUrl,
                            LocalizacaoNPC = ingrediente.Item.LocalizacaoNPC,
                            MultiResultados = ingrediente.Item.MultiResultados,
                            Peso = ingrediente.Item.Peso,
                            ProcNormalExcessao = ingrediente.Item.ProcNormalExcessao,
                            ProcRaroExcessao = ingrediente.Item.ProcRaroExcessao,
                            ReferenciaId = ingrediente.Item.ReferenciaId,
                            Tipo = ingrediente.Item.Tipo,
                            TipoReceita = ingrediente.Item.TipoReceita,
                            Valor = ingrediente.Item.Valor,
                            ValorNPC = ingrediente.Item.ValorNPC,
                            QuantidadeDisponivel = ingrediente.Item.QuantidadeDisponivel,
                            DataAtualizacao = ingrediente.Item.DataAtualizacao,
                            CustoProducao = custoProducaoPorUnidadeProcNormal == 0 ? ingrediente.Item.Valor : custoProducaoPorUnidadeProcNormal,
                            CustoProducaoProcNormalERaro = custoProducaoPorUnidadeProcNormalERaro == 0 ? ingrediente.Item.Valor : custoProducaoPorUnidadeProcNormalERaro
                        };
                        subreceitas.Add(item, quantidade * ingrediente.Quantidade);
                    }
                }
            }

            return subreceitas;
        }

        public async Task<Dictionary<ItemViewModel, long>> Ingredientes(string referenciaId, long quantidade, decimal procNormal)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            var ingredientesBase = new Dictionary<Item, long>();

            procNormal = procNormal == 0 ? 2.5m : procNormal;

            if (receita != null && receita.Itens != null && receita.Itens.Count > 0)
            {
                foreach (var subReceita in receita.Itens)
                {
                    var subReceitaProc = quantidade * subReceita.Quantidade;
                    if (subReceita.Item.Itens != null && subReceita.Item.Itens.Count > 0 && subReceita.Excluido == false)
                    {
                        foreach (var sub1 in subReceita.Item.Itens)
                        {
                            var procNormalSub1 = subReceita.Item.ProcNormalExcessao != null ? subReceita.Item.ProcNormalExcessao.Value : EhProcesso(subReceita.Item) ? 2.5m : procNormal;
                            var sub1Proc = Math.Ceiling(subReceitaProc / procNormalSub1) * sub1.Quantidade;
                            if (sub1.Item.Itens != null && sub1.Item.Itens.Count > 0 && sub1.Excluido == false)
                            {
                                foreach (var sub2 in sub1.Item.Itens)
                                {
                                    var procNormalSub2 = sub1.Item.ProcNormalExcessao != null ? sub1.Item.ProcNormalExcessao.Value : EhProcesso(sub1.Item) ? 2.5m : procNormal;
                                    var sub2Proc = Math.Ceiling(sub1Proc / procNormalSub2) * sub2.Quantidade;
                                    if (sub2.Item.Itens != null && sub2.Item.Itens.Count > 0 && sub2.Excluido == false)
                                    {
                                        foreach (var sub3 in sub2.Item.Itens)
                                        {
                                            var procNormalSub3 = sub2.Item.ProcNormalExcessao != null ? sub2.Item.ProcNormalExcessao.Value : EhProcesso(sub2.Item) ? 2.5m : procNormal;
                                            var sub3Proc = Math.Ceiling(sub2Proc / procNormalSub3) * sub3.Quantidade;
                                            if (sub3.Item.Itens != null && sub3.Item.Itens.Count > 0 && sub3.Excluido == false)
                                            {
                                                foreach (var sub4 in sub3.Item.Itens)
                                                {
                                                    var procNormalSub4 = sub3.Item.ProcNormalExcessao != null ? sub3.Item.ProcNormalExcessao.Value : EhProcesso(sub3.Item) ? 2.5m : procNormal;
                                                    var sub4Proc = Math.Ceiling(sub3Proc / procNormalSub4) * sub4.Quantidade;
                                                    sub4Proc = sub4Proc < 1 && quantidade > 0 ? 1 : sub4Proc;
                                                    if (sub4.Item.Itens != null && sub4.Item.Itens.Count > 0 && sub4.Excluido == false)
                                                    {
                                                        foreach (var sub5 in sub4.Item.Itens)
                                                        {
                                                            var procNormalSub5 = sub4.Item.ProcNormalExcessao != null ? sub4.Item.ProcNormalExcessao.Value : EhProcesso(sub4.Item) ? 2.5m : procNormal;
                                                            var sub5Proc = Math.Ceiling(sub4Proc / procNormalSub5) * sub5.Quantidade;
                                                            if (sub5.Item.Itens == null || sub5.Item.Itens.Count == 0 && sub5.Excluido == false)
                                                            {
                                                                if (ingredientesBase.ContainsKey(sub5.Item))
                                                                    ingredientesBase[sub5.Item] += (long)sub5Proc;
                                                                else
                                                                    ingredientesBase.Add(sub5.Item, (long)sub5Proc);
                                                            }
                                                        }
                                                    }
                                                    else if (sub4.Excluido == false)
                                                    {
                                                        if (ingredientesBase.ContainsKey(sub4.Item))
                                                            ingredientesBase[sub4.Item] += (long)sub4Proc;
                                                        else
                                                            ingredientesBase.Add(sub4.Item, (long)sub4Proc);
                                                    }
                                                }
                                            }
                                            else if (sub3.Excluido == false)
                                            {
                                                if (ingredientesBase.ContainsKey(sub3.Item))
                                                    ingredientesBase[sub3.Item] += (long)sub3Proc;
                                                else
                                                    ingredientesBase.Add(sub3.Item, (long)sub3Proc);
                                            }
                                        }
                                    }
                                    else if (sub2.Excluido == false)
                                    {
                                        if (ingredientesBase.ContainsKey(sub2.Item))
                                            ingredientesBase[sub2.Item] += (long)sub2Proc;
                                        else
                                            ingredientesBase.Add(sub2.Item, (long)sub2Proc);
                                    }
                                }
                            }
                            else if (sub1.Excluido == false)
                            {
                                if (ingredientesBase.ContainsKey(sub1.Item))
                                    ingredientesBase[sub1.Item] += (long)sub1Proc;
                                else
                                    ingredientesBase.Add(sub1.Item, (long)sub1Proc);
                            }
                        }
                    }
                    else if (subReceita.Excluido == false)
                    {
                        if (ingredientesBase.ContainsKey(subReceita.Item))
                            ingredientesBase[subReceita.Item] += (long)subReceitaProc;
                        else
                            ingredientesBase.Add(subReceita.Item, (long)subReceitaProc);
                    }
                }
            }

            var result = ObjectMapper.Mapper.Map<Dictionary<ItemViewModel, long>>(ingredientesBase);
            return await Task.FromResult(result);
        }


        public async Task<NodeViewModel> ProcessarNode(Item item, string id, string parentId, long qtdTotal, long qtdPorReceita, long quantidadeProcada, decimal procNormal, decimal procRaro, TipoReceitaEnum tipo, MaestriaCulinaria maestriaCulinaria, MaestriaAlquimia maestriaAlquimia, bool semDetalhes)
        {

            //if(maestriaCulinaria != null)
            //{
            //    procNormal = (decimal)maestriaCulinaria.RegularProc;
            //    procRaro = (decimal)maestriaCulinaria.RareProc;
            //}
            //else if(maestriaAlquimia != null)
            //{
            //    procNormal = (decimal)maestriaAlquimia.RegularProc;
            //    procRaro = (decimal)maestriaAlquimia.RareProc;
            //}

            return new NodeViewModel
            {
                id = id,
                parent = parentId,
                text = id == "raiz" ? $" {(!semDetalhes ? $"({qtdTotal})" : "")} {item.Nome}" : $"{qtdPorReceita} {item.Nome} {(!semDetalhes ? $"({quantidadeProcada})" : "")}",
                icon = !string.IsNullOrEmpty(item.ImagemUrl) ? $"Content/Image?referenciaId={item.ReferenciaId}" : "",
                state = new { opened = true },
                nomeItem = item.Nome,
                quantidade = quantidadeProcada,
                valor = item.Valor,
                grupo = item.Grupo,
                dataAtualizacao = item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                disponivel = item.QuantidadeDisponivel != 0,
                quantidadeDisponivel = item.QuantidadeDisponivel,
                vendeNPC = item.ValorNPC != null,
                localNPC = item.LocalizacaoNPC,
                valorNPC = item.ValorNPC,
                tipo = (int)item.Tipo
            };
        }

        public async Task<IList<NodeViewModel>> TreeViewRefatorado(string referenciaId, int quantidade, int maestriaId, TipoReceitaEnum tipoReceita, decimal procNormal, decimal procRaro, bool semDetalhes = false)
        {
            procNormal = procNormal == 0 ? 2.5m : procNormal;

            MaestriaCulinaria maestriaCulinaria = tipoReceita == TipoReceitaEnum.Culinaria ? await _maestriaCulinariaRepository.GetByIdAsync(maestriaId) : null;
            MaestriaAlquimia maestriaAlquimia = tipoReceita == TipoReceitaEnum.Alquimia ? await _maestriaAlquimiaRepository.GetByIdAsync(maestriaId) : null;

            var tree = new List<NodeViewModel>();

            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            if (receita != null && receita.Itens != null && receita.Itens.Count > 0 && receita.Excluido == false)
            {
                receita.Itens = receita.Itens.OrderBy(i => i.Item.Nome).ToList();

                tree.Add(await ProcessarNode(receita, "raiz", "#", quantidade, 0, 0, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));

                foreach (var subReceita in receita.Itens)
                {
                    if (subReceita.Visivel && subReceita.Excluido == false)
                    {
                        var subReceitaProc = quantidade * subReceita.Quantidade;
                        var subReceitaId = $"{subReceita.ItemReferenciaId}";
                        var subReceitaParent = "raiz";

                        tree.Add(await ProcessarNode(subReceita.Item, subReceitaId, subReceitaParent, 0, subReceita.Quantidade, subReceitaProc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));


                        if (subReceita.Item.Itens != null && subReceita.Item.Itens.Count > 0)
                        {
                            subReceita.Item.Itens = subReceita.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                            foreach (var sub1 in subReceita.Item.Itens)
                            {
                                if (sub1.Visivel && sub1.Excluido == false)
                                {
                                    var procNormalSub1 = subReceita.Item.ProcNormalExcessao != null ? subReceita.Item.ProcNormalExcessao.Value : EhProcesso(subReceita.Item) ? 2.5m : procNormal;
                                    var sub1Proc = Math.Ceiling(subReceitaProc / procNormalSub1) * sub1.Quantidade;
                                    sub1Proc = sub1Proc < 1 && quantidade > 0 ? 1 : sub1Proc;

                                    var sub1Id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}";
                                    var sub1Parent = $"{subReceita.ItemReferenciaId}";

                                    tree.Add(await ProcessarNode(sub1.Item, sub1Id, sub1Parent, 0, sub1.Quantidade, (long)sub1Proc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));


                                    if (sub1.Item.Itens != null && sub1.Item.Itens.Count > 0)
                                    {
                                        sub1.Item.Itens = sub1.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                        foreach (var sub2 in sub1.Item.Itens)
                                        {
                                            if (sub2.Visivel && sub2.Excluido == false)
                                            {
                                                var procNormalSub2 = sub1.Item.ProcNormalExcessao != null ? sub1.Item.ProcNormalExcessao.Value : EhProcesso(sub1.Item) ? 2.5m : procNormal;
                                                var sub2Proc = Math.Ceiling(sub1Proc / procNormalSub2) * sub2.Quantidade;
                                                sub2Proc = sub2Proc < 1 && quantidade > 0 ? 1 : sub2Proc;

                                                var sub2Id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}";
                                                var sub2Parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}";

                                                tree.Add(await ProcessarNode(sub2.Item, sub2Id, sub2Parent, 0, sub2.Quantidade, (long)sub2Proc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));

                                                if (sub2.Item.Itens != null && sub2.Item.Itens.Count > 0)
                                                {
                                                    sub2.Item.Itens = sub2.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                    foreach (var sub3 in sub2.Item.Itens)
                                                    {
                                                        if (sub3.Visivel && sub3.Excluido == false)
                                                        {
                                                            var procNormalSub3 = sub2.Item.ProcNormalExcessao != null ? sub2.Item.ProcNormalExcessao.Value : EhProcesso(sub2.Item) ? 2.5m : procNormal;
                                                            var sub3Proc = Math.Ceiling(sub2Proc / procNormalSub3) * sub3.Quantidade;
                                                            sub3Proc = sub3Proc < 1 && quantidade > 0 ? 1 : sub3Proc;

                                                            var sub3Id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}";
                                                            var sub3Parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}";

                                                            tree.Add(await ProcessarNode(sub3.Item, sub3Id, sub3Parent, 0, sub3.Quantidade, (long)sub3Proc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));

                                                            if (sub3.Item.Itens != null && sub3.Item.Itens.Count > 0)
                                                            {
                                                                sub3.Item.Itens = sub3.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                foreach (var sub4 in sub3.Item.Itens)
                                                                {
                                                                    if (sub4.Visivel && sub4.Excluido == false)
                                                                    {
                                                                        var procNormalSub4 = sub3.Item.ProcNormalExcessao != null ? sub3.Item.ProcNormalExcessao.Value : EhProcesso(sub3.Item) ? 2.5m : procNormal;
                                                                        var sub4Proc = Math.Ceiling(sub3Proc / procNormalSub4) * sub4.Quantidade;
                                                                        sub4Proc = sub4Proc < 1 && quantidade > 0 ? 1 : sub4Proc;

                                                                        var sub4Id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}";
                                                                        var sub4Parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}";

                                                                        tree.Add(await ProcessarNode(sub4.Item, sub4Id, sub4Parent, 0, sub4.Quantidade, (long)sub4Proc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));

                                                                        if (sub4.Item.Itens != null && sub4.Item.Itens.Count > 0)
                                                                        {
                                                                            sub4.Item.Itens = sub4.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                            foreach (var sub5 in sub4.Item.Itens)
                                                                            {
                                                                                if (sub5.Visivel && sub5.Excluido == false)
                                                                                {
                                                                                    var procNormalSub5 = sub4.Item.ProcNormalExcessao != null ? sub4.Item.ProcNormalExcessao.Value : EhProcesso(sub4.Item) ? 2.5m : procNormal;
                                                                                    var sub5Proc = Math.Ceiling(sub4Proc / procNormalSub5) * sub5.Quantidade;
                                                                                    sub5Proc = sub5Proc < 1 && quantidade > 0 ? 1 : sub5Proc;

                                                                                    var sub5Id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}-{sub5.ItemReferenciaId}";
                                                                                    var sub5Parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}";

                                                                                    tree.Add(await ProcessarNode(sub5.Item, sub5Id, sub5Parent, 0, sub4.Quantidade, (long)sub4Proc, procNormal, procRaro, tipoReceita, maestriaCulinaria, maestriaAlquimia, semDetalhes));
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return tree;

        }


        public async Task<IList<NodeViewModel>> TreeView(string referenciaId, long quantidade, decimal procNormal, decimal procRaro, bool semDetalhes = false, bool otimizar = false)
        {
            //Se maximizar tem que descomentar os codigos no open_node, close_node Receita.js
            var maximizado = false;

            procNormal = procNormal == 0 ? 2.5m : procNormal;
            procRaro = procRaro == 0 ? 0.3m : procRaro;

            var tree = new List<NodeViewModel>();

            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            if (receita != null && receita.Itens != null && receita.Itens.Count > 0 && receita.Excluido == false)
            {
                receita.Itens = receita.Itens.OrderBy(i => i.Item.Nome).ToList();
                tree.Add(new NodeViewModel
                {
                    id = "raiz",
                    parent = "#",
                    text = $" {(!semDetalhes ? $"({quantidade})" : "")} {receita.Nome}",
                    icon = !string.IsNullOrEmpty(receita.ImagemUrl) ? $"Content/Image?referenciaId={receita.ReferenciaId}" : "",
                    state = new { opened = true },
                    nomeItem = receita.Nome,
                    quantidade = quantidade,
                    valor = receita.Valor,
                    grupo = receita.Grupo,
                    dataAtualizacao = receita.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    disponivel = receita.QuantidadeDisponivel != 0,
                    quantidadeDisponivel = receita.QuantidadeDisponivel,
                    vendeNPC = receita.ValorNPC != null,
                    localNPC = receita.LocalizacaoNPC,
                    valorNPC = receita.ValorNPC,
                    tipo = (int)receita.Tipo,
                    quantidadePorReceita = 1,
                    procNormal = procNormal,
                    procRaro = procRaro,
                    referenciaId = receita.ReferenciaId,
                    possuiProcRaro = receita.MultiResultados,
                    nivelSubReceita = 0,
                    custoProducao = receita.Valor,
                    custoCompra = receita.Valor,
                    produzirOuComprar = "COMPRAR"
                });

                foreach (var subReceita in receita.Itens)
                {
                    if (subReceita.Visivel && subReceita.Excluido == false)
                    {
                        var subReceitaProc = quantidade * subReceita.Quantidade;
                        var custoProducaoSubReceitaProcNormal = CalcularValorSubReceitaRecursivo(subReceita.Item, procNormal, 0);
                        var custoProducaoSubReceitaProcNormalERaro = CalcularValorSubReceitaRecursivo(subReceita.Item, procNormal, procRaro);
                        tree.Add(new NodeViewModel
                        {
                            id = $"{subReceita.ItemReferenciaId}",
                            parent = "raiz",
                            text = $"{subReceita.Quantidade} {subReceita.Item.Nome} {(!semDetalhes ? $"({(long)subReceitaProc})" : "")}",
                            icon = !string.IsNullOrEmpty(subReceita.Item.ImagemUrl) ? $"Content/Image?referenciaId={subReceita.Item.ReferenciaId}" : "",
                            state = new { opened = otimizar ? custoProducaoSubReceitaProcNormal < subReceita.Item.Valor : maximizado },
                            nomeItem = subReceita.Item.Nome,
                            quantidade = (long)subReceitaProc,
                            valor = subReceita.Item.Valor,
                            grupo = subReceita.Item.Grupo,
                            dataAtualizacao = subReceita.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                            disponivel = subReceita.Item.QuantidadeDisponivel != 0,
                            quantidadeDisponivel = subReceita.Item.QuantidadeDisponivel,
                            vendeNPC = subReceita.Item.ValorNPC != null,
                            localNPC = subReceita.Item.LocalizacaoNPC,
                            valorNPC = subReceita.Item.ValorNPC,
                            tipo = (int)subReceita.Item.Tipo,
                            quantidadePorReceita = subReceita.Quantidade,
                            procNormal = procNormal,
                            procRaro = procRaro,
                            referenciaId = subReceita.ItemReferenciaId,
                            possuiProcRaro = subReceita.Item.MultiResultados,
                            nivelSubReceita = 1,
                            custoCompra = subReceita.Item.Valor,
                            custoProducao = custoProducaoSubReceitaProcNormal == 0 ? subReceita.Item.Valor : custoProducaoSubReceitaProcNormal,
                            custoProducaoProcNormalERaro = custoProducaoSubReceitaProcNormalERaro == 0 ? subReceita.Item.Valor : custoProducaoSubReceitaProcNormalERaro,
                            produzirOuComprar = custoProducaoSubReceitaProcNormal < subReceita.Item.Valor ? "PRODUZIR" : "COMPRAR"
                        });

                        if (subReceita.Item.Itens != null && subReceita.Item.Itens.Count > 0)
                        {
                            subReceita.Item.Itens = subReceita.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                            foreach (var sub1 in subReceita.Item.Itens)
                            {
                                if (sub1.Visivel && sub1.Excluido == false)
                                {
                                    var procNormalSub1 = subReceita.Item.ProcNormalExcessao != null ? subReceita.Item.ProcNormalExcessao.Value : EhProcesso(subReceita.Item) ? 2.5m : procNormal;
                                    var sub1Proc = Math.Ceiling(subReceitaProc / procNormalSub1) * sub1.Quantidade;
                                    sub1Proc = sub1Proc < 1 && quantidade > 0 ? 1 : sub1Proc;

                                    var custoProducaoProcNormalERaroSub1 = CalcularValorSubReceitaRecursivo(sub1.Item, procNormalSub1, procRaro);
                                    var custoProducaoProcNormalSub1 = CalcularValorSubReceitaRecursivo(sub1.Item, procNormalSub1, 0);


                                    tree.Add(new NodeViewModel
                                    {
                                        id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                        parent = $"{subReceita.ItemReferenciaId}",
                                        text = $" {sub1.Quantidade} {sub1.Item.Nome} {(!semDetalhes ? $"({(long)sub1Proc})" : "")}",
                                        icon = !string.IsNullOrEmpty(sub1.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub1.Item.ReferenciaId}" : "",
                                        state = new { opened = otimizar ? custoProducaoProcNormalSub1 < sub1.Item.Valor : maximizado },
                                        nomeItem = sub1.Item.Nome,
                                        quantidade = (long)sub1Proc,
                                        valor = sub1.Item.Valor,
                                        grupo = sub1.Item.Grupo,
                                        dataAtualizacao = sub1.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                        disponivel = sub1.Item.QuantidadeDisponivel != 0,
                                        quantidadeDisponivel = sub1.Item.QuantidadeDisponivel,
                                        vendeNPC = sub1.Item.ValorNPC != null,
                                        localNPC = sub1.Item.LocalizacaoNPC,
                                        valorNPC = sub1.Item.ValorNPC,
                                        tipo = (int)sub1.Item.Tipo,
                                        quantidadePorReceita = sub1.Quantidade,
                                        procNormal = procNormalSub1,
                                        procRaro = procRaro,
                                        referenciaId = sub1.ItemReferenciaId,
                                        possuiProcRaro = sub1.Item.MultiResultados,
                                        nivelSubReceita = 2,
                                        custoCompra = sub1.Item.Valor,
                                        custoProducao = custoProducaoProcNormalSub1 == 0 ? sub1.Item.Valor : custoProducaoProcNormalSub1,
                                        custoProducaoProcNormalERaro = custoProducaoProcNormalERaroSub1 == 0 ? sub1.Item.Valor : custoProducaoProcNormalERaroSub1,
                                        produzirOuComprar = custoProducaoProcNormalSub1 < sub1.Item.Valor ? "PRODUZIR" : "COMPRAR",
                                    });

                                    if (sub1.Item.Itens != null && sub1.Item.Itens.Count > 0)
                                    {
                                        sub1.Item.Itens = sub1.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                        foreach (var sub2 in sub1.Item.Itens)
                                        {
                                            if (sub2.Visivel && sub2.Excluido == false)
                                            {
                                                var procNormalSub2 = sub1.Item.ProcNormalExcessao != null ? sub1.Item.ProcNormalExcessao.Value : EhProcesso(sub1.Item) ? 2.5m : procNormal;
                                                var sub2Proc = Math.Ceiling(sub1Proc / procNormalSub2) * sub2.Quantidade;
                                                sub2Proc = sub2Proc < 1 && quantidade > 0 ? 1 : sub2Proc;

                                                var custoProducaoProcNormalERaroSub2 = CalcularValorSubReceitaRecursivo(sub2.Item, procNormalSub2, procRaro);
                                                var custoProducaoProcNormalSub2 = CalcularValorSubReceitaRecursivo(sub2.Item, procNormalSub2, 0);


                                                tree.Add(new NodeViewModel
                                                {
                                                    id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                    parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                                    text = $" {sub2.Quantidade} {sub2.Item.Nome} {(!semDetalhes ? $"({(long)sub2Proc})" : "")}",
                                                    icon = !string.IsNullOrEmpty(sub2.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub2.Item.ReferenciaId}" : "",
                                                    state = new { opened = otimizar ? custoProducaoProcNormalSub2 < sub2.Item.Valor : maximizado },
                                                    nomeItem = sub2.Item.Nome,
                                                    quantidade = (long)sub2Proc,
                                                    valor = sub2.Item.Valor,
                                                    grupo = sub2.Item.Grupo,
                                                    dataAtualizacao = sub2.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                    disponivel = sub2.Item.QuantidadeDisponivel != 0,
                                                    quantidadeDisponivel = sub2.Item.QuantidadeDisponivel,
                                                    vendeNPC = sub2.Item.ValorNPC != null,
                                                    localNPC = sub2.Item.LocalizacaoNPC,
                                                    valorNPC = sub2.Item.ValorNPC,
                                                    tipo = (int)sub2.Item.Tipo,
                                                    quantidadePorReceita = sub2.Quantidade,
                                                    procNormal = procNormalSub2,
                                                    procRaro = procRaro,
                                                    referenciaId = sub2.ItemReferenciaId,
                                                    possuiProcRaro = sub2.Item.MultiResultados,
                                                    nivelSubReceita = 3,
                                                    custoCompra = sub2.Item.Valor,
                                                    custoProducao = custoProducaoProcNormalSub2 == 0 ? sub2.Item.Valor : custoProducaoProcNormalSub2,
                                                    custoProducaoProcNormalERaro = custoProducaoProcNormalERaroSub2 == 0 ? sub2.Item.Valor : custoProducaoProcNormalERaroSub2,
                                                    produzirOuComprar = custoProducaoProcNormalSub2 < sub2.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                });

                                                if (sub2.Item.Itens != null && sub2.Item.Itens.Count > 0)
                                                {
                                                    sub2.Item.Itens = sub2.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                    foreach (var sub3 in sub2.Item.Itens)
                                                    {
                                                        if (sub3.Visivel && sub3.Excluido == false)
                                                        {
                                                            var procNormalSub3 = sub2.Item.ProcNormalExcessao != null ? sub2.Item.ProcNormalExcessao.Value : EhProcesso(sub2.Item) ? 2.5m : procNormal;
                                                            var sub3Proc = Math.Ceiling(sub2Proc / procNormalSub3) * sub3.Quantidade;
                                                            sub3Proc = sub3Proc < 1 && quantidade > 0 ? 1 : sub3Proc;

                                                            var custoProducaoProcNormalERaroSub3 = CalcularValorSubReceitaRecursivo(sub3.Item, procNormalSub3, procRaro);
                                                            var custoProducaoProcNormalSub3 = CalcularValorSubReceitaRecursivo(sub3.Item, procNormalSub3, 0);

                                                            tree.Add(new NodeViewModel
                                                            {
                                                                id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                                text = $" {sub3.Quantidade} {sub3.Item.Nome} {(!semDetalhes ? $"({(long)sub3Proc})" : "")}",
                                                                icon = !string.IsNullOrEmpty(sub3.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub3.Item.ReferenciaId}" : "",
                                                                state = new { opened = otimizar ? custoProducaoProcNormalSub3 < sub3.Item.Valor : maximizado },
                                                                nomeItem = sub3.Item.Nome,
                                                                quantidade = (long)sub3Proc,
                                                                valor = sub3.Item.Valor,
                                                                grupo = sub3.Item.Grupo,
                                                                dataAtualizacao = sub3.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                disponivel = sub3.Item.QuantidadeDisponivel != 0,
                                                                quantidadeDisponivel = sub3.Item.QuantidadeDisponivel,
                                                                vendeNPC = sub3.Item.ValorNPC != null,
                                                                localNPC = sub3.Item.LocalizacaoNPC,
                                                                valorNPC = sub3.Item.ValorNPC,
                                                                tipo = (int)sub3.Item.Tipo,
                                                                quantidadePorReceita = sub3.Quantidade,
                                                                procNormal = procNormalSub3,
                                                                procRaro = procRaro,
                                                                referenciaId = sub3.ItemReferenciaId,
                                                                possuiProcRaro = sub3.Item.MultiResultados,
                                                                nivelSubReceita = 4,
                                                                custoCompra = sub3.Item.Valor,
                                                                custoProducao = custoProducaoProcNormalSub3 == 0 ? sub3.Item.Valor : custoProducaoProcNormalSub3,
                                                                custoProducaoProcNormalERaro = custoProducaoProcNormalERaroSub3 == 0 ? sub3.Item.Valor : custoProducaoProcNormalERaroSub3,
                                                                produzirOuComprar = custoProducaoProcNormalSub3 < sub3.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                            });

                                                            if (sub3.Item.Itens != null && sub3.Item.Itens.Count > 0)
                                                            {
                                                                sub3.Item.Itens = sub3.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                foreach (var sub4 in sub3.Item.Itens)
                                                                {
                                                                    if (sub4.Visivel && sub4.Excluido == false)
                                                                    {
                                                                        var procNormalSub4 = sub3.Item.ProcNormalExcessao != null ? sub3.Item.ProcNormalExcessao.Value : EhProcesso(sub3.Item) ? 2.5m : procNormal;
                                                                        var sub4Proc = Math.Ceiling(sub3Proc / procNormalSub4) * sub4.Quantidade;
                                                                        sub4Proc = sub4Proc < 1 && quantidade > 0 ? 1 : sub4Proc;

                                                                        var custoProducaoProcNormalERaroSub4 = CalcularValorSubReceitaRecursivo(sub4.Item, procNormalSub4, procRaro);
                                                                        var custoProducaoProcNormalSub4 = CalcularValorSubReceitaRecursivo(sub4.Item, procNormalSub4, 0);

                                                                        tree.Add(new NodeViewModel
                                                                        {
                                                                            id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                            parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                            text = $" {sub4.Quantidade} {sub4.Item.Nome} {(!semDetalhes ? $"({(long)sub4Proc})" : "")}",
                                                                            icon = !string.IsNullOrEmpty(sub4.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub4.Item.ReferenciaId}" : "",
                                                                            state = new { opened = otimizar ? custoProducaoProcNormalSub4 < sub4.Item.Valor : maximizado },
                                                                            nomeItem = sub4.Item.Nome,
                                                                            quantidade = (long)sub4Proc,
                                                                            valor = sub4.Item.Valor,
                                                                            grupo = sub4.Item.Grupo,
                                                                            dataAtualizacao = sub4.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                            disponivel = sub4.Item.QuantidadeDisponivel != 0,
                                                                            quantidadeDisponivel = sub4.Item.QuantidadeDisponivel,
                                                                            vendeNPC = sub4.Item.ValorNPC != null,
                                                                            localNPC = sub4.Item.LocalizacaoNPC,
                                                                            valorNPC = sub4.Item.ValorNPC,
                                                                            tipo = (int)sub4.Item.Tipo,
                                                                            quantidadePorReceita = sub4.Quantidade,
                                                                            procNormal = procNormalSub4,
                                                                            procRaro = procRaro,
                                                                            referenciaId = sub4.ItemReferenciaId,
                                                                            possuiProcRaro = sub4.Item.MultiResultados,
                                                                            nivelSubReceita = 5,
                                                                            custoCompra = sub4.Item.Valor,
                                                                            custoProducao = custoProducaoProcNormalSub4 == 0 ? sub4.Item.Valor : custoProducaoProcNormalSub4,
                                                                            custoProducaoProcNormalERaro = custoProducaoProcNormalERaroSub4 == 0 ? sub4.Item.Valor : custoProducaoProcNormalERaroSub4,
                                                                            produzirOuComprar = custoProducaoProcNormalSub4 < sub4.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                                        });

                                                                        if (sub4.Item.Itens != null && sub4.Item.Itens.Count > 0)
                                                                        {
                                                                            sub4.Item.Itens = sub4.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                            foreach (var sub5 in sub4.Item.Itens)
                                                                            {
                                                                                if (sub5.Visivel && sub5.Excluido == false)
                                                                                {
                                                                                    var procNormalSub5 = sub4.Item.ProcNormalExcessao != null ? sub4.Item.ProcNormalExcessao.Value : EhProcesso(sub4.Item) ? 2.5m : procNormal;
                                                                                    var sub5Proc = Math.Ceiling(sub4Proc / procNormalSub5) * sub5.Quantidade;
                                                                                    sub5Proc = sub5Proc < 1 && quantidade > 0 ? 1 : sub5Proc;

                                                                                    var custoProducaoProcNormalERaroSub5 = CalcularValorSubReceitaRecursivo(sub5.Item, procNormalSub5, procRaro);
                                                                                    var custoProducaoProcNormalSub5 = CalcularValorSubReceitaRecursivo(sub5.Item, procNormalSub5, 0);


                                                                                    tree.Add(new NodeViewModel
                                                                                    {
                                                                                        id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}-{sub5.ItemReferenciaId}",
                                                                                        parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                                        text = $" {sub5.Quantidade} {sub5.Item.Nome} {(!semDetalhes ? $"({(long)sub5Proc})" : "")}",
                                                                                        icon = !string.IsNullOrEmpty(sub5.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub5.Item.ReferenciaId}" : "",
                                                                                        state = new { opened = otimizar ? custoProducaoProcNormalSub5 < sub5.Item.Valor : maximizado },
                                                                                        nomeItem = sub5.Item.Nome,
                                                                                        quantidade = (long)sub5Proc,
                                                                                        valor = sub5.Item.Valor,
                                                                                        grupo = sub5.Item.Grupo,
                                                                                        dataAtualizacao = sub5.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                                        disponivel = sub5.Item.QuantidadeDisponivel != 0,
                                                                                        quantidadeDisponivel = sub5.Item.QuantidadeDisponivel,
                                                                                        vendeNPC = sub5.Item.ValorNPC != null,
                                                                                        localNPC = sub5.Item.LocalizacaoNPC,
                                                                                        valorNPC = sub5.Item.ValorNPC,
                                                                                        tipo = (int)sub5.Item.Tipo,
                                                                                        quantidadePorReceita = sub5.Quantidade,
                                                                                        procNormal = procNormalSub5,
                                                                                        procRaro = procRaro,
                                                                                        referenciaId = sub5.ItemReferenciaId,
                                                                                        possuiProcRaro = sub5.Item.MultiResultados,
                                                                                        nivelSubReceita = 6,
                                                                                        custoCompra = sub5.Item.Valor,
                                                                                        custoProducao = custoProducaoProcNormalSub5 == 0 ? sub5.Item.Valor : custoProducaoProcNormalSub5,
                                                                                        custoProducaoProcNormalERaro = custoProducaoProcNormalERaroSub5 == 0 ? sub5.Item.Valor : custoProducaoProcNormalERaroSub5,
                                                                                        produzirOuComprar = custoProducaoProcNormalSub5 < sub5.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                                                    });
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return tree;
        }

        public async Task<IList<NodeViewModel>> TreeViewSubReceita(string raiz, string referenciaId, int nivel, long quantidade, long quantidadePorReceita, decimal procNormal, decimal procRaro, bool usarProcRaro, bool semDetalhes = false, bool otimizar = false)
        {
            //Se maximizar tem que descomentar os codigos no open_node, close_node Receita.js
            var maximizado = false;

            procNormal = procNormal == 0 ? 2.5m : procNormal;
            procRaro = procRaro == 0 ? 0.3m : procRaro;

            var tree = new List<NodeViewModel>();

            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            if (receita != null && receita.Excluido == false)
            {
                var proc = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : EhProcesso(receita) ? 2.5m : procNormal;
                var procReal = usarProcRaro ? procNormal + procRaro : proc;

                var custoProducao = CalcularValorSubReceitaRecursivo(receita, proc, 0);
                var custoProducaoUsandoProcRaro = CalcularValorSubReceitaRecursivo(receita, proc, procRaro);

                var custoProducaoReceita = custoProducaoUsandoProcRaro == 0 && custoProducao == 0 ? receita.Valor : usarProcRaro ? custoProducaoUsandoProcRaro : custoProducao;

                receita.Itens = receita.Itens.OrderBy(i => i.Item.Nome).ToList();
                tree.Add(new NodeViewModel
                {
                    id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}",
                    parent = raiz,
                    text = $"{quantidadePorReceita} {receita.Nome} {(!semDetalhes ? $"({quantidade})" : "")} {(usarProcRaro ? "*" : "")}",
                    icon = !string.IsNullOrEmpty(receita.ImagemUrl) ? $"Content/Image?referenciaId={receita.ReferenciaId}" : "",
                    state = new { opened = otimizar ? custoProducaoReceita < receita.Valor : true },
                    nomeItem = receita.Nome,
                    quantidade = quantidade,
                    valor = receita.Valor,
                    grupo = receita.Grupo,
                    dataAtualizacao = receita.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    disponivel = receita.QuantidadeDisponivel != 0,
                    quantidadeDisponivel = receita.QuantidadeDisponivel,
                    vendeNPC = receita.ValorNPC != null,
                    localNPC = receita.LocalizacaoNPC,
                    valorNPC = receita.ValorNPC,
                    tipo = (int)receita.Tipo,
                    quantidadePorReceita = quantidadePorReceita,
                    usarProcRaro = usarProcRaro,
                    procNormal = procNormal,
                    procRaro = procRaro,
                    referenciaId = receita.ReferenciaId,
                    possuiProcRaro = receita.MultiResultados,
                    nivelSubReceita = 0,
                    custoCompra = receita.Valor,
                    custoProducao = custoProducaoReceita,
                    produzirOuComprar = custoProducaoReceita < receita.Valor ? "PRODUZIR" : "COMPRAR"
                });

                foreach (var subReceita in receita.Itens)
                {
                    if (subReceita.Visivel && subReceita.Excluido == false)
                    {
                        var procNormalReceita = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : EhProcesso(receita) ? 2.5m : procNormal;
                        var procRealSubReceita = usarProcRaro ? procNormal + procRaro : procNormalReceita;
                        var receitaProc = Math.Ceiling(quantidade / procRealSubReceita) * subReceita.Quantidade;
                        receitaProc = receitaProc < 1 && quantidade > 0 ? 1 : receitaProc;

                        var custoProducaoProcNormalERaroSubReceita = CalcularValorSubReceitaRecursivo(subReceita.Item, procNormalReceita, procRaro);
                        var custoProducaoProcNormalSubReceita = CalcularValorSubReceitaRecursivo(subReceita.Item, procNormalReceita, 0);

                        var custoProducaoSubReceita = custoProducaoProcNormalSubReceita == 0 ? subReceita.Item.Valor : custoProducaoProcNormalSubReceita;

                        tree.Add(new NodeViewModel
                        {
                            id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}",
                            parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}",
                            text = $" {subReceita.Quantidade} {subReceita.Item.Nome} {(!semDetalhes ? $"({(long)receitaProc})" : "")}",
                            icon = !string.IsNullOrEmpty(subReceita.Item.ImagemUrl) ? $"Content/Image?referenciaId={subReceita.Item.ReferenciaId}" : "",
                            state = new { opened = otimizar ? custoProducaoSubReceita < subReceita.Item.Valor : maximizado },
                            nomeItem = subReceita.Item.Nome,
                            quantidade = (long)receitaProc,
                            valor = subReceita.Item.Valor,
                            grupo = subReceita.Item.Grupo,
                            dataAtualizacao = subReceita.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                            disponivel = subReceita.Item.QuantidadeDisponivel != 0,
                            quantidadeDisponivel = subReceita.Item.QuantidadeDisponivel,
                            vendeNPC = subReceita.Item.ValorNPC != null,
                            localNPC = subReceita.Item.LocalizacaoNPC,
                            valorNPC = subReceita.Item.ValorNPC,
                            tipo = (int)subReceita.Item.Tipo,
                            quantidadePorReceita = subReceita.Quantidade,
                            procNormal = procNormal,
                            procRaro = procRaro,
                            referenciaId = subReceita.ItemReferenciaId,
                            possuiProcRaro = subReceita.Item.MultiResultados,
                            nivelSubReceita = 1,
                            custoCompra = subReceita.Item.Valor,
                            custoProducao = custoProducaoSubReceita,
                            produzirOuComprar = custoProducaoSubReceita < subReceita.Item.Valor ? "PRODUZIR" : "COMPRAR"
                        });

                        if (subReceita.Item.Itens != null && subReceita.Item.Itens.Count > 0)
                        {
                            subReceita.Item.Itens = subReceita.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                            foreach (var sub1 in subReceita.Item.Itens)
                            {
                                if (sub1.Visivel && sub1.Excluido == false)
                                {
                                    var procNormalSub1 = subReceita.Item.ProcNormalExcessao != null ? subReceita.Item.ProcNormalExcessao.Value : EhProcesso(subReceita.Item) ? 2.5m : procNormal;
                                    var sub1Proc = Math.Ceiling(receitaProc / procNormalSub1) * sub1.Quantidade;
                                    sub1Proc = sub1Proc < 1 && quantidade > 0 ? 1 : sub1Proc;

                                    //var custoProducaoProcNormalERaroSub1 = CalcularValorSubReceitaRecursivo(sub1.Item, procNormalSub1, procRaro);
                                    var custoProducaoProcNormalSub1 = CalcularValorSubReceitaRecursivo(sub1.Item, procNormalSub1, 0);

                                    var custoProducaoSub1 = custoProducaoProcNormalSub1 == 0 ? sub1.Item.Valor : custoProducaoProcNormalSub1;

                                    tree.Add(new NodeViewModel
                                    {
                                        id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                        parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}",
                                        text = $" {sub1.Quantidade} {sub1.Item.Nome} {(!semDetalhes ? $"({(long)sub1Proc})" : "")}",
                                        icon = !string.IsNullOrEmpty(sub1.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub1.Item.ReferenciaId}" : "",
                                        state = new { opened = otimizar ? custoProducaoSub1 < sub1.Item.Valor : maximizado },
                                        nomeItem = sub1.Item.Nome,
                                        quantidade = (long)sub1Proc,
                                        valor = sub1.Item.Valor,
                                        grupo = sub1.Item.Grupo,
                                        dataAtualizacao = sub1.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                        disponivel = sub1.Item.QuantidadeDisponivel != 0,
                                        quantidadeDisponivel = sub1.Item.QuantidadeDisponivel,
                                        vendeNPC = sub1.Item.ValorNPC != null,
                                        localNPC = sub1.Item.LocalizacaoNPC,
                                        valorNPC = sub1.Item.ValorNPC,
                                        tipo = (int)sub1.Item.Tipo,
                                        quantidadePorReceita = sub1.Quantidade,
                                        procNormal = procNormalSub1,
                                        procRaro = procRaro,
                                        referenciaId = sub1.ItemReferenciaId,
                                        possuiProcRaro = sub1.Item.MultiResultados,
                                        nivelSubReceita = 2,
                                        custoCompra = sub1.Item.Valor,
                                        custoProducao = custoProducaoSub1,
                                        produzirOuComprar = custoProducaoSub1 < sub1.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                    });

                                    if (sub1.Item.Itens != null && sub1.Item.Itens.Count > 0)
                                    {
                                        sub1.Item.Itens = sub1.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                        foreach (var sub2 in sub1.Item.Itens)
                                        {
                                            if (sub2.Visivel && sub2.Excluido == false)
                                            {
                                                var procNormalSub2 = sub1.Item.ProcNormalExcessao != null ? sub1.Item.ProcNormalExcessao.Value : EhProcesso(sub1.Item) ? 2.5m : procNormal;
                                                var sub2Proc = Math.Ceiling(sub1Proc / procNormalSub2) * sub2.Quantidade;
                                                sub2Proc = sub2Proc < 1 && quantidade > 0 ? 1 : sub2Proc;

                                                //var custoProducaoProcNormalERaroSub2 = CalcularValorSubReceitaRecursivo(sub2.Item, procNormalSub2, procRaro);
                                                var custoProducaoProcNormalSub2 = CalcularValorSubReceitaRecursivo(sub2.Item, procNormalSub2, 0);

                                                var custoProducaoSub2 = custoProducaoProcNormalSub2 == 0 ? sub2.Item.Valor : custoProducaoProcNormalSub2;

                                                tree.Add(new NodeViewModel
                                                {
                                                    id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                    parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                                    text = $" {sub2.Quantidade} {sub2.Item.Nome} {(!semDetalhes ? $"({(long)sub2Proc})" : "")}",
                                                    icon = !string.IsNullOrEmpty(sub2.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub2.Item.ReferenciaId}" : "",
                                                    state = new { opened = otimizar ? custoProducaoSub2 < sub2.Item.Valor : maximizado },
                                                    nomeItem = sub2.Item.Nome,
                                                    quantidade = (long)sub2Proc,
                                                    valor = sub2.Item.Valor,
                                                    grupo = sub2.Item.Grupo,
                                                    dataAtualizacao = sub2.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                    disponivel = sub2.Item.QuantidadeDisponivel != 0,
                                                    quantidadeDisponivel = sub2.Item.QuantidadeDisponivel,
                                                    vendeNPC = sub2.Item.ValorNPC != null,
                                                    localNPC = sub2.Item.LocalizacaoNPC,
                                                    valorNPC = sub2.Item.ValorNPC,
                                                    tipo = (int)sub2.Item.Tipo,
                                                    quantidadePorReceita = sub2.Quantidade,
                                                    procNormal = procNormalSub2,
                                                    procRaro = procRaro,
                                                    referenciaId = sub2.ItemReferenciaId,
                                                    possuiProcRaro = sub2.Item.MultiResultados,
                                                    nivelSubReceita = 3,
                                                    custoCompra = sub2.Item.Valor,
                                                    custoProducao = custoProducaoSub2,
                                                    produzirOuComprar = custoProducaoSub2 < sub2.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                });

                                                if (sub2.Item.Itens != null && sub2.Item.Itens.Count > 0)
                                                {
                                                    sub2.Item.Itens = sub2.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                    foreach (var sub3 in sub2.Item.Itens)
                                                    {
                                                        if (sub3.Visivel && sub3.Excluido == false)
                                                        {
                                                            var procNormalSub3 = sub2.Item.ProcNormalExcessao != null ? sub2.Item.ProcNormalExcessao.Value : EhProcesso(sub2.Item) ? 2.5m : procNormal;
                                                            var sub3Proc = Math.Ceiling(sub2Proc / procNormalSub3) * sub3.Quantidade;
                                                            sub3Proc = sub3Proc < 1 && quantidade > 0 ? 1 : sub3Proc;

                                                            //var custoProducaoProcNormalERaroSub3 = CalcularValorSubReceitaRecursivo(sub3.Item, procNormalSub3, procRaro);
                                                            var custoProducaoProcNormalSub3 = CalcularValorSubReceitaRecursivo(sub3.Item, procNormalSub3, 0);

                                                            var custoProducaoSub3 = custoProducaoProcNormalSub3 == 0 ? sub3.Item.Valor : custoProducaoProcNormalSub3;

                                                            tree.Add(new NodeViewModel
                                                            {
                                                                id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                                text = $" {sub3.Quantidade} {sub3.Item.Nome} {(!semDetalhes ? $"({(long)sub3Proc})" : "")}",
                                                                icon = !string.IsNullOrEmpty(sub3.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub3.Item.ReferenciaId}" : "",
                                                                state = new { opened = otimizar ? custoProducaoSub3 < sub3.Item.Valor : maximizado },
                                                                nomeItem = sub3.Item.Nome,
                                                                quantidade = (long)sub3Proc,
                                                                valor = sub3.Item.Valor,
                                                                grupo = sub3.Item.Grupo,
                                                                dataAtualizacao = sub3.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                disponivel = sub3.Item.QuantidadeDisponivel != 0,
                                                                quantidadeDisponivel = sub3.Item.QuantidadeDisponivel,
                                                                vendeNPC = sub3.Item.ValorNPC != null,
                                                                localNPC = sub3.Item.LocalizacaoNPC,
                                                                valorNPC = sub3.Item.ValorNPC,
                                                                tipo = (int)sub3.Item.Tipo,
                                                                quantidadePorReceita = sub3.Quantidade,
                                                                procNormal = procNormalSub3,
                                                                procRaro = procRaro,
                                                                referenciaId = sub3.ItemReferenciaId,
                                                                possuiProcRaro = sub3.Item.MultiResultados,
                                                                nivelSubReceita = 4,
                                                                custoCompra = sub3.Item.Valor,
                                                                custoProducao = custoProducaoSub3,
                                                                produzirOuComprar = custoProducaoSub3 < sub3.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                            });

                                                            if (sub3.Item.Itens != null && sub3.Item.Itens.Count > 0)
                                                            {
                                                                sub3.Item.Itens = sub3.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                foreach (var sub4 in sub3.Item.Itens)
                                                                {
                                                                    if (sub4.Visivel && sub4.Excluido == false)
                                                                    {
                                                                        var procNormalSub4 = sub3.Item.ProcNormalExcessao != null ? sub3.Item.ProcNormalExcessao.Value : EhProcesso(sub3.Item) ? 2.5m : procNormal;
                                                                        var sub4Proc = Math.Ceiling(sub3Proc / procNormalSub4) * sub4.Quantidade;
                                                                        sub4Proc = sub4Proc < 1 && quantidade > 0 ? 1 : sub4Proc;

                                                                        //var custoProducaoProcNormalERaroSub4 = CalcularValorSubReceitaRecursivo(sub4.Item, procNormalSub4, procRaro);
                                                                        var custoProducaoProcNormalSub4 = CalcularValorSubReceitaRecursivo(sub4.Item, procNormalSub4, 0);

                                                                        var custoProducaoSub4 = custoProducaoProcNormalSub4 == 0 ? sub4.Item.Valor :  custoProducaoProcNormalSub3;

                                                                        tree.Add(new NodeViewModel
                                                                        {
                                                                            id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                            parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                            text = $" {sub4.Quantidade} {sub4.Item.Nome} {(!semDetalhes ? $"({(long)sub4Proc})" : "")}",
                                                                            icon = !string.IsNullOrEmpty(sub4.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub4.Item.ReferenciaId}" : "",
                                                                            state = new { opened = otimizar ? custoProducaoSub4 < sub4.Item.Valor : maximizado },
                                                                            nomeItem = sub4.Item.Nome,
                                                                            quantidade = (long)sub4Proc,
                                                                            valor = sub4.Item.Valor,
                                                                            grupo = sub4.Item.Grupo,
                                                                            dataAtualizacao = sub4.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                            disponivel = sub4.Item.QuantidadeDisponivel != 0,
                                                                            quantidadeDisponivel = sub4.Item.QuantidadeDisponivel,
                                                                            vendeNPC = sub4.Item.ValorNPC != null,
                                                                            localNPC = sub4.Item.LocalizacaoNPC,
                                                                            valorNPC = sub4.Item.ValorNPC,
                                                                            tipo = (int)sub4.Item.Tipo,
                                                                            quantidadePorReceita = sub4.Quantidade,
                                                                            procNormal = procNormalSub4,
                                                                            procRaro = procRaro,
                                                                            referenciaId = sub4.ItemReferenciaId,
                                                                            possuiProcRaro = sub4.Item.MultiResultados,
                                                                            nivelSubReceita = 5,
                                                                            custoCompra = sub4.Item.Valor,
                                                                            custoProducao = custoProducaoSub4,
                                                                            produzirOuComprar = custoProducaoSub4 < sub4.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                                        });

                                                                        if (sub4.Item.Itens != null && sub4.Item.Itens.Count > 0)
                                                                        {
                                                                            sub4.Item.Itens = sub4.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                                            foreach (var sub5 in sub4.Item.Itens)
                                                                            {
                                                                                if (sub5.Visivel && sub5.Excluido == false)
                                                                                {
                                                                                    var procNormalSub5 = sub4.Item.ProcNormalExcessao != null ? sub4.Item.ProcNormalExcessao.Value : EhProcesso(sub4.Item) ? 2.5m : procNormal;
                                                                                    var sub5Proc = Math.Ceiling(sub4Proc / procNormalSub5) * sub5.Quantidade;
                                                                                    sub5Proc = sub5Proc < 1 && quantidade > 0 ? 1 : sub5Proc;

                                                                                    //var custoProducaoProcNormalERaroSub5 = CalcularValorSubReceitaRecursivo(sub5.Item, procNormalSub5, procRaro);
                                                                                    var custoProducaoProcNormalSub5 = CalcularValorSubReceitaRecursivo(sub5.Item, procNormalSub5, 0);

                                                                                    var custoProducaoSub5 =  custoProducaoProcNormalSub5 == 0 ? sub5.Item.Valor : custoProducaoProcNormalSub5;

                                                                                    tree.Add(new NodeViewModel
                                                                                    {
                                                                                        id = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}-{sub5.ItemReferenciaId}",
                                                                                        parent = $"{(raiz != "raiz" ? $"{raiz}-" : "")}{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                                        text = $" {sub5.Quantidade} {sub5.Item.Nome} {(!semDetalhes ? $"({(long)sub5Proc})" : "")}",
                                                                                        icon = !string.IsNullOrEmpty(sub5.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub5.Item.ReferenciaId}" : "",
                                                                                        state = new { opened = otimizar ? custoProducaoSub5 < sub5.Item.Valor : maximizado },
                                                                                        nomeItem = sub5.Item.Nome,
                                                                                        quantidade = (long)sub5Proc,
                                                                                        valor = sub5.Item.Valor,
                                                                                        grupo = sub5.Item.Grupo,
                                                                                        dataAtualizacao = sub5.Item.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                                                                                        disponivel = sub5.Item.QuantidadeDisponivel != 0,
                                                                                        quantidadeDisponivel = sub5.Item.QuantidadeDisponivel,
                                                                                        vendeNPC = sub5.Item.ValorNPC != null,
                                                                                        localNPC = sub5.Item.LocalizacaoNPC,
                                                                                        valorNPC = sub5.Item.ValorNPC,
                                                                                        tipo = (int)sub5.Item.Tipo,
                                                                                        quantidadePorReceita = sub5.Quantidade,
                                                                                        procNormal = procNormalSub5,
                                                                                        procRaro = procRaro,
                                                                                        referenciaId = sub5.ItemReferenciaId,
                                                                                        possuiProcRaro = sub5.Item.MultiResultados,
                                                                                        nivelSubReceita = 6,
                                                                                        custoCompra = sub5.Item.Valor,
                                                                                        custoProducao = custoProducaoSub5,
                                                                                        produzirOuComprar = custoProducaoSub5 < sub5.Item.Valor ? "PRODUZIR" : "COMPRAR"
                                                                                    });
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            return tree;
        }

        private long QuantidadeImperial(ImperialReceita imperialReceita, long quantidade)
        {
            if (imperialReceita != null)
                return (long)(quantidade / imperialReceita.Quantidade);
            return 0;
        }

        private long QuantidadePorCaixa(ImperialReceita imperialReceita)
        {
            return imperialReceita != null ? imperialReceita.Quantidade : 0;
        }

        private string NomeCaixaImperial(ImperialReceita imperialReceita)
        {
            return imperialReceita != null ? imperialReceita.Imperial.Nome + $" ({imperialReceita.Quantidade})" : string.Empty;
        }

        private long CalcularPrecoImperial(ImperialReceita imperialReceita, double? bonusImperial)
        {
            if (imperialReceita != null && bonusImperial.HasValue)
            {
                var bonus = bonusImperial.HasValue ? bonusImperial.Value : 0;
                decimal valor = imperialReceita.Imperial.Valor * (imperialReceita.Imperial.PorcentagemBonus / 100m);
                return (long)(valor + (decimal)(imperialReceita.Imperial.Valor * bonus));
            }

            return 0;
        }

        private Imperial CaixaImperial(ImperialReceita imperialReceita)
        {
            return imperialReceita.Imperial;
        }


        private decimal RecalcularProcNormalCulinaria(Item receita, decimal procNormal, MaestriaCulinaria maestria)
        {
            if (receita.ProcNormalExcessao != null && maestria != null)
            {
                switch (receita.ReferenciaId)
                {
                    case "R_C_174":
                        return receita.ProcNormalExcessao.Value + (decimal)(1 * maestria.RegularMaxProcChance);
                    case "R_C_175":
                        return receita.ProcNormalExcessao.Value + (decimal)(1 * maestria.RegularMaxProcChance);
                    default:
                        return receita.ProcNormalExcessao.Value;
                }

            }

            return Math.Round(procNormal, 2);
        }

        private decimal RecalcularProcRaroCulinaria(Item receita, decimal procRaro, MaestriaCulinaria maestria)
        {
            if (receita.ProcRaroExcessao != null && maestria != null)
            {
                switch (receita.ReferenciaId)
                {
                    case "R_C_168":
                        return receita.ProcRaroExcessao.Value + (decimal)maestria.RareAddChance;
                    case "R_C_187":
                        return receita.ProcRaroExcessao.Value + (decimal)maestria.RareAddChance;
                    default:
                        return receita.ProcRaroExcessao.Value;
                }
            }

            return Math.Round(procRaro, 2);
        }

        private decimal RecalcularProcNormalAlquimia(Item receita, decimal procNormal, MaestriaAlquimia maestria)
        {
            if (receita.ProcNormalExcessao != null && maestria != null)
            {
                switch (receita.ReferenciaId)
                {
                    case "R_A_342": //Fonte de Vida
                        return receita.ProcNormalExcessao.Value + (decimal)(1 * maestria.MaxProcChance);
                    case "R_A_38": //Endurecedor de Madeira
                        return receita.ProcNormalExcessao.Value + (decimal)(0.5 * maestria.MaxProcChance);
                    case "R_A_51": //Esmalte de Couro
                        return receita.ProcNormalExcessao.Value + (decimal)(0.5 * maestria.MaxProcChance);
                    case "R_A_37": //Polidor de Gema
                        return receita.ProcNormalExcessao.Value + (decimal)(0.5 * maestria.MaxProcChance);
                    case "R_A_36": //Solvente de Metal
                        return receita.ProcNormalExcessao.Value + (decimal)(0.5 * maestria.MaxProcChance);
                    case "R_A_179": //Elixir de Tendão de Baleia
                        return receita.ProcNormalExcessao.Value + (decimal)(0.5 * maestria.MaxProcChance);
                    default:
                        return receita.ProcNormalExcessao.Value;
                }

            }

            return Math.Round(procNormal, 2);
        }

        private decimal RecalcularProcRaroAlquimia(Item receita, decimal procRaro, MaestriaAlquimia maestria)
        {
            if (receita.ProcRaroExcessao != null && maestria != null)
            {
                switch (receita.ReferenciaId)
                {
                    //case "R_A_179":
                    //    return receita.ProcRaroExcessao.Value + (decimal)maestria.RareAddChance;
                    //case "R_C_187":
                    //    return receita.ProcRaroExcessao.Value + (decimal)maestria.RareAddChance;
                    default:
                        return receita.ProcRaroExcessao.Value;
                }
            }

            return Math.Round(procRaro, 2);
        }

        private bool ProcPorMaterialEhDiferente(Item receita)
        {

            var referenciasIds = new List<string>
            {
                //Delotia
                "M_5538",
                //Delotia de Luxo
                "M_5536",
                //Delotia Especial
                "M_5537"
            };

            return referenciasIds.Contains(receita.ReferenciaId);
        }

        private async Task<IList<ResultadoCalculadoViewModel>> ProcessarResultado(TipoReceitaEnum tipo, Item receita, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial)
        {
            MaestriaAlquimia maestriaAlquimia = null;
            MaestriaAlquimia maestriaAlquimiaImperialSelecionada = null;
            MaestriaCulinaria maestriaCulinaria = null;
            MaestriaCulinaria maestriaCulinariaImperialSelecionada = null;

            if (tipo == TipoReceitaEnum.Alquimia)
            {
                maestriaAlquimia = maestria > 0 ? await _maestriaAlquimiaRepository.GetByIdAsync(maestria) : await _maestriaAlquimiaRepository.GetByIdAsync(1);
                if (maestriaImperial == 0)
                    maestriaAlquimiaImperialSelecionada = maestriaAlquimia;
                else
                    maestriaAlquimiaImperialSelecionada = await _maestriaAlquimiaRepository.GetByIdAsync(maestriaImperial);
            }
            else if (tipo == TipoReceitaEnum.Culinaria)
            {
                maestriaCulinaria = maestria > 0 ? await _maestriaCulinariaRepository.GetByIdAsync(maestria) : await _maestriaCulinariaRepository.GetByIdAsync(1);
                if (maestriaImperial == 0)
                    maestriaCulinariaImperialSelecionada = maestriaCulinaria;
                else
                    maestriaCulinariaImperialSelecionada = await _maestriaCulinariaRepository.GetByIdAsync(maestriaImperial);
            }

            var procNormalAlquimia = maestriaAlquimia != null ? RecalcularProcNormalAlquimia(receita, procNormal, maestriaAlquimia) : 0;
            var procNormalCulinaria = maestriaCulinaria != null ? RecalcularProcNormalCulinaria(receita, procNormal, maestriaCulinaria) : 0;
            var procRaroCulinaria = maestriaCulinaria != null ? RecalcularProcRaroCulinaria(receita, procRaro, maestriaCulinaria) : 0;
            var procRaroAlquimia = maestriaAlquimia != null ? RecalcularProcRaroAlquimia(receita, procRaro, maestriaAlquimia) : 0;

            var resultados = receita.Resultados
                  .Where(r => r.Resultado.Excluido == false)
                  .OrderBy(i => i.Resultado.Nome)
                  .Select(i => new ResultadoCalculadoViewModel
                  {
                      Id = i.Resultado.ReferenciaId,
                      Item = i.Resultado.Nome,
                      Preco = i.Resultado.Valor,
                      Quantidade = i.ProcRaro ? (long)(quantidade * (maestriaAlquimia != null ? procRaroAlquimia : procRaroCulinaria)) : (long)(quantidade * (maestriaAlquimia != null ? procNormalAlquimia : procNormalCulinaria)),
                      Total = i.ProcRaro ? (long)(quantidade * (maestriaAlquimia != null ? procRaroAlquimia : procRaroCulinaria)) * i.Resultado.Valor : (long)(quantidade * (maestriaAlquimia != null ? procNormalAlquimia : procNormalCulinaria)) * i.Resultado.Valor,
                      Img = !string.IsNullOrEmpty(i.Resultado.ImagemUrl) ? $"Content/Image?referenciaId={i.Resultado.ReferenciaId}" : "",
                      QuantidadePorCaixa = QuantidadePorCaixa(i.Resultado?.ImperiaisReceitas?.FirstOrDefault()),
                      QuantidadeImperial = QuantidadeImperial(i.Resultado?.ImperiaisReceitas?.FirstOrDefault(), i.ProcRaro ? (long)(quantidade * (maestriaAlquimia != null ? procRaroAlquimia : procRaroCulinaria)) : (long)(quantidade * (maestriaAlquimia != null ? procNormalAlquimia : procNormalCulinaria))),
                      CaixaImperial = NomeCaixaImperial(i.Resultado?.ImperiaisReceitas?.FirstOrDefault()),
                      PrecoPorCaixa = CalcularPrecoImperial(i.Resultado?.ImperiaisReceitas?.FirstOrDefault(), (maestriaAlquimia != null ? maestriaAlquimiaImperialSelecionada.ImperialBonus : maestriaCulinariaImperialSelecionada.ImperialBonus)),
                      Ignorar = false
                  }).ToList();

            return resultados;
        }

        public async Task<IList<ResultadoCalculadoViewModel>> Resultados(TipoReceitaEnum tipo, string referenciaId, int quantidade, decimal procNormal, decimal procRaro, int maestria, int maestriaImperial)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            if (receita != null)
            {
                procNormal = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : EhProcesso(receita) ? 2.5m : procNormal;
                procRaro = receita.ProcRaroExcessao != null ? receita.ProcRaroExcessao.Value : procRaro;

                return await ProcessarResultado(tipo, receita, quantidade, procNormal, procRaro, maestria, maestriaImperial);
            }

            return null;
        }

        public async Task<IList<ImperialReceitaViewModel>> Imperial(string referenciaId)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);
            if (receita != null)
            {
                var resultados = receita.Resultados.Select(i => i.Resultado.ImperiaisReceitas).ToList();
            }

            return null;
        }

        public async Task<ServiceResponse<IList<ItemViewModel>>> ListarPorGrupo(string grupo)
        {
            var data = await _itemRepository.ListarPorGrupo(grupo);
            return new ServiceResponse<IList<ItemViewModel>>
            {
                Data = ObjectMapper.Mapper.Map<IList<ItemViewModel>>(data)
            };
        }

        public Task<IList<Item>> ListarReceitaResultados(string receitaReferenciaId)
        {
            throw new NotImplementedException();
        }

        public async Task<ServiceResponse<IList<ItemViewModel>>> ListarReceitasPorTipos(List<TipoReceitaEnum> tipos)
        {
            var data = await _itemRepository.ListarReceitasPorTipos(tipos);

            return new ServiceResponse<IList<ItemViewModel>>
            {
                Data = ObjectMapper.Mapper.Map<IList<ItemViewModel>>(data)
            };
        }

        public async Task<List<DependenciaViewModel>> ListarDependenciasDiretas(string referenciaId)
        {
            var receita = await _itemRepository.ObterComReceitasPorReferenciaId(referenciaId);
            if (receita != null && receita.Receitas != null)
            {
                var receitasDiretas = receita.Receitas.Select(r => r.Receita).ToList();
                return receitasDiretas?.Select(r => new DependenciaViewModel
                {
                    Id = r.ReferenciaId,
                    Nome = r.Nome,
                    Direta = true,
                    Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"Content/Image?referenciaId={r.ReferenciaId}" : "",
                    Preco = r.Valor,
                    QuantidadeDisponivel = r.QuantidadeDisponivel
                }).ToList();
            }

            return null;
        }

        public async Task<List<DependenciaViewModel>> ListarDependenciasIndiretas(string referenciaId)
        {
            var receita = await _itemRepository.ObterComReceitasPorReferenciaId(referenciaId);

            if (receita != null && receita.Receitas != null)
            {
                var receitasDiretas = receita.Receitas.Select(r => r.Receita).ToList();
                var receitasIndiretas = new List<Item>();
                foreach (var direta in receitasDiretas)
                {
                    var diretasDireta = direta.Receitas.Select(r => r.Receita).ToList();
                    receitasIndiretas.AddRange(diretasDireta);
                }

                var indiretas = receitasIndiretas.Distinct().ToList();
                if (indiretas != null)
                {
                    var iguais = receitasDiretas.Intersect(indiretas).ToList();
                    foreach (var igual in iguais)
                    {
                        indiretas.Remove(igual);
                    }

                    return indiretas.Select(r => new DependenciaViewModel
                    {
                        Id = r.ReferenciaId,
                        Nome = r.Nome,
                        Direta = false,
                        Img = !string.IsNullOrEmpty(r.ImagemUrl) ? $"Content/Image?referenciaId={r.ReferenciaId}" : "",
                        Preco = r.Valor,
                        QuantidadeDisponivel = r.QuantidadeDisponivel
                    }).ToList();
                }
            }

            return null;
        }

        //private long CalcularValorSubReceitaRecursivo(ReceitaItem receita, long quantidadeReceitas, decimal procNormal, decimal procRaro)
        //{
        //    if (receita.Item.Tipo == TipoEnum.Receita)
        //    {
        //        var pilhaReceita = new Stack<CalculoSubReceita>();
        //        receita.Item.Itens.ForEach(i => pilhaReceita.Push(new CalculoSubReceita { Principal = receita, SubReceita = i }));
        //        long total = 0;
        //        while (pilhaReceita.Count > 0)
        //        {
        //            var receitaAtual = pilhaReceita.Pop();
        //            if (receitaAtual.SubReceita.Item != null && receitaAtual.SubReceita.Item.Itens != null && receitaAtual.SubReceita.Item.Itens.Count > 0)
        //            {
        //                foreach (var subReceita in receitaAtual.SubReceita.Item.Itens)
        //                {
        //                    pilhaReceita.Push(new CalculoSubReceita { Principal = receitaAtual.SubReceita, SubReceita = subReceita });
        //                }
        //            }
        //            else
        //            {

        //                var proc = receitaAtual.SubReceita.Receita.ProcNormalExcessao != null ? receitaAtual.SubReceita.Receita.ProcNormalExcessao.Value : EhProcesso(receitaAtual.SubReceita.Receita) ? 2.5m : procNormal + procRaro;

        //                var quantidadeSubReceita = (long)Math.Max(Math.Ceiling((receitaAtual.SubReceita.Quantidade *  receitaAtual.Principal.Quantidade * quantidadeReceitas) / proc), receitaAtual.SubReceita.Quantidade);
        //                var totalSubReceita = quantidadeSubReceita * receitaAtual.SubReceita.Item.Valor;
        //                var subReceitaCustoProducaoUnitario = totalSubReceita / ((long)receitaAtual.SubReceita.Quantidade * receitaAtual.Principal.Quantidade * quantidadeReceitas);

        //                total += subReceitaCustoProducaoUnitario;
        //                //total += (long)(Math.Max(Math.Ceiling((receitaAtual.SubReceita.Quantidade * receitaAtual.Principal.Quantidade) / proc), receitaAtual.SubReceita.Quantidade) * receitaAtual.SubReceita.Item.Valor);
        //            }

        //        }

        //        return total;
        //    }

        //    return (long)receita.Item.Valor;
        //}

        private long CalcularValorSubReceitaRecursivo(Item receita, decimal procNormal, decimal procRaro)
        {
            long total = 0;
            if (receita.Tipo == TipoEnum.Receita)
            {

                foreach (var ingrediente in receita.Itens)
                {
                    total += (long)(ingrediente.Quantidade * ingrediente.Item.Valor);
                }

                var procNormalExcessao = receita.ProcNormalExcessao;
                var procRaroExcessao = receita.ProcRaroExcessao;

                if (procNormalExcessao != null && procRaroExcessao != null)
                    return (long)(total / (receita.MultiResultados ? procNormalExcessao.Value + procRaroExcessao.Value : procNormalExcessao.Value));
                else if (procNormalExcessao != null)
                    return (long)(total / (receita.MultiResultados ? procNormalExcessao.Value + procRaro : procNormalExcessao.Value));

                return (long)(total / (EhProcesso(receita) ? 2.5m : receita.MultiResultados ? procNormal + procRaro : procNormal));
            }

            return (long)receita.Valor;
        }
    }
}

