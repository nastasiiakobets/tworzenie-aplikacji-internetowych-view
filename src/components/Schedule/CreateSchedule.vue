<template>
  <div class="wrapper">
    <Reference
      :error="error.discipline"
      style="font-size: 120%"
      name="Discipline"
      v-model="schedule.discipline"
      :link-conditions="{ list: disciplines }"
    ></Reference>
    <hr />

    <div class="info">
      <Reference
        :error="error.teacher"
        :name="'Teacher'"
        v-model="schedule.teacher"
        :link-conditions="{ list: teachers, label: 'fullName' }"
      ></Reference>
      <Reference
        :error="error.group"
        name="Group"
        v-model="schedule.group"
        :link-conditions="{ list: groups }"
      ></Reference>
      <Select
        :error="error.time"
        :name="'Day of week'"
        v-model="schedule.time"
        :link-conditions="{
          list: [
            { value: schedule.time.replace(/^./, 0), name: 'Monday' },
            { value: schedule.time.replace(/^./, 1), name: 'Tuesday' },
            { value: schedule.time.replace(/^./, 2), name: 'Wednesday' },
            { value: schedule.time.replace(/^./, 3), name: 'Thuesday' },
            { value: schedule.time.replace(/^./, 4), name: 'Friday' },
            { value: schedule.time.replace(/^./, 5), name: 'Saturday' },
            { value: schedule.time.replace(/^./, 6), name: 'Sunday' },
          ],
        }"
      ></Select>

      <Select
        :error="error.time"
        :name="'Time'"
        v-model="schedule.time"
        :link-conditions="{
          isLink: false,
          list: [
            { value: schedule.time.replace(/.$/, 1), name: '8:30' },
            { value: schedule.time.replace(/.$/, 2), name: '10:25' },
            { value: schedule.time.replace(/.$/, 3), name: '12:20' },
            { value: schedule.time.replace(/.$/, 4), name: '14:15' },
            { value: schedule.time.replace(/.$/, 5), name: '16:10' },
            { value: schedule.time.replace(/.$/, 6), name: '18:30' },
          ],
        }"
      ></Select>

      <Field
        :error="error.classroom"
        :name="'Classroom'"
        v-model="schedule.classroom"
      ></Field>
    </div>
    <button class="create" @click="createOne()">Create</button>
  </div>
</template>

<script>
import CreateField from "@/components/interface/CreateField.vue";
import { createOne, getAll } from "@/components/service";
import Reference from "@/components/interface/CFields/Reference.vue";
import SelectField from "@/components/interface/CFields/Select.vue";
import Field from "@/components/interface/CFields/Field.vue";

export default {
  name: "ScheduleCreate",
  components: {
    Field,
    SelectField,
    Reference,
    CreateField,
  },
  data: () => ({
    schedule: { time: "0-0" },
    groups: "",
    disciplines: "",
    teachers: "",
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("schedules", this.schedule)).data;
        this.$router.push("schedules/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    this.groups = (await getAll("groups")).data.content;
    this.disciplines = (await getAll("disciplines")).data.content;
    this.teachers = (await getAll("teachers")).data.content;
    this.teachers.forEach(
      (teacher) => (teacher.fullName = teacher.name + " " + teacher.surname)
    );
  },
};
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>
