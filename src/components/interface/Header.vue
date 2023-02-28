<template>
  <div class="header-wrapper">
    <RouterLink to="/" class="logo">
      <img
        src="https://kpi.ua/files/images-page/kpi-big-logo.png"
        alt="*****"
      />
    </RouterLink>
    <div class="links">
      <RouterLink to="/">Schedule</RouterLink>
      <RouterLink to="/navigation">Change data</RouterLink>
<!--      <b-dropdown text="Menu" left>-->
<!--        <b-dropdown-item href="/">Schedule</b-dropdown-item>-->
<!--        <b-dropdown-item href="/navigation">Change data</b-dropdown-item>-->
<!--      </b-dropdown>-->
    </div>
  </div>
</template>

<style scoped>
.img img {
  height: 100%;
  width: 100%;
}

@media screen and (max-width: 600px) {
  .links {
    display: none;
  }
}
.header-wrapper {
  border-radius: 0.2em;
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 20px 50px;
  background-color: rgb(66, 105, 144);
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2);
}
.logo {
  width: 50px;
  position: relative;
}
.logo img {
  width: 100%;
  height: 100%;
}
.links {
  margin-left: auto;
}
.links > * {
  padding: 0 20px;
  font-size: 120%;
}
a {
  color: black;
  text-decoration: none;
}
a:hover {
  color: azure;
}
</style>

<script>
export default {
  name: "Header",
  data: () => ({
    show: false,
  }),
};
</script>

