import { STATUS, CONTENT_JSON } from './const.js';

const logs = [];

const readLogs = async () => {
    return logs;
};

const addLogs = (log) => {
    logs.push(log);
};

const errorResponse = (res) => {
    res.writeHead(STATUS.NOT_FOUND, CONTENT_JSON);
    return {
        message: `Route Not Found`,
    };
};

const callFunction = (fn, req, res) => fn(req, res);

const types = {
    undefined: errorResponse,
    function: callFunction,
};

export { types, addLogs, readLogs };
