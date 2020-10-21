$(document).ready(function () {

    Selects2Alquimia();


    function Selects2Alquimia() {
        $('#maestriaSelect').select2({
            placeholder: 'Selecione a maestria (Alquimia)',
            language: "pt-BR",
            width: '100%',
            templateResult: formatState,
            templateSelection: formatState,
            allowClear: true,
            ajax: {
                url: "/Maestria/SelectMaestriasAlquimia",
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

        $('#configuracaoMaestria').iziModal({
            title: 'Configuração da Maestria',
            background: '#494C56',
            headerColor: '#33363F',
            radius: 20,
            top: 50,
            afterRender: function () {
                $('#maestriaImperialSelect').select2({
                    placeholder: 'Selecione a maestria (Entrega Imperial)',
                    language: "pt-BR",
                    width: '100%',
                    dropdownCssClass: "increasedzindexclass",
                    templateResult: formatState,
                    templateSelection: formatState,
                    allowClear: true,
                    ajax: {
                        url: "/Maestria/SelectMaestriasAlquimia",
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
            },
        });
    }


})