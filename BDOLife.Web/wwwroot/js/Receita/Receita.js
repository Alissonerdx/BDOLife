var maestriaImperialSelecionada = 0;
var ingredienteNodeSelecionado = null;
var pagina = window.location.pathname;
var placeholderMaestria = "";
var tipoReceita = 0;
var receitaSelecionada = "";

$(document).ready(function () {
    Inicializar();
    Tabelas();
    Selects();
    Eventos();
    TreeView();
    EventTimer();
    Modal();
    Checkbox();
    Popovers();


    function Inicializar() {
        if (pagina.toLowerCase().includes('culinaria')) {
            placeholdeMaestria = "Selecione a maestria (Culinária)";
            tipoReceita = 2;
        }
        else if (pagina.toLowerCase().includes('alquimia')) {
            placeholdeMaestria = "Selecione a maestria (Alquimia)";
            tipoReceita = 1;
        }
    }

    function Popovers() {

        $('.custo-producao-tooltip').popover({
            title: 'Custo de Produção',
            html: true,
            content: `<p>É a soma dos custos de compras dos ingredientes da subreceita dividido pelo proc.</p> <p>Quando a subreceita é configurada para considerar o proc raro o mesmo é utilizado no cálculo, Ex: proc normal: 2.5, proc raro: 0.3, proc considerado = 2.8 (2.5 + 0.3).</p><p>Para considerar o uso do proc raro de uma subreceita é só clicar com o botão direito na subreceita na árvore lateral (direita) e ir em CONFIGURAR e marcar o campo de USAR PROCS RAROS.</p>`,
            trigger: 'hover',
            placement: 'right'
        });

        $('.produzir-comprar-tooltip').popover({
            title: 'Produzir ou Comprar',
            html: true,
            content: `<p>Está coluna fornece a abordagem mais indicada (comprar ou produzir) a se fazer com a subreceita com base na comparação entre o campo Custo de Compra e Custo de Produção, se o Custo de Produção for menor que o Custo de Compra a coluna virá com a opção PRODUZIR selecionada, caso contrário com COMPRAR.</p><p>Se o campo estiver como PRODUZIR a subreceita na árvore a direita deve ser expandida indicando que a mesma será produzida, caso contrário deverá continuar minimizada indicando a COMPRA da subreceita.</p>`,
            trigger: 'hover',
            placement: 'right'
        });

        $('.ignorar-tooltip').popover({
            title: 'Ignorar',
            html: true,
            content: `<p>Está opção deve ser manipulada com CUIDADO, não é porque o recurso foi coletado/produzido que deve ser ignorado (tudo possui um valor). Ex: 1000 Carne de Lobo (Coletado), mesmo que eu tenha coletado a carne de lobo ela possui um valor atrelado, poderia vender no mercado ao invés de usar na receita e por esse motivo não deve ser ignorada!</p>`,
            trigger: 'hover',
            placement: 'right'
        });
    }

    function Modal() {
        $('#configurarIngrediente').iziModal({
            title: 'Configurar',
            background: '#494C56',
            headerColor: '#33363F',
            width: '60%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            onOpening: function () {
                let ingredienteSelecionado = $('#treeViewContent').jstree("get_selected")[0];
                ingredienteNodeSelecionado = $("#treeViewContent").jstree("get_node", ingredienteSelecionado);
            },
            afterRender: function () {

                $('#configurarIngrediente').find('#procNormalConfIngrediente').inputmask({
                    mask: "9[,99]",
                    radixPoint: ",",
                    greedy: false,
                    clearIncomplete: true,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    clearMaskOnLostFocus: true,
                    autoclear: false,
                    definitions: {
                        '*': {
                            validator: "[0-9]"
                        }
                    },
                    rightAlign: true
                });

                $('#configurarIngrediente').find('#procRaroConfIngrediente').inputmask({
                    mask: "9[,99]",
                    radixPoint: ",",
                    greedy: false,
                    clearIncomplete: true,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    clearMaskOnLostFocus: true,
                    autoclear: false,
                    definitions: {
                        '*': {
                            validator: "[0-9]"
                        }
                    },
                    rightAlign: true
                });

                $('#configurarIngrediente').find('#maestriaConfIngrediente').select2({
                    placeholder: 'Selecione a maestria',
                    language: "pt-BR",
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    allowClear: true,
                    ajax: {
                        url: '/Maestria/SelectMaestrias',
                        type: "GET",
                        data: function (params) {
                            var query = {
                                search: parseInt(params.term),
                                //page: params.page || 1,
                                tipo: tipoReceita
                            };

                            return query;
                        },
                        processResults: function (data) {
                            return data;
                        },

                    }
                });

                $('#configurarIngrediente').find('#maestriaConfIngrediente').on('change', function () {
                    let selecionado = $(this).select2('data')[0];

                    if (selecionado !== undefined) {
                        $('#configurarIngrediente').find('#procNormalConfIngrediente').inputmask("setvalue", selecionado.procNormal);
                        $('#configurarIngrediente').find('#procRaroConfIngrediente').inputmask("setvalue", selecionado.procRaro);
                        $('#configurarIngrediente').find('#procNormalConfIngrediente').focus();
                        $('#configurarIngrediente').find('#procRaroConfIngrediente').focus();
                    }
                });
            }
        });

        $('#trocarIngrediente').iziModal({
            title: 'Alterar ingrediente',
            background: '#494C56',
            headerColor: '#33363F',
            width: '60%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            onOpening: function () {
                let ingredienteSelecionado = $('#treeViewContent').jstree("get_selected")[0];
                let node = $("#treeViewContent").jstree("get_node", ingredienteSelecionado);

                let idsParent = node.parent.split('-');
                let parentId = idsParent[idsParent.length - 1];
                let parentNode = $("#treeViewContent").jstree("get_node", node.parent);

                while ((parentId.includes('PCH') || parentId.includes('PDE') || parentId.includes('RFI') || parentId.includes('PMO')) && parentNode.original.grupo !== null && parentNode.original.grupo !== undefined && parentNode.original.grupo !== "") {
                    node = parentNode;
                    idsParent = parentNode.parent.split('-');
                    parentId = idsParent[idsParent.length - 1];
                    parentNode = $("#treeViewContent").jstree("get_node", parentNode.parent);
                }

                ingredienteNodeSelecionado = node;
                $('#trocarIngrediente').find('#grupoItemTrocaSelecionado').val(node.original.grupo);

                //let nodeParent = $("#treeViewContent").jstree("get_node", node.parent);
                //let idsNode = node.original.id.split('-');
                //let nodeReferenciaId = idsNode[idsNode.length - 1];

                //let idsNodeParent = nodeParent.original.id.split('-');
                //let parentReferenciaId = idsNodeParent[idsNodeParent.length - 1];

                //while ((parentReferenciaId.includes('PCH') || parentReferenciaId.includes('PDE') || parentReferenciaId.includes('RFI') || parentReferenciaId.includes('PMO')) && nodeParent.original.grupo !== null && nodeParent.original.grupo !== "") {
                //    let parentId = nodeParent.parent;
                //    nodeParent = $("#treeViewContent").jstree("get_node", parentId);
                //    idsNodeParent = nodeParent.original.id.split('-');
                //    parentReferenciaId = idsNodeParent[idsNodeParent.length - 1];

                //    let parentParentId = nodeParent.Parent;
                //    let nodeParentParent = $("#treeViewContent").jstree("get_node", parentParentId);
                //    let idsNodeParentParent = nodeParentParent.original.id.split('-');
                //    let parenParentReferenciaId = idsNodeParentParent[idsNodeParentParent.length - 1];
                //    parentReferenciaId = parenParentReferenciaId;
                //}


                //if (nodeParent.original.grupo !== null && nodeParent.original.grupo !== "" && nodeParent.children.length === 1) {

                //}
                //else {
                //    $('#trocarIngrediente').find('#grupoItemTrocaSelecionado').val(node.original.grupo);
                //}
            },
            afterRender: function () {

                $('#quantidadeIngrediente').inputmask({
                    alias: "integer",
                    allowMinus: false,
                    mask: "9999999",
                });

                $('#precoUnitario').inputmask({
                    alias: "prata",
                });

                if ($('#trocarIngrediente').find('#ingredienteAlternativo').data('select2'))
                    $('#trocarIngrediente').find('#ingredienteAlternativo').val('').trigger('change');

                $('#ingredienteAlternativo').select2({
                    placeholder: 'Selecione o ingrediente',
                    language: "pt-BR",
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    ajax: {
                        url: "/Item/SelectItensPorGrupo",
                        type: "GET",
                        data: function (params) {
                            var query = {
                                search: params.term,
                                page: params.page || 1,
                                grupo: $('#trocarIngrediente').find('#grupoItemTrocaSelecionado').val()
                            };

                            return query;
                        },
                        processResults: function (data) {
                            return { results: data };
                        },

                    }
                });

                $('#ingredienteAlternativo').on('select2:select', function (e) {
                    let selecionado = $(this).select2('data')[0];
                    let precoUnitario = selecionado.valor;

                    $('#precoUnitario').val(precoUnitario);
                });
            }
        });

        $('#configuracaoMaestria').iziModal({
            title: 'Configuração da Maestria',
            background: '#494C56',
            headerColor: '#33363F',
            radius: 20,
            top: 200,
            afterRender: function () {
                $('#maestriaImperialSelect').select2({
                    placeholder: 'Selecione a maestria (Entrega Imperial)',
                    language: "pt-BR",
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    allowClear: true,
                    ajax: {
                        url: '/Maestria/SelectMaestrias',
                        type: "GET",
                        data: function (params) {
                            var query = {
                                search: parseInt(params.term),
                                //page: params.page || 1,
                                tipo: tipoReceita
                            };

                            return query;
                        },
                        processResults: function (data) {
                            return data;
                        },

                    }
                });
            },
        });

        $('#configuracaoQuantidade').iziModal({
            title: 'Calculadora de Quantidade',
            background: '#494C56',
            headerColor: '#33363F',
            radius: 20,
            width: '60%',
            top: 200,
            afterRender: function () {
                $('#configuracaoQuantidade').find('#quantidadeProdutosCalculadora').inputmask({
                    alias: "integer",
                    allowMinus: false,
                    mask: "9999999",
                });

                $('#configuracaoQuantidade').find('#quantidadeDiasCalculadora').inputmask({
                    alias: "integer",
                    allowMinus: false,
                    mask: "9999999",
                });

                $('#configuracaoQuantidade').find('#procNormalCalculadora').inputmask({
                    mask: "9[,99]",
                    radixPoint: ",",
                    greedy: false,
                    clearIncomplete: true,
                    showMaskOnHover: false,
                    showMaskOnFocus: false,
                    clearMaskOnLostFocus: true,
                    autoclear: false,
                    definitions: {
                        '*': {
                            validator: "[0-9]"
                        }
                    },
                    rightAlign: true
                });

                $('#configuracaoQuantidade').find('#quantidadeProdutosCalculadora').val(0);
                $('#configuracaoQuantidade').find('#quantidadeDiasCalculadora').val(1);
                $('#configuracaoQuantidade').find('#procNormalCalculadora').val('2.50');
                $('#configuracaoQuantidade').find('#totalProdutosCalculadora').val(0);
                $('#configuracaoQuantidade').find('#quantidadeReceitasCalculadora').val(0);

                $('#quantidadeProdutosCalculadora, #quantidadeDiasCalculadora, #procNormalCalculadora').on('keyup', function () {

                    let quantidadeProdutos = $('#quantidadeProdutosCalculadora').val();
                    if (quantidadeProdutos === "" || quantidadeProdutos === undefined)
                        quantidadeProdutos = 0;

                    let quantidadeDias = $('#quantidadeDiasCalculadora').val();
                    if (quantidadeDias === "" || quantidadeDias === undefined)
                        quantidadeDias = 0;

                    let procNormal = parseFloat($('#procNormalCalculadora').val().replace(/,/g, '.'))
                    if (procNormal === "" || procNormal === undefined)
                        procNormal = 0.0;

                    let totalProdutos = quantidadeProdutos * quantidadeDias;

                    $('#totalProdutosCalculadora').val(totalProdutos)
                    $('#quantidadeReceitasCalculadora').val(Math.ceil(totalProdutos / procNormal))
                })

                //$('#maestriaImperialSelect').select2({
                //    placeholder: 'Selecione a maestria (Entrega Imperial)',
                //    language: "pt-BR",
                //    width: '100%',
                //    dropdownCssClass: "increasedzindexclass",
                //    templateResult: formatState,
                //    templateSelection: formatState,
                //    allowClear: true,
                //    ajax: {
                //        url: '/Maestria/SelectMaestrias',
                //        type: "GET",
                //        data: function (params) {
                //            var query = {
                //                search: parseInt(params.term),
                //                //page: params.page || 1,
                //                tipo: tipoReceita
                //            };

                //            return query;
                //        },
                //        processResults: function (data) {
                //            return data;
                //        },

                //    }
                //});
            },
        });
    }

    function EventTimer() {
        setInterval(AtualizarTotais, 1000);
    }

    function Eventos() {
        $('#maestriaSelect').on('change', function () {
            let selecionado = $(this).select2('data')[0];

            if (selecionado !== undefined) {
                $('#proc-normal').inputmask("setvalue", $(selecionado.element).attr('data-proc-normal'));
                $('#proc-raro').inputmask("setvalue", $(selecionado.element).attr('data-proc-raro'));
                $('#proc-normal').focus();
                $('#proc-raro').focus();
            }
        });


        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();
            $("#ingredientesGrid").jsGrid("loadData");
            $("#resultadosGrid").jsGrid("loadData");
            $('#dependenciaDiretaTb').jsGrid("loadData");
            $('#dependenciaIndiretaTb').jsGrid("loadData");
            $("#resultadosImperialGrid").jsGrid("loadData");

            $('#treeViewContent').jstree(true).refresh();

            receitaSelecionada = $('#receitaSelect').val();
            CarregarGraficos();
        });

    }

    function Selects() {

        $('#receitaSelect').select2({
            placeholder: 'Selecione a receita',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $.get(`/Maestria/SelectMaestrias?tipo=${tipoReceita}`, function (data) {
            $('#maestriaSelect').append('<option>Selecione a maestria</option>');
            data.results.forEach(function (value, index) {
                $('#maestriaSelect').append(`<option data-proc-normal='${value.procNormal}' data-proc-raro='${value.procRaro}' data-regularmpc='${value.regularMaxProcChance}' data-rarempc='${value.rareMaxProcChance}' value='${value.id}'>${value.text}</option>`);
            })

            $('#maestriaSelect').select2({
                placeholder: placeholderMaestria,
                language: "pt-BR",
                width: '100%',
                templateResult: formatState,
                templateSelection: formatState,
                allowClear: true,
            });
        });
        //url: '/Maestria/SelectMaestrias',
        //    type: "GET",
        //        data: function (params) {
        //            var query = {
        //                //page: params.page || 1,
        //                tipo: tipoReceita
        //            };

        //            return query;
        //        },
        //processResults: function (data) {
        //    return data;
        //},

        //}




    }

    function TreeView() {

        $('#treeview-search').keyup(function () {
            $('#treeViewContent').jstree('search', $(this).val());
        });

        $('#treeViewContent').jstree({
            "core": {
                "dblclick_toggle": false,
                "animation": 0,
                "check_callback": true,
                //"check_callback": true,
                "themes": { /*"stripes": true */ "responsive": true },
                "data": function (node, cb) {
                    BlockElement('#treeView');
                    $.ajax({
                        "type": "POST",
                        "url": "/Receita/TreeView",
                        "data": {
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val(),
                            procRaro: $('#proc-raro').val(),
                            tipo: tipoReceita,
                            maestriaId: $('#maestriaSelect').val()
                        },
                        "success": function (data) {
                            cb(data);
                            UnblockElement('#treeView');
                        }
                    });
                }
            },
            "types": {
            },
            "plugins": [
                "contextmenu", /*"conditionalselect",*/ "search", "sort",
                "state"/*, "types", "wholerow",*/ /*"checkbox"*/
            ],
            "search": {
                "case_insensitive": true,
                "show_only_matches": true,
                //"search_callback": function (search, node) {
                //    console.log(node);
                //    return !($("#treeViewContent").jstree("is_closed", node));
                //}
            },
            //"checkbox": {
            //    "keep_selected_style": false,
            //    "cascade_to_disabled": true,
            //    "cascade": 'down'
            //},
            "contextmenu": {
                "items": function ($node) {
                    let grupo = $node.original.grupo;
                    let menuTrocarIngrediente = null;
                    let menuConfigurarIngrediente = null;
                    let childrens = $node.children.length > 0 ? true : false;
                    let possuiProcRaro = $node.original.possuiProcRaro;

                    if (grupo !== null && grupo !== "" && $node.id !== "raiz") {

                        menuTrocarIngrediente = {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Substituir",
                            //"icon": "/imagens/icones/troca.svg",
                            "action": function (obj) {
                                $('#trocarIngrediente').find('#ingredienteAlternativo').val(null).trigger('change');
                                $('#trocarIngrediente').find('#precoUnitario').val('');
                                $('#trocarIngrediente').find('#quantidadeIngrediente').val('');
                                $('#trocarIngrediente').iziModal('open');
                                //$node = tree.create_node($node);
                                //tree.edit($node);
                            }
                        };
                    }

                    let ids = $node.id.split('-');
                    let id = ids[ids.length - 1];

                    if (!id.includes('PCH') && !id.includes('PDE') && !id.includes('RFI') && !id.includes('PMO') && childrens && possuiProcRaro && $node.id !== "raiz") {
                        menuConfigurarIngrediente = {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Configurar",
                            //"icon": "/imagens/icones/troca.svg",
                            "action": function (obj) {
                                $('#configurarIngrediente').find('#maestriaConfIngrediente').val(null).trigger('change');
                                $('#configurarIngrediente').find('#procNormalConfIngrediente').val(`${$node.original.procNormal}0`.replace('.', ','));
                                $('#configurarIngrediente').find('#procRaroConfIngrediente').val(`${$node.original.procRaro}0`.replace('.', ','));

                                if ($node.original.usarProcRaro === true) {
                                    $('#configurarIngrediente').find('#usarProcRaroConfIngrediente').iCheck('check');
                                }
                                else {
                                    $('#configurarIngrediente').find('#usarProcRaroConfIngrediente').iCheck('uncheck');
                                }

                                $('#configurarIngrediente').iziModal('open');
                                //$node = tree.create_node($node);
                                //tree.edit($node);
                            }
                        };
                    }

                    if (menuTrocarIngrediente !== null && menuConfigurarIngrediente === null) {
                        return {
                            "TrocarIngrediente": menuTrocarIngrediente,
                        };
                    }
                    else if (menuTrocarIngrediente === null && menuConfigurarIngrediente !== null) {
                        return {
                            "Configurar": menuConfigurarIngrediente,
                        };
                    }
                    else if (menuTrocarIngrediente !== null && menuConfigurarIngrediente !== null) {
                        return {
                            "TrocarIngrediente": menuTrocarIngrediente,
                            "Configurar": menuConfigurarIngrediente
                        };
                    }

                    return null;
                }
            }
        });



        //$("#treeViewContent").on("open_node.jstree", function (e, data) {

        //    let node = data.node.original;
        //    let ids = node.id.split('-');
        //    let id = ids[ids.length - 1];

        //    let childrens = $("#treeViewContent").jstree("get_children_dom", node);

        //    if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

        //        let item = BuscarIngredientePorId(id);

        //        let stack = [];

        //        childrens.each(function (index, value) {
        //            stack.push($("#treeViewContent").jstree("get_node", value));
        //        })

        //        while (stack.length > 0) {
        //            let nodeChild = stack.pop();
        //            if ($("#treeViewContent").jstree("is_leaf", nodeChild)) {
        //                let idsTemp = nodeChild.original.id.split('-');
        //                let idTemp = idsTemp[idsTemp.length - 1];

        //                AdicionarQuantidade(nodeChild);
        //            }
        //            else {
        //                let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
        //                childs.each(function (index, value) {
        //                    stack.push($("#treeViewContent").jstree("get_node", value));
        //                });
        //            }
        //        }

        //        if (item !== null && item !== undefined) {
        //            let quantidadeTotal = Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" });
        //            let quantidade = parseInt(quantidadeTotal) - parseInt(node.quantidade);
        //            if (quantidade === 0) {
        //                $('#ingredientesGrid').jsGrid("deleteItem", item);
        //            }
        //            else {
        //                item.quantidadeTotal = quantidade;
        //                $('#ingredientesGrid').jsGrid("updateItem", item);
        //            }
        //        }
        //    }
        //});


        $("#treeViewContent").on("open_node.jstree", function (e, data) {

            let node = data.node.original;
            let ids = node.id.split('-');
            let id = ids[ids.length - 1];

            let childrens = $("#treeViewContent").jstree("get_children_dom", node);

            if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

                let item = BuscarIngredientePorId(id);

                let stack = [];

                console.log(childrens)

                if (typeof (childrens) === typeof([])) {
                    childrens.each(function (index, value) {
                        stack.push($("#treeViewContent").jstree("get_node", value));
                    })
                }
               

                while (stack.length > 0) {
                    let nodeChild = stack.pop();
                    if ($("#treeViewContent").jstree("is_leaf", nodeChild) || $("#treeViewContent").jstree("is_closed", nodeChild)) {
                        let idsTemp = nodeChild.original.id.split('-');
                        let idTemp = idsTemp[idsTemp.length - 1];

                        AdicionarQuantidade(nodeChild);
                    }
                    else {
                        let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
                        childs.each(function (index, value) {
                            stack.push($("#treeViewContent").jstree("get_node", value));
                        });
                    }
                }

                if (item !== null && item !== undefined) {
                    let quantidadeTotal = Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" });
                    let quantidade = parseInt(quantidadeTotal) - parseInt(node.quantidade);
                    if (quantidade === 0) {
                        $('#ingredientesGrid').jsGrid("deleteItem", item);
                    }
                    else {
                        item.quantidadeTotal = quantidade;
                        $('#ingredientesGrid').jsGrid("updateItem", item);
                    }
                }
            }
        });

        //$("#treeViewContent").bind('selected_node.jstree', function (node, data) {
        //    var selectedNodes = $("#treeViewContent").jstree(true).get_json(data.node.id, { flat: true });
        //    for (var i = 0; i < selectedNodes.length; i++) {
        //        console.log(selectedNodes[i])
        //    }
        //});

        //$("#treeViewContent").on("close_node.jstree", function (e, data) {

        //    console.log(data);

        //    let node = data.node.original;
        //    let ids = node.id.split('-');
        //    let id = ids[ids.length - 1];
        //    let childrens = $("#treeViewContent").jstree("get_children_dom", node);

        //    if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

        //        let stack = [];

        //        childrens.each(function (index, value) {
        //            stack.push($("#treeViewContent").jstree("get_node", value));
        //        })

        //        while (stack.length > 0) {
        //            let nodeChild = stack.pop();
        //            if ($("#treeViewContent").jstree("is_leaf", nodeChild)) {
        //                let idsTemp = nodeChild.original.id.split('-');
        //                let idTemp = idsTemp[idsTemp.length - 1];

        //                SubtrairQuantidade(idTemp, nodeChild.original.quantidade);
        //            }
        //            else {
        //                $("#treeViewContent").jstree("open_all", nodeChild);
        //                let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
        //                childs.each(function (index, value) {
        //                    stack.push($("#treeViewContent").jstree("get_node", value));
        //                });
        //            }
        //        }

        //        let item = BuscarIngredientePorId(id);

        //        if (item === null || item === undefined) {
        //            let total = Inputmask.format(`${parseInt(node.quantidade) * parseInt(node.valor)}`, { alias: "prata" });

        //            var currentNode = data.node;

        //            $('#ingredientesGrid').jsGrid("insertItem", {
        //                id: id,
        //                img: node.icon,
        //                item: node.nomeItem,
        //                quantidadeTotal: node.quantidade,
        //                precoMarket: node.valor,
        //                precoTotal: total,
        //                dataAtualizacao: node.dataAtualizacao,
        //                quantidadeDisponivel: node.quantidadeDisponivel,
        //                vendeNPC: node.vendeNPC,
        //                localNPC: node.localNPC,
        //                valorNPC: node.valorNPC,
        //                ignorar: false,
        //                //custoProducao: node.custoProducao,
        //                //custoCompra: node.custoCompra,
        //                //produzirOuComprar: node.produzirOuComprar
        //            });
        //        }
        //        else {
        //            item.quantidadeTotal += parseInt(node.quantidade);
        //            $('#ingredientesGrid').jsGrid("updateItem", item);
        //        }
        //    }

        //});

        $("#treeViewContent").on("close_node.jstree", function (e, data) {

            let node = data.node.original;
            let ids = node.id.split('-');
            let id = ids[ids.length - 1];
            let childrens = $("#treeViewContent").jstree("get_children_dom", node);

            if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

                let stack = [];

                childrens.each(function (index, value) {
                    stack.push($("#treeViewContent").jstree("get_node", value));
                })

                while (stack.length > 0) {
                    let nodeChild = stack.pop();
                    if ($("#treeViewContent").jstree("is_leaf", nodeChild) || $("#treeViewContent").jstree("is_closed", nodeChild)) {
                        let idsTemp = nodeChild.original.id.split('-');
                        let idTemp = idsTemp[idsTemp.length - 1];

                        SubtrairQuantidade(idTemp, nodeChild.original.quantidade);
                    }
                    else {
                        let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
                        childs.each(function (index, value) {
                            stack.push($("#treeViewContent").jstree("get_node", value));
                        });
                    }
                }

                let item = BuscarIngredientePorId(id);

                if (item === null || item === undefined) {
                    let custo = node.produzirOuComprar === "PRODUZIR" ? node.custoProducao : node.valor;
                    let total = Inputmask.format(`${parseInt(node.quantidade) * parseInt(custo)}`, { alias: "prata" });

                    var currentNode = data.node;

                    $('#ingredientesGrid').jsGrid("insertItem", {
                        id: id,
                        img: node.icon,
                        item: node.nomeItem,
                        quantidadeTotal: node.quantidade,
                        precoMarket: node.valor,
                        precoTotal: total,
                        dataAtualizacao: node.dataAtualizacao,
                        quantidadeDisponivel: node.quantidadeDisponivel,
                        vendeNPC: node.vendeNPC,
                        localNPC: node.localNPC,
                        valorNPC: node.valorNPC,
                        ignorar: false,
                        custoProducao: node.custoProducao,
                        custoCompra: node.custoCompra,
                        produzirOuComprar: node.produzirOuComprar
                    });
                }
                else {
                    item.quantidadeTotal += parseInt(node.quantidade);
                    $('#ingredientesGrid').jsGrid("updateItem", item);
                }
            }

        });


        $("#treeViewContent").on('expandir', function (e) {
            e.preventDefault();

            let root = $("#treeViewContent").jstree('get_node', 'raiz_anchor');
            let childrens = $("#treeViewContent").jstree("get_children_dom", root);

            let stack = [];

            childrens.each(function (index, value) {
                stack.push($("#treeViewContent").jstree("get_node", value));
            })

            while (stack.length > 0) {
                let nodeChild = stack.pop();
                if ($("#treeViewContent").jstree("is_leaf", nodeChild) === false && $("#treeViewContent").jstree("is_closed", nodeChild)) {
                    $("#treeViewContent").jstree("open_node", nodeChild)

                    let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
                    childs.each(function (index, value) {
                        stack.push($("#treeViewContent").jstree("get_node", value));
                    });
                }
            }

        });

        $("#treeViewContent").on('agrupar', function (e) {
            e.preventDefault();

            let root = $("#treeViewContent").jstree('get_node', 'raiz_anchor');

            if (root.state.opened !== false) {
                let childrens = root.children;

                let allNodeClosed = childrens.every(function (child) {
                    let node = $("#treeViewContent").jstree('get_node', child);
                    return node.state.opened === false;
                });

                if (!allNodeClosed) {
                    $("#ingredientesGrid").jsGrid("option", "data", []);

                    for (var i = 0; i < childrens.length; i++) {
                        let node = $("#treeViewContent").jstree('get_node', childrens[i]);
                        node.state.opened = true;
                        $("#treeViewContent").jstree('close_node', node);
                    }
                }
            }
        });


        //$("#treeViewContent").on('open_all.jstree', function (e) {
        //    e.preventDefault();
        //    e.stopPropagation();

        //});

        //$("#treeViewContent").on('close_all.jstree', function () {
        //    e.preventDefault();
        //    e.stopPropagation();
        //});

        $('#ingredientesGrid').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
            if (event.which === 13) {
                $("#ingredientesGrid").jsGrid("updateItem");
            }
        });

        $('#resultadosGrid').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
            if (event.which === 13) {
                $("#resultadosGrid").jsGrid("updateItem");
            }
        });
    }

    function Tabelas() {
        $('#ingredientesGrid').jsGrid({
            width: "100%",
            inserting: false,
            editing: true,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            confirmDeleting: false,
            onItemUpdated: function (args) {
                $("#ingredientesGrid").jsGrid("refresh");
            },
            onRefreshed: function (args) {
                var items = args.grid.option("data");

                var total = { Id: "", Img: "", Item: "", QuantidadeTotal: 0, PrecoMarket: 0, PrecoTotal: 0, IsTotal: true };

                items.forEach(function (item) {
                    let preco = 0;
                    let quantidade = 0;

                    if (typeof item.precoMarket === 'string')
                        preco = parseInt(Inputmask.unmask(item.precoMarket, { alias: "prata" }))
                    else
                        preco = item.precoMarket;

                    if (item.produzirOuComprar === "PRODUZIR")
                        preco = parseInt(Inputmask.unmask(`${item.custoProducao}`, { alias: "prata" }))

                    if (typeof item.quantidadeTotal === 'string')
                        quantidade = parseInt(Inputmask.unmask(item.quantidadeTotal, { alias: "prata" }))
                    else
                        quantidade = item.quantidadeTotal;

                    if (item.ignorar === false) {
                        total.PrecoTotal += (quantidade * preco);
                    }
                });

                var $totalRow = $("<tr>").addClass("total-row");

                args.grid._renderCells($totalRow, total);

                args.grid._content.append($totalRow);

                $('.receita-image').hover(function () {

                    let nomeItem = $(this).attr('data-nome');
                    let valorUnitario = Inputmask.format(`${$(this).attr('data-valor')}`, { alias: "prata" });
                    let dataAtualizacao = $(this).attr('data-atualizacao');
                    let quantidadeDisponivel = Inputmask.format(`${$(this).attr('data-quantidadeDisponivel')}`, { alias: "prata" });
                    let vendeNPC = $(this).attr('data-npc');
                    let valorNPC = $(this).attr('data-valor-npc');
                    let localNPC = $(this).attr('data-local-npc');

                    let disponivel = $(this).attr('data-disponivel');

                    let npcContent = '';
                    if (vendeNPC === "true" && valorNPC !== null) {

                        npcContent = '<p class="text-center">VENDIDO NO NPC:</p>';
                        if (localNPC !== null && localNPC !== "") {
                            let locais = localNPC.split('|');
                            locais.forEach(function (value, index) {
                                npcContent += `${value}`;
                            });
                        }
                        //let valorFormatado = Inputmask.format(`${valorNPC}`, { alias: "prata" });
                        //npcContent += `<p>VALOR: ${valorFormatado}</p>`;
                    }

                    $(this).popover({
                        title: nomeItem,
                        html: true,
                        content: `<p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}</p> <p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>${npcContent}`,
                        trigger: 'hover',
                        placement: 'right'
                    }).popover('show');
                });
            },
            fields: [
                {
                    name: "id",
                    visible: false,
                },
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "Totais";

                        let precoMercado = Inputmask.format(`${item.precoMarket}`, { alias: "prata" });

                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img class="receita-image" data-nome="${item.item}" data-quantidadeDisponivel="${item.quantidadeDisponivel}" data-disponivel="${(item.disponivel ? "DISPONIVEL" : "INDISPONIVEL")}" data-atualizacao="${item.dataAtualizacao}" data-valor="${precoMercado}" src="${item.img}" data-npc="${item.vendeNPC}" data-valor-npc="${item.valorNPC}" data-local-npc="${item.localNPC}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "item", title: "Ingrediente", type: "text", width: 160, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return value;
                    }
                },

                //{ name: "comprarOuFazer", title: "Comprar/Fazer", type: "text", width: 120, editing: false, inserting: false },
                {
                    name: "quantidadeTotal", type: "prataField", title: "Quantidade Total", width: 180,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "precoMarket", type: "prataField", title: "Custo de Compra/UN", width: 180,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "custoProducao", type: "prataField", title: "Custo de Produção/UN (?)", width: 185, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        //let quantidadeIngredientes = parseInt(item.quantidade);
                        //let precoMercado = parseInt(Inputmask.unmask("" + item.precoMarket, { alias: "prata" }));
                        //let totalPorReceita = quantidadeIngredientes * precoMercado;
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    },
                    headerTemplate: function () {
                        return $(`<th class="custo-producao-tooltip">${this.title}</th>`);
                    },
                },
                //{
                //    name: "usarProcRaro", title: "Usar Proc Raro (?)", type: "text", width: 155, align: "center", editing: false, inserting: false, 
                //},
                {
                    name: "produzirOuComprar", title: "Produzir/Comprar (?)", type: "select", width: 155, align: "center", editing: true, inserting: false, items: [
                        { text: "Comprar", value: "COMPRAR" },
                        { text: "Produzir", value: "PRODUZIR" }
                    ],
                    valueField: "value",
                    textField: "text",
                    headerTemplate: function () {
                        return $(`<th class="produzir-comprar-tooltip">${this.title}</th>`);
                    },
                },
                {
                    name: "precoTotal", type: "prataField", title: "Custo Total", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return Inputmask.format(`${item.PrecoTotal}`, { alias: "prata" });

                        let preco = parseInt(Inputmask.unmask(`${item.precoMarket}`, { alias: "prata" }));

                        if (item.produzirOuComprar === "PRODUZIR")
                            preco = parseInt(Inputmask.unmask(`${item.custoProducao}`, { alias: "prata" }))

                        let quantidade = parseInt(Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" }));
                        return Inputmask.format(`${quantidade * preco}`, { alias: "prata" });
                    }
                },
                {
                    name: "ignorar", type: "checkbox", title: "Ignorar (?)", width: 120,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return $('<input>').prop('type', 'checkbox').attr('checked', value).attr('disabled', true);
                    },
                    headerTemplate: function () {
                        return $(`<th class="ignorar-tooltip">${this.title}</th>`);
                    },
                    //itemTemplate: function (value, item) {
                    //    return $("<input>").attr("type", "checkbox")
                    //        .attr("checked", value || item.ignorar)
                    //        .on("click", function (event) {
                    //            event.stopPropagation();
                    //            //return false;
                    //        })
                    //        .on("change", function () {
                    //            item.ignorar = $(this).is(":checked");
                    //        });
                    //},
                },
                {
                    type: "control",
                    deleteButton: false,
                    editButton: false,
                    itemTemplate: function (value, item) {
                        var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                        return $result;
                    }
                }
            ],
            controller: {
                loadData: function () {
                    BlockElement("#consultarForm");
                    //BlockElement("#ingredientes");

                    var d = $.Deferred();
                    //$.post({
                    //    url: "/Atividade/Atualizar",
                    //    data: {
                    //        atividadeId: $('#atividadeId').val(),
                    //        nome: $('#atividadeNome').val()
                    //    }
                    //})
                    $.post({
                        //url: "/Receita/Ingredientes",
                        url: "/Receita/SubReceitas",
                        data: {
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val(),
                            procRaro: $('#proc-raro').val(),
                            maestriaId: $('#maestriaSelect').val(),
                            tipoReceita
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                        UnblockElement("#consultarForm");
                        //UnblockElement("#ingredientes");
                    });

                    return d.promise();
                }
            }
        });

        $('#resultadosGrid').jsGrid({
            width: "100%",
            inserting: false,
            editing: true,
            sorting: false,
            paging: false,
            autoload: true,
            selecting: false,
            pageLoading: false,
            onItemUpdated: function (args) {
                $("#resultadosGrid").jsGrid("refresh")
            },
            onRefreshed: function (args) {
                var items = args.grid.option("data");

                var total = { Img: "", Item: "", Quantidade: 0, Preco: 0, Total: 0, QuantidadePorCaixaImperial: 0, CaixaImperial: "", QuantidadeImperial: 0, ValorPorCaixa: 0, PrecoPorCaixa: 0, TotalImperial: 0, IsTotal: true };

                items.forEach(function (item) {
                    let preco = 0;
                    let quantidade = 0;

                    if (typeof item.preco === 'string')
                        preco = parseInt(Inputmask.unmask(item.preco, { alias: "prata" }))
                    else
                        preco = item.preco;

                    if (typeof item.quantidade === 'string')
                        quantidade = parseInt(Inputmask.unmask(item.quantidade, { alias: "prata" }))
                    else
                        quantidade = item.quantidade;

                    if (item.ignorar === false) {
                        total.QuantidadeImperial += item.quantidadeImperial;
                        total.Total += (quantidade * preco);

                        total.TotalImperial += item.quantidadeImperial * item.precoPorCaixa;
                        total.PrecoPorCaixa = item.precoPorCaixa;
                    }
                });

                var $totalRow = $("<tr>").addClass("total-row");

                args.grid._renderCells($totalRow, total);

                args.grid._content.append($totalRow);
            },
            fields: [
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "Totais";

                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "item", title: "Produzido", type: "text", width: 160, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return value;
                    }
                },
                {
                    name: "quantidade", type: "prataField", title: "Qtd. Produzida", width: 120,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "preco", type: "prataField", title: "Preço Mercado", width: 120,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "total", type: "prataField", title: "Lucro Bruto", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return Inputmask.format(`${item.Total}`, { alias: "prata" });

                        let preco = parseInt(Inputmask.unmask(`${item.preco}`, { alias: "prata" }));
                        let quantidade = parseInt(Inputmask.unmask(`${item.quantidade}`, { alias: "prata" }));
                        let valorTotal = quantidade * preco;
                        return Inputmask.format(`${valorTotal}`, { alias: "prata" });
                    }
                },
                {
                    name: "quantidadePorCaixaImperial", type: "text", title: "Caixa Imperial", visible: false, width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return value;
                    }
                },
                {
                    name: "caixaImperial", type: "text", title: "Caixa Imperial", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return value;
                    }
                },
                {
                    name: "quantidadeImperial", type: "prataField", title: "Qtd. Caixa Imperial", width: 160, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return `${item.QuantidadeImperial} x ${Inputmask.format(`${item.PrecoPorCaixa}`, { alias: "prata" })} = ${Inputmask.format(`${item.TotalImperial}`, { alias: "prata" })}`;
                        return value;
                    }
                },
                {
                    name: "precoPorCaixa", type: "prataField", title: "Valor/Caixa", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                { name: "totalImperial", type: "prataField", title: "Valor/Caixa", width: 120, visible: false, editing: false, inserting: false },
                //{
                //    name: "total", type: "prataField", title: "Lucro B. C/Pacote Eco.", width: 200, editing: false, inserting: false,
                //    itemTemplate: function (value, item) {
                //        let preco = parseInt(Inputmask.unmask("" + item.preco, { alias: "prata" }));
                //        let quantidade = parseInt(Inputmask.unmask(`${item.quantidade}`, { alias: "prata" }));
                //        let valorTotal = quantidade * preco * 0.845;
                //        return Inputmask.format(`${valorTotal}`, { alias: "prata" });
                //    }
                //},
                //{
                //    name: "total", type: "prataField", title: "Lucro B. S/Pacote Eco.", width: 200, editing: false, inserting: false,
                //    itemTemplate: function (value, item) {
                //        let preco = parseInt(Inputmask.unmask(`${item.preco}`, { alias: "prata" }));
                //        let quantidade = parseInt(Inputmask.unmask(`${item.quantidade}`, { alias: "prata" }));
                //        let valorTotal = quantidade * preco * 0.65;
                //        return Inputmask.format(`${valorTotal}`, { alias: "prata" });
                //    }
                //},
                {
                    name: "ignorar", type: "checkbox", title: "Ignorar", width: 120,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return $('<input>').prop('type', 'checkbox').attr('checked', value).attr('disabled', true);
                    }
                },
                {
                    type: "control",
                    deleteButton: false,
                    editButton: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                        return $result;
                    }
                }
            ],
            controller: {
                loadData: function () {

                    BlockElement($("#resultados"));
                    var d = $.Deferred();

                    $.post({
                        url: "/Receita/Resultados",
                        data: {
                            tipoReceita: tipoReceita,
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val(),
                            procRaro: $('#proc-raro').val(),
                            maestria: $('#maestriaSelect').val(),
                            maestriaImperial: maestriaImperialSelecionada
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                        UnblockElement($("#resultados"));
                    });

                    return d.promise();
                }
            }
        });

        $('#dependenciaDiretaTb').jsGrid({
            width: "100%",
            inserting: false,
            editing: false,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            fields: [
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    itemTemplate: function (value, item) {
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                { name: "nome", title: "USADO DIRETAMENTE EM", type: "text", width: 120, editing: false, inserting: false },
                { name: "preco", type: "prataField", title: "PREÇO DO MERCADO", width: 120, editing: false, inserting: false },
            ],
            controller: {
                loadData: function () {

                    var d = $.Deferred();

                    $.post({
                        url: "/Item/DependenciasDiretas",
                        data: {
                            referenciaId: $('#receitaSelect').val(),
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                    });

                    return d.promise();
                }
            }
        });

        $('#dependenciaIndiretaTb').jsGrid({
            width: "100%",
            inserting: false,
            editing: false,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            fields: [
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    itemTemplate: function (value, item) {
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                { name: "nome", title: "USADO INDIRETAMENTE EM", type: "text", width: 120, editing: false, inserting: false },
                { name: "preco", type: "prataField", title: "PREÇO DO MERCADO", width: 120, editing: false, inserting: false },
            ],
            controller: {
                loadData: function () {

                    var d = $.Deferred();

                    $.post({
                        url: "/Item/DependenciasIndiretas",
                        data: {
                            referenciaId: $('#receitaSelect').val()
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                    });

                    return d.promise();
                }
            }
        });

        $('#detalhesReceitaGrid').jsGrid({
            width: "100%",
            inserting: false,
            editing: false,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            fields: [
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    itemTemplate: function (value, item) {
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                { name: "descricao", title: "Descrição", type: "text", width: 120, editing: false, inserting: false },
                { name: "total", title: "Total", type: "text", width: 120, editing: false, inserting: false },
                //{ name: "xp", type: "prataField", title: "Experiência Total", width: 120, editing: false, inserting: false },
                //{ name: "peso", type: "prataField", title: "Peso Final", width: 120, editing: false, inserting: false },
                //{ name: "utensilios", type: "text", title: "Utensílios Gastos", width: 120, editing: false, inserting: false },
            ],
            controller: {
                loadData: function () {

                    var d = $.Deferred();

                    $.post({
                        url: "/Item/DependenciasIndiretas",
                        data: {
                            referenciaId: $('#receitaSelect').val()
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                    });

                    return d.promise();
                }
            }
        });
    }

    function Checkbox() {
        $('.cbx').iCheck({
            checkboxClass: 'icheckbox_square-red',
            radioClass: 'iradio_square-red',
        });
    }
});

function SubtrairQuantidade(id, qtd) {
    let item = BuscarIngredientePorId(id);

    if (item !== null && item !== undefined) {
        let quantidadeTotal = Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" });
        let quantidade = parseInt(quantidadeTotal) - parseInt(qtd);
        if (quantidade === 0) {
            $('#ingredientesGrid').jsGrid("deleteItem", item);
        }
        else {
            item.quantidadeTotal = quantidade;
            $('#ingredientesGrid').jsGrid("updateItem", item);
        }
    }
}

function AtualizarTotais() {

    let resultados = $("#resultadosGrid").jsGrid("option", "data");
    let itens = $("#ingredientesGrid").jsGrid("option", "data");

    CalcularTotais(itens, resultados);
}

function CalcularTotais(itens, resultados) {
    let custoTotal = 0;
    let lucroBruto = 0;

    if (itens !== undefined && itens.length > 0) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].ignorar === false) {
                let quantidadeTotal = parseInt(Inputmask.unmask(`${itens[i].quantidadeTotal}`, { alias: "prata" }));
                let preco = 0;
                if (itens[i].produzirOuComprar === "PRODUZIR") {
                    preco = parseInt(Inputmask.unmask(`${itens[i].custoProducao}`, { alias: "prata" }));
                }
                else {
                    preco = parseInt(Inputmask.unmask(`${itens[i].precoMarket}`, { alias: "prata" }));
                }

                let custoIngrediente = quantidadeTotal * preco;
                //if (itens[i].produzirOuComprar === "COMPRAR") {
                //    custoPorReceita = parseInt(Inputmask.unmask("" + itens[i].custoCompra, { alias: "prata" }));
                //}
                //else if (itens[i].produzirOuComprar === "PRODUZIR") {
                //    custoPorReceita = parseInt(Inputmask.unmask("" + itens[i].custoProducao, { alias: "prata" }));
                //}
                custoTotal += custoIngrediente;
            }
        }

        $('#custoTotal').html(Inputmask.format(`${custoTotal}`, { alias: "prata" }));
    }
    else {
        $('#custoTotal').html(Inputmask.format("0", { alias: "prata" }));
    }

    if (resultados !== undefined && resultados.length > 0) {

        for (let i = 0; i < resultados.length; i++) {
            if (resultados[i].ignorar === false) {
                let quantidade = parseInt(Inputmask.unmask(`${resultados[i].quantidade}`, { alias: "prata" }));
                let preco = parseInt(Inputmask.unmask(`${resultados[i].preco}`, { alias: "prata" }));
                lucroBruto += quantidade * preco;
            }
        }

        $('#lucroBruto').html(Inputmask.format(`${lucroBruto}`, { alias: "prata" }));
    }
    else {
        $('#lucroBruto').html(Inputmask.format("0", { alias: "prata" }));
    }


    let lucroComPacoteEconomico = EhVendidoNoMercado(receitaSelecionada) ? parseInt((lucroBruto * 0.845) - custoTotal) : parseInt(lucroBruto - custoTotal);
    let lucroSemPacoteEconomico = EhVendidoNoMercado(receitaSelecionada) ? parseInt((lucroBruto * 0.65) - custoTotal) : parseInt(lucroBruto - custoTotal);

    if (lucroComPacoteEconomico < 0) {
        //lucroComPacoteEconomico = parseInt((lucroBruto * 1.155) - custoTotal);
        $('#lucroComPctEconomico').removeClass('valor-positivo');
        $('#lucroComPctEconomico').addClass('valor-negativo');
        $('#lucroComPctEconomico').html("-" + Inputmask.format(`${lucroComPacoteEconomico}`, { alias: "prata" }));
    }
    else {
        $('#lucroComPctEconomico').removeClass('valor-negativo');
        $('#lucroComPctEconomico').addClass('valor-positivo');
        $('#lucroComPctEconomico').html(Inputmask.format(`${lucroComPacoteEconomico}`, { alias: "prata" }));
    }

    if (lucroSemPacoteEconomico < 0) {
        //lucroSemPacoteEconomico = parseInt((lucroBruto * 1.35) - custoTotal);
        $('#lucroSemPctEconomico').removeClass('valor-positivo');
        $('#lucroSemPctEconomico').addClass('valor-negativo');
        $('#lucroSemPctEconomico').html("-" + Inputmask.format(`${lucroSemPacoteEconomico}`, { alias: "prata" }));
    }
    else {
        $('#lucroSemPctEconomico').removeClass('valor-negativo');
        $('#lucroSemPctEconomico').addClass('valor-positivo');
        $('#lucroSemPctEconomico').html(Inputmask.format(`${lucroSemPacoteEconomico}`, { alias: "prata" }));
    }
}

