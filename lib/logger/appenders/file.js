import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

const filePath = path.join('log-file.txt');
const fileStream = fs.createWriteStream(filePath, { flags: 'a' });

const create = (ee, eventName, transformer) => {
    ee.on(eventName, async (date, level, category, message) => {
        const options = { objectMode: true };
        const readable = new Readable({
            objectMode: true,
        });
        const logEntry = { date, level, category, message };
        const logString = JSON.stringify(logEntry) + '\n';
        readable.push(logString);
        readable.push(null);
        readable.pipe(fileStream);
        readable.destroy();
    });
};

export default { create };