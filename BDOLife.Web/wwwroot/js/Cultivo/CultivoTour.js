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
            setCookie('tour-cultivo-disabled', true);
        });

        let steps = [
            {
                text: '<p>Quantidade de horas disponível por dia para cultivo</p>',
                attachTo: {
                    element: '#select2-horasOnlineDia-container',
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
                text: '<p>Este campo só é funcional caso necessite limitar a quantidade de colheitas por dia (24 horas), ex: coleto 2 vezes no dia, então o valor deste campo deve ser 2, caso tenha disponibilidade de coletar a qualquer momento este campo deve ficar vazio!</p>',
                attachTo: {
                    element: '#maxColheitas',
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
                text: '<p>Neste campo deve ser selecionado qual é o tipo de cerca utilizado na fazenda, cada tipo de cerca fornece uma quantidade específica de slots para o plantio</p>',
                attachTo: {
                    element: '#select2-tipoCerca-container',
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
                text: '<p>Neste campo deve ser preenchido a quantidade total de cercas para serem utilizadas no plantio das sementes mágicas</p>',
                attachTo: {
                    element: '#quantidadeCercas',
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
                text: '<p>Este campo é o resultado da multiplicação da quantidade de slots do tipo da cerca selecionada com a quantidade total de cercas para o plantio.</p>' +
                '<p>Obs.: pode ser alterado para o valor que desejar</p>',
                attachTo: {
                    element: '#totalSlots',
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
                ]
            },
            //{
            //    text: '<p>Caso utilize o traje bordado de prata para cozinhar e o traje de maestria (loggia, manos...) para entrega imperial é possível configurar a maestria de entrega imperial clicando no ícone e selecionando a maestria e em seguida clicando em salvar.</p>' +
            //        '<p>Obs.: Está opção não é obrigatória, caso não selecione a maestria de entrega imperial será utilizado o bônus da maestria que foi selecionada na tela principal.</p>',
            //    attachTo: {
            //        element: '#configuracaoMaestriaIcone',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Proc normal é a proporção de produtos normais produzidos para cada 1 receita.</p> ' +
            //        '<p>Exemplo: Ao cozinhar 10 receitas são produzidos 25 produtos normais, com base nessas informações é possível determinar o proc normal de 2.5 (25/10 = 2.5)</p>' +
            //        '<p>Obs.: Quanto maior o proc normal, maior será a quantidade de produtos normais resultantes de cada 1 (uma) receita. O valor do proc normal  aumenta proporcionalmente ao valor da maestria.</p>',
            //    attachTo: {
            //        element: '#proc-normal',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Proc raro é a proporção de produtos especiais produzidos para cada 1 (uma) receita.</p> ' +
            //        '<p>Exemplo: Ao cozinhar 10 receitas são produzidos 3 produtos especiais, com base nessas informações é possível determinar o proc raro de 0.3 (3/10 = 0.3)</p>' +
            //        '<p>Obs.: Quanto maior o proc raro, maior será a quantidade de produtos especiais resultantes de cada 1 (uma) receita. O valor do proc raro aumenta proporcionalmente ao valor da maestria.</p>',
            //    attachTo: {
            //        element: '#proc-raro',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Preencheu todos os campos anteriores? Agora é só clicar em calcular. :)</p>' +
            //        '<p>Obs.: Dependendo da quantidade e tamanho das receitas, o cálculo pode demorar alguns segundos para ser processado. Tenha paciência!</p>',
            //    attachTo: {
            //        element: '#btnCalcular',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Lucro bruto é o valor total dos produtos (com base nos valores do mercado) sem descontar os custos dos ingredientes ou o desconto do pacote econômico.</p>' +
            //        '<p>Obs.: Calculado com base nas informações existentes na tabela de resultados.</p>',
            //    attachTo: {
            //        element: '#lucroBruto-card',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Custo total é o valor da somatória dos custos de compra dos ingredientes (com base nos valores do mercado).</p>' +
            //        '<p>Obs.: É possível ignorar a compra de um ingrediente ao marcar o campo “Ignorar”, na tabela de ingredientes. Ao ignorar um ingrediente, ele terá o custo subtraído do <b>Custo Total dos Ingredientes</b>. </p>',
            //    attachTo: {
            //        element: '#custoTotal-card',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Lucro com pacote econômico é o lucro obtido ao vender os produtos no mercado com o pacote econômico ativo no jogo, ou seja,  84.5% do lucro.</p>' +
            //        '<p>Lucro com pacote econômico = (Lucro Bruto - Custo Total dos Ingredientes) * 0.845 (84.5%)</p>',
            //    attachTo: {
            //        element: '#lucroComPctEconomico-card',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Lucro sem pacote econômico é o lucro obtido ao vender os produtos no mercado sem ter o pacote econômico ativo no jogo, ou seja, 65% do lucro.</p>' +
            //        '<p>Lucro sem pacote econômico = (Lucro Bruto - Custo Total dos Ingredientes) * 0.65 (65%)</p>',
            //    attachTo: {
            //        element: '#lucroSemPctEconomico-card',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Ingredientes são os itens à comprar que serão utilizados nas receitas e sub-receitas.</p>' +
            //        '<p>É possível realizar alterações nas quantidades e valores de cada ingrediente, e também, ignorar ingredientes quando não precisar comprar.</p>' +
            //        '<p>Obs.: Os valores dos ingredientes são atualizados constantemente de acordo com o mercado do jogo e precisam ser alterados manualmente caso estejam desatualizados.</p>',
            //    attachTo: {
            //        element: '#tab-ingredientes',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>Resultados são os produtos produzidos pela receita: Normal e Especial (quando aplicado).</p>' +
            //        '<p>É possível realizar alterações nas quantidades e valores de cada produto, e também, ignorar produtos quando não quiser calcular o valor de lucro para a venda no mercado.</p>' +
            //        '<p>Quando um produto final for ingrediente para <b>caixa imperial</b>, os valores serão calculados e exibidos de acordo com o bônus da sua maestria.</p>' +
            //        '<p>Obs.: Os valores dos produtos são atualizados constantemente de acordo com o mercado do jogo e precisam ser alterados manualmente caso estejam desatualizados.</p>',
            //    attachTo: {
            //        element: '#tab-resultados',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Próximo',
            //            action: tour.next
            //        }
            //    ]
            //},
            //{
            //    text: '<p>A árvore de ingredientes é gerada com base nos ingredientes das receitas e sub-receitas. O proc normal é utilizado para calcular as quantidades em todos os níveis.</p>' +
            //        '<p>Por padrão a árvore de ingredientes estará expandida. Ao fechar ou minimizar uma sub-receita, as quantidades dos ingredientes são subtraídos, fazendo com que a sub-receita seja adicionada à lista de ingredientes e o <b>Custo Total de Ingredientes</b> seja recalculado.</p>' +
            //        '<p>Obs.: Evite usar a busca após customizar a árvore de ingredientes. Devido as alterações, o sistema de pesquisa pode apresentar lentidão. Dependendo do tamanho da receita o botão Expandir Tudo pode apresentar travamento na tela.</p>',
            //    attachTo: {
            //        element: '#treeview-search',
            //        on: 'bottom'
            //    },
            //    classes: 'tour-modal',
            //    buttons: [
            //        {
            //            text: 'Anterior',
            //            action: tour.back
            //        },
            //        {
            //            text: 'Fechar e não mostrar novamente',
            //            action: tour.complete
            //        }
            //    ],

            //}
        ]

        tour.addSteps(steps);

        let cookie = getCookie('tour-cultivo-disabled');
        if (cookie === null)
            tour.start();
    }
});