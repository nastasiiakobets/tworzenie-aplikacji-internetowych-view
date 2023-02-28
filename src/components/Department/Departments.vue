<template>
  <div class="wrapper">
    <h2>Departments</h2>
    <Table :data="departments" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/createDepartment')">
      Create
    </button>
  </div>
</template>

<style scoped>
.wrapper {
  display: block;
}
.create-move {
  display: block;
  margin: 40px auto;
}
h2 {
  text-align: center;
}
Table {
  width: 90%;
}
</style>

<script>
import Table from "../interface/Table.vue";
import { getAll } from "@/components/service";

export default {
  name: "Departments",
  components: { Table },
  data: () => ({
    departments: "",
    fields: [
      {
        name: "Faculty",
        value: ["faculty", "name"],
        ref: { isRef: true, refLink: "faculties" },
      },
      { name: "Name", value: "name" },
      { name: "Short name", value: "shortname" },
    ],
    link: "departments",
  }),
  async created() {
    const department = await getAll("departments");
    this.departments = department.data.content;
  },
};
</script>
