new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
        viewMenu: false,
        showTutorial: true,
        currentUser: '',
        habits: [],
        habitsPrev: [],
        tasks: [],
        tasksPrev: [],
        completedTasks: [],
        completedHabits: [],
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
        newRecurrence: [false, false, false, false, false, false, false,],
        todayHabitTasksAll: [],
        todayHabitTasksCreated: [],
        todayHabitTaskData: []
    },
    methods: {
        getUser() {
            axios.get('api/current/').then(res => this.currentUser = res.data.id)
        },
        getHabits() {
            const activeIndex = new Date(this.activeDateTime).getDay()

            axios.get('api/habits/')
            .then(response => {
                this.habits = response.data.filter(h => h.recurrence.includes(activeIndex)).reverse()
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
            axios.get('api/habittask/', {
                params: { date: this.activeDate }
            })
                .then(response => {
                    this.todayHabitTasksCreated = response.data

                    this.todayHabitTaskData = this.habits.map(h => {
                        let thisHabitTask = this.todayHabitTasksCreated.find(ht => ht.habit.id == h.id)

                        return {
                            habitTask: thisHabitTask,
                            name: h.name,
                            habit: h
                        }
                    })
                })
                    axios.get('api/habits/donetoday/', {
                        params: { date: this.activeDate }
                    })
                        .then(response => {
                            this.completedHabits = response.data.reverse()
                        })
        },
        updateHabitTask(habitTaskData) {
            if (habitTaskData.habitTask) {
                axios.patch(`api/habittask/${habitTaskData.habitTask.id}/done/`, {},
                    { headers: { 'X-CSRFToken': this.token } }
                ).then(() => this.getHabitTasks())
            } else if (habitTaskData.completed_time) {
                axios.patch(`api/habittask/${habitTaskData.id}/done/`, {},
                    { headers: { 'X-CSRFToken': this.token } }
                ).then(() => this.getHabitTasks())
            } else {
                axios.post(`api/habittask/new/`, {
                    "date": this.activeDate,
                    "habit": habitTaskData.habit.id,
                    "completed_time": new Date(),
                }, { headers: { 'X-CSRFToken': this.token } }
                ).then(() => this.getHabitTasks())
            }
        },
        updateHabit(habitID) {
            axios.patch(`api/habittask/${habitID}/`, {},
                { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getHabits())
        },
        deleteHabit(habitID) {
            axios.delete(`api/habits/${habitID}/`,
                { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getHabits())
        },
        addHabit() {
            let sched = this.newRecurrence.reduce((day, bool, index) => bool ? day.concat(index, ',') : day, '')
            let recurrence = sched.slice(0, -1)

            axios.post(`api/habits/new/`, {
                "name": this.newHabitName,
                "description": this.newHabitDesc,
                "user": this.currentUser,
                "recurrence": recurrence,
            }, { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getHabits())

            this.addHabitWindow = false
            this.newHabitName = ''
            this.newHabitDesc = ''

        },
        tasksPreview() {
            this.tasksPrev = []
            if (this.tasks.length > 0) {
                this.tasksPrev = this.tasks.slice(0, 3)
            } else if (this.tasks.length === 0) {
                this.tasksPrev.push({ "name": "Add some new tasks!" })
            }
            if (this.tasks[3] != undefined) {
                this.tasksPrev.push({ "name": "More...!" })
            }
        },
        getTasks() {
            axios.get('api/tasks/', {
                params: { date: this.activeDate }
            })
                .then(response => {
                    this.tasks = response.data.reverse()
                    this.tasksPreview()
                })

            axios.get('api/tasks/donetoday/', {
                params: { date: this.activeDate }
            })
                .then(response => {
                    this.completedTasks = response.data.reverse()
                })
        },
        updateTask(taskID) {
            axios.patch(`api/tasks/${taskID}/done/`, {},
                { headers: { 'X-CSRFToken': this.token } }
            ).then(() => this.getTasks())
        },
        deleteTask(taskID) {
            axios.delete(`api/tasks/${taskID}/`, {
                headers: { 'X-CSRFToken': this.token }
            }).then(() => this.getTasks())
        },
        addTask() {
            axios.post(`api/tasks/new/`, {
                "name": this.newTaskName,
                "description": this.newTaskDesc,
                "date": this.activeDate,
                "completed_time": null,
                "is_urgent": this.newTaskUrgent,
                "is_important": this.newTaskImportant,
                "due_date": this.newTaskDue,
                "user": this.currentUser
            }, { headers: { 'X-CSRFToken': this.token } })
                .then(() => this.getTasks())
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

            this.getHabits()
            this.getTasks()
            this.getJournal()
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

            if (this.currentUser) {
                axios.get('api/journal/', {
                    params: { date: todayJournal }
                })
                    .then(response => {
                        this.journalEntry = response.data
                        this.journalPreview()
                    })
            }
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

            this.getHabits()
            this.getTasks()
            this.getJournal()
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

            this.getHabits()
            this.getTasks()
            this.getJournal()
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
    beforeMount() {
        this.getUser()
    },
    mounted() {
        // this.getUser()
        this.token = document.querySelector('input[name=csrfmiddlewaretoken]').value
        this.activeDate = this.newDate()
        this.getWeek()
        this.viewForDay(this.today)
    }
})


Vue.component('UserTasks', {
    template: `
        <div>
            <div v-for="task in tasks" class="active">
                <i class="fa-regular fa-square" @click="$emit('update', task.id)"></i>
                <span v-if="editing != task.id" class="name">[[ task.name ]]</span>
                <span v-else-if="editing === task.id">
                    <input type="text" v-model="editTaskName" class="editfield">
                </span>
                <i class="fa-solid fa-pen-to-square" title="Edit" @click="editToggle(task)"></i>
                <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', task.id)"></i>
                <div>
                    <span v-if="editing != task.id" class="detail descrip">[[ task.description ]]</span>
                    <div v-else-if="editing === task.id">
                    <textarea v-model="editTaskDesc" class="editfield"></textarea>
                    </div>
                </div>
                <div>
                    <span v-if="task.is_urgent">
                        <span v-if="editing != task.id" class="detail">
                            URGENT
                        </span>
                    </span>
                    <span v-if="editing === task.id">
                        Urgent: <input type="checkbox" v-model="editTaskUrgent">
                    </span>
                    <span v-if="task.is_important">
                        <span v-if="editing != task.id" class="detail">
                            IMPORTANT
                        </span>
                    </span>
                    <span v-if="editing === task.id">
                        Important: <input type="checkbox" v-model="editTaskImportant">
                    </span>
                </div>
                <div v-if="task.due_date">
                    <span v-if="editing != task.id" class="detail">Due: [[ dueDate(task.due_date) ]]</span>
                </div>
                <div v-if="editing === task.id">
                        <input type="date" v-model="editTaskDue" class="editfield">
                </div>
                <button v-if="editing === task.id" @click="editTask(task.id)" class="save">
                    <i class="fa-solid fa-floppy-disk"></i>
                </button>
            </div>
            <div v-for="task in completed" class="completed">
                <i class="fa-solid fa-square-check" @click="$emit('update', task.id)"></i>
                <span class="name">[[ task.name ]]</span>
                <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', task.id)"></i>
                <div>
                    <span class="detail descrip">[[ task.description ]]</span>
                </div>
            </div>
        </div>
        `,
    props: {
        tasks: Array,
        completed: Array,
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
        editTask(taskID) {
            axios.patch(`api/tasks/${taskID}/`, {
                "name": this.editTaskName,
                "description": this.editTaskDesc,
                "due_date": this.editTaskDue,
                "is_urgent": this.editTaskUrgent,
                "is_important": this.editTaskImportant
            }, { headers: { 'X-CSRFToken': this.$parent.token } }
            ).then(() => { this.$parent.getTasks() })

            this.editing = null
        },
        editToggle(task) {
            if (this.editing != task.id) {
                this.editing = task.id
                this.editTaskName = task.name
                this.editTaskDesc = task.description
                this.editTaskDue = this.dueDate(task.due_date)
                this.editTaskUrgent = task.is_urgent
                this.editTaskImportant = task.is_important
            } else { this.editing = null }
        },
        dueDate(datetime) {
            if (datetime) {
                const newDate = new Date(datetime)
                let jsonDate = newDate.toJSON()
                let dateString = jsonDate.slice(0, 10)
                return dateString
            } else {return null}
        },
    },
})

Vue.component('UserHabits', {
    template:` 
    <div>
        <div v-for="habit in habits" v-if="!habit.habitTask || !habit.habitTask.completed_time" class="active">
        
            <i class="fa-regular fa-square" @click="$emit('update', habit)"></i>
            <span v-if="editing != habit.habit.id" class="name">[[ habit.habit.name ]]</span>
            <span v-else-if="editing === habit.habit.id">
                <input type="text" v-model="editHabitName" class="editfield">
            </span>
            <i class="fa-solid fa-pen-to-square" title="Edit" @click="editToggle(habit.habit)"></i>
            <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', habit.habit.id)"></i>
            <div>
                <span v-if="editing != habit.habit.id" class="detail descrip">[[ habit.habit.description ]]</span>
                <div v-else-if="editing === habit.habit.id">
                <textarea v-model="editHabitDesc" class="editfield"></textarea>
                </div>
            </div>
            <button v-if="editing === habit.habit.id" @click="editHabit(habit.habit.id)" class="save">
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
        </div>
        <div v-for="habit in completed" class="completed">
        <i class="fa-solid fa-square-check" @click="$emit('update', habit)"></i>
        <span class="name">[[ habit.habit.name ]]</span>
        <i class="fa-regular fa-trash-can" title="Delete" @click="$emit('delete', habit.habit.id)"></i>
        <div>
            <span class="detail descrip">[[ habit.habit.description ]]</span>
        </div>
    </div>
    </div>
    `,

    props: {
        habits: Array,
        completed: Array,
    },
    delimiters: ['[[', ']]'],
    data: () => {
        return {
            editing: null,
            editHabitName:'',
            editHabitDesc:'',
        }
    },

    methods: {
        editHabit(habitID) {
            axios.patch(`api/habits/${habitID}/`, {
                "name": this.editHabitName,
                "description": this.editHabitDesc,
            }, { headers: { 'X-CSRFToken': this.$parent.token } }
            ).then(() => { this.$parent.getHabits() })

            this.editing = null
          
        },
        editToggle(habit) {
            if (this.editing != habit.id) {
                this.editing = habit.id
                this.editHabitName = habit.name
                this.editHabitDesc = habit.description
            } else {this.editing = null }
        },

    },
    // mounted() {
    //     this.editHabitName = this.habit.name
    //     this.editHabitDesc = this.habit.description
    // }
})


Vue.component('DailyJournal', {
    template: ` 
        <div>
            <strong>[[ journal.date ]]</strong>
            <span><i class="fa-solid fa-pen-to-square" title="Edit" @click="editJournalToggle"></i></span>
            
            <p v-if="editJournal === null" class="detail descrip">[[journal.entry]]</p>
            <p v-else-if="editJournal === journal.id">
                <textarea v-model="editEntry" class="editfield" rows="10" cols="30"></textarea>
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

Vue.component('ColorThemes', {
    template: `
        <div>
            <input type="radio" value="D"  id="dark" v-model="userTheme" @change="saveUserTheme">
            <input type="radio" value="L" id="light" v-model="userTheme" @change="saveUserTheme">
            <input type="radio" value="C" id="colorblind" v-model="userTheme" @change="saveUserTheme">
        </div>`,
    data: () => {
        return {
            userTheme: 'L',
            authenticated: false
        }
    },
    methods: {
        userLoggedIn() {
            axios.get('api/current/').then(response => {
                if (response.data.username != '') {
                    this.authenticated = true
                    this.userTheme = response.data.color_theme
                }
            })
        },
        saveUserTheme() {
            if (this.authenticated) {
                axios.patch(`api/edit/${this.$parent.currentUser}/`, {
                    "color_theme": `${this.userTheme}`
                }, { headers: { 'X-CSRFToken': this.$parent.token } })
            }
        }
    },
    mounted() {
        this.userLoggedIn()
    }
})

Vue.component('Tutorial', {
    template: `
    <transition name="modal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">

              <div class="modal-header">
                <slot name="header">
                  <h3>Welcome to Pyxis!</h3>
                </slot>
              </div>

              <div class="modal-body">
                <slot name="body">
                  <p>make habits.</p>
                  <p>make tasks?????</p>
                  <p>make.......... JO UR NAL??????? </p>
                  <p>F L A V O R text</p>
                  <p>Click the arrows on the side of the week display to change the active week!
                  Don't worry if you get too far back- refreshing the page brings you right back
                  to today.</p>
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  <button @click="$emit('close')">
                    Sounds Good!
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>`,
})
