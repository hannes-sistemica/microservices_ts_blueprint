import express from 'express';
import DownstreamService from "../downstream";
import CarController from "../controllers/car";

export default class Router {
    service: DownstreamService;
    car: CarController;
    public router: express.Application;

    constructor(service: DownstreamService) {
        this.service = service
        this.car = new CarController(this.service);
        this.router = express();
        this.routes();
    }

    private routes(): void {
        this.router.get("/id/:id", async (_req, res) => {
            const carId = parseInt(_req.params.id, 10);
            const response = await this.car.getCarById(carId);
            if (!response) res.status(404).send({message: "No car found"})
            return res.json(response);
        });
        this.router.get("/name/:name", async (_req, res) => {
            const carName = _req.params.name;
            const response = await this.car.getCarByName(carName);
            if (!response) res.status(404).send({message: "No car found"})
            return res.json(response);
        });
    }
}


