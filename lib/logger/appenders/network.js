import stream from 'node:stream';
import process from 'node:process';
import { LOGGER_PORT, LOGGER_HOST } from '../defaultEnv.js';
import net from 'net';

const create = (ee, eventName) => {
    const client = new net.Socket();

    client.setEncoding('utf8');

    client.connect(LOGGER_PORT, LOGGER_HOST, function () {
        console.log('LOGGER: CONNECTED');
    }).on('error', (error) => {
        console.error('LOGGER: CONNECTION ERROR', error);
    });

    const log = new stream.Writable({
        write(chunk, encoding, next) {
            if (typeof chunk === 'string' || chunk instanceof Buffer || chunk instanceof Uint8Array) {
                client.write(chunk, encoding);
                next();
            } else {
                console.error('Invalid chunk type:', typeof chunk);
                next(new Error('Invalid chunk type'));
            }
        },
    });

    const readableLog = new stream.Readable({
        objectMode: true,
        read(size) {},
    });

    process.on('beforeExit', () => {
        log.destroy();
        readableLog.destroy();
        client.destroy();
    });

    readableLog.pipe(log);

    ee.on(eventName, (date, level, category, message) => {
        const logObject = { date, level, category, message };
        const logString = JSON.stringify(logObject); // Convert object to JSON string
        readableLog.push(logString);
    });
};

export default { create };
