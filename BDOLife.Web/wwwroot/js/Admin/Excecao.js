var excecoesGrid;

$(document).ready(function () {
    Tabelas();

    function Tabelas() {
        if ($('#excecoes') !== undefined) {
            excecoesGrid = $('#excecoes').jsGrid({
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
                            id: 'remover-excecao',
                            zindex: 999,
                            title: 'Remover exceção',
                            message: 'Deseja realmente remover a exceção (a exceção pode ter vinculo com alguma receita)?',
                            position: 'center',
                            buttons: [
                                ['<button><b>SIM</b></button>', function (instance, toast) {
                                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                    args.item.deleteConfirmed = true;
                                    $(excecoesGrid).jsGrid('deleteItem', args.item);
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
                        name: "id", title: "Id", type: "number", visible: false
                    },
                    {
                        name: "descricao", title: "Descriçao", type: "text", editing: false, width: 120, inserting: true, filtering: true, autosearch: true,
                        validate: {
                            message: "Descriçao é obrigatória",
                            validator: function (value) {
                                return value !== undefined && value !== "";
                            }
                        }
                    },
                    {
                        name: "procNormal", title: "Proc Normal", type: "procField", width: 50, editing: true, inserting: true, filtering: false,
                        validate: {
                            message: "Proc Normal é obrigatório",
                            validator: function (value) {
                                return value !== "";
                            }
                        }
                    },
                    {
                        name: "procRaro", type: "procField", title: "Proc Raro", width: 50, align: "left", editing: true, inserting: true, filtering: false,
                        validate: {
                            message: "Proc Raro é obrigatório",
                            validator: function (value) {
                                return value !== "";
                            }
                        }
                    },
                    { name: "dataCadastro", type: "text", title: "Data de Cadastro", width: 50, align: "left", editing: false, inserting: false, filtering: false }
                ],
                controller: {
                    loadData: function (filter) {
                        var d = $.Deferred();
                        $.post({
                            url: "/Excecao/Listar",
                            data: {
                                pageIndex: filter.pageIndex,
                                pageSize: filter.pageSize,
                                bdoId: filter.bdoId,
                                nome: filter.nome
                            },
                            dataType: "json"
                        }).done(function (response) {
                            d.resolve(response);
                        });

                        return d.promise();
                    },
                    insertItem: function (item) {
                        var d = $.Deferred();

                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "/Excecao/Inserir",
                            data: { excecao: item }
                        }).done(function (response) {

                            if (response !== null) {
                                switch (response.tipoMensagem) {
                                    case 'sucesso':

                                        iziToast.success({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'inserir-item',
                                            zindex: 999,
                                            title: 'Sucesso ao Inserir',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        d.resolve(response);
                                        break;
                                    case 'erro':

                                        iziToast.error({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'inserir-item',
                                            zindex: 999,
                                            title: 'Erro ao Inserir',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        itensGrid.insertFailed = true;
                                        d.reject();

                                        break;
                                }
                            }

                            return d.promise();
                        }).fail(function () {
                            d.reject();
                        });

                        return d.promise();

                    },
                    updateItem: function (item) {
                        var d = $.Deferred();
                        item.valor = parseInt(Inputmask.unmask("" + item.valor, { alias: "prata" }));

                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "/Excecao/Atualizar",
                            data: { excecao: item }
                        }).done(function (response) {
                            if (response !== null) {
                                switch (response.tipoMensagem) {
                                    case 'sucesso':

                                        iziToast.success({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'atualizar-item',
                                            zindex: 999,
                                            title: 'Sucesso ao Atualizar',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        d.resolve(response);
                                        break;
                                    case 'erro':

                                        iziToast.error({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'atualizar-item',
                                            zindex: 999,
                                            title: 'Erro ao Atualizar',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        itensGrid.updateFailed = true;
                                        d.reject();

                                        break;
                                }
                            }

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
                            url: "/Excecao/Excluir",
                            data: { excecao: item }
                        }).done(function (response) {
                            if (response !== null) {
                                switch (response.tipoMensagem) {
                                    case 'sucesso':

                                        iziToast.success({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'excluir-item',
                                            zindex: 999,
                                            title: 'Sucesso ao Excluir',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        d.resolve(response);
                                        break;
                                    case 'erro':

                                        iziToast.error({
                                            timeout: 5000,
                                            close: true,
                                            overlay: false,
                                            displayMode: 'once',
                                            id: 'excluir-item',
                                            zindex: 999,
                                            title: 'Erro ao Excluir',
                                            message: response.mensagem,
                                            position: 'center'
                                        });

                                        itensGrid.deleteFailed = true;
                                        d.reject();

                                        break;
                                }
                            }

                            return d.promise();
                        }).fail(function () {
                            d.reject();
                        });

                        return d.promise();
                    }
                }
            });

            $('#excecoes').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
                if (event.which === 13) {
                    $("#excecoes").jsGrid("updateItem");
                }
            });
        }

    }

});
