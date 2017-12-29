import { CLOCK_START, CLOCK_TICK, FETCH_DEVICES, FETCH_GEOCODE, FETCH_TIMEZONE, FETCH_WEATHER } from "./sagas";
import { IAppAction, IAppState, initialState } from "./state";

export const whereisApp = (state: IAppState = initialState, action: IAppAction) => {
    switch (action.type) {
        case FETCH_DEVICES.SUCCESS:
            return {
                ...state,
                devices: action.data,
            };
        case FETCH_WEATHER.SUCCESS:
            return {
                ...state,
                weather: action.data,
            };
        case FETCH_TIMEZONE.SUCCESS:
            return {
                ...state,
                timezone: action.data.timeZoneId,
            };
        case FETCH_GEOCODE.SUCCESS:
            return {
                ...state,
                coordinates: action.data.coordinates,
                location: action.data.location,
            };
        case CLOCK_START:
            return {
                ...state,
                milliseconds: action.data,
            };
        case CLOCK_TICK:
            return {
                ...state,
                milliseconds: state.milliseconds + 1000,
            };
        default:
          return state;
      }
};
