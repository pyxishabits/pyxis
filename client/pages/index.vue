<template>
    <div>
        <h1>Home Page</h1>

        {{ counter }}
        <hr>

        <PageSection 
            name="habits"
            :counter="counter"
            :activeDate="activeDate"
            :token="authtoken.token"
            :today="today" 
            :activeTab="activeTab" 
            @setActiveTab="setActiveTab"
        ></PageSection>
        <!-- <PageSection 
            name="tasks" 
            :token="authtoken.token"
            :today="today" 
            :activeTab="activeTab" 
            @setActiveTab="setActiveTab"
        ></PageSection>
        <PageSection 
            name="journal" 
            :today="today" 
            :activeTab="activeTab" 
            @setActiveTab="setActiveTab"
        ></PageSection> -->

    </div>
</template>

<script setup>

const counter = useState('counter', () => Math.round(Math.random() * 1000))


const userData = { username: 'dan', password: '1' }
const url = 'http://localhost:8000/accounts/auth/'

const { data: authtoken } = await useFetch(url, {
    method: 'POST',
    body: userData
});

// TODO: get the current user data

</script>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    data() {
        return {
            today: '',
            activeTab: null,
            activeDate: null,
            activeDateTime: null,
            daysOfTheWeek: {
                0: { name: 'sunday', abbrv: 'S' },
                1: { name: 'monday', abbrv: 'M' },
                2: { name: 'tuesday', abbrv: 'T' },
                3: { name: 'wednesday', abbrv: 'W' },
                4: { name: 'thursday', abbrv: 'T' },
                5: { name: 'friday', abbrv: 'F' },
                6: { name: 'saturday', abbrv: 'S' },
            },


            viewMenu: false,
            showTutorial: true,
            tasks: [],
            tasksPrev: [],
            completedTasks: [],
            journalEntry: {},
            journalPrev: '',


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
        }
    },
    methods: {
        setActiveTab(activeTab) {
            if (this.activeTab === activeTab) {
                this.activeTab = null
            } else {
                this.activeTab = activeTab
            }
        },
        newDate() {
            const newDate = new Date()
            let jsonDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate()).toJSON()
            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            return dateString
        },
        getWeek() {
            let curr = new Date
            let first = curr.getDate() - curr.getDay()

            let firstday = new Date(curr.setDate(first)).toDateString()
            let lastday = new Date(curr.setDate((curr.getDate() - curr.getDay()) + 6)).toDateString()

            this.weekStart = firstday
            this.weekEnd = lastday
        },
        viewForDay(day) {
            this.today = day
            let foundDay
            for (let key in this.daysOfTheWeek) {
                if (this.daysOfTheWeek[key].name === day) {
                    foundDay = key
                }
            }

            let dayNum = Number(foundDay)
            let sun = new Date(this.weekStart)
            let jsonDate = new Date(sun.getFullYear(), sun.getMonth(), sun.getDate() + dayNum).toJSON()

            this.activeDateTime = jsonDate
            let dateString = jsonDate.slice(0, 10)
            this.activeDate = dateString
        },

    },
    computed: {
        todayWeekday() {
            const todayDate = new Date
            const todayIndex = todayDate.getDay()
            if (this.today === '') {
                return this.today = this.daysOfTheWeek[todayIndex].name
            }
        },
        headers() {
            return {'Authorization': `whee`}
        }
    },
    mounted() {
        //  TODO: add actual login fields
        console.log(this.authtoken);
        this.activeDate = this.newDate()
        this.getWeek()
        this.viewForDay(this.todayWeekday) // TODO
    }
})
</script>
