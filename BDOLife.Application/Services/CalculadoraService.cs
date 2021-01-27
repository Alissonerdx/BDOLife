using BDOLife.Application.Interfaces;
using BDOLife.Application.ViewModels;
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
    public class CalculadoraService : ICalculadoraService
    {
        private readonly IItemRepository _itemRepository;
        private readonly IMaestriaCulinariaRepository _maestriaCulinariaRepository;
        private readonly IMaestriaAlquimiaRepository _maestriaAlquimiaRepository;
        private readonly IMaestriaProcessoRepository _maestriaProcessoRepository;

        public CalculadoraService(
            IItemRepository itemRepository,
            IMaestriaAlquimiaRepository maestriaAlquimiaRepository,
            IMaestriaCulinariaRepository maestriaCulinariaRepository,
            IMaestriaProcessoRepository maestriaProcessoRepository)
        {
            _itemRepository = itemRepository;
            _maestriaAlquimiaRepository = maestriaAlquimiaRepository;
            _maestriaCulinariaRepository = maestriaCulinariaRepository;
            _maestriaProcessoRepository = maestriaProcessoRepository;
            _maestriaProcessoRepository = maestriaProcessoRepository;
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

        private long CalcularSubReceitaRecursivamente(Item receita, decimal procNormal, decimal procRaro)
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

        public NodeViewModel Node(Item receita,
            long quantidadePorReceita,
            long quantidade,
            decimal procNormalCustom,
            decimal procRaroCustom,
            string parent,
            string nodeId,
            bool expandido = true)
        {
            var procNormal = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : procNormalCustom;
            var procRaro = receita.ProcRaroExcessao != null ? receita.ProcRaroExcessao.Value : procRaroCustom;
            var novaQuantidade = parent == "raiz" ? quantidade * quantidadePorReceita : Math.Ceiling(quantidade / procNormal) * quantidadePorReceita;
            var text = parent == "#" ? $"({quantidade}) {receita.Nome}" : $"{quantidadePorReceita} {receita.Nome} ({novaQuantidade})";
            var custoProducaoBase = CalcularSubReceitaRecursivamente(receita, procNormal, 0);
            var custoProducaoComRaro = CalcularSubReceitaRecursivamente(receita, procNormal, procRaro);

            return new NodeViewModel
            {
                id = nodeId,
                parent = parent,
                text = text,
                icon = !string.IsNullOrEmpty(receita.ImagemUrl) ? $"/Content/Image?referenciaId={receita.ReferenciaId}" : "",
                state = new { opened = expandido },
                nomeItem = receita.Nome,
                quantidade = (long)novaQuantidade,
                peso = receita.Peso,
                pesoTotal = Math.Round(receita.Peso * novaQuantidade, 2),
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
                procNormal = procNormal,
                procRaro = procRaro,
                referenciaId = receita.ReferenciaId,
                possuiProcRaro = receita.MultiResultados,
                nivelSubReceita = 1,
                custoCompra = receita.Valor,
                custoProducao = custoProducaoBase == 0 ? receita.Valor : custoProducaoBase,
                custoProducaoProcNormalERaro = custoProducaoComRaro == 0 ? receita.Valor : custoProducaoComRaro,
                produzirOuComprar = custoProducaoComRaro < receita.Valor ? "PRODUZIR" : "COMPRAR",
            };
        }

        public async Task<IList<NodeViewModel>> TreeViewProcesso(string receitaReferenciaId, long quantidade, int? maestriaAlquimiaId)
        {
            var tree = new List<NodeViewModel>();
            if (!string.IsNullOrEmpty(receitaReferenciaId))
            {
                var receita = await _itemRepository.ObterPorReferenciaId(receitaReferenciaId);
                if (receita != null && receita.Itens != null && receita.Itens.Count > 0 && receita.Excluido == false)
                {
                    receita.Itens = receita.Itens.OrderBy(i => i.Item.Nome).ToList();
                    tree.Add(Node(receita, 1, quantidade, 2.5m, 0.05m, "#", "raiz"));
                    foreach (var subReceita1 in receita.Itens)
                    {
                        tree.Add(Node(subReceita1.Item, subReceita1.Quantidade, quantidade, 2.5m, 0.05m, "raiz", subReceita1.ItemReferenciaId, false));
                        if (subReceita1.Item.Itens != null && subReceita1.Item.Itens.Count > 0)
                        {
                            subReceita1.Item.Itens = subReceita1.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                            var quantidadeSubReceita1 = tree.Last().quantidade;

                            foreach (var subReceita2 in subReceita1.Item.Itens)
                            {
                                tree.Add(Node(subReceita2.Item, subReceita2.Quantidade, quantidadeSubReceita1, 2.5m, 0.05m, subReceita1.ItemReferenciaId, $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}", false));
                                if (subReceita2.Item.Itens != null && subReceita2.Item.Itens.Count > 0)
                                {
                                    subReceita2.Item.Itens = subReceita2.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                    var quantidadeSubReceita2 = tree.Last().quantidade;

                                    foreach (var subReceita3 in subReceita2.Item.Itens)
                                    {
                                        tree.Add(Node(subReceita3.Item, subReceita3.Quantidade, quantidadeSubReceita2, 2.5m, 0.05m, $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}", $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}", false));
                                        if (subReceita3.Item.Itens != null && subReceita3.Item.Itens.Count > 0)
                                        {
                                            subReceita3.Item.Itens = subReceita3.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                            var quantidadeSubReceita3 = tree.Last().quantidade;

                                            foreach (var subReceita4 in subReceita3.Item.Itens)
                                            {
                                                tree.Add(Node(subReceita4.Item, subReceita4.Quantidade, quantidadeSubReceita3, 2.5m, 0.05m, $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}", $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}-{subReceita4.ItemReferenciaId}", false));
                                                if (subReceita4.Item.Itens != null && subReceita4.Item.Itens.Count > 0)
                                                {
                                                    subReceita4.Item.Itens = subReceita4.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                    var quantidadeSubReceita4 = tree.Last().quantidade;
                                                    foreach (var subReceita5 in subReceita4.Item.Itens)
                                                    {
                                                        tree.Add(Node(subReceita5.Item, subReceita5.Quantidade, quantidadeSubReceita4, 2.5m, 0.05m, $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}-{subReceita4.ItemReferenciaId}", $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}-{subReceita4.ItemReferenciaId}-{subReceita5.ItemReferenciaId}", false));
                                                        if (subReceita5.Item.Itens != null && subReceita5.Item.Itens.Count > 0)
                                                        {
                                                            subReceita5.Item.Itens = subReceita5.Item.Itens.OrderBy(i => i.Item.Nome).ToList();
                                                            var quantidadeSubReceita5 = tree.Last().quantidade;
                                                            foreach (var subReceita6 in subReceita5.Item.Itens)
                                                            {
                                                                tree.Add(Node(subReceita6.Item, subReceita6.Quantidade, quantidadeSubReceita5, 2.5m, 0.05m, $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}-{subReceita4.ItemReferenciaId}-{subReceita5.ItemReferenciaId}", $"{subReceita1.ItemReferenciaId}-{subReceita2.ItemReferenciaId}-{subReceita3.ItemReferenciaId}-{subReceita4.ItemReferenciaId}-{subReceita5.ItemReferenciaId}-{subReceita6.ItemReferenciaId}", false));
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

        public async Task<IList<ResultadoCalculadoViewModel>> ResultadosProcesso(string receitaReferenciaId, long quantidade, int nivelProcesso)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(receitaReferenciaId);
            var resultados = new List<ResultadoCalculadoViewModel>();

            foreach (var resultado in receita.Resultados)
            {
                var proc = resultado.ProcRaro == false ? (resultado.Resultado.ProcNormalExcessao != null ? resultado.Resultado.ProcNormalExcessao.Value : 2.5m) : 0.05m;
                var quantidadeTotal = (long)(proc * quantidade);

                resultados.Add(new ResultadoCalculadoViewModel
                {
                    Img = !string.IsNullOrEmpty(resultado.Resultado.ImagemUrl) ? $"/Content/Image?referenciaId={resultado.Resultado.ReferenciaId}" : "",
                    Item = resultado.Resultado.Nome,
                    Quantidade = quantidadeTotal,
                    Peso = resultado.Resultado.Peso,
                    PesoTotal = resultado.Resultado.Peso * quantidadeTotal,
                    Preco = resultado.Resultado.Valor,
                    Total = quantidadeTotal * resultado.Resultado.Valor,
                });
            }

            return resultados;
        }

        public async Task<Dictionary<ItemViewModel, long>> IngredientesDiretosProcesso(
            string receitaReferenciaId,
            long quantidade,
            decimal procNormalAlquimia,
            decimal procRaroAlquimia)
        {
            var receita = await _itemRepository.ObterPorReferenciaId(receitaReferenciaId);

            var subreceitas = new Dictionary<ItemViewModel, long>();

            if (receita != null && receita.Itens != null && receita.Itens.Count > 0)
            {
                foreach (var ingrediente in receita.Itens)
                {
                    if (ingrediente.Excluido == false && ingrediente.Item.Excluido == false)
                    {
                        var procNormal = ingrediente.Item.ProcNormalExcessao != null ? ingrediente.Item.ProcNormalExcessao.Value : 2.5m;
                        var procRaro = ingrediente.Item.ProcRaroExcessao != null ? ingrediente.Item.ProcRaroExcessao.Value : 0.05m;

                        if (ingrediente.Item.TipoReceita == TipoReceitaEnum.Alquimia)
                        {
                            procNormal = procNormalAlquimia;
                            procRaro = procRaroAlquimia;
                        }

                        var custoProducaoBase = CalcularSubReceitaRecursivamente(ingrediente.Item, procNormal, 0);
                        var custoProducaoComRaro = CalcularSubReceitaRecursivamente(ingrediente.Item, procNormal, procRaro);

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
                            CustoProducao = custoProducaoBase == 0 ? ingrediente.Item.Valor : custoProducaoBase,
                            CustoProducaoProcNormalERaro = custoProducaoComRaro == 0 ? ingrediente.Item.Valor : custoProducaoComRaro
                        };
                        subreceitas.Add(item, quantidade * ingrediente.Quantidade);
                    }
                }
            }

            return subreceitas;
        }
    }
}
