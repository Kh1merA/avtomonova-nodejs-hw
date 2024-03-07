import fs from 'fs/promises';
import path from 'path';

const logFile = path.join('log-file.txt');

async function errorFile(err) {
    if (err) console.log('Помилка', err);
}

async function log(message) {
    try {
        const text = JSON.stringify(message) + '\n';
        await fs.appendFile(logFile, text);
    } catch (error) {
        await errorFile(error);
    }
}

export default { log };
