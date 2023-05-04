new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
        currentUser: '',
        habits: {},
        habitsPreview: {},
        tasks: {},
        journalEntries: {},
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
        activeHabits: false,
        activeTasks: false,
        activeJournal: false,
        changeWeekNext: false,
        changeWeekPrev: false,
        weekStart: '',
        weekEnd: '',
        addTaskWindow: false,
        newTaskName: '',
        newTaskDesc: '',
        newTaskUrgent: false,
        newTaskImportant: false,
        newTaskDue: null,
    },
    methods: {
        getUser() {
            axios.get('/api/').then(res => this.currentUser = res.data.id)
        },
        getHabits() {
            // axios.get('api/habits')
            //     .then(response => {
            //         this.habits = response.data
            //     })
        },
        previewHabit() {
            // retrieve just first X number of habits for the day
            // if len of habits exceeds X, add a "More..." to end of list
        },
        editHabit() {

        },
        getTodayTasks() {
            axios.get('api/tasks/')
            .then(response => {
                this.tasks = response.data.reverse()
            })
        },
        updateTask(taskID) {
            axios.patch(`api/tasks/${taskID}/done/`,{},  
                { headers: {'X-CSRFToken': this.token }}
            ).then(() => this.getTodayTasks())
        },
        deleteTask(taskID) {
            axios.delete(`api/tasks/${taskID}/`, {
            headers: {'X-CSRFToken': this.token }}).then(() => this.getTodayTasks())
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
            }, {headers: {'X-CSRFToken': this.token }})
            .then(() => this.getTodayTasks())
            this.addTaskWindow = false,
            this.newTaskName = '',
            this.newTaskDesc = '',
            this.newTaskUrgent = false,
            this.newTaskImportant = false,
            this.newTaskDue = null
        },
        newDate() {
            const newDate = new Date()
            let jsonDate = newDate.toJSON()
            let dateQuery = jsonDate.slice(0, 10)
            return dateQuery
        },
        getJournals() {
            
        },
        weekNext() {
            this.changeWeekNext = true
            setTimeout(() => {
            this.changeWeekNext = false
            }, 1000)

            let sun = new Date(this.weekStart)
            let sat = new Date(this.weekEnd)
            this.weekStart = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() + 7).toDateString()
            this.weekEnd = new Date(sat.getFullYear(), sat.getMonth(), sat.getDate() + 7).toDateString()
        },
        weekPrev() {
            this.changeWeekPrev = true
            setTimeout(() => {
            this.changeWeekPrev = false
            }, 1000)

            let sun = new Date(this.weekStart)
            let sat = new Date(this.weekEnd)
            this.weekStart = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() - 7).toDateString()
            this.weekEnd = new Date(sat.getFullYear(), sat.getMonth(), sat.getDate() - 7).toDateString()
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
        }
    },
    computed: {
        todayWeekday() {
            const todayDate = new Date
            const todayIndex = todayDate.getDate()
            if (this.today === '') {
                return this.today = this.daysOfTheWeek[todayIndex].name
            }
        },
    },
    mounted() {
        this.getUser()
        this.getJournals()
        this.getTodayTasks()
        this.getWeek()
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
            },  
                { headers: {'X-CSRFToken': this.$parent.token }}
            ).then(() => { this.$parent.getTodayTasks() })
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
            let dateQuery = jsonDate.slice(0, 10)
            this.dueDisplay = dateQuery
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