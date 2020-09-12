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

    /**
     * The found keys in the @see Template.definition that contains the data.
     *
     * @type {array}
     */
    datakeys = [];

    constructor(definition) {
        this.setDefinition(definition);
    }

    getDefinition() {
        return this.definition;
    }

    setDefinition(definition) {
        if (typeof definition !== 'string')
            throw new Error('Template Definition must be a string');

        this.definition = definition;
        return this;
    }

    getVariableLookarounds() {
        return this.variable_lookarounds;
    }

    getVariableLookaround(type) {
        if (
            type !== 'lookbehind' &&
            type !== 'lookahead'
        ) {
            throw new Error('Type must be "lookbehind" or "lookahead"');
        }

        let lookarounds = this.variable_lookarounds;
        return (type === 'lookbehind') ? lookarounds[0] : lookarounds[1];
    }

    setVariableLookarounds(lookarounds) {
        if (typeof lookarounds !== 'object')
            throw new Error('Template Lookarounds must be of type array');
        if (lookarounds.length !== 2)
            throw new Error('Template Lookarounds must only contain the lookbehind (e.x. "{{") and lookahead (e.x. "}}")');

        for (const [index, lookaround] of Object.entries(lookarounds)) {
            if (
                lookaround.includes('[') === false &&
                lookaround.includes(']') === false
            )
                continue;

            // Add Regex Slashes
            let regex_compatible_lookaround = '';
            let exploded = lookaround.split('');
            for (const [char_index, lookaround_char] of Object.entries(exploded)) {
                regex_compatible_lookaround += '\\' + lookaround_char;
            }
            lookarounds[index] = regex_compatible_lookaround;
        }

        this.variable_lookarounds = lookarounds;
        return this;
    }

    getDatakeys() {
        if (this.datakeys.length === 0)
            this.setDatakeys(this.extractDatakeys());

        return this.datakeys;
    }

    setDatakeys(datakeys) {
        this.datakeys = datakeys;
        return this;
    }

    extractDatakeys() {
        let lookbehind = this.getVariableLookaround('lookbehind');
        let lookahead  = this.getVariableLookaround('lookahead');

        let data_keys = [];
        let regex = new RegExp(`(${lookbehind}\s*(.*?)\s*${lookahead})`, 'gms');
        // Get all the DAta Keys from the definition
        let full_matches = this.getDefinition().match(regex);
        for (const [full_match_index, full_match] of Object.entries(full_matches)) {
            let sanitized_match = full_match;

            // Remove lookbehind, e.x. {{
            let replace_lookbehind_regex = new RegExp(`${lookbehind}\s?`, 'g');
            sanitized_match = sanitized_match.replace(replace_lookbehind_regex, '').trim();

            // Remove lookahead, e.x. }}
            let replace_lookahead_regex = new RegExp(`\s?${lookahead}`, 'g');
            sanitized_match = sanitized_match.replace(replace_lookahead_regex, '').trim();

            // Create new TemplateDataKey Object.
            let tpl_data_key_obj = new TemplateDataKey(full_match, sanitized_match);
            data_keys.push(tpl_data_key_obj);
        }
        return data_keys;
    }
}
