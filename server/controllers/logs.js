import { STATUS, CONTENT_JSON } from '../const.js';
import { readLogs } from '../utils.js';

const getLogs = async (req, res) => {
    try {
        const logs = await readLogs(); // Получаем все логи
        sendResponse(res, STATUS.OK, logs);
    } catch (error) {
        console.error('Error getting logs:', error);
        sendErrorResponse(res, STATUS.NOT_FOUND, 'Internal Server Error');
    }
};

const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, CONTENT_JSON);
    res.end(JSON.stringify(data));
};

const sendErrorResponse = (res, statusCode, errorMessage) => {
    res.writeHead(statusCode, CONTENT_JSON);
    res.end(JSON.stringify({ error: errorMessage }));
};

export { getLogs };

