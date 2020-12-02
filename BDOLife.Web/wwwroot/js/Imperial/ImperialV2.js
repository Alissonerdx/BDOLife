var imperialGrid;
var urlAjax;

$(document).ready(function () {
    Selects2();
    Tabelas();
    Eventos();
    Tooltips();
    Modals();


    function Modals() {
        $('#detalhes-receita').iziModal({
            title: 'Detalhes',
            background: '#494C56',
            headerColor: '#33363F',
            width: '60%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            afterRender: function () {
                //$('[name="AddIngrediente"]').keyup(function () {

                //    if ($(this).val().length() > 3) {

                //        $.ajax({
                //            type: "POST",
                //            url: "/Item/BuscarPorNome",
                //            data: { nome: $(this).val() },
                //            beforeSend: function () {
                //                $("#sugestao-ingrediente").css("background", "#FFF url(LoaderIcon.gif) no-repeat 165px");
                //            },
                //            success: function (data) {
                //                $("#sugestao-ingrediente").show();

                //                let html = "";

                //                console.log(data);

                //                //$("#sugestao-ingrediente").html(data);
                //                //$('[name="AddIngrediente"]').css("background", "#FFF");
                //            }
                //        });
                //    }
                //});
            }
        });
    }


    function Tooltips() {
      
    }

    function Eventos() {
        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();
            urlAjax = "";

            let profissao = parseInt($('#profissao').val());
            if (profissao !== null && profissao !== 0 && profissao !== undefined) {

                urlAjax = `/Imperial/${(profissao === 1 ? 'CaixasAlquimia' : 'CaixasCulinaria')}`;
            }

            imperialGrid.setData(urlAjax, {
                nivel: $('#nivelProfissao').val(),
                maestriaId: $('#maestriaSelect').val(),
                contribuicao: parseInt($('#pontosContribuicao').inputmask('unmaskedvalue'))
            });
            //$("#imperialGrid").jsGrid("loadData");
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

        $("#filtroNome").keypress(function (event) {
            if (event.keyCode === 13) {
                imperialGrid.setFilter('item', 'like', $(this).val());
            }
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
        //var rowMenu = [
        //    {
        //        label: "<i class='fas fa-check-square'></i> Abrir Receita",
        //        action: function (e, row) {
        //            row.select();

        //            //console.log(row.getData().tipoReceita);
        //            $('#detalhes-receita').iziModal('open');

        //            //if (row.getData().tipoReceita === "1") {
        //            //    console.log(`/Alquimia/Index?nomeReceita=${row.getData().item}`);
        //            //    window.open(`/Alquimia/Index?nomeReceita=${row.getData().item}`, '_blank');
        //            //}
                        

        //            //if (row.getData().tipoReceita === "2") {
        //            //    console.log(`/Alquimia/Index?nomeReceita=${row.getData().item}`);
        //            //    window.open(`/Culinaria/Index?nomeReceita=${row.getData().item}`, '_blank');
        //            //}
                       
        //        }
        //    },
        //    {
        //        separator: true,
        //    },
        //    //{
        //    //    label: "Admin Functions",
        //    //    menu: [
        //    //        {
        //    //            label: "<i class='fas fa-trash'></i> Delete Row",
        //    //            action: function (e, row) {
        //    //                row.delete();
        //    //            }
        //    //        },
        //    //        {
        //    //            label: "<i class='fas fa-ban'></i> Disabled Option",
        //    //            disabled: true,
        //    //        },
        //    //    ]
        //    //}
        //]


        imperialGrid = new Tabulator("#imperialGrid2", {
            ajaxURL: "",
            ajaxConfig: "post",
            ajaxParams: {
                nivel: $('#nivelProfissao').val(),
                maestriaId: $('#maestriaSelect').val(),
                contribuicao: parseInt($('#pontosContribuicao').inputmask('unmaskedvalue'))
            }, //ajax parameters
            virtualDomBuffer: 30000,
            dataLoaded: function (data) {
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
            //scrollVertical: function (left) {
            //    console.log(left);
            //    //left - the current horizontal scroll position
            //},
            ajaxResponse: function (url, params, response) {
                $('#mais-lucrativa-item').html('');
                $('#mais-lucrativa-subitem').html('');
                $('#peso-disponivel-necessario').html('')
                $('#mais-lucrativa-item-img').html('');
                $('#mais-lucrativa-subitem-img').html('');

                if (response.maisLucrativaItem !== null) {
                    let lucroLiquidoItem = Inputmask.format(`${response.maisLucrativaItem.lucroLiquidoPrimaria}`, { alias: "prata" });

                    let img = $(response.maisLucrativaItem.imgItem);
                    img.css({ 'filter': 'grayscale(0%)', 'opacity': '100%', 'max-width': '44px' });

                    $('#mais-lucrativa-item').html(`${response.maisLucrativaItem.item} (${(response.maisLucrativaItem.lucroLiquidoPrimaria < 0 ? `-${lucroLiquidoItem}` : `${lucroLiquidoItem}`)})`);
                    $('#mais-lucrativa-item-img').html(img);
                }

                if (response.maisLucrativaSubitens !== null) {
                    let lucroLiquidoSubItens = Inputmask.format(`${response.maisLucrativaSubitens.lucroLiquidoSecundaria}`, { alias: "prata" });

                    let img = $(response.maisLucrativaSubitens.imgItem);
                    img.css({'filter': 'grayscale(0%)', 'opacity': '100%', 'max-width': '44px'});

                    $('#mais-lucrativa-subitem').html(`${response.maisLucrativaSubitens.item} (${(response.maisLucrativaSubitens.lucroLiquidoSecundaria < 0 ? `-${lucroLiquidoSubItens}` : `${lucroLiquidoSubItens}`) })`);
                    $('#mais-lucrativa-subitem-img').html(img);
                }

                let quantidadeCaixas = $('#quantidadeEntregas').val();
                if (quantidadeCaixas !== "")
                    $('#peso-disponivel-necessario').html(Inputmask.format(`${parseInt(quantidadeCaixas) * 50.0}`, { alias: "prata" }) + ' LT');

                return response.data;
            },
            layout: "fitDataFill",
            height: 600,
            resizableRows: true,
            responsiveLayout: "collapse",
            //rowContextMenu: rowMenu,
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
                    "ajax": {
                        "loading": "Carregando", //ajax loader text
                        "error": "Erro", //ajax error text
                    },
                },
            },
            columns: [
                {
                    formatter: "rowSelection", titleFormatter: "rowSelection", hozAlign: "center", headerSort: false, cellClick: function (e, cell) {
                        cell.getRow().toggleSelect();
                    }
                },
                { title: "", field: "id", visible: false },
                { title: "", field: "tipoReceita", visible: false },
                {
                    title: "", field: "img", formatter: "responsiveCollapse", hozAlign: "center", responsive: 3,
                    formatter: function (cell, formatterParams) {
                        return `<img src='${cell.getValue()}' style="max-width: 24px;"/>`;
                    }
                },
                { title: "Caixa", field: "caixa", responsive: 3 },
                {
                    title: "Disp. Item", field: "imgItem", hozAlign: "center", responsive: 0,
                    formatter: function (cell, formatterParams) {
                        if (cell.getValue() !== null && cell.getValue() !== undefined && cell.getValue() !== "") {
                            return `${cell.getValue()}`;
                        }

                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;

                    },
                    sorter: function (a, b, aRow, bRow, column, dir, sorterParams) {
                        let value1 = $(a).css('filter') === 'grayscale(100%)' ? 1 : 0;
                        let value2 = $(b).css('filter') === 'grayscale(100%)' ? 1 : 0;

                        return value2 - value1;
                    },
                },
                { title: "Item", field: "item" },
                {
                    title: "Disp. Subitens", field: "subItensInline", hozAlign: "center",
                    formatter: function (cell, formatterParams) {
                        if (cell.getValue() !== null && cell.getValue() !== undefined && cell.getValue() !== "") {
                            return `<td>${cell.getValue()}</td>`;
                        }

                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;

                    },
                    sorter: function (a, b, aRow, bRow, column, dir, sorterParams) {
                        let imgs1 = $(a).find('img');
                        let imgs2 = $(b).find('img');

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
                    },
                },
                {
                    title: "Valor (+Bonus Maestria)", field: "valor", responsive: 2,
                    formatter: function (cell, formatterParams) {
                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                },
                {
                    title: "Lucro Bruto/Dia", field: "lucroBrutoPorDia", formatter: function (cell, formatterParams) {
                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                },
                {
                    title: "Custo de Compra (Item)", field: "custoComprandoPrimaria", responsive: 0, formatter: function (cell, formatterParams) {
                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                },
                {
                    title: "Custo de Compra (Subitens)", field: "custoComprandoSecundarias", responsive: 0,
                    formatter: function (cell, formatterParams) {
                        if(cell.getValue() === 0)
                            return "";

                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                },
                {
                    title: "Lucro Liq. (Item)", field: "lucroLiquidoPrimaria", responsive: 0,
                    formatter: function (cell, formatterParams) {
                        if (cell.getValue() < 0)
                            return `-${Inputmask.format(`${cell.getValue()}`, { alias: "prata" })}`;

                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                },
                {
                    title: "Lucro Liq. (Subitens)", field: "lucroLiquidoSecundaria", responsive: 0,
                    formatter: function (cell, formatterParams) {
                        if (cell.getValue() < 0)
                            return `-${Inputmask.format(`${cell.getValue()}`, { alias: "prata" })}`;

                        return Inputmask.format(`${cell.getValue()}`, { alias: "prata" });
                    }
                }
            ]
        });

        imperialGrid.setLocale("pt-br");
    }


});