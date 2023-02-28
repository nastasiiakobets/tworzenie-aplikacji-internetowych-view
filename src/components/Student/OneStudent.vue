<template>
  <div class="wrapper">
    <div class="data" v-if="student">
      {{ error.load }}
      <Reference
        :error="error.group"
        class="field"
        :img-width="'25px'"
        :name="'Group'"
        v-model="student.group"
        :link-conditions="{ list: groups, link: '/groups/' + student.group.id }"
      ></Reference>

      <Field
        :error="error.name"
        class="field"
        :img-width="'25px'"
        :name="'Name'"
        v-model="student.name"
      ></Field>
      <Field
          :error="error.surname"
          class="field"
          :img-width="'25px'"
          :name="'Surname'"
          v-model="student.surname"
      ></Field>
      <Field
        :error="error.email"
        class="field"
        :img-width="'25px'"
        :name="'Email'"
        v-model="student.email"
      ></Field>

      <Phone
        :error="error.phone"
        class="field"
        :img-width="'25px'"
        :name="'Phone'"
        v-model="student.phone"
      ></Phone>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(student)" class="edit">
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
import ChangeField from "../interface/ChangeField.vue";
import request from "axios";
import * as http from "../service";
import Reference from "@/components/interface/RFields/Reference.vue";
import Field from "@/components/interface/RFields/Field.vue";
import Phone from "@/components/interface/RFields/Phone.vue";

export default {
  name: "SingleStudent",
  components: {
    Phone,
    Field,
    Reference,
    ChangeField,
  },
  data: () => ({
    error: {},
    groups: "",
    student: "",
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("students/" + this.$route.params.id);
        this.$router.replace({ path: "/students" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(student) {
      try {
        http
          .updateOne("students/" + this.$route.params.id, student)
          .catch((e) => console.log(e));
        this.$router.go();
      } catch (e) {
        this.error = JSON.parse(e.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("students/" + this.$route.params.id);
      this.groups = (await http.getOne("groups")).data;
      this.student = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Group not found";
        this.student = "";
      }
    }
  },
};
</script>

