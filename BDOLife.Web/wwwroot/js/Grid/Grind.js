var dropsGrid;

$(document).ready(function () {

    Tabelas();

    function Tabelas() {
        dropsGrid = new Tabulator("#dropsGrid", {
            layout: "fitDataFill",
            columns: [
                { title: "Item" },
                { title: "Quantidade" },
                { title: "Valor" },
                { title: "Total" }
            ]
        });
    }

});