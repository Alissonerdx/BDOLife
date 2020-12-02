var map;
var width = 256 * 128;
var height = 256 * 96;
var xOffset = -16;
var yOffset = -8;

var systems = ['sl', 'sl2', 'bd1', 'bd2', 'kr'];
var conversions = {};

// Register the scale/translate factors for the different conversions
this.conversions['bd1' + '-' + 'sl'] = this.createConversionForBd1ToSl();
this.conversions['bd2' + '-' + 'sl'] = this.createConversionForBd2ToSl();
this.conversions['kr' + '-' + 'sl'] = this.createConversionForKrToSl();

this.conversions['bd1' + '-' + 'sl2'] = this.createConversionForBd1ToSl2();
this.conversions['bd2' + '-' + 'sl2'] = this.createConversionForBd2ToSl2();
this.conversions['bd2' + '-' + 'kr'] = this.createConversionForBd2ToKr();
//this.conversions['sl'+'-'+'sl2'] = this.createConversionForKrToSl2();
this.conversions['kr' + '-' + 'sl2'] = this.createConversionForKrToSl2();
this.conversions['sl2' + '-' + 'kr'] = this.createConversionForSl2ToKr();

this.conversions['gatheringdata-kr'] = this.createConversionForBd2GatheringDataToKr();

function convert(coord, from = 'kr', to = 'sl2') {

    var conversion = this.conversions[from + '-' + to];
    if (!conversion) {
        throw 'No conversion found for ' + from + '-' + to;
    }

    if (conversion.pretranslate) {
        coord = [
            conversion.pretranslate.x + (+coord[0]),
            conversion.pretranslate.y + (+coord[1])
        ];
    }

    return [
        (conversion.translate.x + conversion.scale.x * coord[0]),
        (conversion.translate.y + conversion.scale.y * coord[1])
    ];

}

function batch(coords, from = 'bd1', to = 'sl2') {

    var conversion = this.conversions[from + '-' + to];
    if (!conversion) {
        throw 'No conversion found for ' + from + '-' + to;
    }

    var translate = conversion.translate;
    var scale = conversion.scale;

    return coords.map(coord => {

        if (conversion.pretranslate) {
            coord = [
                conversion.pretranslate.x + (+coord[0]),
                conversion.pretranslate.y + (+coord[1])
            ];
        }

        return [
            (translate.x + scale.x * coord[0]),
            (translate.y + scale.y * coord[1])
        ]
    });
}

function createConversionForKrToSl2() {
    return {
        pretranslate: { x: 0, y: 0 },
        translate: { x: (64 * 256) + (915), y: (64 * 256) + (1675) },
        scale: { x: 1 / 100, y: -1 / 100 }
    }
}

function createConversionForSl2ToKr() {
    return {
        pretranslate: { x: ((64 * 256) + (915)) * -1, y: ((64 * 256) + (1675)) * -1 },
        translate: { x: 0, y: 0 },
        scale: { x: 100, y: -100 }
    }
}

function createConversionForKrToSl() {
    return {
        pretranslate: { x: -14000, y: 250000 },
        translate: { x: 11950, y: 18550 },
        scale: { x: 0.0164, y: -0.0164 }
    }
}

function createConversionForBd1ToSl2() {
    return {
        pretranslate: { x: 0, y: 0 },
        translate: { x: 64 * 64 * 2.5, y: 64 * 128 * 1.25 },
        scale: { x: 0.6, y: 0.6 }
    }
}

function createConversionForBd2ToKr() {
    return {
        pretranslate: { x: -20872.145, y: -16777.435 },
        translate: { x: 372214.5, y: 127456.5 },
        scale: { x: 100, y: -100 }
    }
}

function createConversionForBd2GatheringDataToKr() {

    var xOffset = -1790;
    var yOffset = 190;

    var sourceCoords = [
        { "x": 3041 + xOffset, "y": 7444 + yOffset },
        { "x": 31714 + xOffset, "y": 19605 + yOffset }
    ];

    var targetCoords = [
        { "x": -521100, "y": 426100 },
        { x: 1217745, y: -293217 }
    ];

    var translateFactors = {
        "x": (targetCoords[1].x * sourceCoords[0].x - targetCoords[0].x * sourceCoords[1].x) / (sourceCoords[0].x - sourceCoords[1].x),
        "y": (targetCoords[1].y * sourceCoords[0].y - targetCoords[0].y * sourceCoords[1].y) / (sourceCoords[0].y - sourceCoords[1].y)
    };

    var scaleFactors = {
        "x": (targetCoords[1].x - targetCoords[0].x) / (sourceCoords[1].x - sourceCoords[0].x),
        "y": (targetCoords[1].y - targetCoords[0].y) / (sourceCoords[1].y - sourceCoords[0].y)
    };

    return {
        translate: translateFactors,
        scale: scaleFactors
    }
}

