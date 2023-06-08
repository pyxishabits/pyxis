<template>
    <div :id="name" class="main" :class="[{activeTab: isActive}, {inactiveTab: isInactive }]">

        <div class="title" @click="$emit('setActiveTab', name)">
            <h3 v-if="today != ''">{{today}}'s {{name}}</h3>
        </div>

        <div class="show-entry">
            <!-- <div v-if="!activeHabits" class="preview">
                <div v-for="h of habitsPrev">
                    [[ h.name ]]
                </div>
            </div> -->

            <div class="full">
                <Habits :activeDate="activeDate" :token="token"></Habits>
                    <!-- add component here -->

                <!-- <div v-if="addWindowOpen" class="add-window">
                    <h4>New {{this.name.toUpperCase()}}</h4>
                </div>

                <user-habits :habits="todayHabitTaskData" @update="updateHabitTask"
                    @delete="deleteHabit"  :completed="completedHabits">
                </user-habits> -->

                <!-- <div v-for="habittaskinfo in todayHabitTaskData">
                    <span @click="updateHabitTask(habittaskinfo)">
                        <i v-if="habittaskinfo.habitTask && habittaskinfo.habitTask.completed_time"
                            class="fa-solid fa-square-check"></i>
                        <i v-else class="fa-regular fa-square"></i>
                    </span>
                    <span>[[ habittaskinfo.name ]]</span>
                </div> -->

            </div>
        </div>


        <div class="add-entry">
            <button class="add-button" @click="$emit('setActiveTab', this.name), addWindowOpen = !addWindowOpen">
                <i class="fa-solid fa-plus">+</i>
            </button>
        </div>

    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        name: String,
        activeTab: String,
        today: String,
        token: String,
    },
    data() {
        return {
            addWindowOpen: false,
        }
    },
    computed: {
        isActive() {

            return this.activeTab === this.name
        },
        isInactive() {
            return this.activeTab !== null && this.activeTab !== this.name
        },
    },
    mounted() {
        console.log(this.token);
    }
})

</script>

