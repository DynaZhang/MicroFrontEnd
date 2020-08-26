<template>
  <div id="app">
    Welcome to Your App2
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted: function () {
    window.addEventListener('token-error', (event) => {
      console.log(event.detail)
    })
  }
}
</script>

<style scoped>
#app {
  color: #0000ff;
}
</style>
