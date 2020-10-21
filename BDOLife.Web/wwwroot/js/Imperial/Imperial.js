$(document).ready(function () {
    Selects2();
    Tabelas();
    Eventos();
    Tooltips();


    function Tooltips() {
      
    }

    function Eventos() {
        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();

            $("#imperialGrid").jsGrid("loadData");
        });

        $("#sort").click(function () {
            var field = $("#ordenarPor").val();
            $("#imperialGrid").jsGrid("sort", field);
        });

        $('#pontosContribuicao').on('keyup', function () {
            let valor = parseInt($(this).val());
            let quantidadeCaixas = valor / 2;

            $('#quantidadeEntregas').val(quantidadeCaixas);
        });
    }

    function Selects2() {

        $('#ordenarPor').select2({
            placeholder: 'Ordernar por',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('#profissao').select2({
            placeholder: 'Selecione a profissão',
            language: "pt-BR",
            width: '100%',
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $('#profissao').change(function (e) {
            $('#maestriaSelect').val(null).trigger("change");
        });

        $('#nivelProfissao').select2({
            placeholder: 'Selecione o nivel da profissão',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $('#maestriaSelect').select2({
            placeholder: 'Selecione a maestria',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            ajax: {
                url: "/Maestria/SelectMaestrias",
                type: "GET",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1,
                        tipo: $('#profissao').val()
                    };

                    return query;
                },
                processResults: function (data) {
                    return data;
                },

            }
        });
    }

    function Tabelas() {
        $('#imperialGrid').jsGrid({
            width: "100%",
            //width: "auto",
            //height: "auto",
            inserting: false,
            editing: true,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            confirmDeleting: false,
            filtering: false,
            onRefreshed: function (args) {
                $('.receita-item').hover(function () {

                    let nomeItem = $(this).attr('data-nome');
                    let valorUnitario = Inputmask.format(`${$(this).attr('data-valor')}`, { alias: "prata" });
                    let quantidadeEmpacotar = Inputmask.format(`${$(this).attr('data-empacotar')}`, { alias: "prata" });
                    let dataAtualizacao = $(this).attr('data-atualizado');
                    let quantidadeDisponivel = Inputmask.format(`${$(this).attr('data-disponivel')}`, { alias: "prata" });

                    $(this).popover({
                        title: nomeItem,
                        html: true,
                        content: `<p>Qtd. Necessária (Empacotar): ${quantidadeEmpacotar}</p> <p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}</p> <p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>`,
                        trigger: 'hover',
                        placement: 'right'
                    }).popover('show');
                });
            },
            fields: [
                {
                    name: "id",
                    visible: false,
                },
                {
                    name: "img",
                    align: "center",
                    title: "",
                    width: 80,
                    filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "caixa", title: "Caixa", type: "text", width: 160, editing: false, inserting: false, filtering: false,
                },
                {
                    name: "imgItem",
                    align: "center",
                    title: "Disp. Item",
                    width: 100,
                    filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.imgItem !== null && item.imgItem !== undefined && item.imgItem !== "") {
                            return `${item.imgItem}`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    },
                    sorter: function (index1, index2) {
                        let value1 = $(index1).css('filter') === 'grayscale(100%)' ? 1 : 0;
                        let value2 = $(index2).css('filter') === 'grayscale(100%)' ? 1 : 0;

                        return value2 - value1;
                    }
                },
                {
                    name: "item", title: "Item", type: "text", width: 160, editing: false, inserting: false, filtering: true, autosearch: true,
                },
                {
                    name: "subItensInline", title: "Disp. Subitens", type: "text", align: "center", width: 200, editing: false, inserting: false, filtering: true, autosearch: true,
                    sorter: function (index1, index2) {

                        let imgs1 = $(index1).find('img');
                        let imgs2 = $(index2).find('img');

                        if (imgs1.length !== 0 && imgs2.length === 0)
                            return 1;

                        if (imgs1.length === 0 && imgs2.length !== 0)
                            return -1;

                        if (imgs1.length !== 0 && imgs2.length !== 0) {


                            let qtdIndex1 = 0;
                            let qtdTotal1 = imgs1.length;

                            imgs1.each(function (index, value) {
                                if ($(value).css('filter') !== 'grayscale(100%)')
                                    qtdIndex1++;
                            })

                            let qtdIndex2 = 0;
                            let qtdTotal2 = imgs2.length;

                            imgs2.each(function (index, value) {
                                if ($(value).css('filter') !== 'grayscale(100%)')
                                    qtdIndex2++;
                            })

                            qtdTotal1 -= qtdIndex1;
                            qtdTotal2 -= qtdIndex2;

                            return qtdTotal1 < qtdTotal2 ? 1 : -1;
                        }

                        return 0;
                    }
                },
                {
                    name: "valor", type: "prataField", title: "Valor (+Bonus Maestria)", width: 180, editing: false, inserting: false, filtering: false
                },
                {
                    name: "lucroBrutoPorDia", type: "prataField", title: "Lucro Bruto/Dia", width: 180, editing: false, inserting: false, filtering: false
                },
                {
                    name: "custoComprandoPrimaria", type: "prataField", title: "Custo de Compra (Item)", width: 180, editing: false, inserting: false, filtering: false
                },
                {
                    name: "custoComprandoSecundarias", type: "prataField", title: "Custo de Compra (Subitens)", width: 200, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (value === 0)
                            return "";

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "lucroLiquidoPrimaria", type: "text", title: "Lucro Liq. (Item)", width: 180, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (value < 0)
                            return `-${Inputmask.format(`${value}`, { alias: "prata" })}`;

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    },
                    sorter: function (index1, index2) {
                        return index1 - index2;
                    }
                },
                {
                    name: "lucroLiquidoSecundaria", type: "text", title: "Lucro Liq. (Subitens)", width: 180, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.possuiSubItens === false)
                            return "";

                        if (value < 0)
                            return `-${Inputmask.format(`${value}`, { alias: "prata" })}`;

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    },
                    sorter: function (index1, index2) {
                        return index1 - index2;
                    }
                },
                //{
                //    name: "disponibilidadePrimaria", type: "text", title: "Disp. Compra (Item)", width: 180, editing: false, inserting: false, filtering: false,
                //    itemTemplate: function (value, item) {
                //        if (value === 0)
                //            return "INDISPONÍVEL";

                //        return "DISPONÍVEL";
                //    }
                //},
                //{
                //    name: "disponibilidadesSecundarias", type: "number", title: "% Disp. Compra (Subitens)", align: "left", width: 180, editing: false, inserting: false, filtering: false,
                //    itemTemplate: function (value, item) {
                //        if (item.possuiSubItens === false)
                //            return "";

                //        return value;
                //    }
                //},
            ],
            controller: {
                loadData: function () {
                    BlockElement("#consultarForm");

                    var d = $.Deferred();

                    let profissao = parseInt($('#profissao').val());

                    if (profissao !== null && profissao !== 0 && profissao !== undefined) {

                        let url = `/Imperial/${(profissao === 1 ? 'CaixasAlquimia' : 'CaixasCulinaria')}`;

                        $.post({
                            url: url,
                            data: {
                                nivel: $('#nivelProfissao').val(),
                                maestriaId: $('#maestriaSelect').val(),
                                contribuicao: parseInt($('#pontosContribuicao').inputmask('unmaskedvalue'))
                            },
                            dataType: "json"
                        }).done(function (response) {

                            console.log(response);
                            d.resolve(response);
                            UnblockElement("#consultarForm");
                            //UnblockElement("#ingredientes");
                        });
                    }
                    else {
                        UnblockElement("#consultarForm");
                        d.resolve([]);
                    }

                    return d.promise();
                }
            }
        });
    }


});