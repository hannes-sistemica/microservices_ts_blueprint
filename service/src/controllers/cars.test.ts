import CarsController from "./cars";
import Database from "../database";

test("should return all cars", async () => {
    const db = new Database();
    const controller = new CarsController(db);
    const response = await controller.getCars();
    expect(response.response.length).toBe(205)
})