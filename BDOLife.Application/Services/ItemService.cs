using BDOLife.Application.Interfaces;
using BDOLife.Application.Mapper;
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

        public async Task<Dictionary<ItemViewModel, long>> Ingredientes(string referenciaId, int quantidade, decimal procNormal)
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

        public async Task<IList<NodeViewModel>> TreeView(string referenciaId, int quantidade, decimal procNormal, bool semDetalhes = false)
        {
            procNormal = procNormal == 0 ? 1m : procNormal;

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
                    tipo = (int)receita.Tipo
                });

                foreach (var subReceita in receita.Itens)
                {
                    if (subReceita.Visivel && subReceita.Excluido == false)
                    {
                        var subReceitaProc = quantidade * subReceita.Quantidade;
                        tree.Add(new NodeViewModel
                        {
                            id = $"{subReceita.ItemReferenciaId}",
                            parent = "raiz",
                            text = $"{subReceita.Quantidade} {subReceita.Item.Nome} {(!semDetalhes ? $"({(long)subReceitaProc})" : "")}",
                            icon = !string.IsNullOrEmpty(subReceita.Item.ImagemUrl) ? $"Content/Image?referenciaId={subReceita.Item.ReferenciaId}" : "",
                            state = new { opened = true },
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
                            tipo = (int)subReceita.Item.Tipo
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
                                    tree.Add(new NodeViewModel
                                    {
                                        id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                        parent = $"{subReceita.ItemReferenciaId}",
                                        text = $" {sub1.Quantidade} {sub1.Item.Nome} {(!semDetalhes ? $"({(long)sub1Proc})" : "")}",
                                        icon = !string.IsNullOrEmpty(sub1.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub1.Item.ReferenciaId}" : "",
                                        state = new { opened = true },
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
                                        tipo = (int)sub1.Item.Tipo
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
                                                tree.Add(new NodeViewModel
                                                {
                                                    id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                    parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                                    text = $" {sub2.Quantidade} {sub2.Item.Nome} {(!semDetalhes ? $"({(long)sub2Proc})" : "")}",
                                                    icon = !string.IsNullOrEmpty(sub2.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub2.Item.ReferenciaId}" : "",
                                                    state = new { opened = true },
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
                                                    tipo = (int)sub2.Item.Tipo
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
                                                            tree.Add(new NodeViewModel
                                                            {
                                                                id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                                text = $" {sub3.Quantidade} {sub3.Item.Nome} {(!semDetalhes ? $"({(long)sub3Proc})" : "")}",
                                                                icon = !string.IsNullOrEmpty(sub3.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub3.Item.ReferenciaId}" : "",
                                                                state = new { opened = true },
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
                                                                tipo = (int)sub3.Item.Tipo
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
                                                                        tree.Add(new NodeViewModel
                                                                        {
                                                                            id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                            parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                            text = $" {sub4.Quantidade} {sub4.Item.Nome} {(!semDetalhes ? $"({(long)sub4Proc})" : "")}",
                                                                            icon = !string.IsNullOrEmpty(sub4.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub4.Item.ReferenciaId}" : "",
                                                                            state = new { opened = true },
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
                                                                            tipo = (int)sub4.Item.Tipo
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
                                                                                    tree.Add(new NodeViewModel
                                                                                    {
                                                                                        id = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}-{sub5.ItemReferenciaId}",
                                                                                        parent = $"{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                                        text = $" {sub5.Quantidade} {sub5.Item.Nome} {(!semDetalhes ? $"({(long)sub5Proc})" : "")}",
                                                                                        icon = !string.IsNullOrEmpty(sub5.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub5.Item.ReferenciaId}" : "",
                                                                                        state = new { opened = true },
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
                                                                                        tipo = (int)sub5.Item.Tipo
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

        public async Task<IList<NodeViewModel>> TreeViewSubReceita(string raiz, string referenciaId, int quantidade, int quantidadePorReceita, decimal procNormal, bool semDetalhes = false)
        {
            procNormal = procNormal == 0 ? 2.5m : procNormal;

            var tree = new List<NodeViewModel>();

            var receita = await _itemRepository.ObterPorReferenciaId(referenciaId);

            if (receita != null && receita.Excluido == false)
            {
                var procNormalInicio = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : EhProcesso(receita) ? 2.5m : procNormal;
                var receitaProcInicio = Math.Ceiling(quantidade / procNormalInicio);
                receitaProcInicio = receitaProcInicio < 1 && quantidade > 0 ? 1 : receitaProcInicio;

                receita.Itens = receita.Itens.OrderBy(i => i.Item.Nome).ToList();
                tree.Add(new NodeViewModel
                {
                    id = $"{receita.ReferenciaId}",
                    parent = raiz,
                    text = $"{quantidadePorReceita} {receita.Nome} {(!semDetalhes ? $"({(raiz == "raiz" ? quantidade : (long)receitaProcInicio)})" : "")}",
                    icon = !string.IsNullOrEmpty(receita.ImagemUrl) ? $"Content/Image?referenciaId={receita.ReferenciaId}" : "",
                    state = new { opened = true },
                    nomeItem = receita.Nome,
                    quantidade = raiz == "raiz" ? quantidade : (long)receitaProcInicio,
                    valor = receita.Valor,
                    grupo = receita.Grupo,
                    dataAtualizacao = receita.DataAtualizacao.ToString("dd/MM/yyyy HH:mm"),
                    disponivel = receita.QuantidadeDisponivel != 0,
                    quantidadeDisponivel = receita.QuantidadeDisponivel,
                    vendeNPC = receita.ValorNPC != null,
                    localNPC = receita.LocalizacaoNPC,
                    valorNPC = receita.ValorNPC,
                    tipo = (int)receita.Tipo
                });

                foreach (var subReceita in receita.Itens)
                {
                    if (subReceita.Visivel && subReceita.Excluido == false)
                    {
                        var procNormalReceita = receita.ProcNormalExcessao != null ? receita.ProcNormalExcessao.Value : EhProcesso(receita) ? 2.5m : procNormal;
                        var receitaProc = Math.Ceiling(quantidade / procNormalReceita) * subReceita.Quantidade;
                        receitaProc = receitaProc < 1 && quantidade > 0 ? 1 : receitaProc;
                        tree.Add(new NodeViewModel
                        {
                            id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}",
                            parent = $"{receita.ReferenciaId}",
                            text = $" {subReceita.Quantidade} {subReceita.Item.Nome} {(!semDetalhes ? $"({(long)receitaProc})" : "")}",
                            icon = !string.IsNullOrEmpty(subReceita.Item.ImagemUrl) ? $"Content/Image?referenciaId={subReceita.Item.ReferenciaId}" : "",
                            state = new { opened = true },
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
                            tipo = (int)subReceita.Item.Tipo
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
                                    tree.Add(new NodeViewModel
                                    {
                                        id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                        parent = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}",
                                        text = $" {sub1.Quantidade} {sub1.Item.Nome} {(!semDetalhes ? $"({(long)sub1Proc})" : "")}",
                                        icon = !string.IsNullOrEmpty(sub1.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub1.Item.ReferenciaId}" : "",
                                        state = new { opened = true },
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
                                        tipo = (int)sub1.Item.Tipo
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
                                                tree.Add(new NodeViewModel
                                                {
                                                    id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                    parent = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}",
                                                    text = $" {sub2.Quantidade} {sub2.Item.Nome} {(!semDetalhes ? $"({(long)sub2Proc})" : "")}",
                                                    icon = !string.IsNullOrEmpty(sub2.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub2.Item.ReferenciaId}" : "",
                                                    state = new { opened = true },
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
                                                    tipo = (int)sub2.Item.Tipo
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
                                                            tree.Add(new NodeViewModel
                                                            {
                                                                id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                parent = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}",
                                                                text = $" {sub3.Quantidade} {sub3.Item.Nome} {(!semDetalhes ? $"({(long)sub3Proc})" : "")}",
                                                                icon = !string.IsNullOrEmpty(sub3.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub3.Item.ReferenciaId}" : "",
                                                                state = new { opened = true },
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
                                                                tipo = (int)sub3.Item.Tipo
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
                                                                        tree.Add(new NodeViewModel
                                                                        {
                                                                            id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                            parent = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}",
                                                                            text = $" {sub4.Quantidade} {sub4.Item.Nome} {(!semDetalhes ? $"({(long)sub4Proc})" : "")}",
                                                                            icon = !string.IsNullOrEmpty(sub4.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub4.Item.ReferenciaId}" : "",
                                                                            state = new { opened = true },
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
                                                                            tipo = (int)sub4.Item.Tipo
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
                                                                                    tree.Add(new NodeViewModel
                                                                                    {
                                                                                        id = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}-{sub5.ItemReferenciaId}",
                                                                                        parent = $"{receita.ReferenciaId}-{subReceita.ItemReferenciaId}-{sub1.ItemReferenciaId}-{sub2.ItemReferenciaId}-{sub3.ItemReferenciaId}-{sub4.ItemReferenciaId}",
                                                                                        text = $" {sub5.Quantidade} {sub5.Item.Nome} {(!semDetalhes ? $"({(long)sub5Proc})" : "")}",
                                                                                        icon = !string.IsNullOrEmpty(sub5.Item.ImagemUrl) ? $"Content/Image?referenciaId={sub5.Item.ReferenciaId}" : "",
                                                                                        state = new { opened = true },
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
                                                                                        tipo = (int)sub5.Item.Tipo
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
    }
}

