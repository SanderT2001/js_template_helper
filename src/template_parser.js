"use strict";

class Template {
    /**
     * The Template which contains the "Template Variable Lookarounds".
     *
     * @type {string|null}
     */
    definition = null;

    /**
     * The Characters in the Template string that define a Template Variable, e.x. `{{ var }}`.
     *
     * @type {array}
     */
    variable_lookarounds = ['{{', '}}'];

    constructor(definition) {
        this.setDefinition(definition);
    }

    getDefinition() {
        return this.definition;
    }

    setDefinition(definition) {
        if (typeof definition !== 'string')
            throw new Error('Template Definition must be a string');

        this.setVariableLookarounds(['[[', ']]', ]);

        this.definition = definition;
        return this;
    }

    getVariableLookarounds() {
        return this.variable_lookarounds;
    }

    setVariableLookarounds(lookarounds) {
        if (typeof lookarounds !== 'object')
            throw new Error('Template Lookarounds must be of type array');
        if (lookarounds.length !== 2)
            throw new Error('Template Lookarounds must only contain the lookbehind (e.x. "{{") and lookahead (e.x. "}}")');

        this.variable_lookarounds = lookarounds;
        return this;
    }
}

class TemplateParser {
    // alleen parsen

    /**
     * The Template which contains the Template Characters.
     *
     * @type {string/HTML|null}
     */
    template = null;
    /**
     * The Characters in the Template string that define a Template Variable
     */
    template_var = ['{{', '}}'];
    /**
     * A collection of TemplateDataKey Objects.
     *
     * @type {array}
     */
    template_data_keys = [];

    constructor(template, template_chars = ['{{', '}}']) {
        this.setTemplate(template);
        this.setTemplateChars(template_chars);
        return this;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(selector) {
        if (document.querySelector(selector) === null)
            return this;

        this.template = document.querySelector(selector).innerHTML;

        let tpl_data_keys = this.extractTemplateDataKeys(this.template);
        this.setTemplateDataKeys(tpl_data_keys);
        return this;
    }

    extractTemplateDataKeys(target_string) {
        let data_keys = [];
        let full_matches = target_string.match(/({{(.*?)}})/gm); // Get all Template Keys, {{ }}
        for (const [full_match_index, full_match] of Object.entries(full_matches)) {
            let sanitized_match = full_match;
            sanitized_match = sanitized_match.replace(/{{\s?/g, ''); // Remove lookbehind {{
            sanitized_match = sanitized_match.replace(/\s?}}/g, ''); // Remove lookahead }}

            let tpl_data_key_obj = new TemplateDataKey(full_match, sanitized_match);
            data_keys.push(tpl_data_key_obj);
        }
        return data_keys;
    }

    /*
    render(data = [], clear_container = false) {
        let data_keys_to_parse = this.getTemplateDataKeys();

        let parsed_html = {};
        for (const [data_index, data_to_parse] of Object.entries(data)) {
            let replace_map = {};
            for (let data_key_index in data_keys_to_parse) {
                let template_data_key = data_keys_to_parse[data_key_index];
                let template_data_path = template_data_key.getDataPath().split('.');

                let eval_path = '';
                let tmp_data = data_to_parse;
                for (let template_data_path_index in template_data_path) {
                    tmp_data = tmp_data[template_data_path[template_data_path_index]] || '';
                }
                replace_map[template_data_key.getDataKey()] = tmp_data;
            }

            let tmp_html = template;
            for (const [source, replacement] of Object.entries(replace_map)) {
                tmp_html = tmp_html.replace(source, replacement);
            }
            parsed_html[data_index] = tmp_html;
        }

        for (const [data_index, parsed_item] of Object.entries(parsed_html)) {
            let replacement_map = {};
            let code_blocks = this.extractCodeBlocks(parsed_item);
            for (const [full, sanitized] of Object.entries(code_blocks)) {
                replacement_map[full] = eval(sanitized);
            }

            // @TODO (Sander) 1 parse function niet meerddre keren hetzelfde
            for (const [search, replace] of Object.entries(replacement_map)) {
                parsed_html[data_index] = parsed_item.replace(search, replace);
            }
        }

        if (clear_container === true)
            this.getContainer().innerHTML = '';

        this.getContainer().innerHTML += Object.values(parsed_html).join('');
        return this;
    }
    */
}
