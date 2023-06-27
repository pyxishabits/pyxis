'use client'

import { useState, useRef } from "react"

const daysOfTheWeek = [
    { name: 'sunday', abbrv: 'S' },
    { name: 'monday', abbrv: 'M' },
    { name: 'tuesday', abbrv: 'T' },
    { name: 'wednesday', abbrv: 'W' },
    { name: 'thursday', abbrv: 'T' },
    { name: 'friday', abbrv: 'F' },
    { name: 'saturday', abbrv: 'S' },
  ]
  
function WeekSquares() {
    const [isActiveDay, setActiveDay] = useState(false)

    // const displaySquares = daysOfTheWeek.map(day =>
    //     <div
    //     key={day.name}
    //     className={isActiveDay ? 'weekday selectDay' : 'weekday'}
    //     onClick={() => selectDay(day)}
    //     >
    //     {day.abbrv}
    //     </div>
    // )

    function selectDay(day: any) {
        console.log(`clicked on ${day.name}`)
        setActiveDay((current) => !current)
    }

    return (
        // <>{displaySquares}</>
        <>
        {daysOfTheWeek.map((day) => (
            <div className={isActiveDay ? 'weekday selectDay' : 'weekday'}
            key={day.name}
            onClick={() => selectDay(day)}
            >{day.abbrv}</div>
        ))}
        </>
    )
}

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

            {/* {weekdayNames.map((day) => (
                <div className="weekday" key={day}
                onClick={() => selectDay(day)}
                >{day[0]}</div>
            ))} */}
            <WeekSquares/>

            <div className="next-week" onClick={weekNext}>
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </nav>
    </>
    );
}

export default WeekDisplay;