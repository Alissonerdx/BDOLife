var ingredientesGrid;
var resultadosGrid;

$(document).ready(function () {
    Tabelas();
    Eventos();
    Selects();
    Mascaras();
    Modals();


    function Modals() {
        $('#add-ingrediente-modal').iziModal({
            title: 'Adicionar Ingrediente',
            background: '#494C56',
            headerColor: '#33363F',
            width: '60%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            afterRender: function () {
                $('[name="AddIngrediente"]').keyup(function () {

                    if ($(this).val().length() > 3) {

                        $.ajax({
                            type: "POST",
                            url: "/Item/BuscarPorNome",
                            data: { nome: $(this).val() },
                            beforeSend: function () {
                                $("#sugestao-ingrediente").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                            },
                            success: function (data) {
                                $("#sugestao-ingrediente").show();

                                let html = "";

                                console.log(data);

                                //$("#sugestao-ingrediente").html(data);
                                //$('[name="AddIngrediente"]').css("background", "#FFF");
                            }
                        });
                    }
                });
            }
        });

        //$('#add-ingrediente-modal').iziModal({
        //    title: 'Adicionar Ingrediente',
        //    background: '#494C56',
        //    headerColor: '#33363F',
        //    width: '60%',
        //    radius: 20,
        //    top: 200,
        //    closeOnEscape: false,
        //    overlayClose: false
        //});
    }

    function Mascaras() {
        $('[name="Valor"]').inputmask({
            alias: "prata",
            rightAlign: true
        });

        $('[name="ValorNPC"]').inputmask({
            alias: "prata",
            rightAlign: true
        });

        $('[name="Peso"]').inputmask({
            mask: "9[9][,99]",
            radixPoint: ",",
            greedy: false,
            clearIncomplete: true,
            showMaskOnHover: false,
            showMaskOnFocus: false,
            clearMaskOnLostFocus: true,
            autoclear: false,
            definitions: {
                '*': {
                    validator: "[0-9]"
                }
            },
            rightAlign: true
        });

        $('[name="QuantidadeDisponivel"]').inputmask({
            alias: "integer",
            allowMinus: false,
            mask: "9999999",
        });

        $('[name="ProcNormalExcessao"], [name="ProcRaroExcessao"]').inputmask({
            mask: "9[,99]",
            radixPoint: ",",
            greedy: false,
            clearIncomplete: true,
            showMaskOnHover: false,
            showMaskOnFocus: false,
            clearMaskOnLostFocus: true,
            autoclear: false,
            definitions: {
                '*': {
                    validator: "[0-9]"
                }
            },
            rightAlign: true
        });
    }

    function Selects() {
        $('[name="Tipo"]').select2({
            placeholder: 'Selecione o tipo',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('[name="TipoReceita"]').select2({
            placeholder: 'Selecione o tipo de receita',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('[name="Grau"]').select2({
            placeholder: 'Selecione o grau',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('[name="Adquirido"]').select2({
            placeholder: 'Selecione a forma de aquisição',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });
    }

    function Eventos() {
        $('#add-ingrediente').click(function () {
            //ingredientesGrid.addRow({
            //    img: "",
            //    itemReferenciaId: "",
            //    nome: "",
            //    quantidade: ""
            //});

            $('#add-ingrediente-modal').iziModal('open');
        });

        $('#add-resultado').click(function () {
            resultadosGrid.addRow({
                img: "",
                itemReferenciaId: "",
                nome: "",
                procRaro: "",
                procNormalExcessao: "",
                procRaroExcessao: ""
            });

        });

        $('#remover-ingrediente').click(function () {
            var selectedRows = ingredientesGrid.getSelectedRows();
            ingredientesGrid.deleteRow(selectedRows);
        });

        $('#remover-resultado').click(function () {
            var selectedRows = resultadosGrid.getSelectedRows();
            resultadosGrid.deleteRow(selectedRows);
        });



    }

    function Tabelas() {
        ingredientesGrid = new Tabulator("#ingredientesGrid", {
            ajaxURL: "/Admin/Ingredientes", //ajax URL
            ajaxParams: {
                referenciaId: $('#referenciaId').val()
            }, //ajax parameters
            layout: "fitDataFill",
            responsiveLayout: "collapse",
            //selectable: true,
            //groupBy: "tipo",
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
                },
            },
            columns: [
                {
                    formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    }
                },
                {
                    title: "", field: "img",
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                { title: "Referencia", field: "itemReferenciaId", formatter: "responsiveCollapse", editor: "input" },
                {
                    title: "Nome", field: "nome", editor: "input",
                    formatter: function (cell, formatterParams) {
                        let referenciaId = cell.getData().itemReferenciaId;
                        return `<a href='/Admin/EditarItem?referenciaId=${referenciaId}' target="_blank">${cell.getValue()}</a>`;
                    }
                },
                { title: "Quantidade", field: "quantidade", editor: "input" },
            ]
        });

        ingredientesGrid.setLocale("pt-br");

        resultadosGrid = new Tabulator("#resultadosGrid", {
            ajaxURL: "/Admin/Resultados", //ajax URL
            ajaxParams: {
                referenciaId: $('#referenciaId').val()
            }, //ajax parameters
            layout: "fitDataFill",
            responsiveLayout: "collapse",
            //selectable: true,
            //groupBy: "tipo",
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
                },
            },
            columns: [
                {
                    formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    }
                },
                {
                    title: "", field: "img",
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                { title: "Referencia", field: "itemReferenciaId", formatter: "responsiveCollapse" },
                {
                    title: "Nome", field: "nome",
                    formatter: function (cell, formatterParams) {
                        let referenciaId = cell.getData().itemReferenciaId;
                        return `<a href='/Admin/EditarItem?referenciaId=${referenciaId}' target="_blank">${cell.getValue()}</a>`;
                    }
                },
                { title: "Proc Raro", field: "procRaro" },
                { title: "Proc Normal Excessão", field: "procNormalExcessao" },
                { title: "Proc Raro Excessão", field: "procRaroExcessao" },
            ]
        });

        resultadosGrid.setLocale("pt-br");

    }
});