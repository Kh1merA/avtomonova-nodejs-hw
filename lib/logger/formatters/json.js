import {LOG_DELIMETTER} from "../defaultEnv.js";

function formatMessage(date, level, category, message) {
    message = message.map((x) => JSON.stringify(x)).join(LOG_DELIMETTER);
    return {
        date,
        category,
        level,
        message
    };
}

export default { formatMessage };
