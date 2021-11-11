import Database from "./index";


test("should return all cars", async () => {
    const db = new Database();
    const cars = db.getAllCars();
    expect(cars.length).toBe(205)
})

test("should return the car with ID 6 ", async () => {
    const db = new Database();
    const car = db.getCarById(6);
    expect(car.CarName).toBe("audi fox")
    expect(car.price).toBe(15250)
})

test("should return the car name 'audi 5000s (diesel)' ", async () => {
    const db = new Database();
    const car = db.getCarByName("audi 5000s (diesel)");
    expect(car.car_ID).toBe(10)
    expect(car.price).toBe(17859.167)
})