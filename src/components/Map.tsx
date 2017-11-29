import React from "react";
import { StaticMap } from "react-map-gl";
import { ICoordinates } from "../state";
import { MAPBOX_TOKEN } from "../util";
import { Loader } from "./Loader";

interface IMapProps {
    coordinates: ICoordinates;
    height: number;
    width: number;
}

export const Map: React.SFC<IMapProps> = ({ coordinates: { lat, lng }, height, width }) => {
    return (
        <div className="map">
            <StaticMap
                width={width}
                height={height}
                latitude={lat}
                longitude={lng}
                zoom={8}
                mapStyle="mapbox://styles/yourarm/cizgnx6xj008q2roia5fiwne7"
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        </div>
    );
};
