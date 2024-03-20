import { LOG_DELIMETTER } from "../defaultEnv.js";
import { Transform } from 'stream';

const formatter = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform({ date, level, category, message }, encoding, next) {
        const formattedMessage = `Date: ${date}, category: ${category}, level: ${level}, message: ${message.map((x) => JSON.stringify(x)).join(LOG_DELIMETTER)}`;
        next(null, formattedMessage);
    },
});

export default formatter;
