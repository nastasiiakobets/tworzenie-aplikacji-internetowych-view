<template>
  <div class="wrapper">
    <h2>Disciplines</h2>
    <Table :data="discipline" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/createDiscipline')">
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
  name: "Disciplines",
  components: { Table },
  data: () => ({
    discipline: "",
    fields: [{ name: "Name", value: "name" }],
    link: "disciplines",
  }),
  async created() {
    const discipline = await getAll("disciplines");
    this.discipline = discipline.data.content;
  },
};
</script>