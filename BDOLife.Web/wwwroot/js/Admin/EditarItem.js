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
                $('[name="AddIngrediente"]').select2({
                    placeholder: 'Selecione a ingrediente',
                    language: "pt-BR",
                    minimumInputLength: 2,
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    allowClear: true,
                    quietMillis: 100,
                    ajax: {
                        url: '/Item/BuscarPorNome',
                        type: "POST",
                        data: function (params) {
                            var query = {
                                nome: params.term,
                            };

                            return query;
                        },
                        processResults: function (data) {
                            return { results: data };
                        },

                    },
                    cache: true,
                    escapeMarkup: function (m) { return m; }
                });

                $('#btnAdicionarIngrediente').click(function () {

                    let ingredienteSelecionado = $('[name="AddIngrediente"]').select2('data')[0];
                    let quantidade = $('[name="QtdIngrediente"]').val();

                    if (ingredienteSelecionado !== null &&
                        ingredienteSelecionado !== undefined &&
                        ingredienteSelecionado !== "" &&
                        ingredienteSelecionado.id !== "" &&
                        quantidade !== null &&
                        quantidade !== undefined &&
                        quantidade !== "") {

                        ingredientesGrid.addRow({
                            img: `/Content/Image?referenciaId=${ingredienteSelecionado.id}`,
                            itemReferenciaId: ingredienteSelecionado.id,
                            nome: ingredienteSelecionado.nome,
                            quantidade: parseInt(quantidade)
                        });
                    }
                    else {
                        iziToast.error({
                            zindex: 99999999,
                            overlay: true,
                            position: 'topCenter',
                            color: 'red',
                            title: 'Inválido!',
                            message: 'Selecione o resultado e preencha a quantidade',
                        });
                    }
                });
            },
            onOpened: function () {
                $('[name="AddIngrediente"]').val(null).trigger('change');
                $('[name="QtdIngrediente"]').val("");
            }
        });


        $('#add-resultado-modal').iziModal({
            title: 'Adicionar Resultado',
            background: '#494C56',
            headerColor: '#33363F',
            width: '60%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            afterRender: function () {
                $('[name="AddResultado"]').select2({
                    placeholder: 'Selecione a resultado',
                    language: "pt-BR",
                    minimumInputLength: 2   ,
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    allowClear: true,
                    quietMillis: 100,
                    ajax: {
                        url: '/Item/BuscarPorNome',
                        type: "POST",
                        data: function (params) {
                            var query = {
                                nome: params.term,
                            };

                            return query;
                        },
                        processResults: function (data) {
                            return { results: data };
                        },

                    },
                    cache: true,
                    escapeMarkup: function (m) { return m; }
                });

                $('#btnAdicionarResultado').click(function () {

                    let resultadoSelecionado = $('[name="AddResultado"]').select2('data')[0];
                    let procRaro = $('[name="ProcRaroResultado"]').select2('data')[0];

                    if (resultadoSelecionado !== null &&
                        resultadoSelecionado !== undefined &&
                        resultadoSelecionado !== "" &&
                        resultadoSelecionado.id !== "" &&
                        procRaro !== null &&
                        procRaro !== undefined &&
                        procRaro !== "") {

                        resultadosGrid.addRow({
                            img: `/Content/Image?referenciaId=${resultadoSelecionado.id}`,
                            itemReferenciaId: resultadoSelecionado.id,
                            nome: resultadoSelecionado.nome,
                            procRaro: procRaro.id,
                        });
                    }
                    else {
                        iziToast.error({
                            zindex: 99999999,
                            overlay: true,
                            position: 'topCenter',
                            color: 'red',
                            title: 'Inválido!',
                            message: 'Selecione o resultado',
                        });
                    }
                });


                $('[name="ProcRaroResultado"]').select2({
                    placeholder: 'Selecione',
                    language: "pt-BR",
                    width: '100%',
                    allowClear: true,
                    cacheDataSource: [],
                    escapeMarkup: function (m) { return m; },
                });
            },
            onOpened: function () {
                $('[name="AddResultado"]').val(null).trigger('change');
                $('[name="ProcRaroResultado"]').val(null).trigger('change');
            }
        });
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

        $('[name="Excluido"]').select2({
            //placeholder: 'Selecione',
            language: "pt-BR",
            width: '100%',
            //allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });
    }

    function Eventos() {
        $('#add-ingrediente').click(function () {
            $('#add-ingrediente-modal').iziModal('open');
        });

        $('#add-resultado').click(function () {
            $('#add-resultado-modal').iziModal('open');
        });

        $('#remover-ingrediente').click(function () {
            var selectedRows = ingredientesGrid.getSelectedRows();
            ingredientesGrid.deleteRow(selectedRows);
        });

        $('#remover-resultado').click(function () {
            var selectedRows = resultadosGrid.getSelectedRows();
            resultadosGrid.deleteRow(selectedRows);
        });

        $('#editarItemForm').on('submit', function (e) {
            e.preventDefault();

            let data = new FormData(this);

            data.set("Valor", $('[name="Valor"]').val().replace(".", ""))

            let ingredientes = ingredientesGrid.getData();
            let resultados = resultadosGrid.getData();

            for (var i = 0; i < ingredientes.length; i++) {
                data.append(`Itens[${i}].ItemReferenciaId`, ingredientes[i].itemReferenciaId)
                data.append(`Itens[${i}].Quantidade`, ingredientes[i].quantidade);
            }

            for (var i = 0; i < resultados.length; i++) {
                data.append(`Resultados[${i}].ResultadoReferenciaId`, resultados[i].itemReferenciaId)
                data.append(`Resultados[${i}].ProcRaro`, resultados[i].procRaro === "NÃO" ? false : true);
            }


            $.ajax({
                url: '/Item/Atualizar',
                type: "POST",
                data: data,
                processData: false,
                cache: false,
                contentType: false,
                success: function (data) {
                    if (data.sucesso === true) {
                        iziToast.success({
                            zindex: 99999999,
                            overlay: true,
                            position: 'topCenter',
                            color: 'green',
                            title: 'Sucesso!',
                            message: data.mensagem,
                        });
                    }
                    else {
                        iziToast.error({
                            zindex: 99999999,
                            overlay: true,
                            position: 'topCenter',
                            color: 'red',
                            title: 'Erro!',
                            message: data.mensagem,
                        });
                    }
                },
                error: function (request, status, error) {
                    alert(request.responseText);
                }
            });
        });

        $('[name="Tipo"], [name="TipoReceita"]').change(function () {
            let referencia = "";
            let bdoId = $('#bdoId').val();

            switch ($('[name="Tipo"]').val()) {
                case "1":
                    referencia += "I_";
                    break;
                case "2":
                    referencia += "M_";
                    break;
                case "3":
                    referencia += "R_";
                    break;
                case "0":
                    referencia += "N_";
                    break;
            }

            switch ($('[name="TipoReceita"]').val()) {
                case "1":
                    referencia += "A_";
                    break;
                case "2":
                    referencia += "C_";
                    break;
                case "3":
                    referencia += "PAS_";
                    break;
                case "4":
                    referencia += "PAI_";
                    break;
                case "5":
                    referencia += "PAQ_";
                    break;
                case "6":
                    referencia += "PCH_";
                    break;
                case "7":
                    referencia += "PCO_";
                    break;
                case "8":
                    referencia += "PCS_";
                    break;
                case "9":
                    referencia += "PCI_";
                    break;
                case "10":
                    referencia += "PDE_";
                    break;
                case "11":
                    referencia += "PFA_";
                    break;
                case "12":
                    referencia += "PFG_";
                    break;
                case "13":
                    referencia += "PFI_";
                    break;
                case "14":
                    referencia += "PMO_";
                    break;
            }

            referencia += bdoId;
            $('[name="ReferenciaId"]').val(referencia);
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
            langs: TabulatorLanguage,
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
            langs: TabulatorLanguage,
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
                //{ title: "Proc Normal Excessão", field: "procNormalExcessao" },
                //{ title: "Proc Raro Excessão", field: "procRaroExcessao" },
            ]
        });

        resultadosGrid.setLocale("pt-br");

    }
});