import express from 'express';
import PingController from "../controllers/ping";
import Database from "../database";
import CarRouter from "./car";
import CarsRouter from "./cars";
import {  Route } from "tsoa";

// quick and dirty router class
export default class Routes {
    db: Database;
    public router: express.Application;

    constructor(db: Database) {
        this.db = db
        this.router = express();
        this.routes();
    }

    private routes(): void {
        this.router.get("/ping", async (_req, res) => {
            const controller = new PingController();
            const response = await controller.getMessage();
            return res.json(response);
        });

        this.router.use("/cars", new CarsRouter(this.db).router)
        this.router.use("/car", new CarRouter(this.db).router)
    }
}




