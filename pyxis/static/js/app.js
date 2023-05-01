new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
        habits: {},
        tasks: {},
        journalEntries: {},
        currentWeekday: ''
    },
    methods: {
        getHabits() {
            axios.get('api/habits')
            .then(response => {
                this.habits = response.data
            })
        },
        editHabit() {

        },
        getTasks() {

        },
        getJournals() {

        }
    },
    computed: {
        weekday() {
            const todayDate = new Date
            const today = todayDate.getDate()
            return this.currentWeekday = today
        }
    },
    mounted() {
        this.getHabits()
        this.token = document.querySelector('input[name=csrfmiddlewaretoken]').value
    }
})