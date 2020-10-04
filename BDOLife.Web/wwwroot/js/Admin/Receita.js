var previousItem;
var ingredientesGrid;
var resultadosGrid;

$(document).ready(function () {
    Selects();
    Tabelas();
    TreeView();

    //function formatState(state) {
    //    var $state;
    //    if (state.img !== null && state.img !== undefined && state.img !== "") {
    //        $state = $(
    //            `<span><img src="${state.img}" class="img-flag" />  ${state.text}</span>`
    //        );
    //    }
    //    else {
    //        $state = $(
    //            `<span>${state.text}</span>`
    //        );
    //    }
    //    return $state;
    //}

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

        $('#tipoReceita').select2({
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState,
            //ajax: {
            //    url: "/Receita/SelectTiposReceitas",
            //    type: "POST",
            //    data: function (params) {
            //        var query = {
            //            search: params.term,
            //            page: params.page || 1
            //        };

            //        return query;
            //    }
            //}
        });

        $('#excecaoProc').select2({
            language: "pt-BR",
            width: '100%',
            placeholder: "Exceção proc",
            allowClear: true,
            templateResult: formatState,
            templateSelection: formatState,
            ajax: {
                url: "/Excecao/Select",
                type: "POST",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1
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
                            semDetalhes: true
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
            //"conditionalselect": function (node, event) {
            //    return false;
            //},
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


    function GridIngredientes() {

        let ingredientes = [];
        BlockElement("body");
        $.post('/Receita/ListarReceitasSelect', { receitaIgnorarReferenciaId: $('#receitaSelect').val() }, function (response) {
            ingredientes = response;
            UnblockElement("body");
            if ($('#ingredientes') !== undefined) {
                ingredientesGrid = $('#ingredientes').jsGrid({
                    width: "100%",
                    inserting: true,
                    editing: true,
                    sorting: false,
                    paging: false,
                    autoload: true,
                    selecting: false,
                    pageLoading: false,
                    confirmDeleting: false,
                    onDataLoaded: function (args) {

                    },
                    onRefreshed: function (args) {

                    },
                    onItemDeleting: function (args) {
                        if (!args.item.deleteConfirmed) { // custom property for confirmation
                            args.cancel = true; // cancel deleting

                            iziToast.warning({
                                timeout: false,
                                close: false,
                                overlay: true,
                                displayMode: 'once',
                                id: 'remover-ingrediente-question',
                                zindex: 999,
                                title: 'Remover ingrediente',
                                message: 'Deseja realmente remover o ingrediente?',
                                position: 'center',
                                buttons: [
                                    ['<button><b>SIM</b></button>', function (instance, toast) {

                                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                        args.item.deleteConfirmed = true;
                                        $(ingredientesGrid).jsGrid('deleteItem', args.item);
                                    }, true],
                                    ['<button>NÃO</button>', function (instance, toast) {
                                        args.item.deleteConfirmed = false;
                                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                    }]
                                ]
                            });
                        }
                    },
                    onItemUpdating: function (args) {
                        previousItem = args.previousItem;
                    },
                    invalidNotify: function (args) {
                        var messages = $.map(args.errors, function (error) {
                            return error.message;
                        });

                        iziToast.error({
                            title: 'Erro',
                            message: messages,
                            position: 'topCenter'
                        });
                    },
                    fields: [
                        {
                            type: "control",
                            deleteButton: true,
                            editButton: true,
                            itemTemplate: function (value, item) {
                                var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                                return $result;
                            }
                        },
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
                        {
                            name: "id", title: "Id", type: "number", visible: false
                        },
                        {
                            name: "item", title: "Item", type: "select2", width: 120, align: "left", editing: true, inserting: true, items: ingredientes, valueField: 'id', textField: 'text', imgField: 'img',
                            validate: {
                                message: "Item é obrigatório",
                                validator: function (value) {
                                    return value !== "";
                                }
                            }
                        },
                        {
                            name: "quantidade", title: "Qtd. Receita", type: "quantidadeField", width: 120, align: "left", editing: true, inserting: true,
                            validate: {
                                message: "Quantidade é obrigatória",
                                validator: function (value) {
                                    return value > 0;
                                }
                            }
                        },
                        { name: "agrupamento", type: "text", title: "Agrupamento", width: 120, align: "left", editing: true, inserting: true },
                        {
                            name: "visivel", type: "checkbox", title: "Visivel", width: 120, editing: true, inserting: true,
                            itemTemplate: function (value, item) {
                                console.log(item);
                                return $("<input>").attr("type", "checkbox")
                                    .attr("checked", value || item.visivel)
                                    .on("change", function () {
                                        item.visivel = $(this).is(":checked");
                                    });
                            }
                        }
                    ],
                    controller: {
                        loadData: function () {
                            BlockElement($("#container-ingredientes"));
                            var d = $.Deferred();

                            $.post({
                                url: "/Receita/ListarSubReceita",
                                data: {
                                    receitaReferenciaId: $('#receitaSelect').val()
                                },
                                dataType: "json"
                            }).done(function (response) {
                                d.resolve(response);
                                UnblockElement($("#container-ingredientes"));
                            });

                            return d.promise();
                        },
                        insertItem: function (item) {
                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/InserirIngrediente",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    ingredientesGrid.insertFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                $('#treeviewReceitas').jstree(true).refresh();

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        },
                        updateItem: function (item) {
                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/AtualizarIngrediente",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    ingredientesGrid.updateFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                $('#treeviewReceitas').jstree(true).refresh();

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        },
                        deleteItem: function (item) {
                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/ExcluirIngrediente",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    ingredientesGrid.deleteFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                $('#treeviewReceitas').jstree(true).refresh();

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        }
                    }
                });

                $('#ingredientes').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
                    if (event.which === 13) {
                        $("#ingredientes").jsGrid("updateItem");
                    }
                });
            }
        });
    }

    function Tabelas() {

        GridIngredientes();

        let itens = [];
        $.post('/Receita/ListarItensSelect', function (response) {
            itens = response;
            if ($('#resultados') !== undefined) {

                resultadosGrid = $('#resultados').jsGrid({
                    width: "100%",
                    inserting: true,
                    editing: true,
                    sorting: false,
                    paging: false,
                    autoload: false,
                    selecting: false,
                    pageLoading: false,
                    confirmDeleting: false,
                    onDataLoaded: function (args) {

                    },
                    onRefreshed: function (args) {

                    },
                    onItemDeleting: function (args) {
                        if (!args.item.deleteConfirmed) { // custom property for confirmation
                            args.cancel = true; // cancel deleting

                            iziToast.warning({
                                timeout: false,
                                close: false,
                                overlay: true,
                                displayMode: 'once',
                                id: 'remover-resultado-question',
                                zindex: 999,
                                title: 'Remover resultado',
                                message: 'Deseja realmente remover o resultado?',
                                position: 'center',
                                buttons: [
                                    ['<button><b>SIM</b></button>', function (instance, toast) {

                                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                        args.item.deleteConfirmed = true;
                                        $(resultadosGrid).jsGrid('deleteItem', args.item);
                                    }, true],
                                    ['<button>NÃO</button>', function (instance, toast) {
                                        args.item.deleteConfirmed = false;
                                        instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                    }]
                                ]
                            });
                        }
                    },
                    onItemUpdating: function (args) {
                        previousItem = args.previousItem;
                    },
                    invalidNotify: function (args) {
                        var messages = $.map(args.errors, function (error) {
                            return error.message;
                        });

                        iziToast.error({
                            title: 'Erro',
                            message: messages,
                            position: 'topCenter'
                        });
                    },
                    fields: [
                        {
                            type: "control",
                            deleteButton: true,
                            editButton: true,
                            itemTemplate: function (value, item) {
                                var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                                return $result;
                            }
                        },
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
                        {
                            name: "id", title: "Id", type: "number", visible: false
                        },
                        {
                            name: "item", title: "Item", type: "select2", width: 120, editing: true, inserting: true, items: itens, valueField: 'valor', textField: 'texto', imgField: 'img',
                            validate: {
                                message: "Item é obrigatório",
                                validator: function (value) {
                                    return value !== "";
                                }
                            }
                        },
                        {
                            name: "procRaro", type: "checkbox", title: "Proc Raro", width: 120, editing: true, inserting: true,
                            itemTemplate: function (value, item) {
                                return $("<input>").attr("type", "checkbox")
                                    .attr("checked", value || item.visivel)
                                    .on("change", function () {
                                        item.visivel = $(this).is(":checked");
                                    });
                            }
                        },
                    ],
                    controller: {
                        loadData: function () {
                            BlockElement($("#container-resultados"));
                            var d = $.Deferred();

                            $.post({
                                url: "/Receita/ListarResultados",
                                data: {
                                    receitaReferenciaId: $('#receitaSelect').val()
                                },
                                dataType: "json"
                            }).done(function (response) {
                                d.resolve(response);
                                UnblockElement($("#container-resultados"));
                            });

                            return d.promise();
                        },
                        insertItem: function (item) {
                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/InserirResultado",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    resultadosGrid.insertFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                $('#treeviewReceitas').jstree(true).refresh();

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        },
                        updateItem: function (item) {

                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/AtualizarResultado",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    resultadosGrid.updateFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                $('#treeviewReceitas').jstree(true).refresh();

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        },
                        deleteItem: function (item) {
                            var d = $.Deferred();

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/Receita/ExcluirResultado",
                                data: { receitaReferenciaId: $('#receitaSelect').val(), item }
                            }).done(function (response) {
                                if (response === null) {
                                    resultadosGrid.deleteFailed = true;
                                    d.reject();
                                }
                                else {
                                    d.resolve(response);
                                }

                                return d.promise();
                            }).fail(function () {
                                d.reject();
                            });

                            return d.promise();
                        }
                    }
                });

                $('#resultados').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
                    if (event.which === 13) {
                        $("#resultados").jsGrid("updateItem");
                    }
                });
            }
        });
    }



    $('#receitaSelect').change(function (e) {

        $("#ingredientes").jsGrid("loadData");
        $("#resultados").jsGrid("loadData");

        $('#treeviewReceitas').jstree(true).refresh();
    });
});


