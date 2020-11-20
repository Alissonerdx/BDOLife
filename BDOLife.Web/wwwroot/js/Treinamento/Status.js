$(document).ready(function () {

    Selects();

    function Selects() {

        let cavalos = [
            { "id": "1A", "text": "<span><img src='/Content/Cavalo?cavalo=1A' class='img-flag' /> 1A</span>", "img": "/Content/Cavalo?cavalo=1A" },
            { "id": "1B", "text": "<span><img src='/Content/Cavalo?cavalo=1B' class='img-flag' /> 1B</span>", "img": "/Content/Cavalo?cavalo=1B" },
            { "id": "2A", "text": "<span><img src='/Content/Cavalo?cavalo=2A' class='img-flag' /> 2A</span>", "img": "/Content/Cavalo?cavalo=2A" },
            { "id": "2B", "text": "<span><img src='/Content/Cavalo?cavalo=2B' class='img-flag' /> 2B</span>", "img": "/Content/Cavalo?cavalo=2B" },
            { "id": "2C", "text": "<span><img src='/Content/Cavalo?cavalo=2C' class='img-flag' /> 2C</span>", "img": "/Content/Cavalo?cavalo=2C" },
            { "id": "2D", "text": "<span><img src='/Content/Cavalo?cavalo=2D' class='img-flag' /> 2D</span>", "img": "/Content/Cavalo?cavalo=2D" },
            { "id": "3A", "text": "<span><img src='/Content/Cavalo?cavalo=3A' class='img-flag' /> 3A</span>", "img": "/Content/Cavalo?cavalo=3A" },
            { "id": "3B", "text": "<span><img src='/Content/Cavalo?cavalo=3B' class='img-flag' /> 3B</span>", "img": "/Content/Cavalo?cavalo=3B" },
            { "id": "3C", "text": "<span><img src='/Content/Cavalo?cavalo=3C' class='img-flag' /> 3C</span>", "img": "/Content/Cavalo?cavalo=3C" },
            { "id": "3D", "text": "<span><img src='/Content/Cavalo?cavalo=3D' class='img-flag' /> 3D</span>", "img": "/Content/Cavalo?cavalo=3D" },
            { "id": "3E", "text": "<span><img src='/Content/Cavalo?cavalo=3E' class='img-flag' /> 3E</span>", "img": "/Content/Cavalo?cavalo=3E" },
            { "id": "3F", "text": "<span><img src='/Content/Cavalo?cavalo=3F' class='img-flag' /> 3F</span>", "img": "/Content/Cavalo?cavalo=3F" },
            { "id": "4A", "text": "<span><img src='/Content/Cavalo?cavalo=4A' class='img-flag' /> 4A</span>", "img": "/Content/Cavalo?cavalo=4A" },
            { "id": "4B", "text": "<span><img src='/Content/Cavalo?cavalo=4B' class='img-flag' /> 4B</span>", "img": "/Content/Cavalo?cavalo=4B" },
            { "id": "4C", "text": "<span><img src='/Content/Cavalo?cavalo=4C' class='img-flag' /> 4C</span>", "img": "/Content/Cavalo?cavalo=4C" },
            { "id": "4D", "text": "<span><img src='/Content/Cavalo?cavalo=4D' class='img-flag' /> 4D</span>", "img": "/Content/Cavalo?cavalo=4D" },
            { "id": "4E", "text": "<span><img src='/Content/Cavalo?cavalo=4E' class='img-flag' /> 4E</span>", "img": "/Content/Cavalo?cavalo=4E" },
            { "id": "4F", "text": "<span><img src='/Content/Cavalo?cavalo=4F' class='img-flag' /> 4F</span>", "img": "/Content/Cavalo?cavalo=4F" },
            { "id": "4G", "text": "<span><img src='/Content/Cavalo?cavalo=4G' class='img-flag' /> 4G</span>", "img": "/Content/Cavalo?cavalo=4G" },
            { "id": "4H", "text": "<span><img src='/Content/Cavalo?cavalo=4H' class='img-flag' /> 4H</span>", "img": "/Content/Cavalo?cavalo=4H" },
            { "id": "4I", "text": "<span><img src='/Content/Cavalo?cavalo=4I' class='img-flag' /> 4I</span>", "img": "/Content/Cavalo?cavalo=4I" },
            { "id": "4J", "text": "<span><img src='/Content/Cavalo?cavalo=4J' class='img-flag' /> 4J</span>", "img": "/Content/Cavalo?cavalo=4J" },
            { "id": "4K", "text": "<span><img src='/Content/Cavalo?cavalo=4K' class='img-flag' /> 4K</span>", "img": "/Content/Cavalo?cavalo=4K" },
            { "id": "4L", "text": "<span><img src='/Content/Cavalo?cavalo=4L' class='img-flag' /> 4L</span>", "img": "/Content/Cavalo?cavalo=4L" },
            { "id": "4M", "text": "<span><img src='/Content/Cavalo?cavalo=4M' class='img-flag' /> 4M</span>", "img": "/Content/Cavalo?cavalo=4M" },
            { "id": "4N", "text": "<span><img src='/Content/Cavalo?cavalo=4N' class='img-flag' /> 4N</span>", "img": "/Content/Cavalo?cavalo=4N" },
            { "id": "4O", "text": "<span><img src='/Content/Cavalo?cavalo=4O' class='img-flag' /> 4O</span>", "img": "/Content/Cavalo?cavalo=4O" },
            { "id": "4P", "text": "<span><img src='/Content/Cavalo?cavalo=4P' class='img-flag' /> 4P</span>", "img": "/Content/Cavalo?cavalo=4P" },
            { "id": "4Q", "text": "<span><img src='/Content/Cavalo?cavalo=4Q' class='img-flag' /> 4Q</span>", "img": "/Content/Cavalo?cavalo=4Q" },
            { "id": "5A", "text": "<span><img src='/Content/Cavalo?cavalo=5A' class='img-flag' /> 5A</span>", "img": "/Content/Cavalo?cavalo=5A" },
            { "id": "5B", "text": "<span><img src='/Content/Cavalo?cavalo=5B' class='img-flag' /> 5B</span>", "img": "/Content/Cavalo?cavalo=5B" },
            { "id": "5C", "text": "<span><img src='/Content/Cavalo?cavalo=5C' class='img-flag' /> 5C</span>", "img": "/Content/Cavalo?cavalo=5C" },
            { "id": "5D", "text": "<span><img src='/Content/Cavalo?cavalo=5D' class='img-flag' /> 5D</span>", "img": "/Content/Cavalo?cavalo=5D" },
            { "id": "5E", "text": "<span><img src='/Content/Cavalo?cavalo=5E' class='img-flag' /> 5E</span>", "img": "/Content/Cavalo?cavalo=5E" },
            { "id": "5F", "text": "<span><img src='/Content/Cavalo?cavalo=5F' class='img-flag' /> 5F</span>", "img": "/Content/Cavalo?cavalo=5F" },
            { "id": "5G", "text": "<span><img src='/Content/Cavalo?cavalo=5G' class='img-flag' /> 5G</span>", "img": "/Content/Cavalo?cavalo=5G" },
            { "id": "5H", "text": "<span><img src='/Content/Cavalo?cavalo=5H' class='img-flag' /> 5H</span>", "img": "/Content/Cavalo?cavalo=5H" },
            { "id": "5I", "text": "<span><img src='/Content/Cavalo?cavalo=5I' class='img-flag' /> 5I</span>", "img": "/Content/Cavalo?cavalo=5I" },
            { "id": "5J", "text": "<span><img src='/Content/Cavalo?cavalo=5J' class='img-flag' /> 5J</span>", "img": "/Content/Cavalo?cavalo=5J" },
            { "id": "5K", "text": "<span><img src='/Content/Cavalo?cavalo=5K' class='img-flag' /> 5K</span>", "img": "/Content/Cavalo?cavalo=5K" },
            { "id": "5L", "text": "<span><img src='/Content/Cavalo?cavalo=5L' class='img-flag' /> 5L</span>", "img": "/Content/Cavalo?cavalo=5L" },
            { "id": "5M", "text": "<span><img src='/Content/Cavalo?cavalo=5M' class='img-flag' /> 5M</span>", "img": "/Content/Cavalo?cavalo=5M" },
            { "id": "5N", "text": "<span><img src='/Content/Cavalo?cavalo=5N' class='img-flag' /> 5N</span>", "img": "/Content/Cavalo?cavalo=5N" },
            { "id": "5O", "text": "<span><img src='/Content/Cavalo?cavalo=5O' class='img-flag' /> 5O</span>", "img": "/Content/Cavalo?cavalo=5O" },
            { "id": "6A", "text": "<span><img src='/Content/Cavalo?cavalo=6A' class='img-flag' /> 6A</span>", "img": "/Content/Cavalo?cavalo=6A" },
            { "id": "6B", "text": "<span><img src='/Content/Cavalo?cavalo=6B' class='img-flag' /> 6B</span>", "img": "/Content/Cavalo?cavalo=6B" },
            { "id": "6C", "text": "<span><img src='/Content/Cavalo?cavalo=6C' class='img-flag' /> 6C</span>", "img": "/Content/Cavalo?cavalo=6C" },
            { "id": "6D", "text": "<span><img src='/Content/Cavalo?cavalo=6D' class='img-flag' /> 6D</span>", "img": "/Content/Cavalo?cavalo=6D" },
            { "id": "6E", "text": "<span><img src='/Content/Cavalo?cavalo=6E' class='img-flag' /> 6E</span>", "img": "/Content/Cavalo?cavalo=6E" },
            { "id": "6F", "text": "<span><img src='/Content/Cavalo?cavalo=6F' class='img-flag' /> 6F</span>", "img": "/Content/Cavalo?cavalo=6F" },
            { "id": "6G", "text": "<span><img src='/Content/Cavalo?cavalo=6G' class='img-flag' /> 6G</span>", "img": "/Content/Cavalo?cavalo=6G" },
            { "id": "6H", "text": "<span><img src='/Content/Cavalo?cavalo=6H' class='img-flag' /> 6H</span>", "img": "/Content/Cavalo?cavalo=6H" },
            { "id": "6I", "text": "<span><img src='/Content/Cavalo?cavalo=6I' class='img-flag' /> 6I</span>", "img": "/Content/Cavalo?cavalo=6I" },
            { "id": "6J", "text": "<span><img src='/Content/Cavalo?cavalo=6J' class='img-flag' /> 6J</span>", "img": "/Content/Cavalo?cavalo=6J" },
            { "id": "6K", "text": "<span><img src='/Content/Cavalo?cavalo=6K' class='img-flag' /> 6K</span>", "img": "/Content/Cavalo?cavalo=6K" },
            { "id": "6L", "text": "<span><img src='/Content/Cavalo?cavalo=6L' class='img-flag' /> 6L</span>", "img": "/Content/Cavalo?cavalo=6L" },
            { "id": "6M", "text": "<span><img src='/Content/Cavalo?cavalo=6M' class='img-flag' /> 6M</span>", "img": "/Content/Cavalo?cavalo=6M" },
            { "id": "6N", "text": "<span><img src='/Content/Cavalo?cavalo=6N' class='img-flag' /> 6N</span>", "img": "/Content/Cavalo?cavalo=6N" },
            { "id": "6O", "text": "<span><img src='/Content/Cavalo?cavalo=6O' class='img-flag' /> 6O</span>", "img": "/Content/Cavalo?cavalo=6O" },
            { "id": "6P", "text": "<span><img src='/Content/Cavalo?cavalo=6P' class='img-flag' /> 6P</span>", "img": "/Content/Cavalo?cavalo=6P" },
            { "id": "6Q", "text": "<span><img src='/Content/Cavalo?cavalo=6Q' class='img-flag' /> 6Q</span>", "img": "/Content/Cavalo?cavalo=6Q" },
            { "id": "6R", "text": "<span><img src='/Content/Cavalo?cavalo=6R' class='img-flag' /> 6R</span>", "img": "/Content/Cavalo?cavalo=6R" },
            { "id": "6S", "text": "<span><img src='/Content/Cavalo?cavalo=6S' class='img-flag' /> 6S</span>", "img": "/Content/Cavalo?cavalo=6S" },
            { "id": "6T", "text": "<span><img src='/Content/Cavalo?cavalo=6T' class='img-flag' /> 6T</span>", "img": "/Content/Cavalo?cavalo=6T" },
            { "id": "6U", "text": "<span><img src='/Content/Cavalo?cavalo=6U' class='img-flag' /> 6U</span>", "img": "/Content/Cavalo?cavalo=6U" },
            { "id": "7A", "text": "<span><img src='/Content/Cavalo?cavalo=7A' class='img-flag' /> 7A</span>", "img": "/Content/Cavalo?cavalo=7A" },
            { "id": "7B", "text": "<span><img src='/Content/Cavalo?cavalo=7B' class='img-flag' /> 7B</span>", "img": "/Content/Cavalo?cavalo=7B" },
            { "id": "7C", "text": "<span><img src='/Content/Cavalo?cavalo=7C' class='img-flag' /> 7C</span>", "img": "/Content/Cavalo?cavalo=7C" },
            { "id": "7D", "text": "<span><img src='/Content/Cavalo?cavalo=7D' class='img-flag' /> 7D</span>", "img": "/Content/Cavalo?cavalo=7D" },
            { "id": "7E", "text": "<span><img src='/Content/Cavalo?cavalo=7E' class='img-flag' /> 7E</span>", "img": "/Content/Cavalo?cavalo=7E" },
            { "id": "7G", "text": "<span><img src='/Content/Cavalo?cavalo=7G' class='img-flag' /> 7G</span>", "img": "/Content/Cavalo?cavalo=7G" },
            { "id": "7H", "text": "<span><img src='/Content/Cavalo?cavalo=7H' class='img-flag' /> 7H</span>", "img": "/Content/Cavalo?cavalo=7H" },
            { "id": "7I", "text": "<span><img src='/Content/Cavalo?cavalo=7I' class='img-flag' /> 7I</span>", "img": "/Content/Cavalo?cavalo=7I" },
            { "id": "8A", "text": "<span><img src='/Content/Cavalo?cavalo=8A' class='img-flag' /> 8A</span>", "img": "/Content/Cavalo?cavalo=8A" },
            { "id": "8B", "text": "<span><img src='/Content/Cavalo?cavalo=8B' class='img-flag' /> 8B</span>", "img": "/Content/Cavalo?cavalo=8B" },
            { "id": "8C", "text": "<span><img src='/Content/Cavalo?cavalo=8C' class='img-flag' /> 8C</span>", "img": "/Content/Cavalo?cavalo=8C" },
            { "id": "8D", "text": "<span><img src='/Content/Cavalo?cavalo=8D' class='img-flag' /> 8D</span>", "img": "/Content/Cavalo?cavalo=8D" },
            { "id": "8E", "text": "<span><img src='/Content/Cavalo?cavalo=8E' class='img-flag' /> 8E</span>", "img": "/Content/Cavalo?cavalo=8E" }
        ]


        function formatState(state) {

            console.log(state)
            if (!state.id) {
                return state.text;
            }
            var $state = $(
                
            );
            return $state;
        };

        $('#cavalo').select2({
            data: cavalos,
            placeholder: 'Selecione o cavalo',
            language: "pt-BR",
            width: '100%',
            templateresult: formatState,
            templateselection: formatState,
            allowClear: true,
            cacheDataSource: [],
            escapeMarkup: function (m) { return m; },
        });

        $('#cavalo').on('change', function () {
            let selecionado = $(this).select2('data')[0];
            if (selecionado !== undefined) {
                console.log(selecionado)
                $('#cavalo-imagem').attr('src', selecionado.img);
            }
        });
    }
})