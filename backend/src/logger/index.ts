import winston from "winston";
import rTracer from 'cls-rtracer';


export default class Logger {

    public createLogger(opts = {}) {
        // FIXME log level from environment!
        const level = "debug";

        return winston.createLogger({
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.errors({stack: true}),
                winston.format.printf(({timestamp,  lvl , message}) => {
                    return `${timestamp} (${rTracer.id()}) - ${lvl}: ${message}`;
                })
            ),
            level,
            transports: [
                new winston.transports.Console({
                    handleExceptions: true,
                }),
            ],
            exitOnError: false,
        })
    }

}
