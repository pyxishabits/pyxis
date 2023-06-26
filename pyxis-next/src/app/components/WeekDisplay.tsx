async function WeekDisplay() {
    // WeekDisplay(weekdayNames: Array<string>)
    // console.log(weekdayNames)
    // let weekdays: Array<string> = Array.from(weekdayNames);
    // console.log(weekdays)

    let weekStart: string = 'Saturday'
    let weekEnd: string = 'Sunday'

    const weekdayNames: Array<string> = ['Sunday','Monday','Tuesday','Wednesday',
    'Thursday','Friday','Saturday']

    function findDates() {
        let weekStart = "the start"
        let weekEnd = "the end :)"
        return weekStart
    }

    return (
    <>
        <div id="weekdates">
            {weekStart} to [[ weekEnd ]]
        </div>

        <nav id="weekly-view">
            <div className="prev-week">
            {/* @click="weekPrev" */}
                <i className="fa-solid fa-angles-left"></i>
            </div>

            {weekdayNames.map((day) => (
                <div className="weekday" key={day}>{day[0]}</div>
            ))}

            <div className="next-week">
            {/* @click="weekNext" */}
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </nav>
    </>
    );
}

export default WeekDisplay;