import CarController from "./car";
import Database from "../database";

test("should return all cars", async () => {
    const db = new Database();
    const controller = new CarController(db);
    const response = await controller.getCarById(6);
    expect(response.response.CarName).toBe("audi fox")
    expect(response.response.price).toBe(15250)
})