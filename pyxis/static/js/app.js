new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
        currentUser: '',
        habits: [],
        habitsPrev: [],
        tasks: {},
        tasksPrev: [],
        journalEntry: {},
        journalPrev: '',
        daysOfTheWeek: {
            0: { name: 'sunday', abbrv: 'S' },
            1: { name: 'monday', abbrv: 'M' },
            2: { name: 'tuesday', abbrv: 'T' },
            3: { name: 'wednesday', abbrv: 'W' },
            4: { name: 'thursday', abbrv: 'T' },
            5: { name: 'friday', abbrv: 'F' },
            6: { name: 'saturday', abbrv: 'S' },
        },
        today: '',
        activeDate: null,
        activeDateTime: null,
        activeHabits: false,
        activeTasks: false,
        activeJournal: false,
        changeWeekNext: false,
        changeWeekPrev: false,
        weekStart: '',
        weekEnd: '',
        addTaskWindow: false,
        addJournalWindow: false,
        addHabitWindow: false,
        newTaskName: '',
        newTaskDesc: '',
        newTaskUrgent: false,
        newTaskImportant: false,
        newTaskDue: null,
        newJournal: '',
        newHabitName: '',
        newHabitDesc: '',
        todayHabitTasksAll: [],
        todayHabitTasksCreated: [],
        todayHabitTaskData: []
    },
    methods: {
        getUser() {
            axios.get('/api/').then(res => this.currentUser = res.data.id)
        },
        getHabits() {
            axios.get('api/habits/')
                .then(response => {
                    this.habits = response.data.reverse()
                    // TODO: actual day awareness
                    todayHabits = this.habits.filter(h => h.recurrence.includes(5)).reverse()
                    this.getHabitTasks()
                    this.previewHabit()
                })
        },
        previewHabit() {
            if (this.habits.length > 0) {
                this.habitsPrev = this.habits.slice(0, 3)
            }
            if (this.habits[3] != undefined) {
                this.habitsPrev.push({ "name": "More...!" })
            }
        },
        getHabitTasks() {
            // TODO: this will need a date query param when the endpoint gets updated
            axios.get('api/habittask/')
                .then(response => {
                    this.todayHabitTasksCreated = response.data

                    this.todayHabitTaskData = todayHabits.map(h => {
                        thisHabitTask = this.todayHabitTasksCreated.find(ht => ht.habit.id == h.id)

                        // TODO: what does this actually need?
                        return {
                            habitTask: thisHabitTask,
                            name: h.name,
                            habit: h
                        }
                    })
                })
        },
        updateHabitTask(habitTaskData) {
            if (habitTaskData.habitTask) {
                axios.patch(`api/habittask/${habitTaskData.habitTask.id}/done/`, {},
                    { headers: { 'X-CSRFToken': this.token } }
                ).then(() => this.getHabitTasks())
            } else {
                // TODO: make this the selected date
                axios.post(`api/habittask/new/`, {
                    "date": this.newDate(),
                    "habit": habitTaskData.habit.id,
                    "completed_time": new Date(),
                }, { headers: { 'X-CSRFToken': this.token } }
                ).then(() => this.getHabitTasks())
            }
        },
        editHabit() {

        },
        addHabit() {
            axios.post(`api/habits/new/`, {
                "name": this.newHabitName,
                "description": this.newHabitDesc,
                "user": this.currentUser,
                "recurrence": '1,3,5'
            }, { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getHabits())

            this.addHabitWindow = false
            this.newHabitName = ''
            this.newHabitDesc = ''

        },
        tasksPreview() {
            if (this.tasks.length > 0) {
                this.tasksPrev = this.tasks.slice(0, 3)
            }
            if (this.tasks[3] != undefined) {
                this.tasksPrev.push({ "name": "More...!" })
            }
        },
        getTodayTasks() {
            axios.get('api/tasks/')
                .then(response => {
                    this.tasks = response.data.reverse()
                    this.tasksPreview()
                })
        },
        updateTask(taskID) {
            axios.patch(`api/tasks/${taskID}/done/`, {},
                { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getTodayTasks())
        },
        deleteTask(taskID) {
            axios.delete(`api/tasks/${taskID}/`, {
                headers: { 'X-CSRFToken': this.token }
            }).then(() => this.getTodayTasks())
        },
        addTask() {
            axios.post(`api/tasks/new/`, {
                "name": this.newTaskName,
                "description": this.newTaskDesc,
                "date": this.newDate(),
                "completed_time": null,
                "is_urgent": this.newTaskUrgent,
                "is_important": this.newTaskImportant,
                "due_date": this.newTaskDue,
                "user": this.currentUser
            }, { headers: { 'X-CSRFToken': this.token } })
                .then(() => this.getTodayTasks())
            this.addTaskWindow = false
            this.newTaskName = ''
            this.newTaskDesc = ''
            this.newTaskUrgent = false
            this.newTaskImportant = false
            this.newTaskDue = null
        },
        viewForDay(day) {
            this.today = day
            let foundDay
            for (key in this.daysOfTheWeek) {
                if (this.daysOfTheWeek[key].name === day) {
                    foundDay = key
                }
            }

            dayNum = Number(foundDay)
            let sun = new Date(this.weekStart)
            let jsonDate = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() + dayNum).toJSON()

            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            this.activeDate = dateString
            this.getTasks()
        },
        newDate() {
            const newDate = new Date()
            let jsonDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).toJSON()
            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            return dateString
        },
        getJournal() {
            let todayJournal = this.newDate()
            axios.get('api/journal/', {
                params: { date: todayJournal }
            })
                .then(response => {
                    this.journalEntry = response.data
                    this.journalPreview()
                })
        },
        createJournal(journalID) {
            axios.patch(`api/journal/${journalID}/edit/`,
                { "entry": this.newJournal }, { headers: { 'X-CSRFToken': this.token } }
            ).then(response => {
                this.journalEntry = response.data
                this.addJournalWindow = false
                this.getJournal()
            })
        },
        journalPreview() {
            if (this.journalEntry.entry != null) {
                const lineBreak = this.journalEntry.entry.split(/\r?\n/)
                let firstLine = lineBreak[0]
                this.journalPrev = firstLine
            }
        },
        weekNext() {
            this.changeWeekNext = true
            setTimeout(() => {
                this.changeWeekNext = false
            }, 1000)

            let sun = new Date(this.weekStart)
            let sat = new Date(this.weekEnd)
            let curr = new Date(this.activeDateTime)

            this.weekStart = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() + 7).toDateString()
            this.weekEnd = new Date(sat.getFullYear(), sat.getMonth(), sat.getDate() + 7).toDateString()
            let jsonDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() + 7).toJSON()

            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            this.activeDate = dateString
            this.getTasks()
        },
        weekPrev() {
            this.changeWeekPrev = true
            setTimeout(() => {
                this.changeWeekPrev = false
            }, 1000)

            let sun = new Date(this.weekStart)
            let sat = new Date(this.weekEnd)
            let curr = new Date(this.activeDateTime)

            this.weekStart = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() - 7).toDateString()
            this.weekEnd = new Date(sat.getFullYear(), sat.getMonth(), sat.getDate() - 7).toDateString()
            let jsonDate = new Date(curr.getFullYear(), curr.getMonth(), curr.getDate() - 7).toJSON()

            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            this.activeDate = dateString
            this.getTasks()
        },
        getWeek() {
            let curr = new Date
            let first = curr.getDate() - curr.getDay()

            let firstday = new Date(curr.setDate(first)).toDateString()
            let lastday = new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toDateString()

            this.weekStart = firstday
            this.weekEnd = lastday
        },
        openTasks() {
            this.addTaskWindow = !this.addTaskWindow
            this.activeTasks = true
            this.activeHabits = false
            this.activeJournal = false
        },
        openJournal() {
            this.addJournalWindow = !this.addJournalWindow
            this.activeTasks = false
            this.activeHabits = false
            this.activeJournal = true
        },
        openHabits() {
            this.addHabitWindow = !this.addHabitWindow
            this.activeTasks = false
            this.activeHabits = true
            this.activeJournal = false
        }
    },
    computed: {
        todayWeekday() {
            const todayDate = new Date
            const todayIndex = todayDate.getDay()
            if (this.today === '') {
                return this.today = this.daysOfTheWeek[todayIndex].name
            }
        },
    },
    mounted() {
        this.activeDate = this.newDate()
        this.getUser()
        this.getJournal()
        this.getTasks()
        this.getWeek()
        this.getHabits()
        this.token = document.querySelector('input[name=csrfmiddlewaretoken]').value
    },
})


