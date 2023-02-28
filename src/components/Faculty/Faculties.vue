<template>
  <div class="wrapper">
    <h2>Faculties</h2>
    <Table :data="faculties" :link="link" :fields="fields"></Table>
    <button class="create-move" @click="$router.push('/createFaculty')">
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
import { getAll } from "@/components/service";

export default {
  name: "Faculties",
  components: { Table },
  data: () => ({
    faculties: "",
    fields: [
      { name: "Name", value: "name" },
      { name: "Short name", value: "shortname" },
    ],
    link: "faculties",
  }),
  async created() {
    const faculties = await getAll("faculties");
    this.faculties = faculties.data.content;
  },
};
</script>

