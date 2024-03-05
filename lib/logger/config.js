import * as constants from './constants.js';
import { LOG_LEVEL, LOG_APPENDER, LOG_FORMATTER } from './defaultEnv.js';

const defaultConfig = {
    logLevel: LOG_LEVEL || constants.level.INFO,
    scoreLevel: constants.scoreLevel[constants.level.INFO],
    appender: LOG_APPENDER || [constants.appender.CONSOLE],
    formatter: LOG_FORMATTER || constants.formatter.TEXT,
}

function enrichConfig(config) {
    config.scoreLevel = constants.scoreLevel[config.logLevel];
}

function initConfig() {
    const config =  defaultConfig;
    enrichConfig(config);
    return config;
}

const config = initConfig()

export default config;