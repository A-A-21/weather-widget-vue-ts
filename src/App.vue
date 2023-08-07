<template>
  <div class="app">
    <HomeView/>
  </div>
</template>

<script lang="ts" setup>
import HomeView from '@/views/HomeView.vue';
</script>

<style lang="scss">
#app {
  font-family: 'Rubik', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  button {
    border: none;
    background: none;
    padding: 0;
    margin: 0;
  }
}
</style>
