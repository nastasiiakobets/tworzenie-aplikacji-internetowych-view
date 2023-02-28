<template>
  <div class="wrapper">
    <Field
      :name="'Name'"
      input-width="150px"
      v-model="group.name"
      :error="error.name"
    >
    </Field>

    <Select
      :error="error.course"
      :name="'Course'"
      v-model="group.course"
      :link-conditions="{
        list: [
          { value: 1, name: 1 },
          { value: 2, name: 2 },
          { value: 3, name: 3 },
          { value: 4, name: 4 },
          { value: 5, name: 5 },
          { value: 6, name: 6 },
        ],
      }"
    ></Select>

    <Reference
      :error="error.department"
      name="Department"
      v-model="group.department"
      :link-conditions="{ list: departments }"
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
import Select from "@/components/interface/CFields/Select.vue";
import Reference from "@/components/interface/CFields/Reference.vue";

export default {
  name: "GroupCreate",
  components: {
    Reference,
    Select,
    Field,
    CreateField,
  },
  data: () => ({
    group: {},
    departments: "",
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("groups", this.group)).data;
        this.$router.push("groups/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    this.departments = (await getAll("departments")).data.content;
  },
};
</script>