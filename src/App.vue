<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/interface/Header.vue'
import Footer from './components/interface/Footer.vue'
</script>

<template>
  <div class="wrap">
    <Header></Header>
    <RouterView class="main" />
    <Footer class="footer"></Footer>
  </div>
</template>

<style scoped>

.main{
flex: 1 1 auto;
  margin-top: 20px;
  margin-bottom: 20px;
}
.wrap{
  display: flex;
  flex-direction: column;
  min-height: 100%;
  width: 80%;
}
</style>
