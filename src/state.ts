export interface ICoordinates {
    lat: number;
    lng: number;
}

export interface IDevice {
    id: string;
    coordinates: ICoordinates;
    name: string;
}

export interface IGeoCodeResponse {
    coordinates: ICoordinates;
    location: string;
}

export interface ITimezoneResponse {
    timeZoneId: string;
}

export interface IWeatherDay {
    high: number;
    low: number;
    icon: string;
}

export interface IWeatherResponse {
    currently: number;
    daily: IWeatherDay[];
}

export interface IWeatherState extends IWeatherResponse {
    lastUpdated: Date;
}

export enum UnitType {
    SI = "si",
    US = "us",
}

export interface IAppAction {
    type: string;
    data: any;
}

export interface IAppState {
    coordinates: ICoordinates;
    devices: IDevice[];
    location: string;
    milliseconds: number;
    timezone: string;
    weather: IWeatherState;
}

export const initialState: IAppState = {
    coordinates: undefined,
    devices: [],
    location: undefined,
    milliseconds: undefined,
    timezone: undefined,
    weather: undefined,
};
