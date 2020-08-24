"use strict";

// @TODO (Sander) Opsplitsen in multiple files
// @TODO (Sander) Apart parser object?
// @TODO (Sander) Add-Skeleton out-of-the-box support

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

class TemplateHelper {
    /**
     * The Template.
     *
     * @type {string/HTML|null}
     */
    template = null;
    /**
     * A collection of TemplateDataKey Objects.
     *
     * @type {array}
     */
    template_data_keys = [];
    /**
     * The Container of where the parsed HTML should be placed in.
     *
     * @type {DOM-Node|null}
     */
    container = null;
    /**
     * A collection of Url Objects to use in this class.
     *
     * @type {object}
     */
    url_map = {};
    /**
     * The path in the data which contains GUID data attr value to add to every parsed item.
     *
     * @type {string|null}
     */
    data_guid_path = null;

    constructor(options) {
        if (options.template !== undefined)
            this.setTemplate(options.template);
        if (options.container !== undefined)
            this.setContainer(options.container);
        if (options.urls !== undefined)
            this.setUrls(options.urls);
        if (options.data_guid_path !== undefined)
            this.setDataGuidPath(options.data_guid_path);

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

    getTemplateDataKeys() {
        return this.template_data_keys;
    }

    setTemplateDataKeys(data_keys) {
        this.template_data_keys = data_keys;
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

    getUrl(url) {
        if (this.url_map[url] === undefined)
            throw new Error('URL Not defined');

        return this.url_map[url];
    }

    setUrls(urls) {
        let url_map = {};
        for (const [url_label, url] of Object.entries(urls)) {
            url_map[url_label] = new Url(url_label, url);
        }
        this.url_map = url_map;
        return this;
    }

    getDataGuidPath() {
        return this.data_guid_path;
    }

    setDataGuidPath(path) {
        this.data_guid_path = path;

        this.template_data_keys.push(new TemplateDataKey('{{ AJTP.guid }}', path));
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

    extractCodeBlocks(target_string) {
        let output = {};
        console.log(target_string);
        let full_matches = target_string.match(/(\[\[\s*(.*?)\s*\]\])/gms); // Get all Code Blocks, [[ ]]
        console.log(full_matches);
        for (const [full_match_index, full_match] of Object.entries(full_matches)) {
            let sanitized_match = full_match;
            sanitized_match = sanitized_match.replace(/\[\[\s?/g, ''); // Remove lookbehind {{
            sanitized_match = sanitized_match.replace(/\s?\]\]/g, ''); // Remove lookahead }}

            // @TODO (Sander) Object van maken/entity class
            output[full_match] = sanitized_match;
        }
        return output;
    }

    async render(data = [], clear_container = false) {
        if (data.length === 0) {
            let url_obj = this.getUrl('index');
            await fetch(url_obj.getLink())
                .then(response => response.json())
                .then((parsable_data) => {
                    data = parsable_data;
                });
        }

        let template = this.getTemplate();
        // Alter Template with `ajtp-guid` attribute.
        if (this.getDataGuidPath() !== null) {
            let dom_fragment = document.createRange().createContextualFragment(template);
            dom_fragment.firstElementChild.setAttribute('ajtp-guid', '{{ AJTP.guid }}');
            template = dom_fragment.firstElementChild.outerHTML;
        }

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

    // geen calls:
    publish() {
    }

    update() {
    }

    remove(guid) {
        let element = this.getElementByAjtpGuid(guid);
        if (element === null)
            return false;

        element.remove();
        // Return success if the element could not be found anymore.
        return (this.getElementByAjtpGuid(guid) === null);
    }

    getElementByAjtpGuid(guid) {
        return document.querySelector(`[ajtp-guid="${guid}"]`);
    }
}
