import { Writable, Readable, Transform } from 'stream';
import process from 'node:process';

const log = new Writable({
    write(chunk, encoding, next) {
        console.log(chunk);
        next();
    },
});

process.on('beforeExit', () => {
    log.destroy();
});

const create = (ee, eventName) => {
    const transformer = new Transform({
        objectMode: true,
        transform(chunk, encoding, callback) {
            const logEntry = { ...chunk, fileName: __filename, processInfo: process.title };
            this.push(logEntry);
            callback();
        },
    });

    ee.on(eventName, (date, level, category, message) => {
        console.log('appender log');
        const options = { objectMode: true };
        const readable = Readable.from(
            [{ date, level, category, message }],
            options
        );
        readable.pipe(transformer).pipe(log);
    });
};

export default { create };
