$(document).ready(function () {
    Tabelas();
    Modals();

    function Tabelas() {
        $('#rankingReceitasGrid').DataTable();
    }

    function Modals() {
        $('#rankingReceitas').iziModal({
            title: 'Ranking de Receitas',
            background: '#494C56',
            headerColor: '#33363F',
            width: '80%',
            radius: 20,
            top: 200,
            closeOnEscape: false,
            overlayClose: false,
            onOpening: function () {
                
            },
            afterRender: function () {

                
            }
        });
    }
});


function AbrirRankingReceitas() {
    $('#rankingReceitas').iziModal('open');
}