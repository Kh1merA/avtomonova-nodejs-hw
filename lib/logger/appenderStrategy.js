import * as constants from './constants.js';
import config from './config.js';
import consoleAppender from './appenders/console.js'
import fileAppender from './appenders/file.js';

const appenders = {
    [constants.appender.CONSOLE]: consoleAppender,
    [constants.appender.FILE]: fileAppender,
    [undefined]: consoleAppender
}

function getAppender(ee, EVENT_NAME, formatter){
    for (const item of config.appender){
        appenders[item].create(ee, EVENT_NAME, formatter);
    }
}

export {getAppender}