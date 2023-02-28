<template>
  <div class="wrapper">
    <h2>Lessons</h2>
    <Table :data="schedules" :fields="fields" :link="link"></Table>
    <button class="create-move" @click="$router.push('/createSchedule')">
      Create
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: block;
}
h2 {
  text-align: center;
}
Table {
  width: 100%;
}
</style>

<script>
import Table from "../interface/Table.vue";
import request from "axios";
import * as http from "../service";

export default {
  name: "Schedules",
  components: { Table },
  data: () => ({
    schedules: "",
    fields: [
      {
        name: "Teacher",
        value: ["teacher", ["name", "surname"]],
        ref: { isRef: true, multipleValue: true, refLink: "teachers" },
      },
      {
        name: "Discipline",
        value: ["discipline", "name"],
        ref: { isRef: true, refLink: "disciplines" },
      },
      {
        name: "Group",
        value: ["group", "name"],
        ref: { isRef: true, refLink: "groups" },
      },
    ],
    link: "schedules",
  }),
  async created() {
    const schedules = await http.getAll("schedule");
    this.schedules = schedules.data;
    this.schedules.sort((a, b) => a.name.localeCompare(b.name));
  },
};
</script>

