import {LOG_DELIMETTER} from "../defaultEnv.js";
import stream from 'node:stream';

const formatter = new stream.Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform({ date, level, category, message }, encoding, next) {
        message = message.map((x) => JSON.stringify(x)).join(LOG_DELIMETTER);
        const data = {
            date,
            category,
            level,
            message
        };
        next(null, data);
    },
});

export default formatter;
