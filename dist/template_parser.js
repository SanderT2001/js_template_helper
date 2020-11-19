"use strict";
/**
 * @uses template
 */

function _instanceof(left, right) {
    if (
        right != null &&
        typeof Symbol !== "undefined" &&
        right[Symbol.hasInstance]
    ) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _slicedToArray(arr, i) {
    return (
        _arrayWithHoles(arr) ||
        _iterableToArrayLimit(arr, i) ||
        _unsupportedIterableToArray(arr, i) ||
        _nonIterableRest()
    );
}

function _nonIterableRest() {
    throw new TypeError(
        "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}

function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i];
    }
    return arr2;
}

function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr)))
        return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;
    try {
        for (
            var _i = arr[Symbol.iterator](), _s;
            !(_n = (_s = _i.next()).done);
            _n = true
        ) {
            _arr.push(_s.value);
            if (i && _arr.length === i) break;
        }
    } catch (err) {
        _d = true;
        _e = err;
    } finally {
        try {
            if (!_n && _i["return"] != null) _i["return"]();
        } finally {
            if (_d) throw _e;
        }
    }
    return _arr;
}

function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}

var TemplateParser = /*#__PURE__*/ (function () {
    /**
     * @type {TemplateParser}
     */
    function TemplateParser(template) {
        _classCallCheck(this, TemplateParser);

        _defineProperty(this, "template", null);

        this.setTemplate(template);
        return this;
    }

    _createClass(TemplateParser, [
        {
            key: "getTemplate",
            value: function getTemplate() {
                return this.template;
            }
        },
        {
            key: "setTemplate",
            value: function setTemplate(template) {
                this.template = new Template(template);
                return this;
            }
        },
        {
            key: "parse",
            value: function parse(data) {
                var datakeys = this.getTemplate().getDatakeys();
                var parsed_template = {};

                for (
                    var _i = 0, _Object$entries = Object.entries(data);
                    _i < _Object$entries.length;
                    _i++
                ) {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                        data_index = _Object$entries$_i[0],
                        data_to_parse = _Object$entries$_i[1];

                    var replace_map = {};

                    for (
                        var _i2 = 0, _Object$entries2 = Object.entries(datakeys);
                        _i2 < _Object$entries2.length;
                        _i2++
                    ) {
                        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                            data_key_index = _Object$entries2$_i[0],
                            template_data_key = _Object$entries2$_i[1];

                        var template_data_path = template_data_key.getDataPath().split(".");
                        var tmp_data = data_to_parse;

                        for (var template_data_path_index in template_data_path) {
                            tmp_data =
                                tmp_data[template_data_path[template_data_path_index]] || "";
                        }

                        replace_map[template_data_key.getDataKey()] = tmp_data;
                    } // Parse data keys in template

                    var tmp_tpl = this.getTemplate().getDefinition();

                    for (
                        var _i3 = 0, _Object$entries3 = Object.entries(replace_map);
                        _i3 < _Object$entries3.length;
                        _i3++
                    ) {
                        var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                            source = _Object$entries3$_i[0],
                            replacement = _Object$entries3$_i[1];

                        tmp_tpl = tmp_tpl.replace(source, replacement);
                    }

                    parsed_template[data_index] = tmp_tpl;
                }

                return parsed_template;
            }
        }
    ]);

    return TemplateParser;
})();
