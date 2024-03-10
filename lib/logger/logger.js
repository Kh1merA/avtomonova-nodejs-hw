import config from "./config.js";
import {scoreLevel, level} from './constants.js';
import * as appenderStrategy from "./appenderStrategy.js";
import * as formatStrategy from './formatterStrategy.js';
import {EventEmitter} from 'node:events';

const logger = (category) => ({
    info: (...message) => {
        executeLog(level.INFO, category, message);
    },
    warn: (...message) =>{
        executeLog(level.WARN, category, message);
    },
    error: (...message) =>{
        executeLog(level.ERROR, category, message);
    },
    debug: (...message) => {
        executeLog(level.DEBUG, category, message)
    },
    trace: (...message) => {
        executeLog(level.TRACE, category, message)
    }
});

const ee = new EventEmitter();
const eventName = 'log';

const format = formatStrategy.getFormatter();
appenderStrategy.getAppender(ee, eventName, format);

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        ee.emit(eventName, Date.now(), level, category, message);
    }

}

export default {
    getLogger(category) {
        return logger(category);
    }
};
