"use strict";
/**
 * Example data:
 * ```js
 * var example_data = [
 *     0: {
 *         User: {
 *             id: 6,
 *             name: "Sander Tuinstra",
 *             Project: {
 *                 id: 12,
 *                 name: "Test Project"
 *             }
 *         }
 *     }
 * ];
 * ```
 *
 * Example Caller:
 * ```js
 *      let template = new TemplateHelper('#tpl', '.ctn', {
 *          guid_data_attr: "id",
 *          sort : {
 *              field     : 'User.sort',
 *              direction : 'asc'
 *          }
 *      });
 * ```
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

var TemplateHelper = /*#__PURE__*/ (function () {
    /**
     * The Template.
     *
     * @type {string/HTML|null}
     */

    /**
     * The Container of where the parsed Content should be placed in.
     *
     * @type {DOM-Node|null}
     */

    /**
     * `data-` HTML Attribute Compatible name that identifies the unique value for every earsed Template.
     *
     * @type {string|null}
     */

    /**
     * The Sort Settings
     *
     * @type {object}
     *
     * {
     *     [string]         field     The name of the field in the data to sort on.
     *     [enum(asc|desc)] direction Sort Ascending (ASC) or Descending (DESC)?
     * }
     *
     * @param {string} field
     * @parakk
     */
    function TemplateHelper(template, container, options) {
        _classCallCheck(this, TemplateHelper);

        _defineProperty(this, "template", null);

        _defineProperty(this, "container", null);

        _defineProperty(this, "guid_data_attr", null);

        _defineProperty(this, "sort", {
            field: "id",
            direction: "asc"
        });

        if (typeof template === "undefined")
            throw new Error("Template must be given as parameter #1.");
        if (typeof container === "undefined")
            throw new Error("Container must be given as parameter #2.");
        this.setTemplate(template);
        this.setContainer(container);
        this.setOptions(options);
        return this;
    }

    _createClass(TemplateHelper, [
        {
            key: "getTemplate",
            value: function getTemplate() {
                return this.template;
            }
        },
        {
            key: "setTemplate",
            value: function setTemplate(selector) {
                if (document.querySelector(selector) === null) return this;
                this.template = document.querySelector(selector).innerHTML;
                return this;
            }
        },
        {
            key: "getContainer",
            value: function getContainer() {
                return this.container;
            }
        },
        {
            key: "setContainer",
            value: function setContainer(selector) {
                if (document.querySelector(selector) === null) return this;
                this.container = document.querySelector(selector);
                return this;
            }
        },
        {
            key: "getGUIDDataAttr",
            value: function getGUIDDataAttr() {
                return this.guid_data_attr;
            }
        },
        {
            key: "setGUIDDataAttr",
            value: function setGUIDDataAttr(attr) {
                this.guid_data_attr = attr;
                return this;
            }
        },
        {
            key: "getSort",
            value: function getSort() {
                return this.sort;
            }
        },
        {
            key: "setSort",
            value: function setSort(settings) {
                if (settings.field) this.sort.field = settings.field;
                if (settings.direction) this.sort.direction = settings.direction;
                return this;
            }
        },
        {
            key: "setOptions",
            value: function setOptions(options) {
                if (options.guid_data_attr)
                    this.setGUIDDataAttr(options.guid_data_attr);
                if (options.sort) this.setSort(options.sort);
                return this;
            }
        },
        {
            key: "render",
            value: function render() {
                var data =
                    arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : [];
                var clear_container =
                    arguments.length > 1 && arguments[1] !== undefined
                    ? arguments[1]
                    : false;
                var parsable_data = this.getSortedData(data);
                var content = this.getParsedContent(parsable_data);
                if (clear_container === true) this.getContainer().innerHTML = "";
                this.getContainer().innerHTML += Object.values(content).join("");
                return this;
            }
        },
        {
            key: "replace",
            value: function replace(guid, data) {
                var element = this.getElementByGUID(guid);
                if (element === null)
                    throw new Error("Element with guid ".concat(guid, " not found"));
                var content = this.getParsedContent([data]);
                element.outerHTML = Object.values(content);
                return this;
            }
        },
        {
            key: "remove",
            value: function remove(guid) {
                var element = this.getElementByGUID(guid);
                if (element === null)
                    throw new Error("Element with guid ".concat(guid, " not found"));
                element.remove(); // Return success if the element could not be found anymore.

                return this.getElementByGUID(guid) === null;
            }
        },
        {
            key: "getParsedContent",
            value: function getParsedContent() {
                var data =
                    arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : [];
                // Parse Content
                var parser = new TemplateParser(this.getTemplate());
                var content = parser.parse(data); // Parse JS

                var _loop = function _loop() {
                    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                        pdc_index = _Object$entries$_i[0],
                        parsed_data_content = _Object$entries$_i[1];

                    var js_parts = new TemplateParser(parsed_data_content);
                    js_parts.getTemplate().setVariableLookarounds(["[[", "]]"]); // Retrieve JS code blocks

                    var code_blocks = js_parts.getTemplate().getDatakeys();
                    var code_blocks_replacement_map = [];
                    code_blocks.forEach(function (code_block_obj) {
                        var code_block = code_block_obj.getDataPath();
                        var js_eval_result = eval(code_block);
                        var replacement_obj = {};
                        replacement_obj[code_block] = js_eval_result;
                        code_blocks_replacement_map.push(replacement_obj);
                    });
                    content[pdc_index] = js_parts.parse(code_blocks_replacement_map)[0];
                };

                for (
                    var _i = 0, _Object$entries = Object.entries(content);
                    _i < _Object$entries.length;
                    _i++
                ) {
                    _loop();
                }

                return content;
            }
        },
        {
            key: "getSortedData",
            value: function getSortedData() {
                var _this = this;

                var data =
                    arguments.length > 0 && arguments[0] !== undefined
                    ? arguments[0]
                    : [];
                var first_object = data[Object.keys(data)[0]];
                if (first_object.length === 0) return data;
                var sort_settings = this.getSort();
                var sort_field_path = sort_settings.field.split(".");
                var field_data_sample = first_object;

                for (var sort_field_path_piece in sort_field_path) {
                    field_data_sample =
                        field_data_sample[sort_field_path[sort_field_path_piece]] || "";
                }

                var output = data;
                switch (_typeof(field_data_sample)) {
                    case "number":
                        output.sort(function (a, b) {
                            var cmp_a = _this.getDataFromObjectByPath(
                                a,
                                sort_settings.field,
                                "."
                            );

                            var cmp_b = _this.getDataFromObjectByPath(
                                b,
                                sort_settings.field,
                                "."
                            );

                            return parseInt(cmp_a) - parseInt(cmp_b);
                        });
                        break;

                    case "string":
                        if (isNaN(Date.parse(field_data_sample)) === false) {
                            // Date sort
                            output.sort(function (a, b) {
                                var cmp_a = _this.getDataFromObjectByPath(
                                    a,
                                    sort_settings.field,
                                    "."
                                );

                                var cmp_b = _this.getDataFromObjectByPath(
                                    b,
                                    sort_settings.field,
                                    "."
                                );

                                return new Date(cmp_a) - new Date(cmp_b);
                            });
                        } else {
                            // Normale Alphabetic sort
                            output.sort(function (a, b) {
                                var cmp_a = _this.getDataFromObjectByPath(
                                    a,
                                    sort_settings.field,
                                    "."
                                );

                                var cmp_b = _this.getDataFromObjectByPath(
                                    b,
                                    sort_settings.field,
                                    "."
                                );

                                return cmp_a.toLowerCase().localeCompare(cmp_b.toLowerCase());
                            });
                        }

                        break;
                }

                return sort_settings.direction === "DESC" ? output.reverse() : output;
            }
        },
        {
            key: "getElementByGUID",
            value: function getElementByGUID(guid) {
                var data_attr = this.getGUIDDataAttr();
                var dom_selector = "[data-".concat(data_attr, '="').concat(guid, '"]');
                return document.querySelector(dom_selector);
            }
            /**
             * Path is splitted with dots
             */
        },
        {
            key: "getDataFromObjectByPath",
            value: function getDataFromObjectByPath(object, path) {
                var delimiter =
                    arguments.length > 2 && arguments[2] !== undefined
                    ? arguments[2]
                    : ".";
                path = path.split(delimiter);
                var output = object;

                for (var path_piece in path) {
                    output = output[path[path_piece]] || "";
                }

                return output;
            }
        }
    ]);

    return TemplateHelper;
})();
