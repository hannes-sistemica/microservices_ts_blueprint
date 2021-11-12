import express from 'express';
import rTracer from 'cls-rtracer';
import morgan from 'morgan';
import json from 'morgan-json';
import swaggerUi from "swagger-ui-express";
import ErrorHandler from './handler/ErrorHandler';
import routes from './router';
import Database from "./database";
import Logger from "./logger";

const CONFIG = {
    PORT: 8008
}
const formatResp = json(':method :url :status :res[content-length] bytes :response-time ms');
const formatReq = json(':method :url');



// https://stackoverflow.com/questions/66365090/introducing-a-express-middleware-in-nodejs-typescript-oop
class Server {
    app = express();
    db = new Database();
    routes = new routes(this.db);
    logger = new Logger().createLogger();

    constructor() {
        this.correlationalIdMiddleware();
        this.loggingMiddleware();
        this.openAPIMiddleware();
        this.routing();
        this.errorHandlingMiddleWare();
    }

    // ***********************************************************************

    correlationalIdMiddleware() {
        this.app.use(rTracer.expressMiddleware({
            useHeader: true,
            headerName: 'X-Tracing'
        }));
        this.app.use((req, res, next) => {
            res.append('X-Tracing', rTracer.id() as string);
            next();
        });
    }

    loggingMiddleware() {
        this.app.use(morgan(formatResp, {
            stream: {write: (text) => this.logger.debug(text.trim())},
            immediate: false,
        }));
        this.app.use(morgan(formatReq, {
            stream: {write: (text) => this.logger.debug(text.trim())},
            immediate: true,
        }));

    }

    errorHandlingMiddleWare() {
        this.app.use((req, res, next) => {
            const error = new ErrorHandler(404, 'Not Found');
            next(error);
        });
        this.app.use((error: ErrorHandler, req: any, res: any, next: any) => {
            const errorObject = {
                status: 'error',
                statusCode: error.statusCode,
                message: error.message,
            };
            const requestId = rTracer.id();
            // console.log(`> requestId: ${requestId} - ${JSON.stringify(errorObject)}`);
            res.status(error.statusCode || 500).json(errorObject);
        });
    }

    // ***********************************************************************

    openAPIMiddleware() {
        this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(undefined, {
                swaggerOptions: {
                    url: "/swagger.json",
                },
            })
        );
        this.app.use(express.static("public"));
    }

    routing() {
        this.app.use('/api', this.routes.router);
    }

}

const server = new Server();

server.app.listen(CONFIG.PORT, () => {
    // console.log(`> Server listening on ${CONFIG.PORT}`);
});