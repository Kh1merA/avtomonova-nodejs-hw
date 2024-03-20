import net from 'node:net';
import { addLogs } from './utils.js';

const socketServer = net.createServer((client) => {
    console.log('Client connected');

    client.on('end', () => {
        console.log('Client disconnected');
    });

    client.on('data', (data) => {
        const logData = data.toString();
        console.log(logData);
        addLogs(logData);
    });
});

socketServer.on('error', (err) => {
    console.error('Socket server error:', err);
    throw err;
});

export default socketServer;