function ConfigurarMaestriaImperial() {
    $('#configuracaoMaestria').iziModal('open');
}

function ConfigurarQuantidades() {
    $('#configuracaoQuantidade').iziModal('open');
}

function SalvarMaestriaImperial() {
    maestriaImperialSelecionada = parseInt($('#maestriaImperialSelect').val());
    $('#configuracaoMaestria').iziModal('close');
}

function SalvarQtdReceita() {
    $('#quantidade').val($('#quantidadeReceitasCalculadora').val());
    $('#configuracaoQuantidade').iziModal('close');
}


function BuscarIngredientePorId(id) {
    var data = $('#ingredientesGrid').jsGrid("option", "data");
    var item = data.filter((value) => value.id === id)[0];
    return item;
}


function AdicionarQuantidade(node) {
    let id = "";
    let ids = [];

    let nodeTemp = node;

    if (node.original !== null && node.original !== undefined) {
        ids = node.original.id.split('-');
        id = ids[ids.length - 1];
        nodeTemp = node.original;
    }
    else {
        ids = node.id.split('-');
        id = ids[ids.length - 1];
    }

    let item = BuscarIngredientePorId(id);

    if (item === null || item === undefined) {
        let custo = nodeTemp.produzirOuComprar === "PRODUZIR" ? nodeTemp.custoProducao : nodeTemp.valor;
        let total = Inputmask.format(`${parseInt(nodeTemp.quantidade) * parseInt(custo)}`, { alias: "prata" });

        $('#ingredientesGrid').jsGrid("insertItem", {
            id: id,
            img: nodeTemp.icon,
            item: nodeTemp.nomeItem,
            quantidadeTotal: nodeTemp.quantidade,
            precoMarket: nodeTemp.valor,
            precoTotal: total,
            dataAtualizacao: nodeTemp.dataAtualizacao,
            quantidadeDisponivel: nodeTemp.quantidadeDisponivel,
            vendeNPC: nodeTemp.vendeNPC,
            localNPC: nodeTemp.localNPC,
            valorNPC: nodeTemp.valorNPC,
            ignorar: false,
            custoProducao: nodeTemp.custoProducao,
            custoCompra: nodeTemp.custoCompra,
            produzirOuComprar: nodeTemp.produzirOuComprar
        });
    }
    else {
        item.quantidadeTotal += parseInt(nodeTemp.quantidade);
        $('#ingredientesGrid').jsGrid("updateItem", item);
    }
}

