﻿const _0x1805 = ['#ingredientesGrid', 'itemTemplate', 'keyup', 'html', '<tr>', 'Valor/Caixa', 'input[type=text],\x20input[type=number],\x20select', 'preco', 'refresh', 'unmaskedvalue', 'original', 'caixaImperial', 'Selecione\x20a\x20receita', 'log', 'Total', 'checked', 'get_node', 'selected_node.jstree', 'resolve', 'json', 'precoMarket', 'prop', 'Produzido', '#494C56', 'POST', 'PrecoTotal', 'loadData', '#tree', 'fields', 'get_children_dom', 'split', 'total-row', 'totalImperial', 'term', 'Ingrediente', '\x20=\x20', 'GET', '/Culinaria/TreeView', 'checkbox', 'Deferred', 'grid', 'center', 'img', 'quantidade', 'each', '/Culinaria/Ingredientes', 'every', '#custoTotal', 'ajax', 'inputmask', 'valor', '#resultadosImperialGrid', 'get_parent', 'icon', '/Culinaria/Resultados', 'procNormal', 'text', 'updateItem', 'Custo\x20no\x20Mercado\x20(UN)', 'Trocar\x20Ingrediente', 'addClass', 'control', 'push', 'prata', 'done', '#maestriaSelect', '#treeView', 'valor-negativo', 'data', 'search', 'attr', '_renderCells', '#consultarForm', 'quantidadeImperial', 'prataField', 'promise', 'procRaro', '<img\x20src=\x22', 'open', 'Selecione\x20a\x20maestria\x20(Culinária)', 'TotalImperial', 'off', 'prototype', 'removeClass', 'PrecoPorCaixa', 'children', 'change', 'Totais', 'close_node', 'pop', '#resultadosGrid', 'valor-positivo', 'val', 'precoTotal', '#treeViewContent', '#detalhesItem', 'nomeItem', 'option', 'jstree', 'focus', '#resultados', 'Qtd.\x20Caixa\x20Imperial', 'close', 'length', 'precoPorCaixa', 'iziModal', 'format', '100%', 'ignorar', 'QuantidadeImperial', '#lucroSemPctEconomico', '#lucroBruto', '_content', 'open_node.jstree', 'agrupar', 'Ignorar', 'filter', '#proc-raro', 'expandir', '#quantidade', 'IsTotal', 'total', 'open_all', '#configuracaoMaestria', 'pt-BR', '#proc-normal', 'insertItem', 'quantidadePorCaixaImperial', 'Selecione\x20a\x20maestria\x20(Entrega\x20Imperial)', '#lucroComPctEconomico', 'Caixa\x20Imperial', 'open_node', 'ready', 'Configuração\x20da\x20Maestria', '\x20x\x20', '/Maestria/SelectMaestriasPorTipo', '#maestriaImperialSelect', 'append', '\x22\x20style=\x22max-width:\x2044px;\x22/>', 'raiz_anchor', 'contextmenu', '#receitaSelect', 'type', 'select2', 'string', 'Custo\x20Total', 'which', 'quantidadeTotal', '#33363F', 'close_node.jstree', 'jsGrid', 'node', 'state', 'opened', 'disabled', '<img\x20src=\x22data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAAFVBMVEXr6+sAAABYWFiSkpKwsLDNzc11dXVUvnWIAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAOElEQVQokWNgGAUjAjABITINBcZAyMLgAKYRgCWYJRgkB6HhgNnN2Q2kFEIjiQMhyBAQPQoGPQAAoJ4FT0msjZwAAAAASUVORK5CYII=\x22\x20style=\x22max-width:\x2044px;\x22/>', 'keydown', 'page', 'item', 'preventDefault', 'unmask', 'post', 'setvalue', 'is_leaf']; (function (_0x42689f, _0x1805b0) { const _0x140ee3 = function (_0x56c33a) { while (--_0x56c33a) { _0x42689f['push'](_0x42689f['shift']()); } }; _0x140ee3(++_0x1805b0); }(_0x1805, 0x74)); const _0x140e = function (_0x42689f, _0x1805b0) { _0x42689f = _0x42689f - 0x0; let _0x140ee3 = _0x1805[_0x42689f]; return _0x140ee3; }; const _0x38c6d1 = _0x140e; function AtualizarTotais() { const _0x1b00ef = _0x140e; let _0x56c33a = $(_0x1b00ef('0x8a'))[_0x1b00ef('0x22')](_0x1b00ef('0x91'), 'data'), _0x1bda00 = $(_0x1b00ef('0x30'))['jsGrid'](_0x1b00ef('0x91'), _0x1b00ef('0x74')); CalcularTotais(_0x1bda00, _0x56c33a); } function CalcularTotais(_0x29509e, _0x42b607) { const _0x4690d2 = _0x140e; let _0x113d82 = 0x0, _0x1afdcd = 0x0; if (_0x29509e !== undefined && _0x29509e['length'] > 0x0) { for (let _0x567471 = 0x0; _0x567471 < _0x29509e[_0x4690d2('0x97')]; _0x567471++)if (_0x29509e[_0x567471]['ignorar'] === !0x1) { let _0x5e8943 = parseInt(Inputmask[_0x4690d2('0x2c')]('' + _0x29509e[_0x567471][_0x4690d2('0x1f')], { 'alias': _0x4690d2('0x6f') })), _0x29a214 = parseInt(Inputmask['unmask']('' + _0x29509e[_0x567471]['precoMarket'], { 'alias': _0x4690d2('0x6f') })), _0x1dd2c7 = _0x5e8943 * _0x29a214; _0x113d82 += _0x1dd2c7; } $(_0x4690d2('0x5f'))[_0x4690d2('0x33')](Inputmask[_0x4690d2('0x9a')]('' + _0x113d82, { 'alias': _0x4690d2('0x6f') })); } else $(_0x4690d2('0x5f'))['html'](Inputmask['format']('0', { 'alias': _0x4690d2('0x6f') })); if (_0x42b607 !== undefined && _0x42b607[_0x4690d2('0x97')] > 0x0) { for (let _0x5efae8 = 0x0; _0x5efae8 < _0x42b607[_0x4690d2('0x97')]; _0x5efae8++)if (_0x42b607[_0x5efae8][_0x4690d2('0x9c')] === !0x1) { let _0x123ff1 = parseInt(Inputmask[_0x4690d2('0x2c')]('' + _0x42b607[_0x5efae8][_0x4690d2('0x5b')], { 'alias': 'prata' })), _0x2854a0 = parseInt(Inputmask[_0x4690d2('0x2c')]('' + _0x42b607[_0x5efae8][_0x4690d2('0x37')], { 'alias': _0x4690d2('0x6f') })); _0x1afdcd += _0x123ff1 * _0x2854a0; } $(_0x4690d2('0x9f'))['html'](Inputmask[_0x4690d2('0x9a')]('' + _0x1afdcd, { 'alias': _0x4690d2('0x6f') })); } else $(_0x4690d2('0x9f'))[_0x4690d2('0x33')](Inputmask[_0x4690d2('0x9a')]('0', { 'alias': _0x4690d2('0x6f') })); let _0x4fdf6b = parseInt((_0x1afdcd - _0x113d82) * 0.845), _0x3749bf = parseInt((_0x1afdcd - _0x113d82) * 0.65); _0x4fdf6b < 0x0 ? (_0x4fdf6b = parseInt((_0x1afdcd - _0x113d82) * 1.155), $(_0x4690d2('0xd'))[_0x4690d2('0x83')](_0x4690d2('0x8b')), $(_0x4690d2('0xd'))[_0x4690d2('0x6c')](_0x4690d2('0x73')), $(_0x4690d2('0xd'))[_0x4690d2('0x33')]('-' + Inputmask[_0x4690d2('0x9a')]('' + _0x4fdf6b, { 'alias': _0x4690d2('0x6f') }))) : ($(_0x4690d2('0xd'))[_0x4690d2('0x83')](_0x4690d2('0x73')), $(_0x4690d2('0xd'))['addClass'](_0x4690d2('0x8b')), $(_0x4690d2('0xd'))['html'](Inputmask[_0x4690d2('0x9a')]('' + _0x4fdf6b, { 'alias': _0x4690d2('0x6f') }))), _0x3749bf < 0x0 ? (_0x3749bf = parseInt((_0x1afdcd - _0x113d82) * 1.35), $(_0x4690d2('0x9e'))['removeClass'](_0x4690d2('0x8b')), $(_0x4690d2('0x9e'))['addClass'](_0x4690d2('0x73')), $(_0x4690d2('0x9e'))[_0x4690d2('0x33')]('-' + Inputmask[_0x4690d2('0x9a')]('' + _0x3749bf, { 'alias': _0x4690d2('0x6f') }))) : ($(_0x4690d2('0x9e'))[_0x4690d2('0x83')](_0x4690d2('0x73')), $('#lucroSemPctEconomico')[_0x4690d2('0x6c')](_0x4690d2('0x8b')), $(_0x4690d2('0x9e'))[_0x4690d2('0x33')](Inputmask['format']('' + _0x3749bf, { 'alias': _0x4690d2('0x6f') }))); } function ConfigurarMaestriaImperial() { const _0x40c528 = _0x140e; $(_0x40c528('0x7'))[_0x40c528('0x99')](_0x40c528('0x7e')); } function SalvarMaestriaImperial() { const _0x5ac83c = _0x140e; maestriaImperialSelecionada = parseInt($(_0x5ac83c('0x14'))['val']()), $(_0x5ac83c('0x7'))[_0x5ac83c('0x99')](_0x5ac83c('0x96')); } var maestriaImperialSelecionada = 0x0; $(document)[_0x38c6d1('0x10')](function () { function _0x3863be() { const _0x905e05 = _0x140e; $(_0x905e05('0x8f'))['iziModal']({ 'title': 'Detalhes\x20do\x20Item' }), $(_0x905e05('0x7'))[_0x905e05('0x99')]({ 'title': _0x905e05('0x11'), 'background': _0x905e05('0x47'), 'headerColor': _0x905e05('0x20'), 'radius': 0x14, 'top': 0x32, 'afterRender': function () { const _0x386dff = _0x905e05; $(_0x386dff('0x14'))['select2']({ 'placeholder': _0x386dff('0xc'), 'language': _0x386dff('0x8'), 'width': _0x386dff('0x9b'), 'dropdownCssClass': 'increasedzindexclass', 'templateResult': formatState, 'templateSelection': formatState, 'ajax': { 'url': _0x386dff('0x13'), 'type': 'GET', 'data': function (_0xb12568) { const _0x3169c7 = _0x386dff; return { 'search': _0xb12568['term'], 'page': _0xb12568[_0x3169c7('0x29')] || 0x1, 'tipo': 0x1 }; }, 'processResults': function (_0x1e11e1) { return _0x1e11e1; } } }); } }); } function _0x1ea0c4() { setInterval(AtualizarTotais, 0x3e8); } function _0x5f4866() { const _0x3a48f9 = _0x140e; $('#maestriaSelect')['on'](_0x3a48f9('0x86'), function () { const _0x247bdb = _0x3a48f9; let _0x203168 = $(this)[_0x247bdb('0x1b')]('data')[0x0]; _0x203168 !== undefined && ($(_0x247bdb('0x9'))[_0x247bdb('0x61')](_0x247bdb('0x2e'), _0x203168[_0x247bdb('0x67')]), $(_0x247bdb('0x1'))['inputmask'](_0x247bdb('0x2e'), _0x203168[_0x247bdb('0x7c')]), $(_0x247bdb('0x9'))[_0x247bdb('0x93')](), $(_0x247bdb('0x1'))[_0x247bdb('0x93')]()); }), $(_0x3a48f9('0x78'))['on']('submit', function (_0x2f9a9b) { const _0xd29454 = _0x3a48f9; _0x2f9a9b[_0xd29454('0x2b')](), $(_0xd29454('0x30'))['jsGrid'](_0xd29454('0x4a')), $(_0xd29454('0x8a'))[_0xd29454('0x22')](_0xd29454('0x4a')), $(_0xd29454('0x63'))[_0xd29454('0x22')](_0xd29454('0x4a')), $('#treeViewContent')[_0xd29454('0x92')](!0x0)[_0xd29454('0x38')](); }); } function _0x10958d() { const _0x34775c = _0x140e; $(_0x34775c('0x19'))[_0x34775c('0x1b')]({ 'placeholder': _0x34775c('0x3c'), 'language': _0x34775c('0x8'), 'width': _0x34775c('0x9b'), 'allowClear': !0x0, 'cacheDataSource': [], 'escapeMarkup': function (_0x423170) { return _0x423170; } }), $(_0x34775c('0x71'))[_0x34775c('0x1b')]({ 'placeholder': _0x34775c('0x7f'), 'language': 'pt-BR', 'width': _0x34775c('0x9b'), 'templateResult': formatState, 'templateSelection': formatState, 'ajax': { 'url': _0x34775c('0x13'), 'type': _0x34775c('0x54'), 'data': function (_0x356848) { const _0x4e3b34 = _0x34775c; return { 'search': _0x356848[_0x4e3b34('0x51')], 'page': _0x356848[_0x4e3b34('0x29')] || 0x1, 'tipo': 0x1 }; }, 'processResults': function (_0x5aa56b) { return _0x5aa56b; } } }); } function _0x431402() { const _0x200c79 = _0x140e; function _0x1c1a87(_0x21d8a4) { const _0x25fa2c = _0x140e; var _0x35fd48 = $(_0x25fa2c('0x30'))[_0x25fa2c('0x22')](_0x25fa2c('0x91'), 'data'); return _0x35fd48[_0x25fa2c('0x0')](_0x8c9d3d => _0x8c9d3d['id'] === _0x21d8a4)[0x0]; } function _0x56541a(_0x382f02) { const _0x564b7b = _0x140e; let _0x6e265e = _0x382f02[_0x564b7b('0x3a')]['id'][_0x564b7b('0x4e')]('-'), _0x851180 = _0x6e265e[_0x6e265e['length'] - 0x1], _0x19a7d1 = _0x1c1a87(_0x851180); if (_0x19a7d1 === null || _0x19a7d1 === undefined) { let _0x2ccb83 = Inputmask['format']('' + parseInt(_0x382f02['original'][_0x564b7b('0x5b')]) * parseInt(_0x382f02[_0x564b7b('0x3a')][_0x564b7b('0x62')]), { 'alias': _0x564b7b('0x6f') }); $('#ingredientesGrid')[_0x564b7b('0x22')](_0x564b7b('0xa'), { 'id': _0x851180, 'img': _0x382f02[_0x564b7b('0x3a')][_0x564b7b('0x65')], 'item': _0x382f02[_0x564b7b('0x3a')]['nomeItem'], 'quantidadeTotal': _0x382f02[_0x564b7b('0x3a')]['quantidade'], 'precoMarket': _0x382f02['original'][_0x564b7b('0x62')], 'precoTotal': _0x2ccb83, 'ignorar': !0x1 }); } else _0x19a7d1[_0x564b7b('0x1f')] += parseInt(_0x382f02[_0x564b7b('0x3a')][_0x564b7b('0x5b')]), $(_0x564b7b('0x30'))[_0x564b7b('0x22')](_0x564b7b('0x69'), _0x19a7d1); } function _0x55767c(_0x228df0, _0x315665) { const _0x4df6a9 = _0x140e; let _0x4cf267 = _0x1c1a87(_0x228df0); if (_0x4cf267 !== null && _0x4cf267 !== undefined) { let _0x2d3b77 = Inputmask[_0x4df6a9('0x2c')]('' + _0x4cf267[_0x4df6a9('0x1f')], { 'alias': _0x4df6a9('0x6f') }), _0x3d5ae2 = parseInt(_0x2d3b77) - parseInt(_0x315665); _0x3d5ae2 === 0x0 ? $('#ingredientesGrid')['jsGrid']('deleteItem', _0x4cf267) : (_0x4cf267[_0x4df6a9('0x1f')] = _0x3d5ae2, $(_0x4df6a9('0x30'))['jsGrid'](_0x4df6a9('0x69'), _0x4cf267)); } } $('#treeview-search')[_0x200c79('0x32')](function () { const _0x2d4247 = _0x200c79; $(_0x2d4247('0x8e'))[_0x2d4247('0x92')](_0x2d4247('0x75'), $(this)['val']()); }), $(_0x200c79('0x8e'))[_0x200c79('0x92')]({ 'core': { 'dblclick_toggle': !0x1, 'animation': 0x0, 'themes': { 'responsive': !0x0 }, 'data': function (_0x5e3daf, _0x5833dc) { const _0x37a03f = _0x200c79; BlockElement(_0x37a03f('0x72')), $[_0x37a03f('0x60')]({ 'type': _0x37a03f('0x48'), 'url': _0x37a03f('0x55'), 'data': { 'receitaReferenciaId': $(_0x37a03f('0x19'))['val'](), 'quantidade': parseInt($('#quantidade')[_0x37a03f('0x61')](_0x37a03f('0x39'))), 'procNormal': $(_0x37a03f('0x9'))[_0x37a03f('0x8c')]() }, 'success': function (_0x4f1f37) { _0x5833dc(_0x4f1f37), UnblockElement('#treeView'); } }); } }, 'types': {}, 'plugins': [_0x200c79('0x18'), _0x200c79('0x75')], 'search': { 'case_insensitive': !0x0, 'show_only_matches': !0x0 }, 'contextmenu': { 'items': function () { const _0x43cd76 = _0x200c79; var _0x4925a2 = $(_0x43cd76('0x4b'))[_0x43cd76('0x92')](!0x0); return { 'TrocarIngrediente': { 'separator_before': !0x1, 'separator_after': !0x1, 'label': _0x43cd76('0x6b'), 'action': function () { } } }; } } }), $(_0x200c79('0x8e'))['on'](_0x200c79('0xa1'), function (_0x2d4889, _0x5de05e) { const _0x518350 = _0x200c79; let _0x56487a = _0x5de05e[_0x518350('0x23')][_0x518350('0x3a')], _0x45f11f = _0x56487a['id'][_0x518350('0x4e')]('-'), _0x4c45f4 = _0x45f11f[_0x45f11f['length'] - 0x1], _0x24c2d1 = $(_0x518350('0x8e'))[_0x518350('0x92')](_0x518350('0x4d'), _0x56487a); if ($(_0x518350('0x8e'))[_0x518350('0x92')](!0x0)['get_parent'](_0x5de05e[_0x518350('0x23')]) !== '#') { let _0x2ca76a = _0x1c1a87(_0x4c45f4), _0x2b12ac = []; for (_0x24c2d1[_0x518350('0x5c')](function (_0x3a70cf, _0xfd9bc2) { const _0x5b612c = _0x518350; _0x2b12ac['push']($('#treeViewContent')[_0x5b612c('0x92')](_0x5b612c('0x40'), _0xfd9bc2)); }); _0x2b12ac[_0x518350('0x97')] > 0x0;) { let _0x2f8207 = _0x2b12ac[_0x518350('0x89')](); if ($('#treeViewContent')['jstree'](_0x518350('0x2f'), _0x2f8207)) { let _0x2ca759 = _0x2f8207['original']['id'][_0x518350('0x4e')]('-'), _0x309673 = _0x2ca759[_0x2ca759['length'] - 0x1]; _0x56541a(_0x2f8207); } else { let _0x461327 = $(_0x518350('0x8e'))['jstree'](_0x518350('0x4d'), _0x2f8207); _0x461327['each'](function (_0x503bc8, _0x40e7a7) { const _0x230d36 = _0x518350; _0x2b12ac[_0x230d36('0x6e')]($('#treeViewContent')[_0x230d36('0x92')]('get_node', _0x40e7a7)); }); } } if (_0x2ca76a !== null && _0x2ca76a !== undefined) { let _0x1edcb8 = Inputmask[_0x518350('0x2c')]('' + _0x2ca76a[_0x518350('0x1f')], { 'alias': _0x518350('0x6f') }), _0x47d486 = parseInt(_0x1edcb8) - parseInt(_0x56487a[_0x518350('0x5b')]); _0x47d486 === 0x0 ? $(_0x518350('0x30'))['jsGrid']('deleteItem', _0x2ca76a) : (_0x2ca76a['quantidadeTotal'] = _0x47d486, $(_0x518350('0x30'))[_0x518350('0x22')](_0x518350('0x69'), _0x2ca76a)); } } }), $(_0x200c79('0x8e'))['bind'](_0x200c79('0x41'), function (_0x4ae2f0, _0x52cf76) { const _0x306161 = _0x200c79; for (var _0xb82b11 = $(_0x306161('0x8e'))['jstree'](!0x0)['get_json'](_0x52cf76[_0x306161('0x23')]['id'], { 'flat': !0x0 }), _0x5e312c = 0x0; _0x5e312c < _0xb82b11[_0x306161('0x97')]; _0x5e312c++)console[_0x306161('0x3d')](_0xb82b11[_0x5e312c]); }), $('#treeViewContent')['on'](_0x200c79('0x21'), function (_0x2e3c1c, _0xb7e605) { const _0x2cfd59 = _0x200c79; let _0xc2dec4 = _0xb7e605[_0x2cfd59('0x23')][_0x2cfd59('0x3a')], _0x2cd2fb = _0xc2dec4['id'][_0x2cfd59('0x4e')]('-'), _0x228442 = _0x2cd2fb[_0x2cd2fb[_0x2cfd59('0x97')] - 0x1], _0x481346 = $('#treeViewContent')['jstree']('get_children_dom', _0xc2dec4); if ($(_0x2cfd59('0x8e'))['jstree'](!0x0)[_0x2cfd59('0x64')](_0xb7e605[_0x2cfd59('0x23')]) !== '#') { let _0x27869d = []; for (_0x481346['each'](function (_0x2d655e, _0x1599de) { const _0x44257a = _0x2cfd59; _0x27869d['push']($(_0x44257a('0x8e'))[_0x44257a('0x92')](_0x44257a('0x40'), _0x1599de)); }); _0x27869d['length'] > 0x0;) { let _0x29291d = _0x27869d['pop'](); if ($(_0x2cfd59('0x8e'))[_0x2cfd59('0x92')]('is_leaf', _0x29291d)) { let _0x5bd62d = _0x29291d[_0x2cfd59('0x3a')]['id'][_0x2cfd59('0x4e')]('-'), _0x137560 = _0x5bd62d[_0x5bd62d[_0x2cfd59('0x97')] - 0x1]; _0x55767c(_0x137560, _0x29291d[_0x2cfd59('0x3a')][_0x2cfd59('0x5b')]); } else { $(_0x2cfd59('0x8e'))[_0x2cfd59('0x92')](_0x2cfd59('0x6'), _0x29291d); let _0x2b8025 = $('#treeViewContent')[_0x2cfd59('0x92')](_0x2cfd59('0x4d'), _0x29291d); _0x2b8025[_0x2cfd59('0x5c')](function (_0x33f216, _0x54dc65) { const _0x8ff402 = _0x2cfd59; _0x27869d[_0x8ff402('0x6e')]($('#treeViewContent')['jstree'](_0x8ff402('0x40'), _0x54dc65)); }); } } let _0x5195bb = _0x1c1a87(_0x228442); if (_0x5195bb === null || _0x5195bb === undefined) { let _0x1c1521 = Inputmask[_0x2cfd59('0x9a')]('' + parseInt(_0xc2dec4[_0x2cfd59('0x5b')]) * parseInt(_0xc2dec4[_0x2cfd59('0x62')]), { 'alias': _0x2cfd59('0x6f') }); var _0xddc71 = _0xb7e605[_0x2cfd59('0x23')]; $('#ingredientesGrid')[_0x2cfd59('0x22')](_0x2cfd59('0xa'), { 'id': _0x228442, 'img': _0xc2dec4['icon'], 'item': _0xc2dec4[_0x2cfd59('0x90')], 'quantidadeTotal': _0xc2dec4['quantidade'], 'precoMarket': _0xc2dec4[_0x2cfd59('0x62')], 'precoTotal': _0x1c1521, 'ignorar': !0x1 }); } else _0x5195bb['quantidadeTotal'] += parseInt(_0xc2dec4[_0x2cfd59('0x5b')]), $(_0x2cfd59('0x30'))[_0x2cfd59('0x22')](_0x2cfd59('0x69'), _0x5195bb); } }), $('#treeViewContent')['on'](_0x200c79('0x2'), function (_0xc99885) { const _0x50e186 = _0x200c79; _0xc99885[_0x50e186('0x2b')](); let _0x3c013d = $('#treeViewContent')['jstree'](_0x50e186('0x40'), _0x50e186('0x17')), _0x3933e1 = _0x3c013d[_0x50e186('0x85')]; for (var _0x163337 = 0x0; _0x163337 < _0x3933e1['length']; _0x163337++)$(_0x50e186('0x8e'))[_0x50e186('0x92')](_0x50e186('0xf'), _0x3933e1[_0x163337]); }), $(_0x200c79('0x8e'))['on'](_0x200c79('0xa2'), function (_0x5939f3) { const _0x1b06d0 = _0x200c79; _0x5939f3[_0x1b06d0('0x2b')](); let _0x3378d9 = $(_0x1b06d0('0x8e'))[_0x1b06d0('0x92')](_0x1b06d0('0x40'), 'raiz_anchor'), _0x1c4d6b = _0x3378d9['children'], _0x2f43bb = _0x1c4d6b[_0x1b06d0('0x5e')](function (_0xa04fd) { const _0x21c95e = _0x1b06d0; let _0x584056 = $('#treeViewContent')[_0x21c95e('0x92')](_0x21c95e('0x40'), _0xa04fd); return _0x584056[_0x21c95e('0x24')][_0x21c95e('0x25')] === !0x1; }); if (!_0x2f43bb) { $('#ingredientesGrid')[_0x1b06d0('0x22')]('option', _0x1b06d0('0x74'), []); for (var _0x1a0f5c = 0x0; _0x1a0f5c < _0x1c4d6b[_0x1b06d0('0x97')]; _0x1a0f5c++) { let _0x1d88de = $(_0x1b06d0('0x8e'))[_0x1b06d0('0x92')](_0x1b06d0('0x40'), _0x1c4d6b[_0x1a0f5c]); $(_0x1b06d0('0x8e'))[_0x1b06d0('0x92')](_0x1b06d0('0x88'), _0x1d88de); } } }), $(_0x200c79('0x30'))[_0x200c79('0x81')]()['on'](_0x200c79('0x28'), _0x200c79('0x36'), _0x326436 => { const _0x3ec16c = _0x200c79; _0x326436[_0x3ec16c('0x1e')] === 0xd && $('#ingredientesGrid')['jsGrid'](_0x3ec16c('0x69')); }), $('#resultadosGrid')[_0x200c79('0x81')]()['on']('keydown', _0x200c79('0x36'), _0x445fe3 => { const _0x2d6f5a = _0x200c79; _0x445fe3[_0x2d6f5a('0x1e')] === 0xd && $(_0x2d6f5a('0x8a'))[_0x2d6f5a('0x22')](_0x2d6f5a('0x69')); }); } function _0x1a06f2() { const _0x34900e = _0x140e; $('#ingredientesGrid')[_0x34900e('0x22')]({ 'width': _0x34900e('0x9b'), 'inserting': !0x1, 'editing': !0x0, 'sorting': !0x1, 'paging': !0x1, 'autoload': !0x1, 'selecting': !0x1, 'pageLoading': !0x1, 'confirmDeleting': !0x1, 'onItemUpdated': function () { const _0x31ea69 = _0x34900e; $(_0x31ea69('0x30'))[_0x31ea69('0x22')](_0x31ea69('0x38')); }, 'onRefreshed': function (_0xd3d697) { const _0x1788a2 = _0x34900e; var _0x1a4bd7 = _0xd3d697[_0x1788a2('0x58')][_0x1788a2('0x91')](_0x1788a2('0x74')), _0x4aa5fa = { 'Id': '', 'Img': '', 'Item': '', 'QuantidadeTotal': 0x0, 'PrecoMarket': 0x0, 'PrecoTotal': 0x0, 'IsTotal': !0x0 }, _0x442d05; _0x1a4bd7['forEach'](function (_0x4c1177) { const _0x256db7 = _0x1788a2; let _0x351362 = 0x0, _0x50807a = 0x0; _0x351362 = typeof _0x4c1177[_0x256db7('0x44')] == _0x256db7('0x1c') ? parseInt(Inputmask[_0x256db7('0x2c')](_0x4c1177[_0x256db7('0x44')], { 'alias': _0x256db7('0x6f') })) : _0x4c1177[_0x256db7('0x44')], _0x50807a = typeof _0x4c1177[_0x256db7('0x1f')] == _0x256db7('0x1c') ? parseInt(Inputmask[_0x256db7('0x2c')](_0x4c1177[_0x256db7('0x1f')], { 'alias': 'prata' })) : _0x4c1177['quantidadeTotal'], _0x4c1177[_0x256db7('0x9c')] === !0x1 && (_0x4aa5fa[_0x256db7('0x49')] += _0x50807a * _0x351362); }), _0x442d05 = $(_0x1788a2('0x34'))[_0x1788a2('0x6c')]('total-row'), _0xd3d697[_0x1788a2('0x58')][_0x1788a2('0x77')](_0x442d05, _0x4aa5fa), _0xd3d697['grid']['_content'][_0x1788a2('0x15')](_0x442d05); }, 'fields': [{ 'name': 'id', 'visible': !0x1 }, { 'name': _0x34900e('0x5a'), 'align': _0x34900e('0x59'), 'title': '', 'width': 0x50, 'itemTemplate': function (_0x2c2a1a, _0x5ad008) { const _0x2c7fc8 = _0x34900e; return _0x5ad008[_0x2c7fc8('0x4')] ? _0x2c7fc8('0x87') : _0x5ad008['img'] !== null && _0x5ad008[_0x2c7fc8('0x5a')] !== undefined && _0x5ad008[_0x2c7fc8('0x5a')] !== '' ? _0x2c7fc8('0x7d') + _0x5ad008[_0x2c7fc8('0x5a')] + _0x2c7fc8('0x16') : _0x2c7fc8('0x27'); } }, { 'name': _0x34900e('0x2a'), 'title': _0x34900e('0x52'), 'type': _0x34900e('0x68'), 'width': 0xa0, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x598d60, _0x47a41d) { const _0x4ea5a8 = _0x34900e; return _0x47a41d[_0x4ea5a8('0x4')] ? '' : _0x598d60; } }, { 'name': _0x34900e('0x1f'), 'type': 'prataField', 'title': 'Quantidade\x20Necessária', 'width': 0xb4, 'itemTemplate': function (_0x3886cf, _0x61f3de) { const _0x121c48 = _0x34900e; return _0x61f3de[_0x121c48('0x4')] ? '' : Inputmask[_0x121c48('0x9a')]('' + _0x3886cf, { 'alias': 'prata' }); } }, { 'name': _0x34900e('0x44'), 'type': 'prataField', 'title': _0x34900e('0x6a'), 'width': 0xb4, 'itemTemplate': function (_0x59dfb5, _0x2ee2ec) { const _0x2d5c3c = _0x34900e; return _0x2ee2ec[_0x2d5c3c('0x4')] ? '' : Inputmask[_0x2d5c3c('0x9a')]('' + _0x59dfb5, { 'alias': 'prata' }); } }, { 'name': _0x34900e('0x8d'), 'type': _0x34900e('0x7a'), 'title': _0x34900e('0x1d'), 'width': 0x78, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x32303d, _0x4019b8) { const _0x500a43 = _0x34900e; if (_0x4019b8[_0x500a43('0x4')]) return Inputmask[_0x500a43('0x9a')]('' + _0x4019b8[_0x500a43('0x49')], { 'alias': 'prata' }); let _0xffa9d2 = parseInt(Inputmask['unmask']('' + _0x4019b8[_0x500a43('0x44')], { 'alias': 'prata' })), _0x1f8613 = parseInt(Inputmask[_0x500a43('0x2c')]('' + _0x4019b8[_0x500a43('0x1f')], { 'alias': _0x500a43('0x6f') })); return Inputmask[_0x500a43('0x9a')]('' + _0x1f8613 * _0xffa9d2, { 'alias': _0x500a43('0x6f') }); } }, { 'name': 'ignorar', 'type': _0x34900e('0x56'), 'title': _0x34900e('0xa3'), 'width': 0x78, 'itemTemplate': function (_0x1fa537, _0x2eff86) { const _0x32a294 = _0x34900e; return _0x2eff86[_0x32a294('0x4')] ? '' : $('<input>')[_0x32a294('0x45')](_0x32a294('0x1a'), _0x32a294('0x56'))['attr'](_0x32a294('0x3f'), _0x1fa537)[_0x32a294('0x76')](_0x32a294('0x26'), !0x0); } }, { 'type': _0x34900e('0x6d'), 'deleteButton': !0x1, 'editButton': !0x1, 'itemTemplate': function () { const _0x2c9203 = _0x34900e; return jsGrid['fields'][_0x2c9203('0x6d')][_0x2c9203('0x82')][_0x2c9203('0x31')]['apply'](this, arguments); } }], 'controller': { 'loadData': function () { const _0x4aafd6 = _0x34900e; BlockElement(_0x4aafd6('0x78')); var _0x4ee5b1 = $[_0x4aafd6('0x57')](); return $[_0x4aafd6('0x2d')]({ 'url': _0x4aafd6('0x5d'), 'data': { 'receitaReferenciaId': $(_0x4aafd6('0x19'))[_0x4aafd6('0x8c')](), 'quantidade': parseInt($(_0x4aafd6('0x3'))[_0x4aafd6('0x61')](_0x4aafd6('0x39'))), 'procNormal': $(_0x4aafd6('0x9'))['val']() }, 'dataType': _0x4aafd6('0x43') })['done'](function (_0x2f3fe9) { const _0x3da4ee = _0x4aafd6; _0x4ee5b1[_0x3da4ee('0x42')](_0x2f3fe9), UnblockElement(_0x3da4ee('0x78')); }), _0x4ee5b1['promise'](); } } }), $(_0x34900e('0x8a'))[_0x34900e('0x22')]({ 'width': _0x34900e('0x9b'), 'inserting': !0x1, 'editing': !0x0, 'sorting': !0x1, 'paging': !0x1, 'autoload': !0x0, 'selecting': !0x1, 'pageLoading': !0x1, 'onItemUpdated': function () { const _0x104add = _0x34900e; $(_0x104add('0x8a'))[_0x104add('0x22')](_0x104add('0x38')); }, 'onRefreshed': function (_0x14e7ac) { const _0x4164c4 = _0x34900e; var _0x785e55 = _0x14e7ac[_0x4164c4('0x58')][_0x4164c4('0x91')](_0x4164c4('0x74')), _0x5e1aab = { 'Img': '', 'Item': '', 'Quantidade': 0x0, 'Preco': 0x0, 'Total': 0x0, 'QuantidadePorCaixaImperial': 0x0, 'CaixaImperial': '', 'QuantidadeImperial': 0x0, 'ValorPorCaixa': 0x0, 'PrecoPorCaixa': 0x0, 'TotalImperial': 0x0, 'IsTotal': !0x0 }, _0x19d0b3; _0x785e55['forEach'](function (_0x8084d4) { const _0x3cda13 = _0x4164c4; let _0x3126b1 = 0x0, _0x5dd6ae = 0x0; _0x3126b1 = typeof _0x8084d4[_0x3cda13('0x37')] == _0x3cda13('0x1c') ? parseInt(Inputmask[_0x3cda13('0x2c')](_0x8084d4[_0x3cda13('0x37')], { 'alias': _0x3cda13('0x6f') })) : _0x8084d4[_0x3cda13('0x37')], _0x5dd6ae = typeof _0x8084d4[_0x3cda13('0x5b')] == _0x3cda13('0x1c') ? parseInt(Inputmask[_0x3cda13('0x2c')](_0x8084d4[_0x3cda13('0x5b')], { 'alias': _0x3cda13('0x6f') })) : _0x8084d4['quantidade'], _0x8084d4[_0x3cda13('0x9c')] === !0x1 && (_0x5e1aab[_0x3cda13('0x9d')] += _0x8084d4[_0x3cda13('0x79')], _0x5e1aab[_0x3cda13('0x3e')] += _0x5dd6ae * _0x3126b1, _0x5e1aab[_0x3cda13('0x80')] += _0x8084d4[_0x3cda13('0x79')] * _0x8084d4[_0x3cda13('0x98')], _0x5e1aab[_0x3cda13('0x84')] = _0x8084d4[_0x3cda13('0x98')]); }), _0x19d0b3 = $(_0x4164c4('0x34'))[_0x4164c4('0x6c')](_0x4164c4('0x4f')), _0x14e7ac[_0x4164c4('0x58')][_0x4164c4('0x77')](_0x19d0b3, _0x5e1aab), _0x14e7ac[_0x4164c4('0x58')][_0x4164c4('0xa0')][_0x4164c4('0x15')](_0x19d0b3); }, 'fields': [{ 'name': 'img', 'align': 'center', 'title': '', 'width': 0x50, 'itemTemplate': function (_0x5f0b62, _0x4299e4) { const _0x495b57 = _0x34900e; return _0x4299e4[_0x495b57('0x4')] ? _0x495b57('0x87') : _0x4299e4['img'] !== null && _0x4299e4['img'] !== undefined && _0x4299e4[_0x495b57('0x5a')] !== '' ? _0x495b57('0x7d') + _0x4299e4[_0x495b57('0x5a')] + _0x495b57('0x16') : _0x495b57('0x27'); } }, { 'name': 'item', 'title': _0x34900e('0x46'), 'type': _0x34900e('0x68'), 'width': 0xa0, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x194638, _0x341690) { const _0x2fc31e = _0x34900e; return _0x341690[_0x2fc31e('0x4')] ? '' : _0x194638; } }, { 'name': _0x34900e('0x5b'), 'type': _0x34900e('0x7a'), 'title': 'Qtd.\x20Produzida', 'width': 0x78, 'itemTemplate': function (_0x19c50e, _0x51cfe5) { const _0x154aa4 = _0x34900e; return _0x51cfe5['IsTotal'] ? '' : Inputmask[_0x154aa4('0x9a')]('' + _0x19c50e, { 'alias': _0x154aa4('0x6f') }); } }, { 'name': _0x34900e('0x37'), 'type': _0x34900e('0x7a'), 'title': 'Preço\x20Mercado', 'width': 0x78, 'itemTemplate': function (_0x44449d, _0x34df16) { const _0x24cfc6 = _0x34900e; return _0x34df16[_0x24cfc6('0x4')] ? '' : Inputmask[_0x24cfc6('0x9a')]('' + _0x44449d, { 'alias': 'prata' }); } }, { 'name': _0x34900e('0x5'), 'type': _0x34900e('0x7a'), 'title': 'Lucro\x20Bruto', 'width': 0x78, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x57052d, _0xee0ed0) { const _0x5eeaf2 = _0x34900e; if (_0xee0ed0[_0x5eeaf2('0x4')]) return Inputmask[_0x5eeaf2('0x9a')]('' + _0xee0ed0[_0x5eeaf2('0x3e')], { 'alias': 'prata' }); let _0x4e19df = parseInt(Inputmask[_0x5eeaf2('0x2c')]('' + _0xee0ed0[_0x5eeaf2('0x37')], { 'alias': _0x5eeaf2('0x6f') })), _0x886f66 = parseInt(Inputmask[_0x5eeaf2('0x2c')]('' + _0xee0ed0[_0x5eeaf2('0x5b')], { 'alias': _0x5eeaf2('0x6f') })), _0x35b77e = _0x886f66 * _0x4e19df; return Inputmask[_0x5eeaf2('0x9a')]('' + _0x35b77e, { 'alias': _0x5eeaf2('0x6f') }); } }, { 'name': _0x34900e('0xb'), 'type': _0x34900e('0x68'), 'title': _0x34900e('0xe'), 'visible': !0x1, 'width': 0x78, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x4e1104, _0x177bb3) { return _0x177bb3['IsTotal'] ? '' : _0x4e1104; } }, { 'name': _0x34900e('0x3b'), 'type': _0x34900e('0x68'), 'title': _0x34900e('0xe'), 'width': 0x78, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x2df1cb, _0x1315b9) { const _0x3a47be = _0x34900e; return _0x1315b9[_0x3a47be('0x4')] ? '' : _0x2df1cb; } }, { 'name': _0x34900e('0x79'), 'type': _0x34900e('0x7a'), 'title': _0x34900e('0x95'), 'width': 0xa0, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x3c07aa, _0x41396d) { const _0x3e9526 = _0x34900e; return _0x41396d[_0x3e9526('0x4')] ? _0x41396d['QuantidadeImperial'] + _0x3e9526('0x12') + Inputmask[_0x3e9526('0x9a')]('' + _0x41396d[_0x3e9526('0x84')], { 'alias': _0x3e9526('0x6f') }) + _0x3e9526('0x53') + Inputmask[_0x3e9526('0x9a')]('' + _0x41396d['TotalImperial'], { 'alias': _0x3e9526('0x6f') }) : _0x3c07aa; } }, { 'name': _0x34900e('0x98'), 'type': _0x34900e('0x7a'), 'title': _0x34900e('0x35'), 'width': 0x78, 'editing': !0x1, 'inserting': !0x1, 'itemTemplate': function (_0x2ee4f6, _0x39ec48) { const _0x25df4b = _0x34900e; return _0x39ec48[_0x25df4b('0x4')] ? '' : Inputmask[_0x25df4b('0x9a')]('' + _0x2ee4f6, { 'alias': _0x25df4b('0x6f') }); } }, { 'name': _0x34900e('0x50'), 'type': 'prataField', 'title': _0x34900e('0x35'), 'width': 0x78, 'visible': !0x1, 'editing': !0x1, 'inserting': !0x1 }, { 'name': _0x34900e('0x9c'), 'type': _0x34900e('0x56'), 'title': _0x34900e('0xa3'), 'width': 0x78, 'itemTemplate': function (_0x6099f9, _0x253146) { const _0x5f0096 = _0x34900e; return _0x253146[_0x5f0096('0x4')] ? '' : $('<input>')['prop']('type', _0x5f0096('0x56'))[_0x5f0096('0x76')](_0x5f0096('0x3f'), _0x6099f9)['attr'](_0x5f0096('0x26'), !0x0); } }, { 'type': _0x34900e('0x6d'), 'deleteButton': !0x1, 'editButton': !0x1, 'itemTemplate': function (_0x557448, _0x13ae25) { const _0x48a4ae = _0x34900e; if (_0x13ae25[_0x48a4ae('0x4')]) return ''; return jsGrid[_0x48a4ae('0x4c')][_0x48a4ae('0x6d')][_0x48a4ae('0x82')]['itemTemplate']['apply'](this, arguments); } }], 'controller': { 'loadData': function () { const _0xbc26d5 = _0x34900e; BlockElement($('#resultados')); var _0xd2734a = $['Deferred'](); return $[_0xbc26d5('0x2d')]({ 'url': _0xbc26d5('0x66'), 'data': { 'receitaReferenciaId': $('#receitaSelect')['val'](), 'quantidade': parseInt($(_0xbc26d5('0x3'))[_0xbc26d5('0x61')](_0xbc26d5('0x39'))), 'procNormal': $(_0xbc26d5('0x9'))[_0xbc26d5('0x8c')](), 'procRaro': $(_0xbc26d5('0x1'))['val'](), 'maestria': $(_0xbc26d5('0x71'))[_0xbc26d5('0x8c')](), 'maestriaImperial': maestriaImperialSelecionada }, 'dataType': 'json' })[_0xbc26d5('0x70')](function (_0x8e5dd9) { const _0x206f91 = _0xbc26d5; _0xd2734a[_0x206f91('0x42')](_0x8e5dd9), UnblockElement($(_0x206f91('0x94'))); }), _0xd2734a[_0xbc26d5('0x7b')](); } } }); } _0x1a06f2(), _0x10958d(), _0x5f4866(), _0x431402(), _0x1ea0c4(), _0x3863be(); });