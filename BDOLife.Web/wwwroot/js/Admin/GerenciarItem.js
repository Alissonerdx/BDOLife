var itensGrid;

$(document).ready(function () {
    Tabelas();
    Eventos();

    function Eventos() {
        $("#filtroNome").keypress(function (event) {
            if (event.keyCode === 13) {
                itensGrid.setFilter('nome', 'like', $(this).val());
            }
        }); 
    }

    function Tabelas() {

        itensGrid = new Tabulator("#itensGrid", {
            ajaxURL: "/Admin/Itens", //ajax URL
            //ajaxParams: {}, //ajax parameters
            layout: "fitDataFill",
            responsiveLayout: "collapse",
            pagination: "local",
            paginationSize: 10,
            paginationSizeSelector: [10, 100, 1000],
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
                    title: "", field: "img",
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                { title: "Referencia", field: "referenciaId", formatter: "responsiveCollapse" },
                {
                    title: "Nome", field: "nome",
                    formatter: function (cell, formatterParams) {
                        let referenciaId = cell.getData().referenciaId;
                        return `<a href='/Admin/EditarItem?referenciaId=${referenciaId}' target="_blank">${cell.getValue()}</a>`;
                    }
                },
                { title: "Valor", field: "valor" },
                { title: "Tipo", field: "tipo" },
                { title: "Tipo de Receita", field: "tipoReceita" },
                { title: "Grupo", field: "grupo" },
                { title: "Proc Normal Excessao", field: "procNormalExcessao" },
                { title: "Proc Raro Excessao", field: "procRaroExcessao" },
                { title: "Data Att.", field: "dataAtualizacao" }
            ]
        });

        itensGrid.setLocale("pt-br");
    }
});