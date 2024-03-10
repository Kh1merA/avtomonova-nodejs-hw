import config from './config.js';
import { level } from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import * as formatterStrategy from './formatterStrategy.js';
import { EventEmitter } from 'events';

const ee = new EventEmitter();
const EVENT_NAME = 'log';

const formatter = formatterStrategy.getFormatter();
appenderStrategy.getAppender(ee, EVENT_NAME, formatter);

const logger = (category) => ({
    info: (...message) => executeLog(level.INFO, category, message),
    warn: (...message) => executeLog(level.WARN, category, message),
    error: (...message) => executeLog(level.ERROR, category, message),
    debug: (...message) => executeLog(level.DEBUG, category, message),
    trace: (...message) => executeLog(level.TRACE, category, message),
});

function executeLog(logLevel, category, message) {
    if (level[logLevel] <= config.scoreLevel) {
        const logEntry = { timestamp: Date.now(), level: logLevel, category, message };
        ee.emit(EVENT_NAME, logEntry);
    }
}

export default {
    getLogger(category) {
        return logger(category);
    },
};
