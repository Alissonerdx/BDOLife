var planosGrid;
var previousItem;

$(document).ready(function () {
    Grids();

    function Grids() {

        planosGrid = $('#planos').jsGrid({
            width: "100%",
            inserting: true,
            editing: true,
            sorting: false,
            paging: true,
            autoload: true,
            selecting: false,
            filtering: true,
            pageSize: 50,
            pageLoading: true,
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
                        id: 'remover-plano-question',
                        zindex: 999,
                        title: 'Remover plano',
                        message: 'Deseja realmente remover o plano?',
                        position: 'center',
                        buttons: [
                            ['<button><b>SIM</b></button>', function (instance, toast) {
                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                args.item.deleteConfirmed = true;
                                $(planosGrid).jsGrid('deleteItem', args.item);
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
                    return " "+error.message;
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
                { name: "id", title: "Id", type: "number", visible: false },
                {
                    name: "nome", title: "Nome", type: "text", visible: true, filtering: true, inserting: true,
                    validate: {
                        message: "Nome é obrigatório",
                        validator: function (value) {
                            return value !== undefined && value !== "";
                        }
                    }
                },
                {
                    name: "descricao", title: "Descrição (curta)", type: "text", visible: true, filtering: true, inserting: true
                },
                {
                    name: "valor", title: "Valor", type: "realField", visible: true, filtering: false, inserting: true, editing: true,
                    validate: {
                        message: "Valor é obrigatório",
                        validator: function (value) {
                            return value !== undefined && value !== "";
                        }
                    }
                },
                { name: "promocional", title: "Promocional", type: "checkbox", visible: true, filtering: false, editing: true, inserting: true, align: "center" },
                { name: "valorPromocional", title: "Valor Promocional", type: "realField", filtering: false, inserting: true, editing: true },
                { name: "dataPromocao", title: "Data Promoção", type: "date", visible: true, filtering: false, inserting: true, editing: true },
                { name: "dataCadastro", title: "Data Cadastro", type: "date", visible: true, filtering: false, inserting: false, editing: false },
                { name: "ativo", title: "Ativo", type: "checkbox", visible: true, filtering: false, inserting: true }
            ],
            controller: {
                loadData: function (filter) {
                    var d = $.Deferred();

                    $.post({
                        url: "/Plano/Listar",
                        data: {
                            pageIndex: filter.pageIndex,
                            pageSize: filter.pageSize,
                            nome: filter.nome
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                    });

                    return d.promise();
                },
                insertItem: function (plano) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Plano/Inserir",
                        data: { plano }
                    }).done(function (response) {
                        if (response === null) {
                            planosGrid = insertFailed = true;
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
                },
                updateItem: function (plano) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Plano/Atualizar",
                        data: { plano }
                    }).done(function (response) {
                        if (response === null) {
                            planosGrid.updateFailed = true;
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
                },
                deleteItem: function (plano) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Plano/Excluir",
                        data: { plano }
                    }).done(function (response) {
                        if (response === null) {
                            planosGrid.deleteFailed = true;
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
        $('#planos').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
            if (event.which === 13) {
                $("#planos").jsGrid("updateItem");
            }
        });
    }

});