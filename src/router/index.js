import { createRouter, createWebHistory } from "vue-router";
import Schedule from "../components/Schedule/Schedule.vue";
import CreateSchedule from "../components/Schedule/CreateSchedule.vue";
import Schedules from "../components/Schedule/Schedules.vue";
import Teachers from "../components/Teacher/Teachers.vue";
import CreateTeacher from "../components/Teacher/CreateTeacher.vue";
import OneTeacher from "../components/Teacher/OneTeacher.vue";
import Groups from "../components/Group/Groups.vue";
import CreateGroup from "../components/Group/CreateGroup.vue";
import OneGroup from "../components/Group/OneGroup.vue";
import Students from "../components/Student/Students.vue";
import CreateStudent from "../components/Student/CreateStudent.vue";
import OneStudent from "../components/Student/OneStudent.vue";
import Disciplines from "../components/Discipline/Disciplines.vue";
import CreateDiscipline from "../components/Discipline/CreateDiscipline.vue";
import OneDiscipline from "../components/Discipline/OneDiscipline.vue";
import Departments from "../components/Department/Departments.vue";
import CreateDepartment from "../components/Department/CreateDep.vue";
import OneDepartment from "../components/Department/OneDep.vue";
import Faculties from "../components/Faculty/Faculties.vue";
import CreateFaculty from "../components/Faculty/CreateFaculty.vue";
import OneFaculty from "../components/Faculty/OneFaculty.vue";
import Select from "../components/interface/Select.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Schedule,
    },
    {
      path: "/navigation",
      name: "navigation",
      component: Select,
    },
    {
      path: "/students",
      name: "students",
      component: Students,
    },
    {
      path: "/teachers",
      name: "teachers",
      component: Teachers,
    },
    {
      path: "/groups",
      name: "groups",
      component: Groups,
    },
    {
      path: "/disciplines",
      name: "disciplines",
      component: Disciplines,
    },
    {
      path: "/departments",
      name: "departments",
      component: Departments,
    },
    {
      path: "/faculties",
      name: "faculties",
      component: Faculties,
    },
    {
      path: "/schedules",
      name: "schedules",
      component: Schedules,
    },
    {
      path: "/createSchedule",
      name: "createSchedule",
      component: CreateSchedule,
    },
    {
      path: "/createTeacher",
      name: "createTeacher",
      component: CreateTeacher,
    },
    {
      path: "/createGroup",
      name: "createGroup",
      component: CreateGroup,
    },
    {
      path: "/createStudent",
      name: "createStudent",
      component: CreateStudent,
    },
    {
      path: "/createDiscipline",
      name: "createDiscipline",
      component: CreateDiscipline,
    },
    {
      path: "/createDepartment",
      name: "createDepartment",
      component: CreateDepartment,
    },
    {
      path: "/createFaculty",
      name: "createFaculty",
      component: CreateFaculty,
    },
    {
      path: "/teachers/:id",
      name: "oneTeacher",
      component: OneTeacher,
    },
    {
      path: "/groups/:id",
      name: "oneGroup",
      component: OneGroup,
    },
    {
      path: "/students/:id",
      name: "oneStudent",
      component: OneStudent,
    },
    {
      path: "/disciplines/:id",
      name: "oneDiscipline",
      component: OneDiscipline,
    },
    {
      path: "/departments/:id",
      name: "oneDepartment",
      component: OneDepartment,
    },
    {
      path: "/faculties/:id",
      name: "oneFaculty",
      component: OneFaculty,
    },
  ],
});

export default router;
