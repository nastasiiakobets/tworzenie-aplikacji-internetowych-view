<template>
  <div class="wrapper">
    <Field
      :name="'Name'"
      input-width="150px"
      v-model="teacher.name"
      :error="error.name"
    >
    </Field>
    <Field
      :name="'Surname'"
      input-width="150px"
      v-model="teacher.surname"
      :error="error.surname"
    >
    </Field>
    <Field
      :name="'Email'"
      input-width="150px"
      v-model="teacher.email"
      :error="error.email"
    >
    </Field>
    <Phone
      is-phone="true"
      :name="'Phone'"
      input-width="150px"
      v-model="teacher.phone"
      :error="error.phone"
    >
    </Phone>
    <button class="create" @click="createOne()">Create</button>
  </div>
</template>

<script>
import CreateField from "@/components/interface/CreateField.vue";
import { createOne, getAll } from "@/components/service";
import Field from "@/components/interface/CFields/Field.vue";
import Phone from "@/components/interface/CFields/Phone.vue";

export default {
  name: "TeacherCreate",
  components: { Phone, Field, CreateField },
  data: () => ({
    teacher: {},
    error: {},
  }),
  methods: {
    async createOne() {
      try {
        const res = (await createOne("teachers", this.teacher)).data;
        this.$router.push("teachers/" + res.id);
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>
