$(document).ready(function () {
    Tabelas();
    Eventos();
    Select2();

    function Select2() {
        $('#horasOnlineDia').select2({
            placeholder: 'Selecione a quantidade de horas',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });


        $('#tipoCerca').select2({
            placeholder: 'Selecione o tipo de cerca',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: false,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });
    }

    function Eventos() {
        $('#consultarForm').on('submit', function (e) {
            e.preventDefault();
            $("#cultivosGrid").jsGrid("_resetSorting");
            $("#cultivosGrid").jsGrid("loadData");

            //let totalSlots = parseInt($('#totalSlots').val());

            //let taxaForragemSementeMagicaBreed = 0.25;
            //let taxaFrutasSementeMagicaBreed = 0.75;
            //let taxaSementesSementeMagicaBreed = 1.55;

            //let totalSementeMagica = totalSlots / 5;

            //let totalNovasSementesPorCicloMercado = totalSementeMagica / taxaSementesSementeMagicaBreed;
            //let totalForragemPorCicloMercado = taxaForragemSementeMagicaBreed * totalNovasSementesPorCicloMercado;
            //var totalFrutasPorCicloMercado = taxaFrutasSementeMagicaBreed * totalNovasSementesPorCicloMercado;
        });

        $('#tipoCerca').on('change', function () {
            let tipoCerca = parseInt($(this).val());
            let quantidadeCercas = parseInt($('#quantidadeCercas').val());
            let total = tipoCerca * quantidadeCercas;
            $('#totalSlots').val(total);
        });

        $('#quantidadeCercas').on('keyup', function () {
            let tipoCerca = parseInt($('#tipoCerca').val());
            let quantidadeCercas = parseInt($(this).val());
            let total = tipoCerca * quantidadeCercas;
            $('#totalSlots').val(total);
        })

    }


    function Tabelas() {

        window.db = {};

        //db.frutos = [
        //    { Nome: "", Id: "" },
        //    { Nome: "Fruta da Chama Carmesim", Id: "M_5201" },
        //    { Nome: "Fruta de Encantamento", Id: "M_5209" },
        //    { Nome: "Fruto da Natureza", Id: "M_5205" },
        //    { Nome: "Fruto da Abundância", Id: "M_5203" },
        //    { Nome: "Fruto do Poder Mágico", Id: "M_5211" },
        //    { Nome: "Fruta do Sol", Id: "M_5207" },
        //];

        db.frutos = [
            { Nome: "", Id: "" },
            { Nome: "Fruta de Chama Carmesim", Id: "Fruta de Chama Carmesim" },
            { Nome: "Fruta de Encantamento", Id: "Fruta de Encantamento" },
            { Nome: "Fruto da Natureza", Id: "Fruto da Natureza" },
            { Nome: "Fruto da Abundância", Id: "Fruto da Abundância" },
            { Nome: "Fruto do Poder Mágico", Id: "Fruto do Poder Mágico" },
            { Nome: "Fruta do Sol", Id: "Fruta do Sol" },
        ];

        $('#cultivosGrid').jsGrid({
            width: "100%",
            inserting: false,
            editing: true,
            sorting: true,
            paging: false,
            filtering: true,
            autoload: false,
            selecting: false,
            pageLoading: false,
            confirmDeleting: false,
            onItemUpdated: function (args) {
                $("#cultivosGrid").jsGrid("refresh");
            },
            onRefreshed: function (args) {
                //var items = args.grid.option("data");

                //var total = { Id: "", Img: "", Item: "", QuantidadeTotal: 0, PrecoMarket: 0, PrecoTotal: 0, IsTotal: true };

                //items.forEach(function (item) {
                //    let preco = 0;
                //    let quantidade = 0;

                //    if (typeof item.precoMarket === 'string')
                //        preco = parseInt(Inputmask.unmask(item.precoMarket, { alias: "prata" }))
                //    else
                //        preco = item.precoMarket;

                //    if (item.produzirOuComprar === "PRODUZIR")
                //        preco = parseInt(Inputmask.unmask(`${item.custoProducao}`, { alias: "prata" }))

                //    if (typeof item.quantidadeTotal === 'string')
                //        quantidade = parseInt(Inputmask.unmask(item.quantidadeTotal, { alias: "prata" }))
                //    else
                //        quantidade = item.quantidadeTotal;

                //    if (item.ignorar === false) {
                //        total.PrecoTotal += (quantidade * preco);
                //    }
                //});

                //var $totalRow = $("<tr>").addClass("total-row");

                //args.grid._renderCells($totalRow, total);

                //args.grid._content.append($totalRow);

                //$('.receita-image').hover(function () {

                //    let nomeItem = $(this).attr('data-nome');
                //    let valorUnitario = Inputmask.format(`${$(this).attr('data-valor')}`, { alias: "prata" });
                //    let dataAtualizacao = $(this).attr('data-atualizacao');
                //    let quantidadeDisponivel = Inputmask.format(`${$(this).attr('data-quantidadeDisponivel')}`, { alias: "prata" });
                //    let vendeNPC = $(this).attr('data-npc');
                //    let valorNPC = $(this).attr('data-valor-npc');
                //    let localNPC = $(this).attr('data-local-npc');

                //    let disponivel = $(this).attr('data-disponivel');

                //    let npcContent = '';
                //    if (vendeNPC === "true" && valorNPC !== null) {

                //        npcContent = '<p class="text-center">VENDIDO NO NPC:</p>';
                //        if (localNPC !== null && localNPC !== "") {
                //            let locais = localNPC.split('|');
                //            locais.forEach(function (value, index) {
                //                npcContent += `${value}`;
                //            });
                //        }
                //        //let valorFormatado = Inputmask.format(`${valorNPC}`, { alias: "prata" });
                //        //npcContent += `<p>VALOR: ${valorFormatado}</p>`;
                //    }

                //    $(this).popover({
                //        title: nomeItem,
                //        html: true,
                //        content: `<p>Qtd. Disponível no Mercado: ${quantidadeDisponivel}</p> <p>Valor Unitário: ${valorUnitario}</p> <p>Atualizado em: ${dataAtualizacao}</p>${npcContent}`,
                //        trigger: 'hover',
                //        placement: 'right'
                //    }).popover('show');
                //});
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
                    itemTemplate: function (value, item) {
                        if (item.img !== null && item.img !== undefined && item.img !== "") {
                            return `<img class="receita-image" src="${item.img}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "colheita", title: "Colheita", type: "text", width: 100, editing: false, inserting: false, autosearch: true, align: 'center',
                },
                {
                    name: "imgFruta",
                    align: "center",
                    title: "",
                    width: 80,
                    editing: false,
                    inserting: false,
                    itemTemplate: function (value, item) {
                        if (item.imgFruta !== null && item.imgFruta !== undefined && item.imgFruta !== "") {
                            return `<img class="receita-image" src="${item.imgFruta}" style="max-width: 44px;"/>`;
                        }
                        return `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=" style="max-width: 44px;"/>`;
                    }
                },
                {
                    name: "fruta", type: "select", items: db.frutos, valueField: "Id", textField: "Nome", title: "Fruto", width: 100, editing: false, inserting: false, autosearch: true, align: 'center',
                },
                {
                    name: "precoSementeMagica", type: "prataField", title: "Valor Semente", width: 115, editing: false, inserting: false, filtering: false, autosearch: true, align: 'center',
                },
                {
                    name: "tempoMinimoEmMinutos", type: "number", title: "Crescimento", width: 100, editing: false, inserting: false, filtering: false, align: 'center',
                    itemTemplate: function (value, item) {
                        let horas = Math.trunc(value / 60);
                        let minutos = value % 60;
                        return `${horas}h e ${minutos}m`
                    },

                },
                //{
                //    name: "tempoMinimo", type: "text", title: "Crescimento", width: 100, editing: false, inserting: false, filtering: false, align: 'center', visible: false,
                //    itemTemplate: function (value, item) {
                //        return Inputmask.format(`${value}`, { alias: "prata" });
                //    },

                //},
                {
                    name: "ciclosPorDia", type: "number", title: "Colheitas", width: 115, editing: false, inserting: false, filtering: false, align: 'center',
                },
                {
                    name: "regiao", type: "text", title: "Região", width: 100, editing: false, inserting: false, autosearch: true, align: 'center',
                },
                {
                    name: "lucroMercado", type: "prataField", title: "Lucro Mercado", width: 120, editing: false, inserting: false, filtering: false, align: 'center',
                    itemTemplate: function (value, item) {
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    },
                    //headerTemplate: function () {
                    //    return $(`<th class="custo-producao-tooltip">${this.title}</th>`);
                    //},
                },
                {
                    name: "lucroNPC", type: "prataField", title: "Lucro NPC", width: 115, editing: false, inserting: false, filtering: false, align: 'center',
                    itemTemplate: function (value, item) {
                        return Inputmask.format(`${value}`, { alias: "prata" });
                    },
                },
                {
                    name: "quantidadeForragensMercado", type: "number", title: "Forragens (M)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    name: "quantidadeFrutosMercado", type: "number", title: "Frutos (M)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    name: "quantidadePlantaEspecial", type: "number", title: "Especiais (M)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    name: "quantidadeForragensNPC", type: "number", title: "Forragens (N)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    name: "quantidadeFrutosNPC", type: "number", title: "Frutos (N)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    name: "quantidadeSementesMagicas", type: "number", title: "Mágicas (N)", width: 110, editing: false, inserting: false, autosearch: true, filtering: false, align: 'center',
                },
                {
                    type: "control",
                    deleteButton: false,
                    editButton: false,
                    itemTemplate: function (value, item) {
                        var $result = jsGrid.fields.control.prototype.itemTemplate.apply(this, arguments);
                        return $result;
                    }
                }
            ],
            controller: {
                loadData: function (filter) {
                    BlockElement("#consultarForm");
                    var d = $.Deferred();

                    $.post({
                        url: "/Cultivo/Calcular",
                        data: {
                            horasOnlineDia: $('#horasOnlineDia').val() === "" ? 0 : parseInt($('#horasOnlineDia').val()),
                            maximoColheitaDia: $('#maxColheitas').val() === "" ? 20 : $('#maxColheitas').val(),
                            totalSlots: $('#totalSlots').val(),
                        },
                        dataType: "json"
                    }).done(function (response) {
                        for (var prop in filter) {
                            if (typeof (filter[prop]) === "string" && filter[prop].length > 0) {
                                response = $.grep(response, function (item) {
                                    var regexp = new RegExp(filter[prop], 'gi');
                                    if (typeof (item[prop]) === "string" && item[prop].match(regexp)) {
                                        return item;
                                    }
                                });
                                break;
                            }
                        }

                        d.resolve(response);
                        UnblockElement("#consultarForm");
                    });

                    return d.promise();
                }
            }
        });
    }


});