// Create the conversion parameters for converting from
// BDDatabase's initial gathering data map coordinate system (Aug 2016)
// to their the Coord system that this map uses
function createConversionForBd1ToSl() {
    return {
        pretranslate: { x: -10000, y: -10000 },
        translate: { x: 10000, y: 10000 },
        scale: { x: 0.99945, y: 0.99945 }
    }
}

// Create the conversion parameters for converting from
// BDDatabase's updated gathering data map coordinate system (Oct 2016)
// to their the Coord system that this map uses
function createConversionForBd2ToSl() {
    var sourceCoords = [
        { "x": 3041, "y": 7444 },
        { "x": 31714, "y": 19605 }
    ];

    var targetCoords = [
        { "x": 5185, "y": 7433 },
        { "x": 32693, "y": 18960 }
    ];

    var translateFactors = {
        "x": (targetCoords[1].x * sourceCoords[0].x - targetCoords[0].x * sourceCoords[1].x) / (sourceCoords[0].x - sourceCoords[1].x),
        "y": (targetCoords[1].y * sourceCoords[0].y - targetCoords[0].y * sourceCoords[1].y) / (sourceCoords[0].y - sourceCoords[1].y)
    };

    var scaleFactors = {
        "x": (targetCoords[1].x - targetCoords[0].x) / (sourceCoords[1].x - sourceCoords[0].x),
        "y": (targetCoords[1].y - targetCoords[0].y) / (sourceCoords[1].y - sourceCoords[0].y)
    };

    return {
        translate: translateFactors,
        scale: scaleFactors
    }
}

// Create the conversion parameters for converting from
// BDDatabase's updated gathering data map coordinate system (Oct 2016)
// to their the Coord system that this map uses
function createConversionForBd2ToSl2() {
    return {
        pretranslate: { x: 256 * 64, y: 256 * 64 },
        translate: { x: 0, y: 0 },
        scale: { x: 0.5, y: 0.5 }
    }
}


$(document).ready(function () {

    Leaflet();

    function unproject(coords) {
        var convertedCoords;

        // Is is an x/y object
        if (coords.x !== undefined) {
            // Did we specify a different coord format
            if (coords.fmt) {
                convertedCoords = convert([coords.x, coords.y], coords.fmt, 'sl2');
            } else {
                convertedCoords = convert([coords.x, coords.y], 'kr', 'sl2');
            }

            // Just an [x,y] array
        } else {
            convertedCoords = convert(coords, 'kr', 'sl2');
        }
        convertedCoords[0] += this.xOffset;
        convertedCoords[1] += this.yOffset;
        return map.unproject(convertedCoords, 7);
    }


    function Leaflet() {
        map = L.map('rotacoesMapa', {
            zoom: 2,
            minZoom: 2,
            maxZoom: 8,

            zoomSnap: 0.5,
            zoomDelta: 0.5,

            attributionControl: false,
            zoomControl: false,
            crs: L.CRS.Simple,
            continuousWorld: false,
            //preferCanvas: true,
            wheelPxPerZoomLevel: 100
        });

        L.tileLayer('/imagens/mapa/{z}/{x}_{y}.jpg', {
            crs: L.CRS.Simple,
            minZoom: 1,
            maxZoom: 7 + 1,
            zoomOffset: 8,
            maxNativeZoom: 7,
            tms: false,
            noWrap: true,
            bounds: new L.LatLngBounds(
                map.unproject([0, 0], 7),
                map.unproject([width, height], 7)
            )
        }).addTo(map);

        L.control.mousePosition().addTo(map);

        new L.Control.Zoom({ position: 'topright' }).addTo(map);
        map.setView(unproject([13799.6, 76995.8]), 3);

        //new Leaflet.Control.Zoom({ position: 'topright' }).addTo(mapa);

    }


});