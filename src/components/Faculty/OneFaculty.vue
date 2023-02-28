<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="faculty">
      <Field
        :error="error.name"
        :img-width="'25px'"
        :input-width="'300px'"
        :name="'Name'"
        v-model="faculty.name"
      ></Field>
      <Field
        :error="error.shortname"
        :img-width="'25px'"
        :input-width="'50px'"
        :name="'Short name'"
        v-model="faculty.shortname"
      ></Field>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(faculty)" class="edit">
          <img src="../../assets/imgs/done.png" alt="" />
        </button>
      </div>
      <button class="delete" @click="deleteOne()">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.disciplines > * {
  margin: 10px;
}

.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import Component from "../Schedule/Component.vue";
import request from "axios";
import ChangeField from "../interface/ChangeField.vue";
import * as http from "../service";
import Field from "@/components/interface/RFields/Field.vue";

export default {
  name: "OneFaculty",
  components: { Field, Component, ChangeField },
  data: () => ({
    faculty: "",
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("faculties/" + this.$route.params.id);
        this.$router.replace({ path: "/faculties" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("faculties/" + this.$route.params.id, discipline);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("faculties/" + this.$route.params.id);
      this.faculty = data.data;
      this.$router.replace({ path: "/faculties"});
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Faculty not found";
        this.faculty = "";
      }
    }
  },
};
</script>

