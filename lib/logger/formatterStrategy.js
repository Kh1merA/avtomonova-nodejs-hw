import * as constants from './constants.js';
import config from './config.js';
import textFormatter from './formatters/text.js'
import jsonFormatter from './formatters/json.js';

const formatters = {
    [constants.formatter.TEXT]: textFormatter,
    [constants.formatter.JSON]: jsonFormatter,
    [undefined]: textFormatter,
};

function getFormatter() {
    return formatters[config.formatter];
}

export { getFormatter };