var graficoPrecoQuantidade;

$(document).ready(function () {
    Rating();
    Graficos();
    Selects();
    Tabelas();

    function Rating() {
        //$.fn.raty.defaults.path = '../../../app-assets/images/raty/';
        //$('.rating').raty();
    }

    function Selects() {
        $('#item-select').select2({
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState,
            minimumInputLength: 3,
            ajax: {
                url: "/Item/Select",
                type: "POST",
                data: function (params) {
                    var query = {
                        search: params.term,
                        pageLimit: 30,
                        page: params.page || 1
                    };

                    return query;
                }
            }
        });
    }


    function Graficos() {
        GraficosPrecosEQuantidades();
    }

    function GraficosPrecosEQuantidades(itemId) {

        if (graficoPrecoQuantidade !== undefined && graficoPrecoQuantidade !== null) {
            graficoPrecoQuantidade.destroy();
        }

        BlockElement("#graficoHistoricoMercado");
        $.post('/Dashboard/GraficoPrecoItem', { referenciaId: itemId }, function (response) {

            if (response !== null && response !== undefined
                && response.crescimentoOferta !== null && response.crescimentoProcura !== null
                && response.crescimentoOferta !== undefined && response.crescimentoProcura !== undefined) {

                let oferta = parseFloat(response.crescimentoOferta).toFixed(2);
                let procura = parseFloat(response.crescimentoProcura).toFixed(2);
                let preco = parseFloat(response.crescimentoPreco).toFixed(2);

                if (response.melhorDataCompra !== null && response.melhorDataCompra !== "") {
                    $('#decisao-comprar').html(response.decisaoMercadoComprar);
                }
                else {
                    $('#decisao-comprar').html("");
                }

                if (response.decisaoMercadoVender !== null && response.decisaoMercadoVender !== "") {
                    $('#decisao-vender').html(response.decisaoMercadoVender);
                }
                else {
                    $('#decisao-vender').html("");
                }

                if (oferta !== 0) {
                    $('#item-oferta-div').removeClass('bg-warning');
                    $('#item-oferta-div').removeClass('bg-success');
                    $('#item-oferta-div').removeClass('bg-danger');
                    $('#item-oferta-span').removeClass('text-warning');
                    $('#item-oferta-span').removeClass('text-success');
                    $('#item-oferta-span').removeClass('text-danger');

                    if (oferta < 0) {
                        $('#item-oferta-div').addClass('bg-danger');
                        $('#item-oferta-span').addClass('text-danger');
                    }
                    else {
                        $('#item-oferta-div').addClass('bg-success');
                        $('#item-oferta-span').addClass('text-success');
                    }

                    $('#item-oferta-span').html(`${oferta}%`);
                    $('#item-oferta-div').attr('style', `width: ${oferta}%`);
                    $('#item-oferta-div').attr('aria-valuenow', `${oferta}`);
                }

                if (procura !== 0) {
                    $('#item-procura-div').removeClass('bg-warning');
                    $('#item-procura-div').removeClass('bg-success');
                    $('#item-procura-div').removeClass('bg-danger');
                    $('#item-procura-span').removeClass('text-warning');
                    $('#item-procura-span').removeClass('text-success');
                    $('#item-procura-span').removeClass('text-danger');

                    if (procura < 0) {
                        $('#item-procura-div').addClass('bg-danger');
                        $('#item-procura-span').addClass('text-danger');
                    }
                    else {
                        $('#item-procura-div').addClass('bg-success');
                        $('#item-procura-span').addClass('text-success');
                    }

                    $('#item-procura-span').html(`${procura}%`);
                    $('#item-procura-div').attr('style', `width: ${procura}%`);
                    $('#item-procura-div').attr('aria-valuenow', `${procura}`);

                }

                if (preco !== 0) {
                    $('#item-preco-div').removeClass('bg-warning');
                    $('#item-preco-div').removeClass('bg-success');
                    $('#item-preco-div').removeClass('bg-danger');
                    $('#item-preco-span').removeClass('text-warning');
                    $('#item-preco-span').removeClass('text-success');
                    $('#item-preco-span').removeClass('text-danger');

                    if (preco < 0) {
                        $('#item-preco-div').addClass('bg-danger');
                        $('#item-preco-span').addClass('text-danger');
                    }
                    else {
                        $('#item-preco-div').addClass('bg-success');
                        $('#item-preco-span').addClass('text-success');
                    }

                    $('#item-preco-span').html(`${preco}%`);
                    $('#item-preco-div').attr('style', `width: ${preco}%`);
                    $('#item-preco-div').attr('aria-valuenow', `${preco}`);

                }
            }



            UnblockElement("#graficoHistoricoMercado");
            graficoPrecoQuantidade = new Chart($("#grafico-preco-quantidade"), {
                type: 'line',
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    pointDotStrokeWidth: 4,
                    //legend: {
                    //    display: false,
                    //    labels: {
                    //        fontColor: '#FFF',
                    //        boxWidth: 10
                    //    },
                    //    position: 'top'
                    //},
                    hover: {
                        mode: 'label'
                    },
                    scales: {
                        xAxes: [{
                            display: true,
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    fontColor: "#000080",
                                }
                            },
                            //gridLines: {
                            //    color: "rgba(255,255,255, 0.3)",
                            //    drawTicks: false,
                            //    drawBorder: false
                            //},
                            scaleLabel: {
                                display: true,
                                labelString: 'Data'
                            }
                        }],
                        yAxes: [{
                            display: true,
                            legend: {
                                display: true,
                                position: 'top',
                                labels: {
                                    fontColor: "#000080",
                                }
                            },
                            //gridLines: {
                            //    color: "rgba(255,255,255, 0.3)",
                            //    drawTicks: false,
                            //    drawBorder: false
                            //},
                            //scaleLabel: {
                            //    display: true,
                            //    labelString: 'Preço Mínimo'
                            //}
                            //ticks: {
                            //    display: false,
                            //    min: 0,
                            //    max: 100000000,
                            //    maxTicksLimit: 1000
                            //}
                        }]
                    },
                    title: {
                        display: false,
                        text: 'Histórico de Preço/Quantidade'
                    }
                },
                data: response
            });
        });
    }

    $('#item-select').change(function (e) {
        GraficosPrecosEQuantidades($(this).val());
    });

    function Tabelas() {
        if ($('#rankingCulinariaTb') !== undefined) {
           
            $('#rankingCulinariaTb').jsGrid({
                width: "100%",
                inserting: false,
                editing: false,
                sorting: true,
                paging: false,
                autoload: true,
                selecting: false,
                pageLoading: false,
                fields: [
                    { name: "posicao", title: "Posição", type: "text", align: "center", width: 60, editing: false, inserting: false },
                    {
                        name: "img",
                        align: "center",
                        title: "",
                        width: 120,
                        itemTemplate: function (value, item) {
                            if (item.img !== null && item.img !== undefined && item.img !== "") {
                                return `<img src="${item.img}" style="max-width: 44px;"/>`;
                            }
                            return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                        }
                    },
                    { name: "receita", title: "Receita", type: "text", width: 120, editing: false, inserting: false },
                    { name: "custo", type: "prataNegativoField", title: "Custo Total", width: 120, editing: false, inserting: false },
                    { name: "lucroBruto", type: "prataNegativoField", title: "Lucro Bruto", width: 120, editing: false, inserting: false },
                    { name: "lucroLiquido", type: "prataNegativoField", title: "Lucro Líquido", width: 120, editing: false, inserting: false },
                    { name: "crescimentoOferta", type: "number", title: "Oferta %", width: 60, editing: false, inserting: false },
                    { name: "crescimentoProcura", type: "number", title: "Procura %", width: 60, editing: false, inserting: false },
                    { name: "crescimentoPreco", type: "number", title: "Preço %", width: 60, editing: false, inserting: false }
                ],
                controller: {
                    loadData: function () {

                        BlockElement($("#ranking-culinaria-container"));
                        var d = $.Deferred();

                        $.post({
                            url: "/Receita/RankingReceitasCulinariaPorMaestria",
                            data: {
                                maestria: $('#usuario-maestria-culinaria').val()
                            },
                            dataType: "json"
                        }).done(function (response) {
                            d.resolve(response);
                            UnblockElement($("#ranking-culinaria-container"));
                        });

                        return d.promise();
                    }
                }
            });
        }
    }

});