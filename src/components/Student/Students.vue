<template>
  <div class="wrapper">
    <h2>Students</h2>
    <Table :data="students" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/createStudent')">
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
  name: "Students",
  components: { Table },
  data: () => ({
    students: "",
    fields: [
      { name: "Name", value: "name" },
      { name: "Surname", value: "surname"},
      { name: "Phone", value: "phone" },
      { name: "Email", value: "email" },
      {
        name: "Group",
        value: ["group", "name"],
        ref: { isRef: true, refLink: "groups" },
      },
    ],
    link: "students",
  }),
  async created() {
    const students = await http.getAll("students");
    this.students = students.data.content;
  },
};
</script>

