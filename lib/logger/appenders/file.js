import fs from 'fs';
import path from 'path';
import { Readable, Writable, Transform } from 'stream';
import process from 'node:process';

const logFilePath = path.join('log-file.txt');

const logFile = fs.createWriteStream(logFilePath);

const transformer = new Transform({
    objectMode: true,
    transform(chunk, encoding, callback) {
        const logEntry = { ...chunk, fileName: __filename, processInfo: process.title };
        this.push(logEntry);
        callback();
    },
});

const readable = new Readable({
    objectMode: true,
    read(size) {
        console.log(size);
    },
});

process.on('beforeExit', () => {
    readable.destroy();
    logFile.destroy();
});

readable.pipe(transformer).pipe(logFile);

const create = (ee, eventName) => {
    ee.on(eventName, (date, level, category, message) => {
        const logEntry = { date, level, category, message };
        readable.push(logEntry);
    });
};

export default { create };
