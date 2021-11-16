import Database from "./index";
import DownstreamService from "./index";
const DownstreamURL = "http://localhost:8008/api"

// FIXME add unit tests, these are already integration tests
test("should return all cars", async () => {
    const service = new DownstreamService(DownstreamURL);
    const cars = service.getAllCars();
    expect(cars.length).toBe(205)
})

test("should return the car with ID 6 ", async () => {
    const service = new DownstreamService(DownstreamURL);
    const car = service.getCarById(6);
    expect(car.CarName).toBe("audi fox")
    expect(car.price).toBe(15250)
})

test("should return the car name 'audi 5000s (diesel)' ", async () => {
    const service = new DownstreamService(DownstreamURL);
    const car = service.getCarByName("audi 5000s (diesel)");
    expect(car.car_ID).toBe(10)
    expect(car.price).toBe(17859.167)
})