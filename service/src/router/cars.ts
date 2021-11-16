import express from 'express';
import DownstreamService from "../downstream";
import CarsController from "../controllers/cars";

export default class Router {
    service: DownstreamService;
    cars: CarsController;
    public router: express.Application;

    constructor(service: DownstreamService) {
        this.service = service
        this.cars = new CarsController(this.service);
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


