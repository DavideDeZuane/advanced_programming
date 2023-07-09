import morgan from 'morgan';
import AppLogger from '../utils/Logger';

/* Config Options */
const logger = AppLogger.getInstance()
const stream = {
    write: (message:string) => logger.info(message),
};

/* Logging Middleware */
const preLog = morgan('HTTP/:http-version [:method :url] - from [:remote-addr@:user-agent] with code [:status]',{stream});
const postLog = morgan('HTTP/:http-version [:method :url] - response_time [:response-time ms] - total_time [:total-time ms]', {stream}); 

export { preLog, postLog }