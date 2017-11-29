import { ICoordinates, UnitType } from "./state";

export const getBestDevice = (devices) => {
    const order = ["iPhone", "MacBook Pro", "iPad"];

    return devices.sort((a, b) => {
        if (order.indexOf(a.name) > order.indexOf(b.name)) { return 1; }
        if (order.indexOf(a.name) < order.indexOf(b.name)) { return -1; }
        return 0;
    })[0];
};

export const BACKEND_URL = process.env.NODE_ENV === "production"
    ? "https://whereis.dynamic.jcaw.me"
    : "http://127.0.0.1:5000";

export const MAPBOX_TOKEN = "pk.eyJ1IjoieW91cmFybSIsImEiOiJjamFoNWM3bXQxbHBuMzJvaTMydTJ3ODI3In0.XCIuLDNhGrDpAlKIQRMYjg";

const fetchDevices = () => {
    return fetch(`${BACKEND_URL}/devices`).then((resp) => resp.json());
};

const fetchGeocode = ({ lat, lng }: ICoordinates) => {
    return fetch(`${BACKEND_URL}/geocode?latitude=${lat}&longitude=${lng}`).then((resp) => resp.json());
};

const fetchTimezone = ({ lat, lng }: ICoordinates) => {
    return fetch(`${BACKEND_URL}/timezone?latitude=${lat}&longitude=${lng}`).then((resp) => resp.json());
};

const fetchWeather = ({ coordinates, units}) => {
    return fetch(
        `${BACKEND_URL}/weather?latitude=${coordinates.lat}&longitude=${coordinates.lng}&units=${units}`,
    ).then((resp) => resp.json());
};

export const api = {
    fetchDevices, fetchGeocode, fetchTimezone, fetchWeather,
};
