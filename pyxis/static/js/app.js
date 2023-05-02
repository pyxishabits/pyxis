new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
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
    },
    methods: {
        getHabits() {
            // axios.get('api/habits')
            //     .then(response => {
            //         this.habits = response.data
            //     })
            this.habits = [
                {name: 'Walk dog',
                description: 'needs to be done!',
                recurrence: '[0,2,3,4]',
                user: 'liamdes'},
                {name: 'Make Breakfast',
                description: 'eat every day',
                recurrence: '[0,1,2,3,4,5,6]',
                user: 'liamdes'},
                {name: 'Take Nap',
                description: 'catch up on sleep :)',
                recurrence: '[1,3,5]',
                user: 'liamdes'},
                {name: 'Exercise',
                description: 'doesn\'t need to be done that often',
                recurrence: '[0]',
                user: 'liamdes'},
                {name: 'Grocery Shop',
                description: 'cannot do a lot without this',
                recurrence: '[6]',
                user: 'liamdes'},
            ]
        },
        previewHabit() {
            // retrieve just first X number of habits for the day
            // if len of habits exceeds X, add a "More..." to end of list
            this.habitsPreview = [
                {name: 'Walk Dog'},
                {name: 'Make Breakfast'},
                {name: 'Take Nap'},
                {name: 'More...'}
            ]
        },
        editHabit() {

        },
        getTasks() {

        },
        getJournals() {

        },
        isToday(day) {
            if (day.name === this.today) {
                    return true
            } else {
                    return false
            }
        }
    },
    computed: {
        todayWeekday() {
            const todayDate = new Date
            const todayIndex = todayDate.getDate()
            return this.today = this.daysOfTheWeek[todayIndex].name
        },
    },
    mounted() {
        this.previewHabit()
        this.getHabits()
        this.token = document.querySelector('input[name=csrfmiddlewaretoken]').value
    },
})