// TODO: loop render of weekdays, resolve click function to change classes

function DaysOfWeek() {
    const daysOfTheWeek = {
        0: { name: 'sunday', abbrv: 'S' },
        1: { name: 'monday', abbrv: 'M' },
        2: { name: 'tuesday', abbrv: 'T' },
        3: { name: 'wednesday', abbrv: 'W' },
        4: { name: 'thursday', abbrv: 'T' },
        5: { name: 'friday', abbrv: 'F' },
        6: { name: 'saturday', abbrv: 'S' },
    }

    function changeDay() {
        console.log('changing the day :)')
    }
    // return (
    //   <>
    //   {daysOfTheWeek[1].abbrv}
    //   </>
    // );
    return (
        <>
        <div className="weekday" onClick={changeDay}>
        S
        </div>
        <div className="weekday">
        M
        </div>
        <div className="weekday">
        T
        </div>
        <div className="weekday">
        W
        </div>
        <div className="weekday">
        T
        </div>
        <div className="weekday">
        F
        </div>
        <div className="weekday">
        S
        </div>
        </>
    )
}

function WeekDisplay() {
    return (
        <>
        <div className="weekdates">
            weekStart to weekEnd
        </div>
        <nav className="weekly-view">
            <div className="prev-week">
            <i className="fa-solid fa-angles-left"></i>
            </div>

            <DaysOfWeek/>

            <div className="next-week">
                <i className="fa-solid fa-angles-right"></i>
            </div>
        </nav>
        </>
    );
}

export default WeekDisplay;
