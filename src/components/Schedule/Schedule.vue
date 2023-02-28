<template>
  <div class="wrapper">
    <select required v-model="searchBy" class="chooseGroup">
      <option disabled value="">Search by:</option>
      <option value="groups">Group</option>
      <option value="teachers">Teacher</option>
      <option value="disciplines">Discipline</option>
    </select>
    <v-select
      class="select"
      :reduce="(entity) => entity.id"
      v-if="searchBy === 'groups'"
      label="name"
      v-model="chosen"
      :options="groups"
    ></v-select>
    <v-select
      class="select"
      :reduce="(entity) => entity.id"
      v-if="searchBy === 'teachers'"
      label="fullname"
      v-model="chosen"
      :options="teachers"
    ></v-select>
    <v-select
      class="select"
      :reduce="(entity) => entity.id"
      v-if="searchBy === 'disciplines'"
      label="name"
      v-model="chosen"
      :options="disciplines"
    ></v-select>
    <!--    <select required v-if="searchBy==='groups'" v-model="chosen" class="chooseGroup">-->
    <!--      <option disabled value="">Оберіть групу</option>-->
    <!--      <option v-for="group of groups" :value="group.id">{{ group.name }}</option>-->
    <!--    </select>-->

    <p>{{ error }}</p>
    <div class="cards">
      <Component v-for="sched of schedule" :schedule="sched"></Component>
    </div>
  </div>
</template>

<script>
import request from "axios";
import Component from "./Component.vue";
import * as http from "@/components/service";
import "vue-select/dist/vue-select.css";
import vSelect from "vue-select";

export default {
  name: "Schedule",
  components: { Component, vSelect },

  data: () => ({
    searchOptions: {
      group: {},
    },
    searchBy: "",
    groups: "",
    teachers: "",
    disciplines: "",
    chosen: "",
    schedule: "",
    error: "",
  }),
  watch: {
    searchBy: {
      handler(val) {
        this.chosen = "";
      },
    },

    chosen: {
      async handler(val) {
        if (val === "") return;
        this.error = "";
        if (this.searchBy === "groups") {
          try {
            const schedules = await http.getAll("schedule", {
              params: { group: this.chosen },
            });
            this.schedule = schedules.data;

            this.error = "";
          } catch (error) {
            if (error.response.status === 400) {
              this.error = "Для цієї групи немає графіків";
              this.schedule = "";
            }
          }
        } else if (this.searchBy === "teachers") {
          try {
            const schedules = await http.getAll("schedule", {
              params: { teacher: this.chosen },
            });
            this.schedule = schedules.data;

            this.error = "";
          } catch (error) {
            if (error.response.status === 400) {
              this.error = "Для цього викладача немає графіків";
              this.schedule = "";
            }
          }
        } else if (this.searchBy === "disciplines") {
          try {
            const schedules = await http.getAll("schedule", {
              params: { discipline: this.chosen },
            });
            this.schedule = schedules.data;

            this.error = "";
          } catch (error) {
            if (error.response.status === 400) {
              this.error = "Для цього предмету немає графіків";
              this.schedule = "";
            }
          }
        }
      },
      immediate: true,
    },
  },
  async created() {
    const groups = await http.getAll("groups");
    const teachers = await http.getAll("teachers");
    const disciplines = await http.getAll("disciplines");
    this.groups = groups.data.content;
    teachers.data.forEach((el) => (el.fullname = el.name + " " + el.surname));
    this.teachers = teachers.data.content;
    this.disciplines = disciplines.data.content;
  },
};
</script>

<style scoped>
.cards {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 50px;
}

.cards > * {
  margin: 5px;
}

.wrapper {
  flex-direction: column;
  align-items: center;
}

.chooseGroup {
  margin-top: 20px;
  font-size: 120%;
}
.select {
  margin-top: 5px;
  min-width: 100px;
  background-color: white;
}
</style>
