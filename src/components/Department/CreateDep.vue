<template>
  <div class="wrapper">
    <Field
      :name="'Name'"
      input-width="150px"
      v-model="department.name"
      :error="error.name"
    >
    </Field>
    <Field
      :name="'Short name'"
      input-width="150px"
      v-model="department.shortname"
      :error="error.shortname"
    >
    </Field>
    <Reference
      :error="error.faculty"
      name="Faculty"
      v-model="department.faculty"
      :input-width="'150px'"
      :link-conditions="{ list: faculties }"
    ></Reference>
    <button class="create" @click="createOne()">Create</button>
  </div>
</template>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import CreateField from "@/components/interface/CreateField.vue";
import { createOne, getAll } from "@/components/service";
import Field from "@/components/interface/CFields/Field.vue";
import Reference from "@/components/interface/CFields/Reference.vue";

export default {
  name: "DepartmentCreate",
  components: { Field, Reference, CreateField },
  data: () => ({
    department: {},
    faculties: "",
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("departments", this.department)).data;
        this.$router.push("departments/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    this.faculties = (await getAll("faculties")).data.content;
  },
};
</script>
