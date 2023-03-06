import React, { useState } from 'react';
import Calendar from 'react-calendar'
import "./Cal.css"

function MyCalendar() {

    const [date, setDate] = useState(new Date());

    return (
        <>
            <div className="calendar-container">
                <Calendar onChange={setDate} value={date}/>
            </div>
            <div className="text-center">
                Selected date: {date.toDateString()}
            </div>
        </>
    )
}

export default MyCalendar;