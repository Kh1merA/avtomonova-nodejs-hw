const SOCKET_PORT = process.env['SOCKET_PORT'] || 8000;
const SERVER_PORT = process.env['SERVER_PORT'] || 8005;
const HOSTNAME = process.env['HOSTNAME'] || 'localhost';

const STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
};

const CONTENT_JSON = { 'Content-Type': 'application/json' };

export { SOCKET_PORT, SERVER_PORT, HOSTNAME, STATUS, CONTENT_JSON  };