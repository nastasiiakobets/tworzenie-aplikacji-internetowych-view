<template>
  <div class="footer">
    <div class="upper">
      <div class="about-us">
        This cite was made by Dmytro Overchuk and Nikita Bykov
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer {
  width: 100%;
  border-radius: 0.2em;
  background-color: rgb(66, 105, 144);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 0.5em rgba(0, 0, 0, 0.2);
}
* {
  color: black;
  text-decoration: none;
}
ul {
  list-style-type: none;
}
.upper {
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  width: 90%;
  justify-content: space-evenly;
}
.about-us {
  width: 50%;
}
</style>


<script>
export default {
  name: "Footer",
};
</script>