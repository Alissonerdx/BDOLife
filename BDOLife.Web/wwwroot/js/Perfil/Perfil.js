

$(document).ready(function () {
    Selects();
    Masks();
    Eventos();

    function Selects() {
        $('.maestria').select2({
            language: "pt-BR",
            width: '100%'
        });
    }

    function Eventos() {
        $('#maestria-culinaria').change(function () {
            $.ajax({
                "type": "POST",
                "url": "/Receita/Maestria",
                "data": {
                    maestria: $(this).val(),
                    tipo: 1
                },
                "success": function (data) {
                    if (data !== null) {
                        $('#proc-normal-culinaria').val(Inputmask.unmask("" + data.procNormal, { alias: "proc" }));
                        $('#proc-raro-culinaria').val(Inputmask.unmask("" + data.procRaro, { alias: "proc" }));
                        $('#bonus-imperial-culinaria').val(Inputmask.unmask("" + data.imperialBonus, { alias: "proc-2" }));

                    }
                }
            });
        });


        $('#maestria-alquimia').change(function () {
            $.ajax({
                "type": "POST",
                "url": "/Receita/Maestria",
                "data": {
                    maestria: $(this).val(),
                    tipo: 2
                },
                "success": function (data) {
                    if (data !== null) {
                        console.log(data);
                        $('#proc-normal-alquimia').val(Inputmask.unmask("" + data.procNormal, { alias: "proc" }));
                        $('#proc-raro-alquimia').val(Inputmask.unmask("" + data.procRaro, { alias: "proc" }));
                        $('#bonus-imperial-alquimia').val(Inputmask.unmask("" + data.imperialBonus, { alias: "proc-2" }));
                    }
                }
            });
        });
    }

    function Masks() {
        $('.quantidade').inputmask("integer");
        $('.decimal').inputmask({ alias: "proc" });
        $('.imperialbonus').inputmask({ alias: "proc-2" });
    }

});