// for simplicity controller directly acts with database
import { Get, Route } from "tsoa";
import {Car} from "../models/Car";
import DownstreamService from "../downstream";

interface CarsResponse {
    response: Car[];
}

@Route("/api/cars")
export default class CarsController {
    service: DownstreamService;

    constructor(service: DownstreamService) {
        this.service=service;
    }

    @Get("/")
    public async getCars(): Promise<CarsResponse> {
        // FIXME add a debug log entry, with module name, other context infos
        return {
            response: this.service.getAllCars(),
        };
    }
}