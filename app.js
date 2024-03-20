import color from './color.js';
import fruit from './fruit.js';
import logger from './lib/logger/logger.js';
import {add} from './handler.js';

const log = logger.getLogger('app.js');
const data = {"MVP amount": 11};
const user = {"name": "Alex", "team": "NAVI"};

log.info(color);
log.info("Data", data, "User:", user, "S1mple is the best");
log.warn(fruit);
log.error("ERROR occur: My log");
log.debug(color);
log.trace(fruit);

add(3, 5);

