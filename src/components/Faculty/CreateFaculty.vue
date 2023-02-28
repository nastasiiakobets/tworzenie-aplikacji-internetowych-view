<template>
  <div class="wrapper">
    <Field
      :name="'Name'"
      input-width="150px"
      v-model="faculty.name"
      :error="error.name"
    >
    </Field>
    <Field
      :name="'Short name'"
      input-width="150px"
      v-model="faculty.shortname"
      :error="error.shortname"
    >
    </Field>
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
import { createOne } from "@/components/service";
import Field from "@/components/interface/CFields/Field.vue";

export default {
  name: "FacultyCreate",
  components: { Field, CreateField },
  data: () => ({
    faculty: {},
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("faculties", this.faculty)).data;
        this.$router.push("faculties/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
};
</script>

