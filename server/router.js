import url from 'url';
import { getLogs } from './controllers/logs.js';
import { types } from './utils.js';
import { HOSTNAME } from './const.js';

const routing = {
    [`${HOSTNAME}/logs`]: getLogs,
};

const router = async (req, res) => {
    const path = url.parse(req.url).pathname;
    console.log(path);

    const routeHandler = routing[path];
    const routeHandlerType = typeof routeHandler;
    const serializer = types[routeHandlerType];

    if (serializer) {
        const result = await serializer(routeHandler, req, res);
        res.end(JSON.stringify(result));
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Route Not Found' }));
    }
};

export default router;