function AlterarConfiguracao() {
    if (ingredienteNodeSelecionado !== null) {
        console.log(ingredienteNodeSelecionado)
        let procNormal = $('#configurarIngrediente').find('#procNormalConfIngrediente').val();
        let procRaro = $('#configurarIngrediente').find('#procRaroConfIngrediente').val();
        let usarProcRaro = $('#configurarIngrediente').find('#usarProcRaroConfIngrediente').is(':checked');

        if (procNormal !== "" && procRaro !== "" && quantidade !== "" && precoUnitario !== "" && quantidade !== 0 && precoUnitario !== 0) {

            //let parentId = ingredienteNodeSelecionado.parent;
            //let parentNode = $("#treeViewContent").jstree("get_node", parentId);
            //let quantidadeTotal = parseInt(ingredienteNodeSelecionado.original.quantidade);
            //let quantidadePorReceita = parseInt(ingredienteNodeSelecionado.original.quantidadePorReceita);

            //let ids = ingredienteNodeSelecionado.id.split('-');
            //let id = ids[ids.length - 1];

            //let ingredienteSelecionado = BuscarIngredientePorId(id);
            //if (ingredienteSelecionado !== undefined && ingredienteSelecionado !== null) {
            //    SubtrairTrocaItem(ingredienteNodeSelecionado.original.id);
            //}

            //ConfigurarIngredienteTreeView(parentId, id, $('#configurarIngrediente').find('#procNormalConfIngrediente').val(), $('#configurarIngrediente').find('#procRaroConfIngrediente').val(), quantidadeTotal, quantidadePorReceita, usarProcRaro).then(function (data) {

            //    let childrens = $("#treeViewContent").jstree("get_children_dom", ingredienteNodeSelecionado.original);

            //    childrens.each(function (index, value) {
            //        SubtrairTrocaItem(value);
            //    })

            //    $('#treeViewContent').jstree("delete_node", `#${ingredienteNodeSelecionado.id}`);

            //    data.forEach(function (value, index) {
            //        if (index === 0) {
            //            value.valor = parseInt(Inputmask.unmask(`${ingredienteNodeSelecionado.original.valor}`, { alias: "prata" }));
            //        }

            //        $('#treeViewContent').jstree("create_node", (value.parent === "#" ? "raiz" : value.parent), value, "inside");

            //        if (value.parent === ingredienteNodeSelecionado.id) {
            //            AdicionarQuantidade(value);
            //        }
            //    });
            //});
            RecalcularSubReceita(ingredienteNodeSelecionado, procNormal, procRaro, usarProcRaro);

            $('#configurarIngrediente').iziModal('close');
        }

    }
}

