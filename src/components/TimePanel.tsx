import moment from "moment";
import React from "react";

interface ITimePanelProps {
    milliseconds: number;
}

export const TimePanel: React.SFC<ITimePanelProps> = ({ milliseconds }) => {
    const time = moment(milliseconds);

    return (
        <div className="footer-child datetime">
            <div>
                <div className="time">{time.format("h:mm:ss A")}</div>
                <div className="date">{time.format("dddd D MMMM YYYY")}</div>
            </div>
        </div>
    );
};
