async function WeekDisplay() {
    // WeekDisplay(weekdayNames: Array<string>)
    // console.log(weekdayNames)
    // let weekdays: Array<string> = Array.from(weekdayNames);
    // console.log(weekdays)

    const weekdayNames: Array<string> = ['Sunday','Monday','Tuesday','Wednesday',
    'Thursday','Friday','Saturday']

    function findThisWeek() {
        let curr = new Date
        let first = curr.getDate() - curr.getDay()

        let firstday = new Date(curr.setDate(first)).toDateString()
        let lastday = new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toDateString()

        return [firstday, lastday]
    }
    
    return (
    <>
        <div id="weekdates">
            {findThisWeek()[0]} to {findThisWeek()[1]}
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