Vue.component('UserTasks', {
    template: `
        <div>
        <span v-if="!task.completed_time" @click="$emit('update', task.id)">
            <i class="fa-regular fa-square"></i>
        </span>
        <span v-else-if="task.completed_time" @click="$emit('update', task.id)">
            <i class="fa-solid fa-square-check"></i>
        </span>
        <span v-if="editing === null" class="name">[[ task.name ]]</span>
        <span v-else-if="editing === task.id">
            <input type="text" v-model="editTaskName" class="editfield">
        </span>
        <i class="fa-solid fa-pen-to-square" title="Edit" @click="editToggle"></i>
        <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', task.id)"></i>
            <div>
                <span v-if="editing === null" class="detail descrip">[[ task.description ]]</span>
                <div v-else-if="editing === task.id">
                <textarea v-model="editTaskDesc" class="editfield"></textarea>
                </div>
            </div>
            <div>
                <span v-if="task.is_urgent">
                    <span v-if="editing === null" class="detail">
                        URGENT
                    </span>
                </span>
                <span v-if="editing === task.id">
                    Urgent: <input type="checkbox" v-model="editTaskUrgent">
                </span>
                <span v-if="task.is_important">
                    <span v-if="editing === null" class="detail">
                        IMPORTANT
                    </span>
                </span>
                <span v-if="editing === task.id">
                    Important: <input type="checkbox" v-model="editTaskImportant">
                </span>
            </div>
            <div v-if="task.due_date">
                <span v-if="editing === null" class="detail">Due: [[ dueDisplay ]]</span>
                <span v-else-if="editing === task.id">
                    <input type="date" v-model="editTaskDue" class="editfield">
                </span>
            </div> 
            <button v-if="editing === task.id" @click="editTask" class="save">
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
        </div>
        `,
    props: {
        task: Object,
    },
    delimiters: ['[[', ']]'],
    data: () => {
        return {
            editing: null,
            editTaskName: '',
            editTaskDesc: '',
            dueDisplay: '',
            editTaskDue: null,
            editTaskUrgent: false,
            editTaskImportant: false,
        }
    },
    methods: {
        editTask() {
            axios.patch(`api/tasks/${this.task.id}/`, {
                "name": this.editTaskName,
                "description": this.editTaskDesc,
                "due_date": this.editTaskDue,
                "is_urgent": this.editTaskUrgent,
                "is_important": this.editTaskImportant
            }, { headers: { 'X-CSRFToken': this.$parent.token } }
            ).then(() => { this.$parent.getTasks() })

            this.editing = null
        },
        editToggle() {
            if (this.editing === null) {
                return this.editing = this.task.id
            } else { return this.editing = null }
        },
        dueDate() {
            const newDate = new Date(this.task.due_date)
            let jsonDate = newDate.toJSON()
            let dateString = jsonDate.slice(0, 10)
            this.dueDisplay = dateString
        },
    },
    mounted() {
        this.dueDate()
        this.editTaskName = this.task.name
        this.editTaskDesc = this.task.description
        this.editTaskDue = this.dueDate()
        this.editTaskUrgent = this.task.is_urgent
        this.editTaskImportant = this.task.is_important
    },
    updated() {
        this.dueDate()
    }
})

