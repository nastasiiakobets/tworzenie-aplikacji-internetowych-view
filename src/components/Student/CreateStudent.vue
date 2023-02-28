<template>
  <div class="wrapper">
    <Reference
      :error="error.group"
      :name="'Group'"
      v-model="student.group"
      :link-conditions="{ list: groups.content }"
    ></Reference>

    <Field :error="error.name" :name="'Name'" v-model="student.name"></Field>

    <Field :error="error.surname" :name="'Surname'" v-model="student.surname"></Field>

    <Field :error="error.email" :name="'Email'" v-model="student.email"></Field>

    <Phone :error="error.phone" :name="'Phone'" v-model="student.phone"></Phone>

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
import Reference from "@/components/interface/CFields/Reference.vue";
import Field from "@/components/interface/CFields/Field.vue";
import Phone from "@/components/interface/CFields/Phone.vue";
import CReference from "../interface/CFields/Reference.vue";

export default {
  name: "StudentCreate",
  components: {
    Phone,
    Field,
    Reference,
    CreateField,
    CReference,
  },
  data: () => ({
    student: {},
    groups: "",
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("students", this.student)).data;
        this.$router.push("students/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    this.groups = (await getAll("groups")).data;
  },
};
</script>
