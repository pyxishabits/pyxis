'use client'
import { useState } from "react"
import axios from 'axios'

function AddHabitWindow() {
    const daysOfTheWeek = [
        { name: 'sunday', abbrv: 'S' },
        { name: 'monday', abbrv: 'M' },
        { name: 'tuesday', abbrv: 'T' },
        { name: 'wednesday', abbrv: 'W' },
        { name: 'thursday', abbrv: 'T' },
        { name: 'friday', abbrv: 'F' },
        { name: 'saturday', abbrv: 'S' },
      ]

    return (
        <div className="add-window">
            <h4>New Habit</h4>
            <div className="input">
                <label htmlFor="habitname">Name: </label>
                <input type="text" name="habitname" v-model="newHabitName">
                </input>
            </div>
            <div className="input">
                <label htmlFor="habitdesc">Description: </label>
                <div>
                    <textarea name="habitdesc" rows={5} cols={25} v-model="newHabitDesc"></textarea>
                </div>
            </div>
            <div className="input">
                <label htmlFor="recurrence">Schedule: </label>
                <div className="habit-scheduler">
                    SCHEDULER HERE
                </div>
            </div>
        </div>
    )
}

function HabitPreview() {
    return (
        <div className="preview">
            <div>
                habit prev
            </div>
            <div>
                habit prev
            </div>
        </div>
    )
}

function HabitDisplay() {
    return (
        <div>
            <div className="active">
                <i className="fa-regular fa-square"></i>
                <span className="name"> HABIT NAME</span>
                <i className="fa-solid fa-pen-to-square" title="Edit"></i>
                <i className="fa-regular fa-trash-can" title="Delete"></i>
                <div>
                    <span className="detail descrip">
                        [[ description ]]
                    </span>
                </div>
                <button className="save">
                    <i className="fa-solid fa-floppy-disk"></i>
                </button>
            </div>
            <div v-for="habit in completed" className="completed">
                <i className="fa-solid fa-square-check"></i>
                <span className="name">COMPLETED HABIT</span>
                <i className="fa-regular fa-trash-can" title="Delete"></i>
                <div>
                    <span className="detail descrip">[[ description ]]</span>
                </div>
            </div>
        </div>
    )
}

function AddEntry() {
    // ADD PROPS to open appropriate tab
    return (
        <div className="add-entry">
            <button className="add-button">
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}

function MainFrame({ type }: any ) {
    const [isActiveTab, setActive] = useState()
    let contents

    if (type == 'habits') {
        contents = (
            <>
            <div className="show-entry">
                <HabitPreview/>
                <div className="full">
                    <AddHabitWindow/>
                    <HabitDisplay/>
                </div>
            </div>
            <AddEntry/>
            </>
        )
    }
    else if (type == 'tasks') {
        contents = (
            <>
                <div className="show-entry">it's tasks</div>
                <AddEntry/>
            </>
        )
    }
    else {
        contents = (
            <>
                <div className="show-entry">journal . </div>
                <AddEntry/>
            </>
        )
    }

    return (
        <div className="main inactiveTab">
            <div className="title"><h3>Today's {type}</h3></div>
            {contents}
        </div>
    )
}

export default MainFrame;