import fs from 'fs';
import path from 'path';

const LOG_CONFIG_FILE = 'logger.json';
let fileData = {};

try {
    const data = fs.readFileSync(path.join(LOG_CONFIG_FILE), 'utf8');
    if (data.trim()) {
        fileData = JSON.parse(data);
    }
} catch (err) {
    console.error(err);
}

const LOGGER_PORT = process.env['LOGGER_SERVER_PORT'] || 8000;
const LOGGER_HOST = process.env['LOGGER_SERVER_HOST'] || "localhost";
let LOG_LEVEL = process.env.LOG_LEVEL || fileData.logLevel;
let LOG_APPENDER = process.env.LOG_APPENDER || fileData.appender;
let LOG_FORMATTER = process.env.LOG_FORMATTER || fileData.formatter;
let LOG_DELIMETTER = process.env.LOG_DELIMETTER || fileData.delimetter || ',';

LOG_LEVEL = typeof LOG_LEVEL === 'string' ? LOG_LEVEL.toUpperCase() : LOG_LEVEL;
LOG_APPENDER = typeof LOG_APPENDER === 'string' ? LOG_APPENDER.toUpperCase().split(',') : LOG_APPENDER;
LOG_FORMATTER = typeof LOG_FORMATTER === 'string' ? LOG_FORMATTER.toUpperCase() : LOG_FORMATTER;

export { LOG_LEVEL, LOG_APPENDER, LOG_FORMATTER, LOG_DELIMETTER, LOGGER_HOST, LOGGER_PORT};
