var graficoResultado1;
var graficoResultado2;

$(document).ready(function () {
    //Graficos();
});


function CarregarGraficos() {


    if (graficoResultado1 !== undefined && graficoResultado1 !== null) {
        graficoResultado1.destroy();
    }

    if (graficoResultado2 !== undefined && graficoResultado2 !== null) {
        graficoResultado2.destroy();
    }

    $.post('/Receita/DadosGrafico', { receitaReferenciaId: $('#receitaSelect').val() }, function (data) {

        if (data.graficoItemNormal !== null) {

            $('#graficoItemNormal').show();

            $('#nomeResultadoNormal').html('');
            $('#nomeResultadoNormal').html(data.graficoItemNormal.nomeItem);

            $('#porcentagemCrescimentoDemandaNormal').html('');
            $('#porcentagemCrescimentoDemandaNormal').html(`${data.graficoItemNormal.crescimentoProcura.toFixed(2)}%`);

            $('#porcentagemCrescimentoOfertaNormal').html('');
            $('#porcentagemCrescimentoOfertaNormal').html(`${data.graficoItemNormal.crescimentoOferta.toFixed(2)}%`);

            $('#porcentagemCrescimentoPrecoNormal').html('');
            $('#porcentagemCrescimentoPrecoNormal').html(`${data.graficoItemNormal.crescimentoPreco.toFixed(2)}%`);

            $('#porcentagemCrescimentoDemandaNormalBar').attr('style', `width: ${data.graficoItemNormal.crescimentoProcura.toFixed(2)}%`);

            let crescimentoProcura = data.graficoItemNormal.crescimentoProcura.toFixed(2);

            if (crescimentoProcura > 0) {
                $('#porcentagemCrescimentoDemandaNormalSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoDemandaNormalBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoProcura < 0) {
                $('#porcentagemCrescimentoDemandaNormalSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoDemandaNormalBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoDemandaNormalSeta').attr('class', '');
                $('#porcentagemCrescimentoDemandaNormalBar').attr('class', '');
            }

            $('#porcentagemCrescimentoOfertaNormalBar').attr('style', `width: ${data.graficoItemNormal.crescimentoOferta.toFixed(2)}%`);

            let crescimentoOferta = data.graficoItemNormal.crescimentoOferta.toFixed(2);

            if (crescimentoOferta > 0) {
                $('#porcentagemCrescimentoOfertaNormalSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoOfertaNormalBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoOferta < 0) {
                $('#porcentagemCrescimentoOfertaNormalSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoOfertaNormalBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoOfertaNormalSeta').attr('class', '');
                $('#porcentagemCrescimentoOfertaNormalBar').attr('class', '');
            }

            $('#porcentagemCrescimentoPrecoNormalBar').attr('style', `width: ${data.graficoItemNormal.crescimentoPreco.toFixed(2)}%`);

            let crescimentoPreco = data.graficoItemNormal.crescimentoPreco.toFixed(2);

            if (crescimentoPreco > 0) {
                $('#porcentagemCrescimentoPrecoNormalSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoPrecoNormalBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoPreco < 0) {
                $('#porcentagemCrescimentoPrecoNormalSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoPrecoNormalBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoPrecoNormalSeta').attr('class', '');
                $('#porcentagemCrescimentoPrecoNormalBar').attr('class', '');
            }

            $('#imagemResultadoNormal').attr('src', data.graficoItemNormal.imagemItem);

            graficoResultado1 = new Chart($("#grafico-resultado-1"), {
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
                data: data.graficoItemNormal
            });
        }
        else {
            $('#graficoItemNormal').hide();
        }

        if (data.graficoItemRaro !== null) {

            $('#graficoItemRaro').show();

            $('#nomeResultadoRaro').html('');
            $('#nomeResultadoRaro').html(data.graficoItemRaro.nomeItem);

            $('#porcentagemCrescimentoDemandaRaro').html('');
            $('#porcentagemCrescimentoDemandaRaro').html(`${data.graficoItemRaro.crescimentoProcura.toFixed(2)}%`);

            $('#porcentagemCrescimentoOfertaRaro').html('');
            $('#porcentagemCrescimentoOfertaRaro').html(`${data.graficoItemRaro.crescimentoOferta.toFixed(2)}%`);

            $('#porcentagemCrescimentoPrecoRaro').html('');
            $('#porcentagemCrescimentoPrecoRaro').html(`${data.graficoItemRaro.crescimentoPreco.toFixed(2)}%`);

            $('#porcentagemCrescimentoDemandaRaroBar').attr('style', `width: ${data.graficoItemRaro.crescimentoProcura.toFixed(2)}%`);

            let crescimentoProcura = data.graficoItemRaro.crescimentoProcura.toFixed(2);

            if (crescimentoProcura > 0) {
                $('#porcentagemCrescimentoDemandaRaroSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoDemandaRaroBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoProcura < 0) {
                $('#porcentagemCrescimentoDemandaRaroSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoDemandaRaroBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoDemandaRaroSeta').attr('class', '');
                $('#porcentagemCrescimentoDemandaRaroBar').attr('class', '');
            }

            $('#porcentagemCrescimentoOfertaRaroBar').attr('style', `width: ${data.graficoItemRaro.crescimentoOferta.toFixed(2)}%`);

            let crescimentoOferta = data.graficoItemRaro.crescimentoOferta.toFixed(2);
            if (crescimentoOferta > 0) {
                $('#porcentagemCrescimentoOfertaRaroSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoOfertaRaroBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoOferta < 0) {
                $('#porcentagemCrescimentoOfertaRaroSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoOfertaRaroBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoOfertaRaroSeta').attr('class', '');
                $('#porcentagemCrescimentoOfertaRaroBar').attr('class', '');
            }

            $('#porcentagemCrescimentoPrecoRaroBar').attr('style', `width: ${data.graficoItemRaro.crescimentoPreco.toFixed(2)}%`);

            let crescimentoPreco = data.graficoItemRaro.crescimentoPreco.toFixed(2);

            if (crescimentoPreco > 0) {
                $('#porcentagemCrescimentoPrecoRaroSeta').attr('class', 'ft-arrow-up success');
                $('#porcentagemCrescimentoPrecoRaroBar').attr('class', 'progress-bar bg-success');
            }
            else if (crescimentoPreco < 0) {
                $('#porcentagemCrescimentoPrecoRaroSeta').attr('class', 'ft-arrow-down danger');
                $('#porcentagemCrescimentoPrecoRaroBar').attr('class', 'progress-bar bg-danger');
            }
            else {
                $('#porcentagemCrescimentoPrecoRaroSeta').attr('class', '');
                $('#porcentagemCrescimentoPrecoRaroSeta').attr('class', '');
            }

            $('#imagemResultadoRaro').attr('src', data.graficoItemRaro.imagemItem);


            graficoResultado2 = new Chart($("#grafico-resultado-2"), {
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
                data: data.graficoItemRaro
            });
        }
        else {
            $('#graficoItemRaro').hide();
        }

    });


}