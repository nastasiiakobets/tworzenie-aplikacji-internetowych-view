<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="department">
      <Field
        :error="error['name']"
        :img-width="'25px'"
        :input-width="'300px'"
        :name="'Name'"
        v-model="department.name"
      ></Field>
      <Field
        :error="error['shortName']"
        :img-width="'25px'"
        :input-width="'150px'"
        :name="'Short name'"
        v-model="department.shortname"
      ></Field>
      <Reference
        :error="error['faculty']"
        :img-width="'25px'"
        :input-width="'300px'"
        name="Faculty"
        v-model="department.faculty"
        :link-conditions="{
          list: faculties,
          link: '/faculties/' + department.faculty.id,
          label: 'name',
        }"
      ></Reference>
      <div class="done-section">
        <button style="width: 40px" @click="updateObj(department)" class="edit">
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
import ChangeField from "../interface/ChangeField.vue";
import Component from "@/components/Schedule/Component.vue";
import * as http from "@/components/service";
import Field from "@/components/interface/RFields/Field.vue";
import Reference from "@/components/interface/RFields/Reference.vue";
export default {
  name: "One Department",
  components: { Reference, Field },
  data: () => ({
    department: "",
    faculties: "",
    error: {},
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("departments/" + this.$route.params.id);
        this.$router.replace({ path: "/departments" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(discipline) {
      try {
        await http.updateOne("departments/" + this.$route.params.id, discipline);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("departments/" + this.$route.params.id);
      this.faculties = (await http.getAll("faculties")).data.content;
      this.department = data.data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Department not found";
        this.department = "";
      }
    }
  },
};
</script>
