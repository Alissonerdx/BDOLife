var permutaT1;

$(document).ready(function () {
    Tabela();

    function Tabela() {
        permutaT1 = new Handsontable($('#permuta-t1'), {
            colHeaders: [
                'Item',
                'Valor no Mercado',
                'Quantidade x1',
                'Quantidade x6',
                'Quantidade no Mercado',
                'Comprar',
                'Custo por 6(T1)',
            ],
        })
    }
});