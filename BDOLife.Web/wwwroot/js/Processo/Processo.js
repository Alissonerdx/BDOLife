var ingredientesGrid;
var resultadosGrid;

$(document).ready(function () {
    Selects();
    Tabelas();
    Eventos();
    TreeView();

    function prataEditor(cell, onRendered, success, cancel, editorParams) {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass the successfuly updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell
        //editorParams - params object passed into the editorParams column definition property

        //create and style editor
        var editor = document.createElement("input");

        editor.setAttribute("type", "text");

        $(editor).inputmask({
            alias: 'decimal',
            radixPoint: ",",
            groupSeparator: ".",
            autoGroup: true,
            digits: 0,
            digitsOptional: false,
            placeholder: '0',
            rightAlign: false,
            allowPlus: false,
            allowMinus: false,
            onBeforeMask: function (value, opts) {
                return value;
            }
        });

        editor.style.padding = "3px";
        editor.style.width = "100%";
        editor.style.height = "100%";
        editor.style.boxSizing = "border-box";

        //Set value of editor to the current value of the cell

        editor.value = cell.getValue();

        //set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
        onRendered(function () {
            editor.focus();
            editor.style.css = "100%";
        });

        //when the value has been set, trigger the cell to update
        function successFunc() {
            success(parseInt(Inputmask.unmask(`${editor.value}`, { alias: "prata" })));
        }

        editor.addEventListener("change", successFunc);
        editor.addEventListener("blur", successFunc);

        //return the editor element
        return editor;
    };

    function Eventos() {
        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();
            //$("#ingredientesGrid").jsGrid("loadData");
            //$("#resultadosGrid").jsGrid("loadData");
            //$('#dependenciaDiretaTb').jsGrid("loadData");
            //$('#dependenciaIndiretaTb').jsGrid("loadData");
            //$("#resultadosImperialGrid").jsGrid("loadData");

            ingredientesGrid.setData('/Processo/IngredientesDiretos', {
                referenciaId: $('#receitaSelect').val(),
                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                procNormalAlquimia: $('#proc-normal').val(),
                procRaroAlquimia: $('#proc-raro').val(),
            });

            resultadosGrid.setData('/Processo/Resultados', {
                referenciaId: $('#receitaSelect').val(),
                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                procNormal: $('#proc-normal').val(),
                procRaro: $('#proc-raro').val(),
                //maestria: $('#maestriaSelect').val(),
            });

            $('#treeViewContent').jstree(true).refresh();

            receitaSelecionada = $('#receitaSelect').val();
            //CarregarGraficos();
        });

        $('.config-sidenav-toggle').click(function () {
            $('.config-sidenav').toggleClass('open');
        });

        $('.config-sidenav-close').click(function () {
            $('.config-sidenav').removeClass('open');
        });

        $("#treeViewContent").on("open_node.jstree", function (e, data) {

            let node = data.node.original;
            console.log(node)
            let ids = node.id.split('-');
            let id = ids[ids.length - 1];

            let childrens = $("#treeViewContent").jstree("get_children_dom", node);

            if ($('#treeViewContent').jstree(true).get_parent(data.node) !== '#') {

                let row = GetRowIngredientePorId(id);

                let stack = [];

                

                if (typeof (childrens) === typeof ([])) {
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

                if (row !== null && row !== undefined) {
                    let item = row.getData();
                    let quantidadeTotal = Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" });
                    let quantidade = parseInt(quantidadeTotal) - parseInt(node.quantidade);
                    if (quantidade === 0) {
                        row.delete();
                        //$('#ingredientesGrid').jsGrid("deleteItem", item);
                    }
                    else {
                        item.quantidadeTotal = quantidade;
                        row.update(item);
                        //$('#ingredientesGrid').jsGrid("updateItem", item);
                    }
                }
            }
        });

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

                let row = GetRowIngredientePorId(id);

                if (row === null || row === undefined) {
                    let custo = node.produzirOuComprar === "PRODUZIR" ? node.custoProducao : node.valor;
                    let total = Inputmask.format(`${parseInt(node.quantidade) * parseInt(custo)}`, { alias: "prata" });

                    var currentNode = data.node;
                    ingredientesGrid.addRow({
                        id: id,
                        img: node.icon,
                        item: node.nomeItem,
                        quantidadeTotal: node.quantidade,
                        peso: node.peso,
                        pesoTotal: node.pesoTotal,
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
                    }, true);
                    //$('#ingredientesGrid').jsGrid("insertItem",);
                }
                else {
                    let item = row.getData();
                    item.quantidadeTotal += parseInt(node.quantidade);
                    row.update(item);
                    //$('#ingredientesGrid').jsGrid("updateItem", item);
                }
            }

        });

        $('#maestria-alquimia-select').on('change', function () {
            let selecionado = $(this).select2('data')[0];

            if (selecionado !== undefined) {
                $('#proc-normal-alquimia').inputmask("setvalue", $(selecionado.element).attr('data-proc-normal'));
                $('#proc-raro-alquimia').inputmask("setvalue", $(selecionado.element).attr('data-proc-raro'));
                $('#proc-normal-alquimia').focus();
                $('#proc-raro-alquimia').focus();
            }
        });
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

        let row = GetRowIngredientePorId(id);

        if (row === null || row === undefined) {
            let custo = nodeTemp.produzirOuComprar === "PRODUZIR" ? nodeTemp.custoProducao : nodeTemp.valor;
            let total = Inputmask.format(`${parseInt(nodeTemp.quantidade) * parseInt(custo)}`, { alias: "prata" });

            ingredientesGrid.addRow({
                id: id,
                img: nodeTemp.icon,
                item: nodeTemp.nomeItem,
                quantidadeTotal: nodeTemp.quantidade,
                peso: nodeTemp.peso,
                pesoTotal: nodeTemp.pesoTotal,
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
            }, true);
            //$('#ingredientesGrid').jsGrid("insertItem", );
        }
        else {
            let item = row.getData();
            item.quantidadeTotal += parseInt(nodeTemp.quantidade);
            row.update(item);
            //$('#ingredientesGrid').jsGrid("updateItem", item);
        }
    }

    function SubtrairQuantidade(id, qtd) {
        let row = GetRowIngredientePorId(id);

        if (row !== null && row !== undefined) {
            let item = row.getData();
            let quantidadeTotal = Inputmask.unmask(`${item.quantidadeTotal}`, { alias: "prata" });
            let quantidade = parseInt(quantidadeTotal) - parseInt(qtd);
            if (quantidade === 0) {
                row.delete();
                //$('#ingredientesGrid').jsGrid("deleteItem", item);
            }
            else {
                item.quantidadeTotal = quantidade;
                row.update(item);
                //$('#ingredientesGrid').jsGrid("updateItem", item);
            }
        }
    }

    function GetRowIngredientePorId(id) {
        return ingredientesGrid.searchRows("id", "=", id)[0];
    }

    function Selects() {

        $('#receitaSelect').select2({
            placeholder: 'Selecione a receita',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
        });

        $('#nivelProcesso').select2({
            placeholder: 'Selecione o nível',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
        });

        $('#tipoProcessoSelect').select2({
            placeholder: 'Selecione o tipo de processo',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('#tipoProcessoSelect').on('select2:select', function (e) {
            $.get("/Item/SelectReceitasPorTipo", { tipo: $('#tipoProcessoSelect').val() }).done(function (data) {
                $("#receitaSelect").html("");
                for (var i = 0; i < data.results.length; i++) {
                    var newOption = new Option(data.results[i].text, data.results[i].id, false, false);
                    $('#receitaSelect').append(newOption).trigger('change');
                }

            });
        });

        $('.maestria').on('select2:select', function (e) {
            //$('#loteProcesso').val($(this).val())
        });

        $('.maestria').select2({
            placeholder: 'Selecione a maestria',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $.get(`/Maestria/SelectMaestrias?tipo=1`, function (data) {
            $('#maestria-alquimia-select').append('<option>Selecione a maestria</option>');
            data.results.forEach(function (value, index) {
                $('#maestria-alquimia-select').append(`<option data-proc-normal='${value.procNormal}' data-proc-raro='${value.procRaro}' data-regularmpc='${value.regularMaxProcChance}' data-rarempc='${value.rareMaxProcChance}' value='${value.id}'>${value.text}</option>`);
            })

            $('#maestria-alquimia-select').select2({
                placeholder: "Selecione a maestria",
                language: "pt-BR",
                width: '100%',
                templateResult: formatState,
                templateSelection: formatState,
                allowClear: true,
            });
        });
    }

    function prataFormat(cell, formatterParams) {
        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
    }

    var somatoriaTotal = function (values, data, calcParams) {

        let total = 0;

        values.forEach(function (value) {
            total += value;
            console.log(value)
        });

        return total;
    }


    function Tabelas() {
        ingredientesGrid = new Tabulator("#ingredientesGrid", {
            ajaxURL: "",
            ajaxConfig: "post",
            ajaxParams: {
                receitaReferenciaId: $('#receitaSelect').val(),
                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                procNormal: $('#proc-normal').val(),
                procRaro: $('#proc-raro').val(),
                maestriaId: $('#maestriaSelect').val(),
            }, //ajax parameters
            virtualDomBuffer: 30000,
            layout: "fitDataStretch",
            height: '100%',
            resizableRows: true,
            //responsiveLayout: "collapse",
            //rowContextMenu: rowMenu,
            langs: TabulatorLanguage,
            columns: [
                //{
                //    formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                //        cell.getRow().toggleSelect();
                //    }
                //},
                {
                    title: "",
                    field: "img",
                    formatter: "responsiveCollapse",
                    hozAlign: "center",
                    frozen: true,
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                {
                    title: "Ingrediente",
                    frozen: true,
                    field: "item",
                },
                {
                    title: "",
                    field: "id",
                    visible: false
                },
                {
                    title: "Quantidade Total",
                    field: "quantidadeTotal",
                    formatter: prataFormat
                },
                {
                    title: "Peso",
                    field: "peso",
                },
                {
                    title: "Custo de Compra/UN",
                    field: "precoMarket",
                    editor: prataEditor,
                    formatter: prataFormat,
                    cellEdited: function (cell) {
                        let row = cell.getRow();
                        let produzirOuComprar = row.getData().produzirOuComprar;
                        if (produzirOuComprar === "PRODUZIR") {
                            row.getCell("precoTotal").setValue(cell.getRow().getData().quantidadeTotal * cell.getRow().getData().custoProducao);
                        }

                        if (produzirOuComprar === "COMPRAR") {
                            row.getCell("precoTotal").setValue(cell.getRow().getData().quantidadeTotal * cell.getRow().getData().precoMarket);
                        }
                    },
                },
                {
                    title: "Custo de Produção/UN", field: "custoProducao",
                    formatter: prataFormat
                },
                {
                    title: "Produzir/Comprar (?)",
                    field: "produzirOuComprar",
                    editor: "select",
                    editorParams: { values: { "COMPRAR": "COMPRAR", "PRODUZIR": "PRODUZIR" } },
                    cellEdited: function (cell) {
                        let row = cell.getRow();
                        if (cell.getValue() === "PRODUZIR") {
                            row.getCell("precoTotal").setValue(cell.getRow().getData().quantidadeTotal * cell.getRow().getData().custoProducao);
                        }

                        if (cell.getValue() === "COMPRAR") {
                            row.getCell("precoTotal").setValue(cell.getRow().getData().quantidadeTotal * cell.getRow().getData().precoMarket);
                        }
                    },
                    
                },
                {
                    title: "Custo Total",
                    field: "precoTotal",
                    bottomCalc: "sum",
                    bottomCalcFormatter: prataFormat,
                    formatter: prataFormat,
                    mutator: function (value, data, type, params, component) {
                        
                        if (data.produzirOuComprar === "PRODUZIR") {
                            return data.quantidadeTotal * data.custoProducao;
                        }

                        if (data.produzirOuComprar === "COMPRAR") {
                            return data.quantidadeTotal * data.precoMarket;
                        }

                        return value;
                    },
                },
                {
                    title: "Peso Total",
                    field: "pesoTotal",
                    bottomCalc: "sum",
                    bottomCalcFormatter: prataFormat,
                    formatter: prataFormat,
                },
                {
                    title: "Ignorar",
                    field: "ignorar",
                    hozAlign: "center",
                    editor: true,
                    formatter: "tickCross"
                },
            ]
        });

        ingredientesGrid.setLocale("pt-br");


        resultadosGrid = new Tabulator("#resultadosGrid", {
            ajaxURL: "",
            ajaxConfig: "post",
            ajaxParams: {
                tipoReceita: $('#tipoProcessoSelect').val(),
                receitaReferenciaId: $('#receitaSelect').val(),
                quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                procNormal: $('#proc-normal').val(),
                procRaro: $('#proc-raro').val(),
                maestria: $('#maestriaSelect').val(),
            }, //ajax parameters
            virtualDomBuffer: 30000,
            layout: "fitDataStretch",
            height: '100%',
            resizableRows: true,
            //responsiveLayout: "collapse",
            //rowContextMenu: rowMenu,
            langs: {
                "pt-br": {
                    "pagination": {
                        "first": "Primeira",
                        "first_title": "Primeira Página",
                        "last": "Última",
                        "last_title": "Última Página",
                        "prev": "Anterior",
                        "prev_title": "Página Anterior",
                        "next": "Próximo",
                        "next_title": "Próxima Página",
                        "all": "Todas",
                    },
                    "ajax": {
                        "loading": "Carregando", //ajax loader text
                        "error": "Erro", //ajax error text
                    },
                },
            },
            columns: [
                //{
                //    formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                //        cell.getRow().toggleSelect();
                //    }
                //},
                //{ title: "", field: "id", visible: false },
                {
                    title: "",
                    field: "img",
                    frozen: true,
                    formatter: "responsiveCollapse",
                    hozAlign: "center",
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                {
                    title: "Produzido",
                    frozen: true,
                    field: "item",
                },
                {
                    title: "Qtd. Produzida",
                    field: "quantidade",
                    formatter: prataFormat
                },
                {
                    title: "Peso",
                    field: "peso",
                },
                {
                    title: "Preço Mercado",
                    field: "preco",
                    formatter: prataFormat
                },
                {
                    title: "Lucro Bruto",
                    field: "total",
                    bottomCalc: "sum",
                    bottomCalcFormatter: prataFormat,
                    formatter: prataFormat
                },
                {
                    title: "Peso Total",
                    field: "pesoTotal",
                    bottomCalc: "sum",
                    bottomCalcFormatter: prataFormat,
                    formatter: prataFormat,
                },
                {
                    title: "Ignorar",
                    field: "ignorar",
                    hozAlign: "center",
                    editor: true,
                    formatter: "tickCross"
                },
            ]
        });

        resultadosGrid.setLocale("pt-br");

    }

    function TreeView() {
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
                        "url": "/Processo/TreeView",
                        "data": {
                            referenciaId: $('#receitaSelect').val(),
                            quantidade: parseInt($('#quantidade').inputmask('unmaskedvalue')),
                            //procNormal: $('#proc-normal').val(),
                            //procRaro: $('#proc-raro').val(),
                            //tipo: $('#tipoProcessoSelect').val(),
                            //maestriaId: $('#maestriaSelect').val()
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
            //"contextmenu": {
            //    "items": function ($node) {
            //        let grupo = $node.original.grupo;
            //        let menuTrocarIngrediente = null;
            //        let menuConfigurarIngrediente = null;
            //        let childrens = $node.children.length > 0 ? true : false;
            //        let possuiProcRaro = $node.original.possuiProcRaro;

            //        if (grupo !== null && grupo !== "" && $node.id !== "raiz") {

            //            menuTrocarIngrediente = {
            //                "separator_before": false,
            //                "separator_after": false,
            //                "label": "Substituir",
            //                //"icon": "/imagens/icones/troca.svg",
            //                "action": function (obj) {
            //                    $('#trocarIngrediente').find('#ingredienteAlternativo').val(null).trigger('change');
            //                    $('#trocarIngrediente').find('#precoUnitario').val('');
            //                    $('#trocarIngrediente').find('#quantidadeIngrediente').val('');
            //                    $('#trocarIngrediente').iziModal('open');
            //                    //$node = tree.create_node($node);
            //                    //tree.edit($node);
            //                }
            //            };
            //        }

            //        let ids = $node.id.split('-');
            //        let id = ids[ids.length - 1];

            //        if (!id.includes('PCH') && !id.includes('PDE') && !id.includes('RFI') && !id.includes('PMO') && childrens && possuiProcRaro && $node.id !== "raiz") {
            //            menuConfigurarIngrediente = {
            //                "separator_before": false,
            //                "separator_after": false,
            //                "label": "Configurar",
            //                //"icon": "/imagens/icones/troca.svg",
            //                "action": function (obj) {
            //                    $('#configurarIngrediente').find('#maestriaConfIngrediente').val(null).trigger('change');
            //                    $('#configurarIngrediente').find('#procNormalConfIngrediente').val(`${$node.original.procNormal}0`.replace('.', ','));
            //                    $('#configurarIngrediente').find('#procRaroConfIngrediente').val(`${$node.original.procRaro}0`.replace('.', ','));

            //                    if ($node.original.usarProcRaro === true) {
            //                        $('#configurarIngrediente').find('#usarProcRaroConfIngrediente').iCheck('check');
            //                    }
            //                    else {
            //                        $('#configurarIngrediente').find('#usarProcRaroConfIngrediente').iCheck('uncheck');
            //                    }

            //                    $('#configurarIngrediente').iziModal('open');
            //                    //$node = tree.create_node($node);
            //                    //tree.edit($node);
            //                }
            //            };
            //        }

            //        if (menuTrocarIngrediente !== null && menuConfigurarIngrediente === null) {
            //            return {
            //                "TrocarIngrediente": menuTrocarIngrediente,
            //            };
            //        }
            //        else if (menuTrocarIngrediente === null && menuConfigurarIngrediente !== null) {
            //            return {
            //                "Configurar": menuConfigurarIngrediente,
            //            };
            //        }
            //        else if (menuTrocarIngrediente !== null && menuConfigurarIngrediente !== null) {
            //            return {
            //                "TrocarIngrediente": menuTrocarIngrediente,
            //                "Configurar": menuConfigurarIngrediente
            //            };
            //        }

            //        return null;
            //    }
            //}
        });
    }

});