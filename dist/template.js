"use strict";

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

function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj;
        };
    } else {
        _typeof = function _typeof(obj) {
            return obj &&
                typeof Symbol === "function" &&
                obj.constructor === Symbol &&
                obj !== Symbol.prototype
                ? "symbol"
                : typeof obj;
        };
    }
    return _typeof(obj);
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

var Template = /*#__PURE__*/ (function () {
    /**
     * The Template which contains the "Template Variable Lookarounds".
     *
     * @type {string|null}
     */

    /**
     * The Characters in the Template string that define a Template Variable, e.x. `{{ var }}`.
     *
     * @type {array}
     */

    /**
     * The found keys in the @see Template.definition that contains the data.
     *
     * @type {array}
     */
    function Template(definition) {
        _classCallCheck(this, Template);

        _defineProperty(this, "definition", null);

        _defineProperty(this, "variable_lookarounds", ["{{", "}}"]);

        _defineProperty(this, "datakeys", []);

        this.setDefinition(definition);
    }

    _createClass(Template, [
        {
            key: "getDefinition",
            value: function getDefinition() {
                return this.definition;
            }
        },
        {
            key: "setDefinition",
            value: function setDefinition(definition) {
                if (typeof definition !== "string")
                    throw new Error("Template Definition must be a string");
                this.definition = definition;
                return this;
            }
        },
        {
            key: "getVariableLookarounds",
            value: function getVariableLookarounds() {
                return this.variable_lookarounds;
            }
        },
        {
            key: "getVariableLookaround",
            value: function getVariableLookaround(type) {
                if (type !== "lookbehind" && type !== "lookahead") {
                    throw new Error('Type must be "lookbehind" or "lookahead"');
                }

                var lookarounds = this.variable_lookarounds;
                return type === "lookbehind" ? lookarounds[0] : lookarounds[1];
            }
        },
        {
            key: "setVariableLookarounds",
            value: function setVariableLookarounds(lookarounds) {
                if (_typeof(lookarounds) !== "object")
                    throw new Error("Template Lookarounds must be of type array");
                if (lookarounds.length !== 2)
                    throw new Error(
                        'Template Lookarounds must only contain the lookbehind (e.x. "{{") and lookahead (e.x. "}}")'
                    );

                for (
                    var _i = 0, _Object$entries = Object.entries(lookarounds);
                    _i < _Object$entries.length;
                    _i++
                ) {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                        index = _Object$entries$_i[0],
                        lookaround = _Object$entries$_i[1];

                    if (
                        lookaround.includes("[") === false &&
                        lookaround.includes("]") === false
                    )
                        continue; // Add Regex Slashes

                    var regex_compatible_lookaround = "";
                    var exploded = lookaround.split("");

                    for (
                        var _i2 = 0, _Object$entries2 = Object.entries(exploded);
                        _i2 < _Object$entries2.length;
                        _i2++
                    ) {
                        var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                            char_index = _Object$entries2$_i[0],
                            lookaround_char = _Object$entries2$_i[1];

                        regex_compatible_lookaround += "\\" + lookaround_char;
                    }

                    lookarounds[index] = regex_compatible_lookaround;
                }

                this.variable_lookarounds = lookarounds;
                return this;
            }
        },
        {
            key: "getDatakeys",
            value: function getDatakeys() {
                if (this.datakeys.length === 0)
                    this.setDatakeys(this.extractDatakeys());
                return this.datakeys;
            }
        },
        {
            key: "setDatakeys",
            value: function setDatakeys(datakeys) {
                this.datakeys = datakeys;
                return this;
            }
        },
        {
            key: "extractDatakeys",
            value: function extractDatakeys() {
                var lookbehind = this.getVariableLookaround("lookbehind");
                var lookahead = this.getVariableLookaround("lookahead");
                var data_keys = [];
                var regex = new RegExp(
                    "(".concat(lookbehind, "s*(.*?)s*").concat(lookahead, ")"),
                    "gms"
                ); // Get all the Data Keys from the definition

                var full_matches = this.getDefinition().match(regex);

                for (
                    var _i3 = 0, _Object$entries3 = Object.entries(full_matches);
                    _i3 < _Object$entries3.length;
                    _i3++
                ) {
                    var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2),
                        full_match_index = _Object$entries3$_i[0],
                        full_match = _Object$entries3$_i[1];

                    var sanitized_match = full_match; // Remove lookbehind, e.x. {{

                    var replace_lookbehind_regex = new RegExp(
                        "".concat(lookbehind, "s?"),
                        "g"
                    );
                    sanitized_match = sanitized_match
                        .replace(replace_lookbehind_regex, "")
                        .trim(); // Remove lookahead, e.x. }}

                    var replace_lookahead_regex = new RegExp("s?".concat(lookahead), "g");
                    sanitized_match = sanitized_match
                        .replace(replace_lookahead_regex, "")
                        .trim(); // Create new TemplateDataKey Object.

                    var tpl_data_key_obj = new TemplateDataKey(
                        full_match,
                        sanitized_match
                    );
                    data_keys.push(tpl_data_key_obj);
                }

                return data_keys;
            }
        }
    ]);

    return Template;
})();
