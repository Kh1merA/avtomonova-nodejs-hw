import color from './color.js';
import fruit from './fruit.js';
import logger from './lib/logger/logger.js';
import {add} from './handler.js';

const log = logger.getLogger('app.js');

log.info(color);
log.warn(fruit);
log.error("ERROR occur: My log");
log.debug(color);
log.trace(fruit);

add(3, 5);