function AtualizarTotais(visao) {

    if (visao === "MACRO") {
        let itens = $("#culinariaItensReceitaTbMacro").jsGrid("option", "data");
        let gastoTotal = 0;
        if (itens !== undefined && itens.length > 0) {
            for (let i = 0; i < itens.length; i++) {
                console.log(itens[i]);
                if (itens[i].ignorar === false) {
                    gastoTotal += parseInt(itens[i].precoTotal);
                }
            }

            $('#informativo-gasto-total').html("");
            $('#informativo-gasto-total').html(Inputmask.format(`${gastoTotal}`, { alias: "prata" }));
        }
        else {
            $('#informativo-gasto-total').html("");
            $('#informativo-gasto-total').html(Inputmask.format("0", { alias: "prata" }));
        }
    }
    else {
        let itens = $("#culinariaItensReceitaTbMicro").jsGrid("option", "data");
        let gastoTotal = 0;
        if (itens !== undefined && itens.length > 0) {
            for (let i = 0; i < itens.length; i++) {
                console.log(itens[i]);
                if (itens[i].ignorar === false) {
                    gastoTotal += parseInt(itens[i].precoTotal);
                }
            }
            $('#informativo-gasto-total').html("");
            $('#informativo-gasto-total').html(Inputmask.format(`${gastoTotal}`, { alias: "prata" }));
        }
        else {
            $('#informativo-gasto-total').html("");
            $('#informativo-gasto-total').html(Inputmask.format("0", { alias: "prata" }));
        }
    }
}