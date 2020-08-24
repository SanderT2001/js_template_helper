class Url {
    /**
     * Label for the URL
     *
     * @type {string|null}
     */
    label = null;
    /**
     * The actual Link (e.x. https://example.ex/
     *
     * @type {string|null}
     */
    link = null;

    constructor(label, link) {
        this.setLabel(label);
        this.setLink(link);
    }

    getLabel() {
        return this.label;
    }

    setLabel(label) {
        this.label = label;
        return this;
    }

    getLink() {
        return this.link;
    }

    setLink(link) {
        this.link = link;
        return this;
    }
}

