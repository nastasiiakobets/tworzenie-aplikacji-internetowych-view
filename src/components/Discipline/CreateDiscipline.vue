<template>
  <div class="wrapper">
    <Field
      :name="'Name'"
      input-width="150px"
      v-model="discipline.name"
      :error="error.name"
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
import { createOne, getAll } from "@/components/service";
import Field from "@/components/interface/CFields/Field.vue";

export default {
  name: "CreateDiscipline",
  components: { Field, CreateField },
  data: () => ({
    discipline: {},
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("disciplines", this.discipline)).data;
        this.$router.push("disciplines/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
};
</script>