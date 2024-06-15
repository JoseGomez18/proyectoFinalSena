<template>
  <div>
    <navBar/>
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>HOME</h1>
  </div>
</template>

<script>
import navBar from './components/navBar.vue'

export default {
  name: 'App',
  components: {
    navBar
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