Vue.component('DailyJournal', {
    template: ` 
        <div>
            <strong>[[ journal.date ]]</strong>
            <span><i class="fa-solid fa-pen-to-square" title="Edit" @click="editJournalToggle"></i></span>
            
            <p v-if="editJournal === null" class="detail descrip">[[journal.entry]]</p>
            <p v-else-if="editJournal === journal.id">
                <textarea v-model="editEntry" class="editfield" rows="10" cols="70"></textarea>
            </p>
            <button v-if="editJournal === journal.id" @click="updateJournal" class="save">
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
        </div>`,
    props: {
        journal: Object
    },
    delimiters: ['[[', ']]'],
    data: () => {
        return {
            editJournal: null,
            editEntry: '',
        }
    },
    methods: {
        editJournalToggle() {
            if (this.editJournal === null) {
                return this.editJournal = this.journal.id
            } else { return this.editJournal = null }
        },
        updateJournal() {
            axios.patch(`api/journal/${this.journal.id}/edit/`,
                { "entry": this.editEntry }, { headers: { 'X-CSRFToken': this.$parent.token } }
            ).then(response => {
                this.$parent.journalEntry = response.data
                this.editJournal = null
                this.$parent.getJournal()
            })
        }
    },
    mounted() {
        this.editEntry = this.journal.entry
    }
})