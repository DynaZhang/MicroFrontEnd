<template>
  <div id="app">
    <el-menu
      default-active="/home"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b">
      <el-menu-item index="/home">首页</el-menu-item>
      <el-menu-item index="/teacher">子应用1</el-menu-item>
      <el-menu-item index="/course">子应用2</el-menu-item>
      <el-menu-item index="/admin1/">子应用3</el-menu-item>
    </el-menu>
    <div id="single-spa">
      <router-view v-if="$route.path==='/home'" />
      <div id="speiyou-teacher"></div>
      <div id="speiyou-course"></div>
      <div id="speiyou-splat"></div>
    </div>
  </div>
</template>

<script>
import {publishEvent} from "../../app2/src/libs/utils";

export default {
  name: 'app',
  methods: {
    handleTokenError() {
      publishEvent('token-error', {a:1 , b: 2})
    }
  }
}
</script>

<style>
  #app {}
</style>
