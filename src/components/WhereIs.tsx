import classNames from "classnames";
import { action } from "index";
import moment from "moment-timezone";
import React from "react";
import { connect } from "react-redux";
import "whatwg-fetch";
import "WhereIs.scss";
import { FETCH_DEVICES } from "../sagas";
import {
    ICoordinates,
    IDevice,
    IGeoCodeResponse,
    ITimezoneResponse,
    IWeatherDay,
    IWeatherResponse,
    IWeatherState,
    UnitType,
} from "../state";
import { api,
    getBestDevice,
    MAPBOX_TOKEN,
} from "../util";
import { Loader } from "./Loader";
import { LocationPanel } from "./LocationPanel";
import { Map } from "./Map";
import { TimePanel } from "./TimePanel";
import { WeatherPanel } from "./WeatherPanel";

interface IWhereIsProps {
    devices: IDevice[];
    location: string;
    coordinates: ICoordinates;
    weather: IWeatherState;
    timezone: string;
    milliseconds: number;
}

class WhereIs extends React.Component<IWhereIsProps, {}> {
    private container: HTMLDivElement;
    private refHandler = {
        container: (container: HTMLDivElement) => {
            this.container = container;
        },
    };

    public componentWillMount() {
        action(FETCH_DEVICES.REQUEST);
    }

    public render() {
        const { coordinates, location, milliseconds, timezone, weather } = this.props;

        const maybeRenderMap = coordinates
            ? (
                <Map
                    coordinates={coordinates}
                    height={this.container.offsetHeight}
                    width={this.container.offsetWidth}
                />
            )
            : (
                <div className="loader-center">
                    <Loader />
                </div>
            );

        const maybeRenderLocation = location
            ? <LocationPanel location={location} />
            : <Loader />;

        const maybeRenderWeather = weather
            ? <WeatherPanel weather={weather} />
            : <Loader />;

        const maybeRenderTime = milliseconds
            ? <TimePanel milliseconds={milliseconds} timezone={timezone}/>
            : <Loader />;

        return (
            <div ref={this.refHandler.container}>
                {maybeRenderMap}
                <div className="container">
                    <div className="panel">
                        {maybeRenderLocation}
                    </div>
                    <div className="footer panel">
                        {maybeRenderTime}
                        {maybeRenderWeather}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        coordinates: state.coordinates,
        devices: state.devices,
        location: state.location,
        milliseconds: state.milliseconds,
        timezone: state.timezone,
        weather: state.weather,
    };
};

export default connect(mapStateToProps)(WhereIs);
