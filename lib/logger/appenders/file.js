import fs from 'fs';
import path from 'path';
import { level as logLevel } from '../constants.js';

const logFile = path.join('log-file.txt');
const errFile = path.join('error-file.txt');

function formatMessage(date, level,category, message){
    return `Date: ${date},category:${category}, level: ${level}, message:${JSON.stringify(message)}`;
}

function errorFile(err){
    if(err) console.log('Помилка', err);
}

function log(date, level,category, message){
    const text = formatMessage(date, level, category, message) + '\n';
    fs.appendFile(logFile, text, errorFile);
}

export default {log};