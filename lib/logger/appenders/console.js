import process from 'node:process';
import { Writable, Readable } from 'stream';

const log = new Writable({
    write(chunk, encoding, callback) {
        console.log(chunk.toString());
        callback();
    },
});

process.on('beforeExit', () => {
    log.destroy();
});

const create = (ee, eventName, transformer) => {
    ee.on(eventName, (date, level, category, message) => {
        const readable = new Readable({
            objectMode: true,
        });
        const logData = { date, level, category, message };
        const logString = JSON.stringify(logData);
        readable.push(logString);
        readable.push(null);
        readable.on('data', (data) => {
            log.write(data);
        });
    });
};


export default { create };