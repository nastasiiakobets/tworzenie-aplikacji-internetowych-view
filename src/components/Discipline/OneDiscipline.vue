<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="discipine">
      <Field
        :error="error.name"
        :img-width="'25px'"
        :input-width="'300px'"
        :name="'Name'"
        v-model="discipine.name"
      ></Field>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(discipine)" class="edit">
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
  name: "SingleDiscipline",
  components: { Component, ChangeField, Field },
  data: () => ({
    discipine: "",
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("disciplines/" + this.$route.params.id);
        this.$router.replace({ path: "/" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("disciplines/" + this.$route.params.id, discipline);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("disciplines/" + this.$route.params.id);
      this.discipine = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Discipline not found";
        this.discipline = "";
      }
    }
  },
};
</script>
