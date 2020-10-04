var usuariosGrid;
var previousItem;

var perfisAcessos = [
    { Name: "Administrador", Id: 0 },
    { Name: "Usuário", Id: 1 },
    { Name: "Visitante", Id: 2 },
];

$(document).ready(function () {
    Grids();

    function Grids() {

        usuariosGrid = $('#usuarios').jsGrid({
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
                        id: 'remover-usuarios-question',
                        zindex: 999,
                        title: 'Remover usuário',
                        message: 'Deseja realmente remover o usuário?',
                        position: 'center',
                        buttons: [
                            ['<button><b>SIM</b></button>', function (instance, toast) {
                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');
                                args.item.deleteConfirmed = true;
                                $(usuariosGrid).jsGrid('deleteItem', args.item);
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
                    name: "apelido", title: "Apelido", type: "text", visible: true, filtering: true, inserting: true,
                    validate: {
                        message: "Apelido é obrigatório",
                        validator: function (value) {
                            return value !== undefined && value !== "";
                        }
                    }
                },
                {
                    name: "email", title: "E-mail", type: "text", visible: true, filtering: true, inserting: true,
                    validate: {
                        message: "E-mail é obrigatório",
                        validator: function (value) {
                            return value !== undefined && value !== "";
                        }
                    }
                },
                { name: "dataCadastro", title: "Data Cadastro", type: "text", visible: true, filtering: false, editing: false, align: "center", inserting: false },
                { name: "dataValidade", title: "Data Validade", type: "text", visible: true, filtering: false, editing: false, align: "center", inserting: false },
                { name: "dataUltimoAcesso", title: "Data Último Acesso", type: "text", visible: true, filtering: false, editing: false, align: "center", inserting: false },
                { name: "perfilAcesso", title: "Perfil de Acesso", type: "select", items: perfisAcessos, valueField: "Id", textField: "Name", filtering: false, inserting: true },
                { name: "plano", title: "Plano", type: "text", visible: true, filtering: false, inserting: true },
                { name: "bloqueado", title: "Bloqueado", type: "checkbox", visible: true, filtering: false }
            ],
            controller: {
                loadData: function (filter) {
                    var d = $.Deferred();

                    $.post({
                        url: "/Usuario/Listar",
                        data: {
                            pageIndex: filter.pageIndex,
                            pageSize: filter.pageSize,
                            nome: filter.nome,
                            apelido: filter.apelido,
                            email: filter.email
                        },
                        dataType: "json"
                    }).done(function (response) {
                        d.resolve(response);
                    });

                    return d.promise();
                },
                insertItem: function (usuario) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Usuario/Inserir",
                        data: { usuario }
                    }).done(function (response) {
                        if (response === null) {
                            usuariosGrid = insertFailed = true;
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
                updateItem: function (usuario) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Usuario/Atualizar",
                        data: { usuario }
                    }).done(function (response) {
                        if (response === null) {
                            usuariosGrid.updateFailed = true;
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
                deleteItem: function (usuario) {
                    var d = $.Deferred();

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/Usuario/Excluir",
                        data: { usuario }
                    }).done(function (response) {
                        if (response === null) {
                            usuariosGrid.deleteFailed = true;
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
        $('#usuarios').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
            if (event.which === 13) {
                $("#usuarios").jsGrid("updateItem");
            }
        });
    }

});