import React from "react";

interface ILocationPanelProps {
    location: string;
}

export const LocationPanel: React.SFC<ILocationPanelProps> = ({ location }) => (
    <div>
        <div className="subtext">John's in</div>
        <h1>{location}</h1>
    </div>
);
