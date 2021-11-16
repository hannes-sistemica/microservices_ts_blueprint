import winston from "winston";
import {LoggerOptions} from "winston";
import rTracer from 'cls-rtracer';

// FIXME this shall be generated out of package.json app name
const Component = "sample_backend"

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
}

const level = () => {
    const env = process.env.NODE_ENV || 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warn'
}

const MESSAGE = Symbol.for('message');

const jsonFormatter = (logEntry: any) => {
    const base = { contextId: rTracer.id() };
    const json = Object.assign(base, logEntry)
    logEntry[MESSAGE] = JSON.stringify(json);
    return logEntry;
}

export default class Logger {

    public createLogger(opts = {}) {
        // FIXME log level from environment!
        const loggerOptions: LoggerOptions = {
            level: "debug"
        };

        const format = winston.format.combine(
            // Add the message timestamp with the preferred format
            winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss:ms'}),
            winston.format.errors({stack: true}),
            winston.format(jsonFormatter)()
        );
        const transports = [
            // Decide for one transport
            new winston.transports.Console({
                handleExceptions: true,
            }),
            new winston.transports.File({filename: 'logs/all.log', handleExceptions: true}),
        ];
        const defaultMeta = { component:  Component };

        return winston.createLogger({
            level: level(),
            defaultMeta,
            levels,
            format,
            transports,
            exitOnError: false,
        })
    }
}
