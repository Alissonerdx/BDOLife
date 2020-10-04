
const TIPO = {
    None: 0,
    Item: 1,
    Material: 2,
    Receita: 3
};

const GRAU = {
    Branco: 0,
    Verde: 1,
    Azul: 2,
    Ouro: 3,
    Laranja: 4
};

function formatState(state) {
    var $state;
    if (state.img !== null && state.img !== undefined && state.img !== "") {
        $state = $(
            `<span><img src="${state.img}" class="img-flag" />  ${state.text}</span>`
        );
    }
    else {
        $state = $(
            `<span>${state.text}</span>`
        );
    }
    return $state;
}

$(document).ready(function () {

    jsGrid.locale("pt-br");
    CamposCustomizadosJsGrid();

    $(".switchBootstrap").bootstrapSwitch();

    $('.icheckbox-custom').iCheck({
        checkboxClass: "icheckbox_square-red",
        radioClass: "iradio_square-red"
    });

    Inputmask.extendAliases({
        'integer': {
            allowPlus: false,
            allowMinus: false
        },
        'prata': {
            alias: 'decimal',
            radixPoint: ",",
            groupSeparator: ".",
            autoGroup: true,
            digits: 0,
            digitsOptional: false,
            placeholder: '0',
            rightAlign: false,
            allowPlus: false,
            allowMinus: false,
            onBeforeMask: function (value, opts) {
                return value;
            }
        },
        'prataNegativo': {
            alias: 'decimal',
            radixPoint: ",",
            groupSeparator: ".",
            autoGroup: true,
            digits: 0,
            digitsOptional: false,
            placeholder: '0',
            rightAlign: false,
            allowPlus: false,
            allowMinus: true,
            onBeforeMask: function (value, opts) {
                return value;
            }
        },
        'real': {
            alias: 'decimal',
            radixPoint: ",",
            groupSeparator: ".",
            autoGroup: true,
            digits: 2,
            digitsOptional: false,
            placeholder: '0',
            rightAlign: false,
            allowPlus: false,
            allowMinus: false,
            onBeforeMask: function (value, opts) {
                return value;
            }
        },
        'proc': {
            mask: "9[,99]",
            greedy: false,
            definitions: {
                '*': {
                    validator: "[0-9]"
                }
            },
            rightAlign: true,
            placeholder: ""
        },
        'proc-2': {
            alias: 'decimal',
            integerDigits: 3,
            digits: 2,
            autoGroup: true,
            groupSeparator: ".",
            radixPoint: ",",
            greedy: false,
            rightAlign: true,
            placeholder: ""
        },
        'porcentagem': {
            alias: "percentage",
            digits: "2",
            rightAlign: false,
            suffix: "%",
            integerDigits: 5,
            digitsOptional: true,
            allowPlus: true,
            allowMinus: true,
            placeholder: "0",
            min: -10000,
            max: 10000,
            numericInput: true
        }

    });

    function CamposCustomizadosJsGrid() {

        var prataField = function (config) {
            jsGrid.Field.call(this, config);
        };

        prataField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                console.log(num1, num2)
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "prata" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("prata");
                return this._insertPicker;
            },
            editTemplate: function (value) {

                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("prata");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.prataField = prataField;

        var prataNegativoField = function (config) {
            jsGrid.Field.call(this, config);
        };

        prataNegativoField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "prataNegativo" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("prata");
                return this._insertPicker;
            },
            editTemplate: function (value) {

                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("prata");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.prataNegativoField = prataNegativoField;

        var porcentagemField = function (config) {
            jsGrid.Field.call(this, config);
        };

        porcentagemField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "porcentagem" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("porcentagem");
                return this._insertPicker;
            },
            editTemplate: function (value) {

                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("porcentagem");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.porcentagemField = porcentagemField;

        var realField = function (config) {
            jsGrid.Field.call(this, config);
        };

        realField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "real" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("real");
                return this._insertPicker;
            },
            editTemplate: function (value) {

                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("real");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.realField = realField;


        var quantidadeField = function (config) {
            jsGrid.Field.call(this, config);
        };

        quantidadeField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "integer" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("integer");
                return this._insertPicker;
            },
            editTemplate: function (value) {
                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("integer");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.quantidadeField = quantidadeField;

        var NumberField = jsGrid.NumberField;

        function Select2Field(config) {
            this.items = [];
            this.selectedIndex = -1;
            this.selectedValue = 0;
            this.valueField = "";
            this.textField = "";
            this.imgField = "";

            if (config.valueField && config.items.length)
                this.valueType = typeof config.items[0][config.valueField];
            this.sorter = this.valueType;
            NumberField.call(this, config);
        }

        Select2Field.prototype = new NumberField({
            align: "left",
            valueType: "number",

            itemTemplate: function (value) {
                var items = this.items,
                    valueField = this.valueField,
                    textField = this.textField,
                    imgField = this.imgField,
                    resultItem;

                if (valueField) {
                    resultItem = $.grep(items, function (item, index) {
                        return item[valueField] === value;
                    })[0] || {};
                }
                else
                    resultItem = items[value];

                var result = (textField ? resultItem[textField] : resultItem);
                return (result === undefined || result === null) ? "" : result;
            },

            filterTemplate: function () {
                if (!this.filtering)
                    return "";

                var grid = this._grid,
                    $result = this.filterControl = this._createSelect();
                this._applySelect($result, this);

                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },

            insertTemplate: function () {
                if (!this.inserting)
                    return "";

                var $result = this.insertControl = this._createSelect();
                this._applySelect($result, this);
                return $result;
            },

            editTemplate: function (value) {
                if (!this.editing)
                    return this.itemTemplate(value);

                var $result = this.editControl = this._createSelect();
                (value !== undefined) && $result.val(value);
                this._applySelect($result, this);
                return $result;
            },

            filterValue: function () {
                var val = this.filterControl.val();
                return this.valueType === "number" ? parseInt(val || 0, 10) : val;
            },

            insertValue: function () {
                var val = this.insertControl.val();
                return this.valueType === "number" ? parseInt(val || 0, 10) : val;
            },

            editValue: function () {
                var val = this.editControl.val();
                return this.valueType === "number" ? parseInt(val || 0, 10) : val;
            },

            _applySelect: function (item, self) {
                setTimeout(function () {
                    var selectSiteIcon = function (opt) {
                        var img = '';
                        try {
                            img = opt.element.attributes.img.value;
                        } catch (e) { }
                        if (!opt.id || !img)
                            return opt.text;
                        var res = $('<span><img src="' + img + '" class="img-flag"/> ' + opt.text + '</span>');
                        return res;
                    }
                    item.select2({
                        width: "100%",
                        language: "pt-BR",
                        templateResult: selectSiteIcon,
                        templateSelection: selectSiteIcon
                    });
                });
            },

            _createSelect: function () {
                var $result = $("<select>"),
                    valueField = this.valueField,
                    textField = this.textField,
                    imgField = this.imgField,
                    selectedIndex = this.selectedIndex,
                    selectedValue = this.selectedValue;

                $.each(this.items, function (index, item) {
                    var value = valueField ? item[valueField] : index,
                        text = textField ? item[textField] : item,
                        img = imgField ? item[imgField] : '';

                    var $option = $("<option>")
                        .attr("value", value)
                        .attr("img", img)
                        .text(text)
                        .appendTo($result);

                    $option.prop("selected", (selectedValue === item[valueField]));
                });

                return $result;
            }
        });

        jsGrid.fields.select2 = jsGrid.Select2Field = Select2Field;


        var DateField = function (config) {
            jsGrid.Field.call(this, config);
        };

        DateField.prototype = new jsGrid.Field({
            sorter: function (date1, date2) {
                return new Date(date1) - new Date(date2);
            },

            itemTemplate: function (value) {
                if (value === null || value === undefined || value === "")
                    return "";

                return formatDate(new Date(value));
            },

            insertTemplate: function (value) {
                return this._insertPicker = $("<input>").datepicker({ defaultDate: new Date(), dateFormat: "dd/mm/yy" });
            },

            editTemplate: function (value) {
                if (value === null || value === undefined || value === "")
                    return this._editPicker = $("<input>").datepicker({ dateFormat: "dd/mm/yy" });

                return this._editPicker = $("<input>").datepicker({ dateFormat: "dd/mm/yy" }).datepicker("setDate", new Date(value));
            },

            insertValue: function () {
                var insertValue = this._insertPicker.datepicker("getDate");
                if (insertValue !== null && insertValue !== 'undefined') {
                    return formatDate(this._insertPicker.datepicker("getDate"));//.toISOString();
                }
                return null;
            },

            editValue: function () {
                var editValue = this._editPicker.datepicker("getDate");
                if (editValue !== null && editValue !== 'undefined') {
                    return formatDate(this._editPicker.datepicker("getDate"));//.toISOString();
                }
                return null;
            }
        });

        jsGrid.fields.date = DateField;

        var procField = function (config) {
            jsGrid.Field.call(this, config);
        };

        procField.prototype = new jsGrid.Field({
            sorter: function (num1, num2) {
                return num1 - num2;
            },
            itemTemplate: function (value) {
                return Inputmask.format(`${value}`, { alias: "proc" });
            },
            insertTemplate: function (value) {
                this._insertPicker = $('<input type="text">').val(value);
                this._insertPicker.inputmask("proc");
                return this._insertPicker;
            },
            editTemplate: function (value) {
                if (!this.editing) {
                    return this.itemTemplate.apply(this, arguments);
                }

                this._editPicker = $('<input type="text">').val(value);
                this._editPicker.inputmask("proc");
                return this._editPicker;
            },
            filterTemplate: function () {
                if (!this.filtering) return "";

                var grid = this._grid,
                    $result = $('<input type="text">').val(0);
                if (this.autosearch) {
                    $result.on("change", function (e) {
                        grid.search();
                    });
                }

                return $result;
            },
            filterValue: function () {
                return this._insertPicker.val();
            },
            insertValue: function () {
                return this._insertPicker.val();
            },
            editValue: function () {
                return this._editPicker.val();
            }
        });

        jsGrid.fields.procField = procField;
    }
});

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('/');
}


function BlockElement(element) {
    $(element).block({
        centerY: false,
        centerX: false,
        message: '<div class="ft-refresh-cw icon-spin font-medium-2"></div>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.8,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'transparent'
        }
    });
}

function UnblockElement(element) {
    $(element).unblock();
}

function formatState(state) {
    var $state;
    if (state.img !== null && state.img !== undefined && state.img !== "") {
        $state = $(
            `<span><img src="${state.img}" class="img-flag" />  ${state.text}</span>`
        );
    }
    else {
        $state = $(
            `<span>${state.text}</span>`
        );
    }
    return $state;
}

$('.mask-quantidade').inputmask({
    alias: "integer",
    allowMinus: false,
    mask: "9999999",
});

$('.mask-proc').inputmask({
    mask: "9[,99]",
    greedy: false,
    clearIncomplete: true,
    showMaskOnHover: false,
    showMaskOnFocus: false,
    clearMaskOnLostFocus: true,
    autoclear: false,
    definitions: {
        '*': {
            validator: "[0-9]"
        }
    },
    rightAlign: true
});
