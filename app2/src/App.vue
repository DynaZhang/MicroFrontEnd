<template>
  <div id="app">
    Welcome to Your App2
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

<style scoped>
#app {
  color: #0000ff;
}
</style>
