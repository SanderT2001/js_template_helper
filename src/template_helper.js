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
     * `data-` HTML Attribute Compatible name that identifies the unique value for every earsed Template.
     *
     * @type {string|null}
     */
    guid_data_attr = null;
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
    sort = {
        field     : 'id',
        direction : 'asc'
    };

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

    getSort() {
        return this.sort;
    }

    setSort(settings) {
        if (settings.field)
            this.sort.field = settings.field;
        if (settings.direction)
            this.sort.direction = settings.direction;
        return this;
    }

    setOptions(options) {
        if (options.guid_data_attr)
            this.setGUIDDataAttr(options.guid_data_attr);
        if (options.sort)
            this.setSort(options.sort)

        return this;
    }

    render(data = [], clear_container = false) {
        let parsable_data = this.getSortedData(data);
        let content = this.getParsedContent(parsable_data);

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

    getSortedData(data = []) {
        let first_object = data[Object.keys(data)[0]];
        if (first_object.length === 0)
            return data;

        const sort_settings = this.getSort();
        const sort_field_path = sort_settings.field.split('.');
        let field_data_sample = first_object;
        for (let sort_field_path_piece in sort_field_path) {
            field_data_sample = field_data_sample[sort_field_path[sort_field_path_piece]] || '';
        }

        let output = data;
            console.log(typeof field_data_sample);
        switch (typeof field_data_sample) {
            case 'number':
                output.sort((a, b) => {
                    let cmp_a = this.getDataFromObjectByPath(a, sort_settings.field, '.');
                    let cmp_b = this.getDataFromObjectByPath(b, sort_settings.field, '.');

                    return parseInt(cmp_a) - parseInt(cmp_b);
                });
                break;

            case 'string':
                if (isNaN(Date.parse(field_data_sample)) === false) {
                    // Date sort
                    output.sort((a, b) => {
                        let cmp_a = this.getDataFromObjectByPath(a, sort_settings.field, '.');
                        let cmp_b = this.getDataFromObjectByPath(b, sort_settings.field, '.');

                        return new Date(cmp_a) - new Date(cmp_b);
                    });
                } else {
                    // Normale Alphabetic sort
                    output.sort((a, b) => {
                        let cmp_a = this.getDataFromObjectByPath(a, sort_settings.field, '.');
                        let cmp_b = this.getDataFromObjectByPath(b, sort_settings.field, '.');

                        return cmp_a.toLowerCase().localeCompare(cmp_b.toLowerCase());
                    });
                }

                break;
        }

        return (sort_settings.direction === 'DESC') ? output.reverse() : output;
    }

    getElementByGUID(guid) {
        let data_attr = this.getGUIDDataAttr();
        let dom_selector = `[data-${data_attr}="${guid}"]`;
        return document.querySelector(dom_selector);
    }

    /**
     * Path is splitted with dots
     */
    getDataFromObjectByPath(object, path, delimiter = '.') {
        path = path.split(delimiter);

        let output = object;
        for (let path_piece in path) {
            output = output[path[path_piece]] || '';
        }
        return output;
    }
}