function RecalcularSubReceita(ingrediente, procNormal, procRaro, usarProcRaro, otimizar = false) {
    let parentId = ingrediente.parent;
    let parentNode = $("#treeViewContent").jstree("get_node", parentId);
    let quantidadeTotal = parseInt(ingrediente.original.quantidade);
    let quantidadePorReceita = parseInt(ingrediente.original.quantidadePorReceita);

    let ids = ingrediente.id.split('-');
    let id = ids[ids.length - 1];

    let ingredienteSelecionado = BuscarIngredientePorId(id);
    if (ingredienteSelecionado !== undefined && ingredienteSelecionado !== null) {
        SubtrairTrocaItem(ingrediente.original.id);
    }

    return ConfigurarIngredienteTreeView(parentId, id, procNormal, procRaro, quantidadeTotal, quantidadePorReceita, usarProcRaro, otimizar).then(function (data) {

        let childrens = $("#treeViewContent").jstree("get_children_dom", ingrediente.original);

        childrens.each(function (index, value) {
            SubtrairTrocaItem(value);
        })

        $('#treeViewContent').jstree("delete_node", `#${ingrediente.id}`);

        data.forEach(function (value, index) {
            if (index === 0) {
                value.valor = parseInt(Inputmask.unmask(`${ingrediente.original.valor}`, { alias: "prata" }));
            }

            $('#treeViewContent').jstree("create_node", (value.parent === "#" ? "raiz" : value.parent), value, "inside");

            if (value.parent === ingrediente.id) {
                AdicionarQuantidade(value);
            }
        });
    });

}


