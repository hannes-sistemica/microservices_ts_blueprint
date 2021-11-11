import {Car} from "../models/Car";
import repository from "./database.json";

class Database {
    Cars: Car[];

    constructor() {
        this.Cars = repository.cars
    }

    public getAllCars(): Car[] {
        return this.Cars;
    }

     public getCarById(id: number): Car {
         return this.Cars.find(x => x.car_ID === id);
     }

    public getCarByName(name: string): Car {
        return this.Cars.find(x => x.CarName === name);
    }
}

export default Database;