import {LOG_DELIMETTER} from "../defaultEnv.js";

function formatMessage(date, level, category, message){
    return `Date: ${date},category:${category}, level: ${level}, message:${message.map((x) => JSON.stringify(x)).join(LOG_DELIMETTER)}`;
}

export default {formatMessage};