<template>
  <div id="app">
    <!--    <img alt="Vue logo" src="./assets/logo.png">-->
    <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <main-map></main-map>
  </div>
</template>

<script>
import MainMap from "@/components/MainMap.vue";

export default {
  name: 'App',
  components: {
    MainMap
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  margin: 0;
  padding: 0;
}
</style>
