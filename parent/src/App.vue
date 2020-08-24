<template>
  <div id="app">
    <router-link to="/app1">子应用1</router-link>
    <router-link to="/app2" style="margin-left: 30px;">子应用2</router-link>
    <div id="single-spa">
      <div id="vue"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
