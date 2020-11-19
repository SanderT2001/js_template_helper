"use strict";

/**
 * @uses template
 */
class TemplateParser {
    /**
     * @type {TemplateParser}
     */
    template = null;

    constructor(template) {
        this.setTemplate(template);

        return this;
    }

    getTemplate() {
        return this.template;
    }

    setTemplate(template) {
        this.template = new Template(template);
        return this;
    }

    parse(data) {
        let datakeys = this.getTemplate().getDatakeys();

        let parsed_template = {};
        for (const [data_index, data_to_parse] of Object.entries(data)) {
            let replace_map = {};
            for (const [data_key_index, template_data_key] of Object.entries(datakeys)) {
                let template_data_path = template_data_key.getDataPath().split('.');

                let tmp_data = data_to_parse;
                for (let template_data_path_index in template_data_path) {
                    tmp_data = tmp_data[template_data_path[template_data_path_index]] || '';
                }
                replace_map[template_data_key.getDataKey()] = tmp_data;
            }

            // Parse data keys in template
            let tmp_tpl = this.getTemplate().getDefinition();
            for (const [source, replacement] of Object.entries(replace_map))
                tmp_tpl = tmp_tpl.replace(source, replacement);
            parsed_template[data_index] = tmp_tpl;
        }
        return parsed_template;
    }
}
