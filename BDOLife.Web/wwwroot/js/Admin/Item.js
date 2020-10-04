var itensGrid;
var previousItem;

$(document).ready(function () {
    Tabelas();

    function Tabelas() {
        if ($('#itens') !== undefined) {
            itensGrid = $('#itens').jsGrid({
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
                            id: 'remover-item-question',
                            zindex: 999,
                            title: 'Remover item',
                            message: 'Deseja realmente remover o item (o item pode estar vinculado com alguma receita)?',
                            position: 'center',
                            buttons: [
                                ['<button><b>SIM</b></button>', function (instance, toast) {
                                    instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                    args.item.deleteConfirmed = true;
                                    $(itensGrid).jsGrid('deleteItem', args.item);
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
                                return `<img src="${item.img}" style="width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    {
                        name: "id", title: "Id", type: "number", visible: false
                    },
                    {
                        name: "referenciaId", title: "ID", type: "number", editing: false, width: 80, inserting: false, filtering: true, autosearch: true,
                        validate: {
                            message: "ReferenciaId é obrigatório",
                            validator: function (value) {
                                return value !== undefined && value > 0;
                            }
                        }
                    },
                    {
                        name: "nome", title: "Nome", type: "text", width: 200, editing: true, inserting: true, filtering: true, autosearch: true,
                        validate: {
                            message: "Nome é obrigatório",
                            validator: function (value) {
                                return value !== "";
                            }
                        }
                    },
                    { name: "imgUrl", type: "text", title: "Imagem Url", width: 100, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "peso", type: "text", title: "Peso", width: 50, align: "left", editing: true, inserting: true, filtering: false },
                    {
                        name: "tipo", type: "select", title: "Tipo", width: 80, align: "left", editing: true, inserting: true, filtering: false,
                        items: [
                            { tipo: "None", id: TIPO.None },
                            { tipo: "Item", id: TIPO.Item },
                            { tipo: "Material", id: TIPO.Material },
                            { tipo: "Receita", id: TIPO.Receita }
                        ],
                        valueField: "id",
                        textField: "tipo"
                    },
                    {
                        name: "grau", type: "select", title: "Grau", width: 80, align: "left", editing: true, inserting: true, filtering: false, items: [
                            { grau: "Branco", id: GRAU.Branco },
                            { grau: "Verde", id: GRAU.Verde },
                            { grau: "Azul", id: GRAU.Azul },
                            { grau: "Ouro", id: GRAU.Ouro },
                            { grau: "Laranja", id: GRAU.Laranja }
                        ],
                        valueField: "id",
                        textField: "grau"
                    },
                    { name: "experiencia", title: "Experiencia", type: "quantidadeField", width: 100, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "quantidadeDisponivel", type: "quantidadeField", title: "Qtd. Disponivel", width: 120, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "procNormalExcessao", type: "realField", title: "Proc. Normal Ex.", width: 120, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "procRaroExcessao", type: "realField", title: "Proc. Raro Ex.", width: 120, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "valor", type: "prataField", title: "Valor", width: 100, align: "left", editing: true, inserting: true, filtering: false },
                    { name: "dataAtualizacao", type: "text", title: "Ult. Atualização", width: 120, align: "center", editing: false, inserting: false, filtering: false }
                ],
                controller: {
                    loadData: function (filter) {
                        var d = $.Deferred();
                        $.post({
                            url: "/Item/Listar",
                            data: {
                                pageIndex: filter.pageIndex,
                                pageSize: filter.pageSize,
                                referenciaId: filter.referenciaId,
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
                            url: "/Item/Inserir",
                            data: { item }
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
                            url: "/Item/Atualizar",
                            data: { item }
                        }).done(function (response) {
                            if (response === null) {
                                itensGrid.updateFailed = true;
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
                    deleteItem: function (item) {
                        var d = $.Deferred();

                        $.ajax({
                            type: "POST",
                            dataType: "json",
                            url: "/Item/Excluir",
                            data: { item }
                        }).done(function (response) {
                            if (response === null) {
                                itensGrid.deleteFailed = true;
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

            $('#itens').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
                if (event.which === 13) {
                    $("#itens").jsGrid("updateItem");
                }
            });
        }
    }


});