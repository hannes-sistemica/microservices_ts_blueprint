import express from 'express';
import Database from "../database";
import CarsController from "../controllers/cars";

export default class Router {
    db: Database;
    cars: CarsController;
    public router: express.Application;

    constructor(db: Database) {
        this.db = db
        this.cars = new CarsController(this.db);
        this.router = express();
        this.routes();
    }

    private routes(): void {
        this.router.get("/", async (_req, res) => {
            const response = await this.cars.getCars();
            if (!response) res.status(404).send({message: "No cars found"})
            return res.json(response);
        });
    }
}


