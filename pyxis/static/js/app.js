new Vue({
    el: '#app',
    delimiters: ['[[', ']]'],
    data: {
        token: '',
        habits: {},
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
        }
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