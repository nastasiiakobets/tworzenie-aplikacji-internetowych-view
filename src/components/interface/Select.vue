<template>
  <div class="wrapper">
    <h2>Choose data to change</h2>
    <RouterLink to="/faculties">Faculties</RouterLink>
    <RouterLink to="/departments">Departments</RouterLink>
    <RouterLink to="/disciplines">Disciplines</RouterLink>
    <RouterLink to="/schedules">Lessons</RouterLink>
    <RouterLink to="/groups">Groups</RouterLink>
    <RouterLink to="/teachers">Teachers</RouterLink>
    <RouterLink to="/students">Students</RouterLink>
  </div>
</template>

<style scoped>
.wrapper {
  flex-direction: column;
  align-items: center;
  font-size: 150%;
}
</style>

<script>
export default {
  name: "Select",
};
</script>
