<template>
  <div id="app">
    <router-link to="/home">首页</router-link>
    <router-link to="/teacher" style="margin-left: 30px;">子应用1</router-link>
    <router-link to="/course" style="margin-left: 30px;">子应用2</router-link>
    <div id="single-spa">
      <router-view v-if="$route.path==='/home'" />
      <button type="button" @click="handleTokenError">token出错了</button>
      <div id="speiyou-teacher"></div>
      <div id="speiyou-course"></div>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import {createEvent,dispatchEvent} from "./libs/utils";
import {sendEvent} from "../../app2/src/libs/utils";

export default {
  name: 'app',
  components: {
    HelloWorld
  },
  methods: {
    handleTokenError() {
      sendEvent('token-error', {a:1 , b: 2})
    }
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
