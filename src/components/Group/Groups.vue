<template>
  <div class="wrapper">
    <h2>Groups</h2>
    <Table :data="groups" :fields="fields" :link="link"></Table>
    <button class="create-move" @click="$router.push('/createGroup')">
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
import { getAll } from "@/components/service";
export default {
  name: "Groups",
  components: { Table },
  data: () => ({
    groups: "",
    fields: [
      { name: "Name", value: "name" },
      { name: "Course", value: "course" },
      {
        name: "Department",
        value: ["department", "name"],
        ref: { isRef: true, refLink: "departments" },
      },
    ],
    link: "groups",
  }),
  async created() {
    const groups = await getAll("groups");
    this.groups = groups.data.content;
  },
};
</script>