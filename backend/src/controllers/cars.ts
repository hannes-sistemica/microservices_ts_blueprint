// for simplicity controller directly acts with database
import { Get, Route } from "tsoa";
import {Car} from "../models/Car";
import Database from "../database";

interface CarsResponse {
    response: Car[];
}

@Route("/api/cars")
export default class CarsController {
    db: Database;

    constructor(db: Database) {
        this.db=db;
    }

    @Get("/")
    public async getCars(): Promise<CarsResponse> {
        // FIXME add a debug log entry, with module name, other context infos
        return {
            response: this.db.getAllCars(),
        };
    }
}