$(document).ready(function () {
    Tabelas();
    Eventos();
    Selects();

    function Selects() {
        $('#nodePartidaSelect').select2({
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState
        });

        $('#nodeDepositoSelect').select2({
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState
        });
    }
   

    function Tabelas() {
        let itensRequisito = [];
        let itensRecompensa = [];
        let nodes = [];

        $.post('/Permuta/Listas', function (response) {
            itensRequisito = response.itens;
            itensRecompensa = response.itens;
            nodes = response.nodes;

            nodes.forEach(function (element) {
                let option1 = new Option(element.text, element.id, false, false);
                let option2 = new Option(element.text, element.id, false, false);
                $('#nodePartidaSelect').append(option1);
                $('#nodeDepositoSelect').append(option2);
            });

            if ($('#permutador') !== undefined) {
                itensGrid = $('#permutador').jsGrid({
                    width: "100%",
                    inserting: true,
                    editing: true,
                    selecting: false,
                    filtering: true,
                    confirmDeleting: false,
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
                            name: "node", title: "Node", type: 'select2', width: 100, editing: true, inserting: true, filtering: true, autosearch: true,
                            items: nodes,
                            valueField: "id",
                            textField: "text",
                            validate: {
                                message: "Node é obrigatório",
                                validator: function (value) {
                                    return value !== "" && value > 0;
                                }
                            }
                        },
                        {
                            name: "quantidadeTrocas", title: "Qtd. Trocas", type: "quantidadeField", editing: true, width: 80, inserting: true, filtering: true, autosearch: true,
                            validate: {
                                message: "Qtd. Trocas é obrigatório",
                                validator: function (value) {
                                    return value !== undefined && value > 0;
                                }
                            }
                        },
                        {
                            name: "requisito", title: "Requisito", type: "select2", editing: true, width: 100, inserting: true, filtering: true, autosearch: true, items: itensRequisito,
                            valueField: "id",
                            textField: "text",
                            imgField: 'img',
                            validate: {
                                message: "Requisito é obrigatório",
                                validator: function (value) {
                                    return value !== "";
                                }
                            }
                        },
                        {
                            name: "quantidadeRequisito", title: "Qtd. Requisito", type: "quantidadeField", editing: true, width: 80, inserting: true, filtering: true, autosearch: true,
                            validate: {
                                message: "Qtd. Requisito é obrigatório",
                                validator: function (value) {
                                    return value !== undefined && value > 0;
                                }
                            }
                        },
                        {
                            name: "recompensa", title: "Recompensa", type: "select2", width: 100, editing: true, inserting: true, filtering: true, autosearch: true, items: itensRecompensa,
                            valueField: "id",
                            textField: "text",
                            imgField: 'img',
                            validate: {
                                message: "Recompensa é obrigatória",
                                validator: function (value) {
                                    return value !== "";
                                }
                            }
                        },
                        {
                            name: "quantidadeRecompensa", title: "Qtd. Recompensa", type: "quantidadeField", editing: true, width: 80, inserting: true, filtering: true, autosearch: true,
                            validate: {
                                message: "Qtd. Recompensa é obrigatório",
                                validator: function (value) {
                                    return value !== undefined && value > 0;
                                }
                            }
                        },
                        {
                            name: "barganhaRequerida", title: "Barganha Requerida", type: "quantidadeField", editing: true, width: 80, inserting: true, filtering: true, autosearch: true,
                            //validate: {
                            //    message: "Barganha Requerida é obrigatória",
                            //    validator: function (value) {
                            //        return value !== undefined && value > 0;
                            //    }
                            //}
                        }
                    ]
                });

                $('#itens').off().on('keydown', 'input[type=text], input[type=number], select', (event) => {
                    if (event.which === 13) {
                        $("#itens").jsGrid("updateItem");
                    }
                });
            }
        });
    }

    function Eventos() {
        $('#btn-otimizar').click(function (e) {
            let valido = true;
            let mensagensValidacao = [];

            if ($('#barganha').val() === 0 || $('#barganha').val() === "") {
                valido = false;
                mensagensValidacao.push("Barganha Disponivel");
            }

            if ($('#peso').val() === 0 || $('#peso').val() === "") {
                valido = false;
                mensagensValidacao.push("Peso Disponivel");
            }

            if ($('#nodePartidaSelect').val() === "" || $('#nodePartidaSelect').val() === null) {
                valido = false;
                mensagensValidacao.push("Node de Partida");
            }

            if ($('#nodeDepositoSelect').val() === "" || $('#nodeDepositoSelect').val() === null) {
                valido = false;
                mensagensValidacao.push("Node de Depósito");
            }

            if (valido) {
                $.post('/Permuta/Otimizar', {
                    BarganhaDisponivel: $('#barganha').val(),
                    PesoDisponivel: $('#peso').val(),
                    NodeOrigem: $('#nodePartidaSelect').val(),
                    NodeDeposito: $('#nodeDepositoSelect').val(),
                    Permutas: $("#permutador").jsGrid("option", "data")
                }, function (data) {
                    
                });
            }
            else {
                let mensagemGeral = mensagensValidacao.join("<br>");
                iziToast.error({
                    title: 'Campos Requeridos',
                    message: mensagemGeral,
                    position: 'topCenter'
                });
            }
        });
    }
});