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

var TemplateDataKey = /*#__PURE__*/ (function () {
    /**
     * The full key in the data, e.x {{ User.name }}
     *
     * @type {string|null}
     */

    /**
     * The full path of where the value for this datakey is stored in the given data, e.x. User.name
     *
     * @type {string|null}
     */
    function TemplateDataKey(datakey, datapath) {
        _classCallCheck(this, TemplateDataKey);

        _defineProperty(this, "datakey", null);

        _defineProperty(this, "datapath", null);

        this.setDataKey(datakey);
        this.setDataPath(datapath);
    }

    _createClass(TemplateDataKey, [
        {
            key: "getDataKey",
            value: function getDataKey() {
                return this.datakey;
            }
        },
        {
            key: "setDataKey",
            value: function setDataKey(datakey) {
                this.datakey = datakey;
                return this;
            }
        },
        {
            key: "getDataPath",
            value: function getDataPath() {
                return this.datapath;
            }
        },
        {
            key: "setDataPath",
            value: function setDataPath(datapath) {
                this.datapath = datapath;
                return this;
            }
        }
    ]);

    return TemplateDataKey;
})();
