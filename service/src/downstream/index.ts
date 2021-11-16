import {Car} from "../models/Car";
import axios, {Axios, AxiosRequestConfig} from "axios";
import rTracer from "cls-rtracer";

const defaultOptions: AxiosRequestConfig = {
    baseURL: "",
    headers: {
        'Content-Type': 'application/json',
    },
};

interface ServerResponseCar {
    response: Car;
}

interface ServerResponseCars {
    response: Car[];
}


function tracingIDHeader(config: AxiosRequestConfig) : AxiosRequestConfig {
    config.headers["X-Tracing"] = rTracer.id() as string;
    return config;
}

class DownstreamService {
    backendUrl: string;
    // FIXME client shall be an interface to make axios swappable to other libraries!
    client: Axios;

    constructor(backendUrl: string) {
        this.backendUrl = backendUrl;

        const opts = defaultOptions;
        opts.baseURL = backendUrl

        this.client = axios.create(opts);
        this.client.interceptors.request.use(tracingIDHeader)
    }

    public getAllCars(): Car[] {
        this.client.get('/cars').then((response) => {
            const {data} = response
            // `data` is of type ServerData, correctly inferred
            return data
        })

        return [];
    }

    public getCarById(id: number): Car {
        this.client.get('/car/' + id).then((response) => {
            const {data} = response
            // `data` is of type ServerData, correctly inferred
            return data
        })
        return;
    }


    public getCarByName(name: string): Car {
        this.client.get('/car/' + name).then((response) => {
            const {data} = response
            // `data` is of type ServerData, correctly inferred
            return data
        })
        return;
    }
}

export default DownstreamService;