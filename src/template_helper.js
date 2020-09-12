"use strict";

class TemplateHelper {
    /**
     * The Template.
     *
     * @type {string/HTML|null}
     */
    template = null;
    /**
     * The Container of where the parsed Content should be placed in.
     *
     * @type {DOM-Node|null}
     */
    container = null;
    /**
     * `data-` HTML Attribute Compatible name that identifies the unique value for every parsed Template.
     *
     * @type {string|null}
     */
    guid_data_attr = null;

    constructor(template, container, options) {
        if (typeof template === 'undefined')
            throw new Error('Template must be given as parameter #1.');
        if (typeof container === 'undefined')
            throw new Error('Container must be given as parameter #2.');

        this.setTemplate(template);
        this.setContainer(container);
        this.setOptions(options);
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

    getGUIDDataAttr() {
        return this.guid_data_attr;
    }

    setGUIDDataAttr(attr) {
        this.guid_data_attr = attr;
        return this;
    }

    setOptions(options) {
        if (options.guid_data_attr)
            this.setGUIDDataAttr(options.guid_data_attr);

        return this;
    }

    render(data = [], clear_container = false) {
        let content = this.getParsedContent(data);

        if (clear_container === true)
            this.getContainer().innerHTML = '';

        this.getContainer().innerHTML += Object.values(content).join('');
        return this;
    }

    replace(guid, data) {
        let element = this.getElementByGUID(guid);
        if (element === null)
            throw new Error(`Element with guid ${guid} not found`);

        let content = this.getParsedContent([data]);
        element.outerHTML = Object.values(content);
        return this;
    }

    remove(guid) {
        let element = this.getElementByGUID(guid);
        if (element === null)
            throw new Error(`Element with guid ${guid} not found`);

        element.remove();
        // Return success if the element could not be found anymore.
        return (this.getElementByGUID(guid) === null);
    }

    getParsedContent(data = []) {
        // Parse Content
        let parser = new TemplateParser(this.getTemplate());
        let content = parser.parse(data);

        // Parse JS
        for (const [pdc_index, parsed_data_content] of Object.entries(content)) {
            let js_parts = new TemplateParser(parsed_data_content);
            js_parts.getTemplate().setVariableLookarounds(['[[', ']]']);

            // Retrieve JS code blocks
            let code_blocks = js_parts.getTemplate().getDatakeys();
            let code_blocks_replacement_map = [];
            code_blocks.forEach((code_block_obj) => {
                let code_block = code_block_obj.getDataPath();
                let js_eval_result = eval(code_block);
                let replacement_obj = {};
                replacement_obj[code_block] = js_eval_result;

                code_blocks_replacement_map.push(replacement_obj);
            });
            content[pdc_index] = js_parts.parse(code_blocks_replacement_map)[0];
        }
        return content;
    }

    getElementByGUID(guid) {
        let data_attr = this.getGUIDDataAttr();
        let dom_selector = `[data-${data_attr}="${guid}"]`;
        return document.querySelector(dom_selector);
    }
}
