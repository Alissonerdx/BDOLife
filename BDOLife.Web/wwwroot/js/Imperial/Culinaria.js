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

        $('#nivelProfissao').select2({
            placeholder: 'Selecione o nivel da profissão',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $('#maestriaSelect').select2({
            placeholder: 'Selecione a maestria (Culinária)',
            language: "pt-BR",
            width: '100%',
            allowClear: true,
            ajax: {
                url: "/Maestria/SelectMaestriasCulinaria",
                type: "GET",
                data: function (params) {
                    var query = {
                        search: params.term,
                        page: params.page || 1,
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
            inserting: false,
            editing: true,
            sorting: false,
            paging: false,
            autoload: false,
            selecting: false,
            pageLoading: false,
            confirmDeleting: false,
            filtering: false,
            //onItemUpdated: function (args) {
            //    $("#ingredientesGrid").jsGrid("refresh");
            //},
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
                        content: `<p>Qtd. Necessária (Empacotar): ${quantidadeEmpacotar}</p> <p>Qtd. Disponível: ~ ${quantidadeDisponivel}</p> <p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>`,
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
                    title: "",
                    width: 80,
                    filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.imgItem !== null && item.imgItem !== undefined && item.imgItem !== "") {
                            return `${item.imgItem}`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "item", title: "Item", type: "text", width: 160, editing: false, inserting: false, filtering: true, autosearch: true,
                },
                {
                    name: "subItensInline", title: "Sub-Itens", type: "text", align: "center", width: 200, editing: false, inserting: false, filtering: true, autosearch: true,
                },
                {
                    name: "valor", type: "prataField", title: "Valor (Maestria)", width: 180, editing: false, inserting: false, filtering: false
                },
                {
                    name: "lucroBrutoPorDia", type: "prataField", title: "Lucro Bruto/Dia", width: 180, editing: false, inserting: false, filtering: false
                },
                {
                    name: "custoComprandoPrimaria", type: "prataField", title: "Custo de Compra (Item)", width: 200, editing: false, inserting: false, filtering: false
                },
                {
                    name: "custoComprandoSecundarias", type: "prataField", title: "Custo de Compra (Sub-itens)", width: 200, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (value === 0)
                            return "INDISPONÍVEL";

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
                    name: "lucroLiquidoSecundaria", type: "text", title: "Lucro Liq. (Sub-itens)", width: 180, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.possuiSubItens === false)
                            return "";

                        if (value < 0)
                            return `-${Inputmask.format(`${value}`, { alias: "prata" })}`;

                        return Inputmask.format(`${value}`, { alias: "prata" });
                    }
                },
                {
                    name: "disponibilidadePrimaria", type: "text", title: "Disp. Compra (Item)", width: 180, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (value === 0)
                            return "INDISPONÍVEL";

                        return "DISPONÍVEL";
                    }
                },
                {
                    name: "disponibilidadesSecundarias", type: "number", title: "% Disp. Compra (Sub-Itens)", align: "left", width: 180, editing: false, inserting: false, filtering: false,
                    itemTemplate: function (value, item) {
                        if (item.possuiSubItens === false)
                            return "";

                        return value;
                    }
                },
            ],
            controller: {
                loadData: function () {
                    BlockElement("#consultarForm");

                    var d = $.Deferred();

                    $.post({
                        url: "/Imperial/CaixasCulinaria",
                        data: {
                            nivel: $('#nivelProfissao').val(),
                            maestriaId: $('#maestriaSelect').val() ,
                            contribuicao: parseInt($('#pontosContribuicao').inputmask('unmaskedvalue'))
                        },
                        dataType: "json"
                    }).done(function (response) {

                        console.log(response);
                        d.resolve(response);
                        UnblockElement("#consultarForm");
                        //UnblockElement("#ingredientes");
                    });

                    return d.promise();
                }
            }
        });
    }


});