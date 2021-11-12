// for simplicity controller directly acts with database
import { Get, Route } from "tsoa";
import {Car} from "../models/Car";
import Database from "../database";

interface CarResponse {
    response: Car;
}

@Route("/api/car")
export default class CarController {
    db: Database;

    constructor(db: Database) {
        this.db=db;
    }

    @Get("/id/:id")
    public async getCarById(id: number): Promise<CarResponse> {
        // FIXME add a debug log entry, with module name, other context infos (e.g. which id was requested and responded)
        return {
            response: this.db.getCarById(id),
        };
    }
    @Get("/name/:name")
    public async getCarByName(name: string): Promise<CarResponse> {
        // FIXME add a debug log entry, with module name, other context infos (e.g. which car_id is contained in response)
        return {
            response: this.db.getCarByName(name),
        };
    }
}