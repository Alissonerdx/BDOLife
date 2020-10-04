$(document).ready(function () {

    Selects();
    Tabelas();
    TreeView();
    Masks();
    EventTimer();


    function EventTimer() {
        setInterval(AtualizarTotais, 1000);
    }

    function Masks() {
        $('#quantidade').inputmask("integer");
        $('#proc-normal, #proc-raro').inputmask({
            mask: "9[,99]",
            greedy: false,
            definitions: {
                '*': {
                    validator: "[0-9]"
                }
            },
            rightAlign: true
        });
    }

    function formatState(state) {
        var $state;
        if (state.img !== null && state.img !== undefined && state.img !== "") {
            $state = $(
                `<span><img src="${state.img}" class="img-flag" />  ${state.text}</span>`
            );
        }
        else {
            $state = $(
                `<span>${state.text}</span>`
            );
        }
        return $state;
    }

    function Selects() {
        $('#receitaSelect').select2({
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState,
            ajax: {
                url: "/Receita/Select",
                type: "POST",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1,
                        considerarAlquimia: $('#considerar-alquimia').is(':checked'),
                        considerarCulinaria: $('#considerar-culinaria').is(':checked'),
                        considerarProcesso: $('#considerar-processo').is(':checked')

                    };

                    return query;
                }
            }
        });
    }

    function TreeView() {

        $('#treeview-search').keyup(function () {
            $('#treeviewReceitas').jstree('search', $(this).val());
        });

        $('#treeviewReceitas').jstree({
            "core": {
                "animation": 0,
                //"check_callback": true,
                "themes": { /*"stripes": true */ "responsive": true },
                "data": function (node, cb) {
                    BlockElement('#tree-view');
                    $.ajax({
                        "type": "POST",
                        "url": "/Receita/VisaoTreeView",
                        "data": {
                            receitaReferenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            procNormal: $('#proc-normal').val()
                        },
                        "success": function (data) {
                            cb(data);
                            UnblockElement('#tree-view');
                        }
                    });
                }
            },
            "types": {
            },
            "plugins": [
            /*"contextmenu",*/ /*"conditionalselect",*/ "search",
                /*"state"*//*, "types", "wholerow", "checkbox"*/
            ],
            "search": {
                "case_insensitive": true,
                "show_only_matches": true
            }
        });
    }

    function Tabelas() {
        if ($('#culinariaItensReceitaTbMacro') !== undefined) {
            $('#culinariaItensReceitaTbMacro').jsGrid({
                width: "100%",
                inserting: false,
                editing: true,
                sorting: false,
                paging: false,
                autoload: false,
                selecting: false,
                pageLoading: false,
                onInit: function (args) {
                    AtualizarTotais();
                },
                onDataLoaded: function (args) {
                    AtualizarTotais();

                },
                onRefreshed: function (args) {
                    AtualizarTotais();

                },
                onItemUpdated: function (args) {
                    AtualizarTotais();
                },
                fields: [
                    {
                        name: "img",
                        align: "center",
                        title: "",
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "item", title: "Item", type: "text", width: 120, editing: false, inserting: false },
                    { name: "quantidadeReceitas", type: "number", visible: false, editing: false, inserting: false },
                    { name: "quantidade", type: "number", title: "Qtd/Receita", width: 120, align: "left", editing: false, inserting: false },
                    { name: "precoMarket", type: "prataField", title: "Preço do Mercado", width: 150, align: "left", editing: false, inserting: false  },
                    {
                        name: "custoProducao", type: "prataField", title: "Custo de Produção", width: 150, align: "left", editing: false, inserting: false,
                        itemTemplate: function (value, item) {
                            //let quantidadeIngredientes = parseInt(item.quantidade);
                            //let precoMercado = parseInt(Inputmask.unmask("" + item.precoMarket, { alias: "prata" }));
                            //let totalPorReceita = quantidadeIngredientes * precoMercado;
                            return Inputmask.format(`${value}`, { alias: "prata" });
                        }
                    },
                    {
                        name: "custoCompra", type: "prataField", title: "Custo de Compra", width: 150, align: "left", editing: false, inserting: false,
                        itemTemplate: function (value, item) {
                            //let quantidadeIngredientes = parseInt(item.quantidade);
                            //let precoMercado = parseInt(Inputmask.unmask("" + item.precoMarket, { alias: "prata" }));
                            //let totalPorReceita = quantidadeIngredientes * precoMercado;
                            return Inputmask.format(`${value}`, { alias: "prata" });
                        }
                    },
                    {
                        name: "produzirOuComprar", title: "Produzir/Comprar", type: "select", width: 150, align: "center", editing: true, inserting: false, items: [
                            { text: "Comprar", value: "COMPRAR" },
                            { text: "Produzir", value: "PRODUZIR" }
                        ],
                        valueField: "value",
                        textField: "text"
                    },
                    {
                        name: "quantidadeTotal", type: "quantidadeField", title: "Qtd. Total", width: 120, align: "left", inserting: false, editing: false,
                        itemTemplate: function (value, item) {
                            let quantidadeReceitas = parseInt(item.quantidadeReceitas);
                            let quantidadeIngredientes = parseInt(item.quantidade);
                            let quantidadeTotalPorReceita = quantidadeIngredientes * quantidadeReceitas;
                            return Inputmask.format(`${quantidadeTotalPorReceita}`, { alias: "integer" });
                        }
                    },
                    {
                        name: "custoTotal", type: "prataField", title: "Custo Total", width: 120, align: "left", editing: false, inserting: true,
                        itemTemplate: function (value, item) {
                           
                            let quantidadeTotal = parseInt($('#quantidade').inputmask('unmaskedvalue'));
                            let custoPorReceita = 0;
                            console.log(item.produzirOuComprar)
                            if (item.produzirOuComprar === "COMPRAR") {
                                custoPorReceita = parseInt(Inputmask.unmask("" + item.custoCompra, { alias: "prata" }));
                            }
                            else if (item.produzirOuComprar === "PRODUZIR") {
                                custoPorReceita = parseInt(Inputmask.unmask("" + item.custoProducao, { alias: "prata" }));
                            }
                            let custoTotal = quantidadeTotal * custoPorReceita;
                            return Inputmask.format(`${custoTotal}`, { alias: "prata" });
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
                        BlockElement($("#macro"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/SubReceitas",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val(),
                                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                                procNormal: $('#proc-normal').val(),
                                procRaro: $('#proc-raro').val()
                            },
                            dataType: "json"
                        }).done(function (response) {
                            d.resolve(response);
                            AtualizarTotais();
                            UnblockElement($("#macro"));
                        });

                        return d.promise();
                    }
                }
            });
        }

        if ($('#culinariaItensReceitaTbMicro') !== undefined) {
            $('#culinariaItensReceitaTbMicro').jsGrid({
                width: "100%",
                inserting: false,
                editing: true,
                sorting: false,
                paging: false,
                autoload: false,
                selecting: false,
                pageLoading: false,
                //onInit: function (args) {
                //    AtualizarTotais();
                //},
                //onDataLoaded: function (args) {
                //    AtualizarTotais();
                //},
                //onRefreshed: function (args) {
                //    AtualizarTotais();
                //},
                //onItemUpdated: function (args) {
                //    AtualizarTotais();
                //},
                fields: [
                    {
                        name: "img",
                        align: "center",
                        title: "",
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "item", title: "Item", type: "text", width: 120, editing: false, inserting: false },
                    //{ name: "comprarOuFazer", title: "Comprar/Fazer", type: "text", width: 120, editing: false, inserting: false },
                    { name: "quantidadeTotal", type: "quantidadeField", title: "Qtd. Total", width: 120 },
                    { name: "precoMarket", type: "prataField", title: "Preço Mercado", width: 120 },
                    {
                        name: "precoTotal", type: "prataField", title: "Custo Total", width: 120, editing: false, inserting: false,
                        itemTemplate: function (value, item) {
                            let precoMarket = parseInt(Inputmask.unmask("" + item.precoMarket, { alias: "prata" }));
                            return Inputmask.format(`${parseInt(item.quantidadeTotal) * precoMarket}`, { alias: "prata" });
                        }
                    },
                    //{ name: "ignorar", type: "checkbox", title: "Ignorar", width: 120 },
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
                        BlockElement($("#micro"));

                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/Ingredientes",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val(),
                                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                                procNormal: $('#proc-normal').val()
                            },
                            dataType: "json"
                        }).done(function (response) {
                            d.resolve(response);
                            UnblockElement($("#micro"));
                        });

                        return d.promise();
                    }
                }
            });
        }

        if ($('#culinariaResultadoTb') !== undefined) {

            $('#culinariaResultadoTb').jsGrid({
                width: "100%",
                inserting: false,
                editing: true,
                sorting: false,
                paging: false,
                autoload: true,
                selecting: false,
                pageLoading: false,
                onDataLoaded: function (args) {
                    AtualizarTotais();
                },
                onRefreshed: function (args) {
                    AtualizarTotais();
                },
                onItemUpdated: function (args) {
                    AtualizarTotais();
                },
                fields: [
                    {
                        name: "img",
                        align: "center",
                        title: "",
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "item", title: "Item", type: "text", width: 120, editing: false, inserting: false },
                    { name: "precoMarket", type: "prataField", title: "Preço Mercado", width: 120 },
                    { name: "quantidade", type: "quantidadeField", title: "Craftado", width: 120 },
                    {
                        name: "valorTotal", type: "prataField", title: "Total", width: 120, editing: false, inserting: false,
                        itemTemplate: function (value, item) {
                            let precoMarket = parseInt(Inputmask.unmask("" + item.precoMarket, { alias: "prata" }));
                            let pacoteEconomico = $('#pacote-economico').is(':checked');
                            let valorTotal = parseInt(parseInt(item.quantidade) * precoMarket * (pacoteEconomico === true ? 0.845 : 0.65));
                            return Inputmask.format(`${valorTotal}`, { alias: "prata" });
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

                        BlockElement($("#resultados"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/Resultados",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val(),
                                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                                procNormal: $('#proc-normal').val(),
                                procRaro: $('#proc-raro').val(),
                                pacoteEconomico: $('#pacote-economico').is(':checked')
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

        if ($('#dependenciaDiretaTb') !== undefined) {

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
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "receita", title: "Receita", type: "text", width: 120, editing: false, inserting: false },
                    { name: "precoMarket", type: "prataField", title: "Preço Mercado", width: 120, editing: false, inserting: false },
                ],
                controller: {
                    loadData: function () {

                        BlockElement($("#resultados"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/Diretas",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val(),
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

        if ($('#dependenciaDiretaTb') !== undefined) {

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
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "receita", title: "Receita", type: "text", width: 120, editing: false, inserting: false },
                    { name: "precoMarket", type: "prataField", title: "Preço Mercado", width: 120, editing: false, inserting: false },
                ],
                controller: {
                    loadData: function () {

                        BlockElement($("#resultados"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/Diretas",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val(),
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


        if ($('#dependenciaIndiretaTb') !== undefined) {

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
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "receita", title: "Receita", type: "text", width: 120, editing: false, inserting: false },
                    { name: "precoMarket", type: "prataField", title: "Preço Mercado", width: 120, editing: false, inserting: false },
                ],
                controller: {
                    loadData: function () {

                        BlockElement($("#resultados"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/Indiretas",
                            data: {
                                receitaReferenciaId: $('#receitaSelect').val()
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

    }

    $('#receitaSelect').change(function (e) {

        $("#culinariaItensReceitaTbMacro").jsGrid("loadData");
        $("#culinariaItensReceitaTbMicro").jsGrid("loadData");
        $("#culinariaResultadoTb").jsGrid("loadData");
        $("#dependenciaDiretaTb").jsGrid("loadData");
        $("#dependenciaIndiretaTb").jsGrid("loadData");


        $('#treeviewReceitas').jstree(true).refresh();

        AtualizarTotais();
    });

    $('#pacote-economico').on('ifChecked', function () {
        $("#culinariaResultadoTb").jsGrid("loadData");

        AtualizarTotais();
    });

    $('#pacote-economico').on('ifUnchecked', function () {
        $("#culinariaResultadoTb").jsGrid("loadData");

        AtualizarTotais();
    });

    $('#calcular').click(function () {

        $("#culinariaItensReceitaTbMacro").jsGrid("loadData");
        $("#culinariaItensReceitaTbMicro").jsGrid("loadData");
        $("#culinariaResultadoTb").jsGrid("loadData");

        $('#treeviewReceitas').jstree(true).refresh();

        AtualizarTotais();

    });
});


function AtualizarTotais() {

    let visao = "MACRO";
    //if ($('#tab-micro').hasClass('active') === true) {
    //    visao = "MICRO";
    //}

    if ($('#tab-macro').hasClass('active') === true) {
        visao = "MACRO";
    }

    let resultados = $("#culinariaResultadoTb").jsGrid("option", "data");
    let itens = [];

    if (visao === "MACRO") {
        itens = $("#culinariaItensReceitaTbMacro").jsGrid("option", "data");
    }
    else if (visao === "MICRO") {
        itens = $("#culinariaItensReceitaTbMicro").jsGrid("option", "data");
    }

    CalcularTotais(itens, resultados);
}


function CalcularTotais(itens, resultados) {
    let custoTotal = 0;
    let lucroBruto = 0;
    let lucroLiquido = 0;
    let pacoteEconomico = $('#pacote-economico').is(':checked');

    if (itens !== undefined && itens.length > 0) {
        for (let i = 0; i < itens.length; i++) {
            if (itens[i].ignorar === false) {
                //let quantidadeTotal = parseInt(Inputmask.unmask("" + itens[i].quantidadeTotal, { alias: "integer" }));
                //let custoTotal = parseInt(Inputmask.unmask("" + itens[i].precoMarket, { alias: "prata" }));
                let quantidadeTotal = parseInt($('#quantidade').inputmask('unmaskedvalue'));
                let custoPorReceita = 0;
                if (itens[i].produzirOuComprar === "COMPRAR") {
                    custoPorReceita = parseInt(Inputmask.unmask("" + itens[i].custoCompra, { alias: "prata" }));
                }
                else if (itens[i].produzirOuComprar === "PRODUZIR") {
                    custoPorReceita = parseInt(Inputmask.unmask("" + itens[i].custoProducao, { alias: "prata" }));
                }
                let custoTotalSubReceita = quantidadeTotal * custoPorReceita;
                let custo = parseInt(Inputmask.unmask("" + custoTotalSubReceita, { alias: "prata" }));
                custoTotal += custo;
            }
        }

        $('#informativo-gasto-total').html("");
        $('#informativo-gasto-total').html(Inputmask.format(`${custoTotal}`, { alias: "prata" }));
    }
    else {
        $('#informativo-gasto-total').html("");
        $('#informativo-gasto-total').html(Inputmask.format("0", { alias: "prata" }));
    }

    if (resultados !== undefined && resultados.length > 0) {

        for (let i = 0; i < resultados.length; i++) {
            if (resultados[i].ignorar === false) {
                let quantidade = parseInt(Inputmask.unmask("" + resultados[i].quantidade, { alias: "integer" }));
                let precoMarket = parseInt(Inputmask.unmask("" + resultados[i].precoMarket, { alias: "prata" }));
                lucroBruto += quantidade * precoMarket * (pacoteEconomico === true ? 0.845 : 0.65);
            }
        }

        lucroBruto = parseInt(lucroBruto);
        $('#informativo-venda').html("");
        $('#informativo-venda').html(Inputmask.format(`${lucroBruto}`, { alias: "prata" }));
    }
    else {
        $('#informativo-gasto-total').html("");
        $('#informativo-gasto-total').html(Inputmask.format("0", { alias: "prata" }));
    }

    $('#informativo-lucro').html("");

    lucroLiquido = lucroBruto - custoTotal;
    if (lucroLiquido < 0) {
        $('#informativo-lucro').removeClass('success');
        $('#informativo-lucro').addClass('danger');
        $('#informativo-lucro').html("-" + Inputmask.format(`${lucroLiquido}`, { alias: "prata" }));
    }
    else {
        $('#informativo-lucro').removeClass('danger');
        $('#informativo-lucro').addClass('success');
        $('#informativo-lucro').html(Inputmask.format(`${lucroLiquido}`, { alias: "prata" }));
    }
}