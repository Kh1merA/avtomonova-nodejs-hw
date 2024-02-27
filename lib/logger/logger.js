import config from './config.js';
import {level} from './constants.js';
import {scoreLevel} from './constants.js';
import * as appenderStrategy from './appenderStrategy.js';

const logger =(category) => ({
    info: (message) => {
        executeLog(level.INFO,category, message);
    },
    warn: (message) => {
        executeLog(level.WARN,category, message);
    },
    error: (message) => {
        executeLog(level.ERROR,category, message);
    },
    debug: (message) => {
        executeLog(level.DEBUG,category, message);
    },
    trace: (message) => {
        executeLog(level.TRACE,category, message);
    },
});

const appender = appenderStrategy.getAppender();

function executeLog(level,category, message){
    if(scoreLevel[level] <= config.scoreLevel)
        appender.log(Date.now(), level,category, message);
}

function formatMessage(level,category, message){
    return `Date: ${Date.now()},category:${category}, level: ${level}, message:${JSON.stringify(message)}`;
}


export default {
    getLogger(category){
        return logger(category);
    }
};