import config from './config.js';
import {level} from './constants.js';
import {scoreLevel} from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';
import * as formatterStrategy from './formatterStrategy.js'

const logger =(category) => ({
    info: (...message) => {
        executeLog(level.INFO,category, message);
    },
    warn: (...message) => {
        executeLog(level.WARN,category, message);
    },
    error: (...message) => {
        executeLog(level.ERROR,category, message);
    },
    debug: (...message) => {
        executeLog(level.DEBUG,category, message);
    },
    trace: (...message) => {
        executeLog(level.TRACE,category, message);
    },
});

const appender = appenderStrategy.getAppender();
const formatter = formatterStrategy.getFormatter();

function executeLog(level, category, message) {
    if (scoreLevel[level] <= config.scoreLevel) {
        for (const item of appender) {
            item.log(
                formatter.formatMessage(Date.now(), level, category, message),
            );
        }
    }
}

export default {
    getLogger(category){
        return logger(category);
    }
};