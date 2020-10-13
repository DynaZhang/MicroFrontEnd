<template>
  <div id="app">
    <el-container>
      <el-aside width="250px" style="height: 100%;">
        <el-menu
          default-active="/home"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/course/home">首页</el-menu-item>
          <el-menu-item index="/course/page1">页面1</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {removeEvent, subscribeEvent} from "./libs/utils";

export default {
  name: 'app',
  methods: {
    handleTokenError () {
      console.log('token出错')
    }
  },
  mounted: function () {
    subscribeEvent('token-error', this.handleTokenError)
  },
  destroyed() {
    removeEvent('token-error', this.handleTokenError)
  }
}
</script>

<style scoped lang="css">

</style>
