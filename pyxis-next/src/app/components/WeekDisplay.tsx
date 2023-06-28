'use client'

import { useState } from "react"

function Square({ day }: any) {
    const [isActiveDay, setActiveDay] = useState(false)

    function selectDay(day: any) {
        console.log(`clicked on ${day.name}`)
        setActiveDay((current) => !current)
    }

    return (
        <div className={isActiveDay ? 'weekday selectDay' : 'weekday'}
        key={day.name}
        onClick={() => selectDay(day)}>
            {day.abbrv}
        </div>
    )
}

function WeekSquares({ daysOfTheWeek }: any, { today }: any) {
    const [isToday, setToday] = useState()

    return (
        <>
        <Square day={daysOfTheWeek[0]} key={daysOfTheWeek[0].name}/>
        <Square day={daysOfTheWeek[1]} key={daysOfTheWeek[1].name}/>
        <Square day={daysOfTheWeek[2]} key={daysOfTheWeek[2].name} className={today === daysOfTheWeek[0].name ? 'weekday selectDay' : 'weekday'}/>
        <Square day={daysOfTheWeek[3]} key={daysOfTheWeek[3].name}/>
        <Square day={daysOfTheWeek[4]} key={daysOfTheWeek[4].name}/>
        <Square day={daysOfTheWeek[5]} key={daysOfTheWeek[5].name}/>
        <Square day={daysOfTheWeek[6]} key={daysOfTheWeek[6].name}/>
        {/* {daysOfTheWeek.map((day) => (
            <div className={isActiveDay ? 'weekday selectDay' : 'weekday'}
            key={day.name}
            onClick={() => selectDay(day)}
            >{day.abbrv}</div>
        ))} */}
        </>
    )
}

function WeekDisplay({ daysOfTheWeek }: any) {

    let today = findToday()
    let weekStart = findThisWeek()[0]
    let weekEnd = findThisWeek()[1]

    function findThisWeek() {
        let curr = new Date
        let first = curr.getDate() - curr.getDay()

        let firstday = new Date(curr.setDate(first)).toDateString()
        let lastday = new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toDateString()

        return [firstday, lastday]
    }

    function findToday() {
        const todayDate = new Date
        const todayIndex = todayDate.getDay()
        return daysOfTheWeek[todayIndex].name
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
            <WeekSquares daysOfTheWeek={ daysOfTheWeek} today={ findToday() } />

            <div className="next-week" onClick={weekNext}>
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </nav>
    </>
    );
}

export default WeekDisplay;