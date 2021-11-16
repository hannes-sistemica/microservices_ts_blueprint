// for simplicity controller directly acts with database
import { Get, Route } from "tsoa";
import {Car} from "../models/Car";
import DownstreamService from "../downstream";

interface CarResponse {
    response: Car;
}

@Route("/api/car")
export default class CarController {
    service: DownstreamService;

    constructor(service: DownstreamService) {
        this.service=service;
    }

    @Get("/id/:id")
    public async getCarById(id: number): Promise<CarResponse> {
        // FIXME add a debug log entry, with module name, other context infos (e.g. which id was requested and responded)
        // FIXME add some transformation logic here
        return {
            response: this.service.getCarById(id),
        };
    }
    @Get("/name/:name")
    public async getCarByName(name: string): Promise<CarResponse> {
        // FIXME add a debug log entry, with module name, other context infos (e.g. which car_id is contained in response)
        // FIXME add some transformation logic here
        return {
            response: this.service.getCarByName(name),
        };
    }
}