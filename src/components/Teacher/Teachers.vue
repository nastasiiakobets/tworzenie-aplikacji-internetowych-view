<template>
  <div class="wrapper">
    <h2>Teachers</h2>
    <Table :data="teachers" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/createTeacher')">
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
import request from "axios";
import Table from "@/components/interface/Table.vue";
import { getAll } from "@/components/service";

export default {
  name: "Teachers",
  components: { Table },
  data: () => ({
    teachers: "",
    fields: [
      { name: "Surname", value: "surname" },
      { name: "Name", value: "name" },
      { name: "Phone", value: "phone" },
      { name: "Email", value: "email" },
    ],
    link: "teachers",
  }),
  async created() {
    const teachers = await getAll("teachers");
    //прописать эту строчку в каждую сущность
    this.teachers = teachers.data.content;
  },
};
</script>
