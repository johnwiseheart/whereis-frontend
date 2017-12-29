import moment from "moment-timezone";
import React from "react";

interface ITimePanelProps {
    milliseconds: number;
    timezone: string;
}

export const TimePanel: React.SFC<ITimePanelProps> = ({ milliseconds, timezone }) => {
    const time = moment(milliseconds).tz(timezone);

    return (
        <div className="footer-child datetime">
            <div>
                <div className="time">{time && time.format("h:mm:ss A")}</div>
                <div className="date">{time && time.format("dddd D MMMM YYYY")}</div>
            </div>
        </div>
    );
};
