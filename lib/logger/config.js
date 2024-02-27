import * as constants from './constants.js';
import { LOG_LEVEL, LOG_APPENDER } from './defaultEnv.js';

const defaultConfig = {
    logLevel: LOG_LEVEL || constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: LOG_APPENDER || constants.appender.CONSOLE
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel];
}

function initConfig() {
    const config =  defaultConfig;

    const logLevel = process.env.LOG_LEVEL?.toUpperCase();
    const appender = process.env.LOG_APPENDER?.toUpperCase();

    if(logLevel && Object.keys(constants.level).includes(logLevel)) {
        config.logLevel = logLevel;
    }

    if(appender && Object.keys(constants.appender).includes(appender)) {
        config.appender = appender;
    }

    enrichConfig(config);

    return config;
}

const config = initConfig()

export default config;