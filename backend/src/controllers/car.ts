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

    @Get("/:id")
    public async getCarById(id: number): Promise<CarResponse> {
        // FIXME add a debug log entry, with module name
        return {
            response: this.db.getCarById(id),
        };
    }
}