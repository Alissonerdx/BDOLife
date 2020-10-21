$(document).ready(function () {
    Tour();

    function Tour() {
        const tour = new Shepherd.Tour({
            useModalOverlay: true,
            defaultStepOptions: {
                cancelIcon: {
                    enabled: true
                },
                classes: 'shadow-md bg-purple-dark',
                scrollTo: {
                    behavior: 'smooth',
                    block: 'center'
                }
            },

        });

        tour.on('complete', () => {
            setCookie('tour-imperial-disabled', true);
        });

        //tour.on('show', () => {


        //});

        let steps = [
            {
                text: '<p>Selecione o tipo de imperial.</p>',
                attachTo: {
                    element: '#select2-profissao-container',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Selecione o nível de profissão para listar as caixas de imperial.</p>',
                attachTo: {
                    element: '#select2-nivelProfissao-container',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Selecione sua maestria. Se a sua maestria for um número quebrado (Ex: 495) você deve selecionar um valor anterior que seja múltiplo de 50 (Ex: Selecione 450 e não 500).</p>',
                attachTo: {
                    element: '#select2-maestriaSelect-container',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Digite os seus pontos de contribuição. A partir dos pontos de contribuição é possível calcular a quantidade de caixas de imperial que você pode entregar por dia.</p>',
                attachTo: {
                    element: '#pontosContribuicao',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Essa é a quantidade de caixas de imperial que você pode entregar por dia (Qtd. Contribuição / 2).</p>',
                attachTo: {
                    element: '#quantidadeEntregas',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Preencheu todos os campos anteriores? Agora é só clicar em Filtrar. :)</p> ',
                attachTo: {
                    element: '#btnFiltrar',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p>Nesse campo você pode ordenar as colunas como preferir. Funciona assim, selecione a coluna que deseja organizar (Ex: Item), clique em ordenar e a tabela vai ser exibida por ordem alfabética A-Z. Clique novamente no botão ordenar e a tabela será exibida na ordem Z-A.</p> ',
                attachTo: {
                    element: '#select2-ordenarPor-container',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Próximo',
                        action: tour.next
                    }
                ]
            },
            {
                text: '<p><b>Caixa: </b>Nome da Caixa do imperial (Quantidade necessária do item para fazer cada caixa)</p>' +
                    '<p><b>Item:</b> O item necessário para fazer a caixa. Quando a imagem está apagada, quer dizer que o item está INDISPONÍVEL para compra no mercado.</p>' +
                    '<p><b>Subitens:</b> São os ingredientes necessários para fazer o item (Só são considerados ingredientes de grade branca). Quando a imagem está apagada, quer dizer que o item está INDISPONÍVEL para compra no mercado.</p>' +
                    '<p><b>Valor (+Bonus Maestria):</b> É o valor da caixa com base na maestria selecionada (quanto maior a maestria maior será o lucro por caixa).</p>' +
                    '<p><b>Lucro Bruto/Dia:</b> É o lucro obtido ao entregar todas as caixas no imperial por dia, com base no valor (maestria).</p>' +
                    '<p><b>Custo de Compra (Item):</b> É o custo do mercado ao comprar todos os itens necessários para empacotar a quantidade de caixas por dia.</p>' +
                    '<p><b>Custo de Compra (Subitens):</b> É o custo do mercado ao comprar todos os ingredientes necessários para fazer as caixas. Esse custo está diretamente ligado ao proc normal da maestria selecionada. Quando está escrito INDISPONÍVEL quer dizer que não existem ingredientes para fazer o item (normalmente quando é item especial).</p>' +
                    '<p><b>Lucro Liq. (Item):</b> É o lucro bruto subtraindo o Custo de Compra (Item).</p>' +
                    '<p><b>Lucro Liq. (Subitens):</b> É o lucro bruto subtraindo o Custo de Compra (Subitens).</p>',
                attachTo: {
                    element: '#imperialGrid',
                    on: 'bottom'
                },
                classes: 'tour-modal',
                buttons: [
                    {
                        text: 'Anterior',
                        action: tour.back
                    },
                    {
                        text: 'Fechar e não mostrar novamente',
                        action: tour.complete
                    }
                ],

            }
        ]

        tour.addSteps(steps);

        let cookie = getCookie('tour-imperial-disabled');
        if (cookie === null)
            tour.start();
    }
})