function AlterarIngrediente() {

    if (ingredienteNodeSelecionado !== null) {

        let novoIngrediente = $('#trocarIngrediente').find('#ingredienteAlternativo').select2('data')[0];
        let quantidade = $('#trocarIngrediente').find('#quantidadeIngrediente').val();
        let precoUnitario = $('#trocarIngrediente').find('#precoUnitario').val();

        if (quantidade !== "" && precoUnitario !== "" && quantidade !== 0 && precoUnitario !== 0) {


            let parentId = ingredienteNodeSelecionado.parent;
            let parentNode = $("#treeViewContent").jstree("get_node", parentId);
            let quantidadeTotalParent = parentNode.original.quantidade;

            let ingredienteSelecionadoIds = ingredienteNodeSelecionado.original.id.split('-');
            let ingredienteSelecionadoId = ingredienteSelecionadoIds[ingredienteSelecionadoIds.length - 1];

            let ingredienteSelecionado = BuscarIngredientePorId(ingredienteSelecionadoId);
            if (ingredienteSelecionado !== undefined && ingredienteSelecionado !== null) {
                SubtrairTrocaItem(ingredienteNodeSelecionado.original.id);
            }
            //console.log(ingredienteNodeSelecionado);
            //if (parentNode.id === "raiz") {

            let novaQuantidadeTotal = parseInt(quantidadeTotalParent) * parseInt(quantidade);

            BuscarTreeView(ingredienteNodeSelecionado.parent, novoIngrediente.id, $('#proc-normal').val(), $('#proc-raro').val(), novaQuantidadeTotal, parseInt(quantidade), ingredienteNodeSelecionado.original.nivelSubReceita).then(function (data) {
                let childrens = $("#treeViewContent").jstree("get_children_dom", ingredienteNodeSelecionado.original);

                childrens.each(function (index, value) {
                    SubtrairTrocaItem(value);
                })

                $('#treeViewContent').jstree("delete_node", `#${ingredienteNodeSelecionado.id}`);

                data.forEach(function (value, index) {
                    if (index === 0) {
                        value.valor = parseInt(Inputmask.unmask(`${precoUnitario}`, { alias: "prata" }));
                    }

                    $('#treeViewContent').jstree("create_node", (value.parent === "#" ? "raiz" : value.parent), value, "inside");

                    if ((novoIngrediente.tipo === 1 || novoIngrediente.tipo === 2) || value.nivelSubReceita === 1) {
                        AdicionarQuantidade(value);
                    }
                });
            });
            $('#trocarIngrediente').iziModal('close');
        }
    }
}

