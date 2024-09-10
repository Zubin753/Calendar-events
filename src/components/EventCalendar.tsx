import React, {FC} from 'react';
import {Badge, Calendar} from "antd";
import {IEvent} from "../models/IEvent";
import dayjs from "dayjs";
import {formatDate} from "../utils/date";

interface EventCalendarProps {
    events: IEvent[]
}
const EventCalendar: FC<EventCalendarProps> = ({events}) => {

    function dateCellRender(value: dayjs.Dayjs)  {
        const formatedDate = formatDate(value.toDate());
        const currentDayEvents = events.filter(ev=> ev.date === formatedDate)
        return (
            <div>
                {currentDayEvents.map((ev, index) =>
                    <div key={index}>{ev.description}</div>
                )}
            </div>
        )
    }

    return (

        <Calendar className={"cal"} dateCellRender={dateCellRender}/>
    );
};

export default EventCalendar;