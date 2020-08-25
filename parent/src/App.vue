<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/teacher" style="margin-left: 30px;">子应用1</router-link>
    <router-link to="/course" style="margin-left: 30px;">子应用2</router-link>
    <div id="single-spa">
      <router-view v-if="$route.path==='/home'" />
      <div id="speiyou-teacher"></div>
      <div id="speiyou-course"></div>
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
  color: #000000;
  margin-top: 60px;
}
</style>
