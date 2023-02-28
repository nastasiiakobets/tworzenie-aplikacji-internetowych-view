<template>
  <div class="wrapper">
    <p>{{ error.load }}</p>
    <div class="data" v-if="group">
      <Reference
        :error="error.department"
        :img-width="'25px'"
        name="Department"
        v-model="this.group.department"
        :input-width="'250px'"
        :link-conditions="{
          label: 'name',
          list: departments,
          link: '/departments/' + group.department.id,
        }"
      ></Reference>

      <Field
        :error="error.name"
        :img-width="'25px'"
        :input-width="'60px'"
        :name="'Name'"
        v-model="group.name"
      ></Field>

      <Select
        :error="error.course"
        :img-width="'25px'"
        :name="'Course'"
        v-model="group.course"
        :link-conditions="{
          label: 'name',
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

      <div class="done-section">
        <button style="width: 40px" @click="updateObj(group)" class="edit">
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
import ChangeField from "@/components/interface/ChangeField.vue";
import * as http from "@/components/service";
import Field from "@/components/interface/RFields/Field.vue";
import Reference from "@/components/interface/RFields/Reference.vue";
import Select from "@/components/interface/RFields/Select.vue";

export default {
  name: "SingleGroup",
  components: {
    Select,
    Reference,
    Field,
    ChangeField,
  },
  data: () => ({
    group: "",
    error: {},
    editName: "",
    course: "",
    departments: "",
  }),
  methods: {
    async deleteOne() {
      try {
        await http.deleteOne("groups/" + this.$route.params.id);
        this.$router.replace({ path: "/groups" });
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
    async updateObj(group) {
      try {
        await http.updateOne("groups/" + this.$route.params.id, group);
        this.$router.go();
      } catch (ex) {
        this.error = JSON.parse(ex.message);
      }
    },
  },
  async created() {
    try {
      const data = await http.getOne("groups/" + this.$route.params.id);
      this.group = data.data;
      this.departments = (await http.getAll("departments")).data;
    } catch (ex) {
      if (ex.response.status === 400) {
        this.error.load = "Group not found";
        this.group = "";
      }
    }
  },
};
</script>

