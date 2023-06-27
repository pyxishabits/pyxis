'use client'

import { useState, useRef } from "react"

function WeekDisplay() {
    // WeekDisplay(weekdayNames: Array<string>)
    // console.log(weekdayNames)
    // turned into Object????

    let weekStart = findThisWeek()[0]
    let weekEnd = findThisWeek()[0]

    const weekdayNames: Array<string> = ['Sunday','Monday','Tuesday','Wednesday',
    'Thursday','Friday','Saturday']

    function findThisWeek() {
        let curr = new Date
        let first = curr.getDate() - curr.getDay()

        let firstday = new Date(curr.setDate(first)).toDateString()
        let lastday = new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toDateString()

        return [firstday, lastday]
    }

    function weekPrev() {
        console.log("previous")
    }

    function selectDay(day: any) {
        console.log(`clicked on ${day}`)
    }

    function weekNext() {
        console.log("next")
    }

    return (
    <>
        <div id="weekdates">
            {weekStart} to {weekEnd}
        </div>

        <nav id="weekly-view">
            <div className="prev-week" onClick={weekPrev}>
                <i className="fa-solid fa-angles-left"></i>
            </div>

            {weekdayNames.map((day) => (
                <div className="weekday" key={day}
                onClick={() => selectDay(day)}
                >{day[0]}</div>
            ))}

            <div className="next-week" onClick={weekNext}>
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </nav>
    </>
    );
}

export default WeekDisplay;