function BuscarTreeView(raiz, referenciaId, proc, procRaro, quantidade, quantidadePorReceita, nivel) {
    BlockElement('#treeView');
    return $.ajax({
        "type": "POST",
        "url": "/Receita/TreeViewSubReceita",
        "data": {
            raiz,
            receitaReferenciaId: referenciaId,
            quantidadePorReceita: quantidadePorReceita,
            quantidade: quantidade,
            procNormal: proc,
            procRaro: procRaro,
            nivel
        },
        "success": function (data) {
            UnblockElement('#treeView');
        }
    });
}

function OtimizarTreeView() {
    //BlockElement('#treeView');

    let receitaPrincipal = $('#receitaSelect').val();

    if (receitaPrincipal !== undefined && receitaPrincipal !== "" && receitaPrincipal !== null) {

        let receitaPrincipal = $("#treeViewContent").jstree("get_node", "raiz");
        let childrens = $("#treeViewContent").jstree("get_children_dom", receitaPrincipal);

        if (childrens !== null && childrens.length > 0) {
            let procNormal = $('#proc-normal').val();
            let procRaro = $('#proc-raro').val();

            childrens.each(function (index, value) {
                let child = $("#treeViewContent").jstree("get_node", value);
                console.log(child)
                if (child.original.produzirOuComprar === "PRODUZIR" /*&& child.state.opened === false*/) {

                    RecalcularSubReceita(child, procNormal, procRaro, child.original.possuiProcRaro, true).then(function () {

                        //let childrensOfChild = $("#treeViewContent").jstree("get_children_dom", child.id);


                        ////if (childrensOfChild.length > 0) {
                        ////    console.log(childrensOfChild);
                        ////}

                        //if (childrensOfChild.length > 0) {

                        //    let stack = [];

                        //    childrensOfChild.each(function (i, v) {
                        //        let node = $("#treeViewContent").jstree("get_node", v);
                        //        if (node.original.produzirOuComprar === "PRODUZIR" /*&& node.state.opened === false*/) {
                        //            console.log('ChildrenOfChild', node);
                        //            stack.push(node);
                        //        }
                        //    })

                        //    //let indexStack = 0;
                        //    //while (stack.length > 0) {
                        //    //    RecalcularSubReceita(stack[indexStack], procNormal, procRaro, stack[indexStack].original.possuiProcRaro);
                        //    //    indexStack++;
                        //    //}
                        //}
                    });



                  

                    //$("#treeViewContent").jstree("open_node", child)
                }
            })
        }

        //let quantidade = $('#quantidade').val();
        //let procNormal = $('#proc-normal').val();
        //let procRaro = $('#proc-raro').val();

        //return $.ajax({
        //    "type": "POST",
        //    "url": "/Receita/TreeViewSubReceita",
        //    "data": {
        //        raiz: "",
        //        receitaReferenciaId: receitaPrincipal,
        //        quantidade: quantidade,
        //        procNormal: procNormal,
        //        procRaro: procRaro,
        //        otimizar: true
        //    },
        //    "success": function (data) {
        //        console.log(data);

        //        UnblockElement('#treeView');
        //    }
        //});
    }
}


