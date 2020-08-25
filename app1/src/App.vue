<template>
  <div id="app">
    Welcome to Your App1
    <p>{{num1}}</p>
    <button type="button" class="btn" @click="handleAdd">add</button>
  </div>
</template>

<script>

export default {
  name: 'app',
  data() {
    return {
      num1: 0
    }
  },
  methods: {
    handleAdd () {
      this.num1 += 1
    }
  }
}
</script>

<style scoped>
  #app {
    color: #00ff00
  }
  .btn {
    color: #ff0000
  }
</style>
