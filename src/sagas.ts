import { delay } from "redux-saga";
import { all, call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { UnitType } from "./state";
import { api, getBestDevice } from "./util";

export default function* rootSaga() {
    yield watchFetchDevices();
}

const CreateApiAction = (name: string) => ({
    FAILED: name + "_FAILED",
    REQUEST: name + "_REQUEST",
    SUCCESS: name + "_SUCCESS",
    failure: (data) => ({ type: name + "_FAILED", data }),
    success: (data) => ({ type: name + "_SUCCESS", data }),
});

export const CLOCK_TICK = "CLOCK_TICK";
export const CLOCK_START = "CLOCK_START";

export const FETCH_DEVICES = CreateApiAction("FETCH_DEVICES");
export const FETCH_GEOCODE = CreateApiAction("FETCH_GEOCODE");
export const FETCH_WEATHER = CreateApiAction("FETCH_WEATHER");
export const FETCH_TIMEZONE = CreateApiAction("FETCH_TIMEZONE");

export function* fetchDevices() {
    try {
        const data = yield call(api.fetchDevices);
        const bestDevice = getBestDevice(data);
        yield all([
            call(fetchGeocode, bestDevice.coordinates),
            call(fetchWeather, { coordinates: bestDevice.coordinates, units: UnitType.SI }),
            call(fetchTimezone, bestDevice.coordinates),
        ]);
        yield put(FETCH_DEVICES.success(data));

    } catch (error) {
        yield put(FETCH_DEVICES.failure(error));
    }
}

function* watchFetchDevices() {
    yield takeLatest(FETCH_DEVICES.REQUEST, fetchDevices);
}

export function* fetchGeocode(payload) {
    try {
        const data = yield call(api.fetchGeocode, payload);
        yield put(FETCH_GEOCODE.success(data));
    } catch (error) {
        yield put(FETCH_GEOCODE.failure(error));
    }
}

export function* fetchWeather(payload) {
    try {
        const data = yield call(api.fetchWeather, payload);
        yield put(FETCH_WEATHER.success(data));
    } catch (error) {
        yield put(FETCH_WEATHER.failure(error));
    }
}

export function* fetchTimezone(payload) {
    try {
        const data = yield call(api.fetchTimezone, payload);
        yield call(startClock);
        yield put(FETCH_TIMEZONE.success(data));
    } catch (error) {
        yield put(FETCH_TIMEZONE.failure(error));
    }
}

export function* startClock() {
    yield put({ type: CLOCK_START, data: (new Date()).getTime() });
    while (true) {
        yield call(delay, 1000);
        yield call(tickClock);
    }
}

export function* tickClock() {
    yield put({ type: CLOCK_TICK });
}
