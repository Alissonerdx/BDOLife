var maestriaImperialSelecionada = 0;
var ingredienteNodeSelecionado = null;

$(document).ready(function () {
    Tabelas();
    Selects();
    Eventos();
    TreeView();
    EventTimer();
    Modal();

    function Modal() {
        $('#trocarIngrediente').iziModal({
            title: 'Alterar ingrediente',
            background: '#494C56',
            headerColor: '#33363F',
            width: '80%',
            radius: 20,
            top: 50,
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
            top: 50,
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
                        url: "/Maestria/SelectMaestriasCulinaria",
                        type: "GET",
                        data: function (params) {
                            var query = {
                                search: params.term,
                                page: params.page || 1,
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
    }

    function EventTimer() {
        setInterval(AtualizarTotais, 1000);
    }

    function Eventos() {
        $('#maestriaSelect').on('change', function () {
            let selecionado = $(this).select2('data')[0];
            if (selecionado !== undefined) {
                $('#proc-normal').inputmask("setvalue", selecionado.procNormal);
                $('#proc-raro').inputmask("setvalue", selecionado.procRaro);
                $('#proc-normal').focus();
                $('#proc-raro').focus();
            }
        });


        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();
            $("#ingredientesGrid").jsGrid("loadData");
            $("#resultadosGrid").jsGrid("loadData");
            $("#resultadosImperialGrid").jsGrid("loadData");
            $('#treeViewContent').jstree(true).refresh();
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

        $('#maestriaSelect').select2({
            placeholder: 'Selecione a maestria (Culinária)',
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState,
            allowClear: true,
            ajax: {
                url: "/Maestria/SelectMaestriasCulinaria",
                type: "GET",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1,
                    };

                    return query;
                },
                processResults: function (data) {
                    return data;
                },

            }
        });


    }

    function TreeView() {

        $('#treeview-search').keyup(function () {
            $('#treeViewContent').jstree('search', $(this).val());
        });

        $('#treeViewContent').jstree({
            "core": {
                "dblclick_toggle": false,
                "animation": 0,
                //"check_callback": true,
                "themes": { /*"stripes": true */ "responsive": true },
                "data": function (node, cb) {
                    BlockElement('#treeView');
                    $.ajax({
                        "type": "POST",
                        "url": "/Culinaria/TreeView",
                        "data": {
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val()
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
                "contextmenu", /*"conditionalselect",*/ "search",
                /*"state"*//*, "types", "wholerow", "checkbox"*/
            ],
            "search": {
                "case_insensitive": true,
                "show_only_matches": true,
                //"search_callback": function (search, node) {
                //    console.log(node);
                //    return !($("#treeViewContent").jstree("is_closed", node));
                //}
            },
            "contextmenu": {
                "items": function ($node) {
                    let grupo = $node.original.grupo;
                    if (grupo !== null && grupo !== "") {

                        return {
                            "TrocarIngrediente": {
                                "separator_before": false,
                                "separator_after": false,
                                "label": "Trocar Ingrediente",
                                "action": function (obj) {
                                    $('#trocarIngrediente').iziModal('open');
                                    //$node = tree.create_node($node);
                                    //tree.edit($node);
                                }
                            }
                        };
                    }
                    return null;
                }
            }
        });

        function BuscarIngredientePorId(id) {
            var data = $('#ingredientesGrid').jsGrid("option", "data");
            var item = data.filter((value) => value.id === id)[0];
            return item;
        }


        function AdicionarQuantidade(node) {
            let ids = node.original.id.split('-');
            let id = ids[ids.length - 1];

            let item = BuscarIngredientePorId(id);

            if (item === null || item === undefined) {
                let total = Inputmask.format(`${parseInt(node.original.quantidade) * parseInt(node.original.valor)}`, { alias: "prata" });

                $('#ingredientesGrid').jsGrid("insertItem", { id: id, img: node.original.icon, item: node.original.nomeItem, quantidadeTotal: node.original.quantidade, precoMarket: node.original.valor, precoTotal: total, ignorar: false });
            }
            else {
                item.quantidadeTotal += parseInt(node.original.quantidade);
                $('#ingredientesGrid').jsGrid("updateItem", item);
            }
        }

        $("#treeViewContent").on("open_node.jstree", function (e, data) {

            let node = data.node.original;
            let ids = node.id.split('-');
            let id = ids[ids.length - 1];

            let childrens = $("#treeViewContent").jstree("get_children_dom", node);

            if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

                let item = BuscarIngredientePorId(id);

                let stack = [];

                childrens.each(function (index, value) {
                    stack.push($("#treeViewContent").jstree("get_node", value));
                })

                while (stack.length > 0) {
                    let nodeChild = stack.pop();
                    if ($("#treeViewContent").jstree("is_leaf", nodeChild)) {
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

        $("#treeViewContent").bind('selected_node.jstree', function (node, data) {
            var selectedNodes = $("#treeViewContent").jstree(true).get_json(data.node.id, { flat: true });
            for (var i = 0; i < selectedNodes.length; i++) {
                console.log(selectedNodes[i])
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

                if (item === null || item === undefined) {
                    let total = Inputmask.format(`${parseInt(node.quantidade) * parseInt(node.valor)}`, { alias: "prata" });

                    var currentNode = data.node;

                    $('#ingredientesGrid').jsGrid("insertItem", { id: id, img: node.icon, item: node.nomeItem, quantidadeTotal: node.quantidade, precoMarket: node.valor, precoTotal: total, ignorar: false });
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
            let childrens = root.children;
            for (var i = 0; i < childrens.length; i++) {
                $("#treeViewContent").jstree('open_node', childrens[i]);
            }
        });

        $("#treeViewContent").on('agrupar', function (e) {
            e.preventDefault();

            let root = $("#treeViewContent").jstree('get_node', 'raiz_anchor');
            let childrens = root.children;

            let allNodeClosed = childrens.every(function (child) {
                let node = $("#treeViewContent").jstree('get_node', child);
                return node.state.opened === false;
            });

            if (!allNodeClosed) {
                $("#ingredientesGrid").jsGrid("option", "data", []);

                for (var i = 0; i < childrens.length; i++) {
                    let node = $("#treeViewContent").jstree('get_node', childrens[i]);
                    $("#treeViewContent").jstree('close_node', node);
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

                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
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
                    name: "quantidadeTotal", type: "prataField", title: "Quantidade Necessária", width: 180,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "precoMarket", type: "prataField", title: "Custo no Mercado (UN)", width: 180,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "precoTotal", type: "prataField", title: "Custo Total", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return Inputmask.format(`${item.PrecoTotal}`, { alias: "prata" });

                        let preco = parseInt(Inputmask.unmask(`${item.precoMarket}`, { alias: "prata" }));
                        let quantidade = parseInt(Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" }));
                        return Inputmask.format(`${quantidade * preco}`, { alias: "prata" });
                    }
                },
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

                    $.post({
                        url: "/Culinaria/Ingredientes",
                        data: {
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val()
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
                        url: "/Culinaria/Resultados",
                        data: {
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
    }
});


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
                let preco = parseInt(Inputmask.unmask(`${itens[i].precoMarket}`, { alias: "prata" }));
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


    let lucroComPacoteEconomico = parseInt((lucroBruto - custoTotal) * 0.845);
    let lucroSemPacoteEconomico = parseInt((lucroBruto - custoTotal) * 0.65);

    if (lucroComPacoteEconomico < 0) {
        lucroComPacoteEconomico = parseInt((lucroBruto - custoTotal) * 1.155);
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
        lucroSemPacoteEconomico = parseInt((lucroBruto - custoTotal) * 1.35);
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

function SalvarMaestriaImperial() {
    maestriaImperialSelecionada = parseInt($('#maestriaImperialSelect').val());
    $('#configuracaoMaestria').iziModal('close');
}

function AlterarIngrediente() {
    if (ingredienteNodeSelecionado !== null) {

        let novoIngrediente = $('#trocarIngrediente').find('#ingredienteAlternativo').select2('data')[0];
        let quantidade = $('#trocarIngrediente').find('#quantidadeIngrediente').val();
        let precoUnitario = $('#trocarIngrediente').find('#precoUnitario').val();

        let parentId = ingredienteNodeSelecionado.parent;
        let parentNode = $("#treeViewContent").jstree("get_node", parentId);
        let quantidadeTotalParent = parentNode.original.quantidade;

        if (parentNode.id === "raiz") {

            let novaQuantidadeTotal = quantidadeTotalParent * quantidade;

            BuscarTreeView(novoIngrediente.id, $('#proc-normal').val(), novaQuantidadeTotal).then(function (data) {
                console.log(data)
            });
        }
        else {

        }
        console.log(parentNode);
    }
}

function BuscarTreeView(referenciaId, proc, quantidade) {
    BlockElement('#treeView');
    return $.ajax({
        "type": "POST",
        "url": "/Culinaria/TreeViewSubReceita",
        "data": {
            receitaReferenciaId: referenciaId,
            quantidade: quantidade,
            procNormal: proc
        },
        "success": function (data) {
            UnblockElement('#treeView');
        }
    });
}