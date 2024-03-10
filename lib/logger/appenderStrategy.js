import * as constants from './constants.js'
import config from "./config.js";
import consoleAppender from './appenders/console.js'
import fileAppender from './appenders/file.js'

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]: consoleAppender
}
function getAppender(ee, eventName, format) {
    for(const k of config.appender) {
        appenders[k].create(ee, eventName, format);
    }
}

export {getAppender}