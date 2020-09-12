"use strict";

class TemplateHelper {
    /**
     * The Template.
     *
     * @type {string/HTML|null}
     */
    template = null;
    /**
     * The Container of where the parsed HTML should be placed in.
     *
     * @type {DOM-Node|null}
     */
    container = null;

    constructor(options) {
        if (options.template !== undefined)
            this.setTemplate(options.template);
        if (options.container !== undefined)
            this.setContainer(options.container);

        return this;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(selector) {
        if (document.querySelector(selector) === null)
            return this;

        this.template = document.querySelector(selector).innerHTML;
        return this;
    }

    getContainer() {
        return this.container;
    }

    setContainer(selector) {
        if (document.querySelector(selector) === null)
            return this;

        this.container = document.querySelector(selector);
        return this;
    }

    render(data = [], clear_container = false) {
        let l = new TemplateParser(this.getTemplate()).parse(data);
        for (const [index, d] of Object.entries(l)) {

            let replacement_map = {};
            let tpl = new Template(d).setVariableLookarounds(['[[', ']]']);
            let code_blocks = tpl.getDatakeys();
            for (let [full, sanitized] of Object.entries(code_blocks)) {
                full = sanitized.getDataKey();
                sanitized = sanitized.getDataPath();
                replacement_map[full] = eval(sanitized);
            }

            for (const [search, replace] of Object.entries(replacement_map)) {
                l[index] = d.replace(search, replace);
            }
        }

        if (clear_container === true)
            this.getContainer().innerHTML = '';

        this.getContainer().innerHTML += Object.values(l).join('');
        return this;
    }

    replace(guid, data) {
        throw new Error("Not Implemented");
    }

    remove(guid) {
        throw new Error("Not Implemented");
    }
}
