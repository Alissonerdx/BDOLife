$(document).ready(function () {
    Tabelas();
    Selects();
    Eventos();
    TreeView();
    EventTimer();


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
            ajax: {
                url: "/Maestria/SelectMaestriasPorTipo",
                type: "GET",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1,
                        tipo: 1
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
                "show_only_matches": true
            },
            "contextmenu": {
                "items": function ($node) {
                    var tree = $("#tree").jstree(true);
                    return {
                        "TrocarIngrediente": {
                            "separator_before": false,
                            "separator_after": false,
                            "label": "Trocar Ingrediente",
                            "action": function (obj) {
                                $node = tree.create_node($node);
                                tree.edit($node);
                            }
                        },
                    };
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

                $('#ingredientesGrid').jsGrid("insertItem", { id: id, img: node.original.icon, item: node.original.nomeItem, quantidadeTotal: node.original.quantidade, precoMarket: node.original.valor, precoTotal: total, ignorar: false }).done(function () {
                    console.log("inserido");
                });
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
            let item = BuscarIngredientePorId(id);

            let stack = [];

            let childrens = $("#treeViewContent").jstree("get_children_dom", node);
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
                let quantidade = parseInt(item.quantidadeTotal) - parseInt(node.quantidade);
                if (quantidade === 0) {
                    $('#ingredientesGrid').jsGrid("deleteItem", item);
                }
                else {
                    item.quantidadeTotal = quantidade;
                    $('#ingredientesGrid').jsGrid("updateItem", item);
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
                let quantidade = parseInt(item.quantidadeTotal) - parseInt(qtd);
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

            BlockElement($("#ingredientesGrid"));

            let node = data.node.original;
            let ids = node.id.split('-');
            let id = ids[ids.length - 1];

            let stack = []; 

            let childrens = $("#treeViewContent").jstree("get_children_dom", node);
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

                $('#ingredientesGrid').jsGrid("insertItem", { id: id, img: node.icon, item: node.nomeItem, quantidadeTotal: node.quantidade, precoMarket: node.valor, precoTotal: total, ignorar: false }).done(function () {
                    console.log("inserido");
                });
            }
            else {
                item.quantidadeTotal += parseInt(node.quantidade);
                $('#ingredientesGrid').jsGrid("updateItem", item);
            }

            UnblockElement($("#ingredientesGrid"));
        });

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
            //onInit: function (args) {
            //    AtualizarTotais();
            //},
            //onDataLoaded: function (args) {
            //    AtualizarTotais();
            //},
            //onRefreshed: function (args) {

            //},
            //onItemUpdated: function (args) {
            //    AtualizarTotais();
            //},
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
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                { name: "item", title: "Ingrediente", type: "text", width: 160, editing: false, inserting: false },
                //{ name: "comprarOuFazer", title: "Comprar/Fazer", type: "text", width: 120, editing: false, inserting: false },
                {
                    name: "quantidadeTotal", type: "prataField", title: "Quantidade Necessária", width: 180,
                    itemTemplate: function (value, item) {
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "precoMarket", type: "prataField", title: "Custo no Mercado (UN)", width: 180,
                    itemTemplate: function (value, item) {
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "precoTotal", type: "prataField", title: "Custo Total", width: 120, editing: false, inserting: false,
                    itemTemplate: function (value, item) {
                        let preco = parseInt(Inputmask.unmask(`${item.precoMarket}`, { alias: "prata" }));
                        let quantidade = parseInt(Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" }));
                        return Inputmask.format(`${quantidade * preco}`, { alias: "prata" });
                    }
                },
                { name: "ignorar", type: "checkbox", title: "Ignorar", width: 120 },
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
                        return parseInt(Inputmask.unmask(`${value}`, { alias: "prata" }));
                    }
                },
                {
                    name: "preco", type: "prataField", title: "Preço Mercado", width: 120,
                    itemTemplate: function (value, item) {
                        if (item.IsTotal)
                            return "";
                        return parseInt(Inputmask.unmask(`${value}`, { alias: "prata" }));
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
                            maestria: $('#maestriaSelect').val()
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


    let lucroComPacoteEconomico = (lucroBruto * 0.845) - custoTotal;
    let lucroSemPacoteEconomico = (lucroBruto * 0.65) - custoTotal;

    if (lucroBruto < custoTotal) {
        $('#lucroSemPctEconomico').removeClass('success');
        $('#lucroComPctEconomico').removeClass('success');
        $('#lucroSemPctEconomico').addClass('danger');
        $('#lucroComPctEconomico').addClass('danger');
        $('#lucroSemPctEconomico').html("-" + Inputmask.format(`${lucroSemPacoteEconomico}`, { alias: "prata" }));
        $('#lucroComPctEconomico').html("-" + Inputmask.format(`${lucroComPacoteEconomico}`, { alias: "prata" }));
    }
    else {

        $('#lucroSemPctEconomico').removeClass('danger');
        $('#lucroComPctEconomico').removeClass('danger');
        $('#lucroSemPctEconomico').addClass('success');
        $('#lucroComPctEconomico').addClass('success');
        $('#lucroSemPctEconomico').html(Inputmask.format(`${lucroSemPacoteEconomico}`, { alias: "prata" }));
        $('#lucroComPctEconomico').html(Inputmask.format(`${lucroComPacoteEconomico}`, { alias: "prata" }));
    }
}