function ConfigurarIngredienteTreeView(raiz, referenciaId, procNormal, procRaro, quantidade, quantidadePorReceita, usarProcRaro, otimizar = false) {
    BlockElement('#treeView');
    return $.ajax({
        "type": "POST",
        "url": "/Receita/TreeViewSubReceita",
        "data": {
            raiz,
            receitaReferenciaId: referenciaId,
            quantidadePorReceita: quantidadePorReceita,
            quantidade: quantidade,
            procNormal: procNormal,
            procRaro: procRaro,
            usarProcRaro: usarProcRaro,
            otimizar

        },
        "success": function (data) {
            UnblockElement('#treeView');
        }
    });
}

function SubtrairTrocaItem(value) {
    let node = $("#treeViewContent").jstree("get_node", value);
    let ids = node.original.id.split('-');
    let id = ids[ids.length - 1];

    let childrens = $("#treeViewContent").jstree("get_children_dom", node);

    let stack = [];

    childrens.each(function (index, value) {
        stack.push($("#treeViewContent").jstree("get_node", value));
    })

    while (stack.length > 0) {
        let nodeChild = stack.pop();
        if ($("#treeViewContent").jstree("is_leaf", nodeChild)) {
            let idsTemp = nodeChild.original.id.split('-');
            let idTemp = idsTemp[idsTemp.length - 1];

            SubtrairQuantidade(idTemp, nodeChild.original.quantidade);
        }
        else {
            $("#treeViewContent").jstree("open_all", nodeChild);
            let childs = $("#treeViewContent").jstree("get_children_dom", nodeChild);
            childs.each(function (index, value) {
                stack.push($("#treeViewContent").jstree("get_node", value));
            });
        }
    }

    let item = BuscarIngredientePorId(id);

    SubtrairQuantidade(id, node.original.quantidade);
}

function EhVendidoNoMercado(referenciaId) {
    if (referenciaId === 'R_A_342')
        return false;

    return true;
}