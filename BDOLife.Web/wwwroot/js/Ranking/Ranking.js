var tabela;



$(document).ready(function () {
    Tabelas();
    Eventos();


    $.fn.dataTable.ext.type.order["prata-asc"] = function (x, y) {
        let xv = parseInt(Inputmask.unmask(x, { alias: "prata" }));
        let yv = parseInt(Inputmask.unmask(y, { alias: "prata" }));

        return ((xv < yv) ? -1 : ((xv > yv) ? 1 : 0));
    };

    $.fn.dataTable.ext.type.order["prata-desc"] = function (x, y) {
        let xv = parseInt(Inputmask.unmask(x, { alias: "prata" }));
        let yv = parseInt(Inputmask.unmask(y, { alias: "prata" }));

        return ((xv < yv) ? 1 : ((xv > yv) ? -1 : 0));
    };

    function Tabelas() {

        tabela = $('#ranking').DataTable({
            "paging": false,
            "ordering": true,
            "info": false,
            "searching": false,
            "fixedHeader": false,
            "language": {
                "url": "/lib/datatablejs/i18n/Portuguese-Brasil.json"
            },
            "responsive": true,
            "processing": true,
            //"serverSide": true,
            "ajax": {
                "url": '/Ranking/Processar',
                "type": 'POST',
                //"data": {
                //    maestriaId: 100
                //}
            },
            "initComplete": function (settings, json) {

                $('.receita-item').hover(function () {

                    let nomeItem = $(this).attr('data-nome');
                    let valorUnitario = Inputmask.format(`${$(this).attr('data-valor')}`, { alias: "prata" });
                    let dataAtualizacao = $(this).attr('data-atualizado');
                    let quantidadeDisponivel = Inputmask.format(`${$(this).attr('data-disponivel')}`, { alias: "prata" });

                    $(this).popover({
                        title: nomeItem,
                        html: true,
                        content: `<p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}<p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>`,
                        trigger: 'hover',
                        placement: 'right'
                    }).popover('show');
                });
            },
            "columnDefs": [
                {
                    targets: 0,
                    className: 'dt-body-center'
                },
                {
                    targets: -1,
                    type: "prata"
                }
            ],
            "columns": [
                {
                    "data": "img",
                    "render": function (data, type, row) {

                        //$('.receita-item').hover(function () {

                        //    let nomeItem = row.receita;
                        //    let valorUnitario = Inputmask.format(`${row.valor}`, { alias: "prata" });
                        //    let dataAtualizacao = row.dataAtualizacao;
                        //    let quantidadeDisponivel = Inputmask.format(`${row.quantidadeDisponivel}`, { alias: "prata" });

                        //    $(this).popover({
                        //        title: nomeItem,
                        //        html: true,
                        //        content: `<p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}<p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>`,
                        //        trigger: 'hover',
                        //        placement: 'right'
                        //    }).popover('show');
                        //});

                        return data;
                    }
                },
                { "data": "receita" },
                {
                    "data": "valor",
                    "type": "prata",
                    "render": function (data) {
                        return Inputmask.format(`${data}`, { alias: "prata" })
                    }
                },
                { "data": "oferta" },
                { "data": "demanda" },
                { "data": "valorizacao" },
                {
                    "data": "lucro",
                    "type": "prata",
                    "render": function (data) {
                        return Inputmask.format(`${data}`, { alias: "prata" })
                    }
                },
                { "data": "subItensInline" }
            ]
        });

       

        //tabela.on('responsive-resize', function (e, datatable, columns) {
        //    var count = columns.reduce(function (a, b) {
        //        return b === false ? a + 1 : a;
        //    }, 0);

        //    //$("body").off("hover", ".receita-item")


        //    //$('.receita-item').hover(function () {

        //    //    let nomeItem = row.receita;
        //    //    let valorUnitario = Inputmask.format(`${row.valor}`, { alias: "prata" });
        //    //    let dataAtualizacao = row.dataAtualizacao;
        //    //    let quantidadeDisponivel = Inputmask.format(`${row.quantidadeDisponivel}`, { alias: "prata" });

        //    //    $(this).popover({
        //    //        title: nomeItem,
        //    //        html: true,
        //    //        content: `<p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}<p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>`,
        //    //        trigger: 'hover',
        //    //        placement: 'right'
        //    //    }).popover('show');
        //    //});
        //});
    }


    function Eventos() {

    }

});