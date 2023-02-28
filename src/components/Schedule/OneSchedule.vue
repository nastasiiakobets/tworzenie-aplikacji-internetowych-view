<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="schedule">
      <Reference
        :error="error.discipline"
        style="font-size: 120%"
        :input-width="'150px'"
        :img-width="'25px'"
        name="Discipline"
        v-model="schedule.discipline"
        :link-conditions="{
          list: disciplines,
          link: '/disciplines/' + schedule.discipline.id,
        }"
      ></Reference>
      <hr />

      <div class="info">
        <Reference
          :img-width="'25px'"
          :error="error.teacher"
          :name="'Teacher'"
          v-model="schedule.teacher"
          :input-width="'150px'"
          :link-conditions="{
            label: 'fullName',
            list: teachers,
            link: '/teachers/' + schedule.teacher.id,
          }"
        ></Reference>
        <Reference
          :error="error.group"
          :img-width="'25px'"
          name="Group"
          v-model="schedule.group"
          :link-conditions="{
            list: groups,
            link: '/groups/' + schedule.group.id,
          }"
        ></Reference>
        <Select
          class="field"
          :img-width="'25px'"
          :error="error.time"
          :name="'Day of week'"
          v-model="schedule.time"
          :link-conditions="{
            convert: { function: this.getDate },
            list: [
              { value: schedule.time.replace(/^./, 0), name: 'Monday' },
              { value: schedule.time.replace(/^./, 1), name: 'Tuesday' },
              { value: schedule.time.replace(/^./, 2), name: 'Wednesday' },
              { value: schedule.time.replace(/^./, 3), name: 'Thursday' },
              { value: schedule.time.replace(/^./, 4), name: 'Friday' },
              { value: schedule.time.replace(/^./, 5), name: 'Saturday' },
              { value: schedule.time.replace(/^./, 6), name: 'Sunday' },
            ],
            additionalShow: date,
          }"
        ></Select>

        <Select
          class="field"
          :img-width="'25px'"
          v-model="schedule.time"
          :name="'Time'"
          :link-conditions="{
            convert: { function: this.getTime },
            list: [
              { value: schedule.time.replace(/.$/, 1), name: '8:30' },
              { value: schedule.time.replace(/.$/, 2), name: '10:25' },
              { value: schedule.time.replace(/.$/, 3), name: '12:20' },
              { value: schedule.time.replace(/.$/, 4), name: '14:15' },
              { value: schedule.time.replace(/.$/, 5), name: '16:10' },
              { value: schedule.time.replace(/.$/, 6), name: '18:30' },
            ],
            additionalShow: time,
          }"
        ></Select>

        <Field
          :error="error.classroom"
          :img-width="'25px'"
          :name="'Classroom'"
          v-model="schedule.classroom"
        ></Field>
      </div>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(schedule)" class="edit">
          <img src="../../assets/imgs/done.png" alt="" />
        </button>
      </div>
      <button class="delete" @click="deleteOne()">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import request from "axios";
import ChangeField from "../interface/ChangeField.vue";
import * as http from "../service";
import Reference from "@/components/interface/RFields/Reference.vue";
import Select from "@/components/interface/RFields/Select.vue";
import Field from "@/components/interface/RFields/Field.vue";

export default {
  name: "SingleSchedule",
  components: {
    Field,
    Select,
    Reference,
    ChangeField,
  },
  data: () => ({
    schedule: "",
    disciplines: "",
    date: "",
    time: "",
    teachers: "",
    groups: "",
    error: {},
    weekDays: {
      0: "Monday",
      1: "Tuesday",
      2: "Wednesday",
      3: "Thursday",
      4: "Friday",
      5: "Saturday",
      6: "Sunday",
    },
    timePairs: {
      1: "8:30",
      2: "10:25",
      3: "12:20",
      4: "14:15",
      5: "16:10",
      6: "18:30",
    },
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("schedules/" + this.$route.params.id);
        this.$router.replace({ path: "/" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },

    parseDateTime() {
      const split = this.schedule.time.split("-");
      this.date = this.weekDays[split[0]] || "";
      this.time = this.timePairs[split[1]] || "";
    },

    getDate(date) {
      return this.weekDays[date.split("-")[0]] || "";
    },

    getTime(date) {
      return this.timePairs[date.split("-")[1]] || "";
    },

    async updateObj(schedule) {
      try {
        await http.updateOne("schedules/" + this.$route.params.id, schedule);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  watch: {
    "schedule.time": {
      handler(val) {
        this.parseDateTime();
      },
    },
  },
  async created() {
    try {
      this.teachers = (await http.getAll("teachers")).data;
      this.teachers.forEach(
        (teacher) => (teacher.fullName = teacher.name + " " + teacher.surname)
      );
      this.groups = (await http.getAll("group")).data;
      this.disciplines = (await http.getAll("discipline")).data;
      const data = await http.getAll("schedule/" + this.$route.params.id);
      this.schedule = data.data;
      this.schedule.teacher.fullName =
        this.schedule.teacher.name + " " + this.schedule.teacher.surname;
      this.parseDateTime();
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Lesson not found";
        this.schedule = "";
      }
    }
  },
};
</script>
