$(document).ready(function () {
    Selects();

    function Selects() {
        $('#receitaSelect').select2({
            placeholder: 'Selecione a receita',
            language: "pt-BR",
            width: '100%',
            //templateResult: function (d) { return $(d.text); },
            //templateSelection: function (d) { return $(d.text); },
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });
    }

});