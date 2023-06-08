<template>
    <div>
        <div v-for="habit in uncompletedHabits" class="active" :key="habit.id">
            <i class="fa-regular fa-square" @click="updateHabitTask(habit)">[]</i>
            <span v-if="editing != habit.id" class="name">{{ habit.name }}</span>
            <span v-else-if="editing === habit.id">
                <input type="text" v-model="editHabitName" class="editfield">
            </span>
            <i class="fa-solid fa-pen-to-square" title="Edit" @click="editToggle(habit)">:)</i>
            <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', habit.id)">:(</i>
            <div>
                <span v-if="editing != habit.id" class="detail descrip">{{ habit.description }}</span>
                <div v-else-if="editing === habit.id">
                <textarea v-model="editHabitDesc" class="editfield"></textarea>
                </div>
            </div>
            <button v-if="editing === habit.id" @click="editHabit(habit.id)" class="save">
                <i class="fa-solid fa-floppy-disk">save</i>
            </button>
        </div>
        <!-- <div v-for="habit in completed" class="completed" :key="habit.id">
            <i class="fa-solid fa-square-check" @click="$emit('update', habit)"></i>
            <span class="name">{{habit.habit.name }}</span>
            <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', habit.habit.id)"></i>
            <div>
                <span class="detail descrip">{{habit.habit.description }}</span>
            </div>
        </div> -->
    </div>
</template>

<script>
import axios from 'axios'

import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        // completed: Array,
        token: String,
        activeDate: String
    },
    data: () => {
        return {
            habits: [],
            editing: null,
            editHabitName:'',
            editHabitDesc:'',
            token: '',
            newRecurrence: [false, false, false, false, false, false, false,],
            addHabitWindow: false,
            newHabitName: '',
            newHabitDesc: '',
            currentUser: '',
        }
    },
    computed: {
        uncompletedHabits() {
            return this.habits.filter(habit => !habit.habitTask || !habit.habitTask.completed_time)
        },
        headers() {
            return { 'Authorization': `Token ${this.token}`}
        }
    },
    methods: {
        editHabit(habitID) {
            axios.patch(`http://localhost:8000/api/habits/${habitID}/`, {
                "name": this.editHabitName,
                "description": this.editHabitDesc,
            }, { headers: {'Authorization': `Token ${this.token}`} }
            ).then(() => { this.getHabits() })

            this.editing = null
          
        },
        editToggle(habit) {
            if (this.editing != habit.id) {
                this.editing = habit.id
                this.editHabitName = habit.name
                this.editHabitDesc = habit.description
            } else {this.editing = null }
        },
        getHabits() {
            // const activeIndex = new Date(this.activeDateTime).getDay()
            console.log(this.token);

            axios.get('http://localhost:8000/api/habits/', {
                headers: {'Authorization': `Token ${this.token}`}
            }).then(res => {
                this.habits = res.data
                // this.habits = response.data.filter(h => h.recurrence.includes(activeIndex)).reverse()
                this.getHabitTasks()
                this.previewHabit()
            })
        },
        previewHabit() {
            this.habitsPrev = []
            if (this.habits.length > 0) {
                this.habitsPrev = this.habits.slice(0, 3)
            } else if (this.habits.length === 0) {
                this.habitsPrev.push({ "name": "Add some new habits!" })
            }
            if (this.habits[3] != undefined) {
                this.habitsPrev.push({ "name": "More...!" })
            }
        },
        getHabitTasks() {
            axios.get('http://localhost:8000/api/habittask/', {
                params: { date: '2023-06-06' },
                headers: {'Authorization': `Token ${this.token}`}
            }).then(response => {
                this.todayHabitTaskData = this.habits.map(h => {
                    let thisHabitTask = response.data.find(ht => ht.habit.id == h.id)
                    return {
                        habitTask: thisHabitTask,
                        name: h.name,
                        habit: h
                    }
                })
            })
            // axios.get('http://localhost:8000/api/habits/donetoday/', {
            //     params: { date: '2023-06-05' },
            //     headers: {'Authorization': `Token ${this.token}`}
            // })
            //     .then(response => {
            //         this.completedHabits = response.data.reverse()
            //     })
        },
        updateHabitTask(habitTaskData) {
            console.log(habitTaskData);
            if (habitTaskData.habitTask) {
                axios.patch(`http://localhost:8000/api/habittask/${habitTaskData.habitTask.id}/done/`, {},
                    { headers: {'Authorization': `Token ${this.token}`} }
                ).then(() => this.getHabitTasks())
            } else if (habitTaskData.completed_time) {
                axios.patch(`http://localhost:8000/api/habittask/${habitTaskData.id}/done/`, {},
                    { headers: {'Authorization': `Token ${this.token}`} }
                ).then(() => this.getHabitTasks())
            } else {
                axios.post(`http://localhost:8000/api/habittask/new/`, {
                    "date": '2023-06-05',
                    "habit": habitTaskData.id,
                    "completed_time": new Date(),
                }, { headers: {'Authorization': `Token ${this.token}`} }
                ).then(() => this.getHabitTasks())
            }
        },
        updateHabit(habitID) {
            axios.patch(`http://localhost:8000/api/habittask/${habitID}/`, {},
                { headers: {'Authorization': `Token ${this.token}`} }
            ).then(() => this.getHabits())
        },
        deleteHabit(habitID) {
            axios.delete(`http://localhost:8000/api/habits/${habitID}/`,
                { headers: {'Authorization': `Token ${this.token}`} }
            ).then(() => this.getHabits())
        },
        addHabit() {
            let sched = this.newRecurrence.reduce((day, bool, index) => bool ? day.concat(index, ',') : day, '')
            let recurrence = sched.slice(0, -1)

            axios.post(`http://localhost:8000/api/habits/new/`, {
                "name": this.newHabitName,
                "description": this.newHabitDesc,
                "user": this.currentUser,
                "recurrence": recurrence,
            }, { headers: {'Authorization': `Token ${this.token}`} }
            ).then(() => this.getHabits())

            this.addHabitWindow = false
            this.newHabitName = ''
            this.newHabitDesc = ''
        },        
    },
    mounted() {
        console.log(this.token);

        // axios.get('http://localhost:8000/api/current/', {
        //     headers: {'Authorization': `Token ${this.token}`}
        // }).then(res => this.currentUser = res.data)
        console.log(this.token);
        this.getHabits()

    }
})
</script>