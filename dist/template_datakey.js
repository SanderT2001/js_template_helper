class TemplateDataKey {
    /**
     * The full key in the data, e.x {{ User.name }}
     *
     * @type {string|null}
     */
    datakey = null;
    /**
     * The full path of where the value for this datakey is stored in the given data, e.x. User.name
     *
     * @type {string|null}
     */
    datapath = null;

    constructor(datakey, datapath) {
        this.setDataKey(datakey);
        this.setDataPath(datapath);
    }

    getDataKey() {
        return this.datakey;
    }

    setDataKey(datakey) {
        this.datakey = datakey;
        return this;
    }

    getDataPath() {
        return this.datapath;
    }

    setDataPath(datapath) {
        this.datapath = datapath;
        return this;
    }
}
