<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="teacher">
      <div class="basic-info">
        <Field
          :error="error.surname"
          :img-width="'25px'"
          :input-width="'100px'"
          :name="'Surname'"
          v-model="teacher.surname"
        ></Field>
        <Field
          :error="error.name"
          :img-width="'25px'"
          :input-width="'100px'"
          :name="'Name'"
          v-model="teacher.name"
        ></Field>
        <Field
          :error="error.email"
          :img-width="'25px'"
          :input-width="'150px'"
          :name="'Email'"
          v-model="teacher.email"
        ></Field>
        <Phone
          :error="error.phone"
          :img-width="'25px'"
          :input-width="'150px'"
          :name="'Phone'"
          v-model="teacher.phone"
        ></Phone>
      </div>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(teacher)" class="edit">
          <img src="../../assets/imgs/done.png" alt="" />
        </button>
      </div>
      <button class="delete" @click="deleteOne()">Delete</button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
}
</style>

<script>
import request from "axios";
import Component from "@/components/Schedule/Component.vue";
import ChangeField from "@/components/interface/ChangeField.vue";
import * as http from "../service";
import Field from "@/components/interface/RFields/Field.vue";
import Phone from "@/components/interface/RFields/Phone.vue";

export default {
  name: "OneTeacher",
  components: {
    Phone,
    Field,
    Component,
    ChangeField,
  },
  data: () => ({
    teacher: "",
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("teachers/" + this.$route.params.id);
        this.$router.replace({ path: "/teachers" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(teacher) {
      try {
        console.log(teacher);
        await http.updateOne("teachers/" + this.$route.params.id, teacher);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("teachers/" + this.$route.params.id);
      this.teacher = data.data;
      try {
        this.teacher.schedules = (
          await http.getAll("schedules", {
            params: { teacher: this.$route.params.id },
          })
        ).data;
        this.error = "";
      } catch (ex) {
        if (error.response.status === 400) {
          this.error.load = "The teacher is not teaching the subject yet";
          this.teacher = "";
        }
      }
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Teacher not found";
        this.teacher = "";
      }
    }
  },
};
</script>
