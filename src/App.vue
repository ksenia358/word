<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  import HelloWorld from './components/HelloWorld.vue'

  export default {
    name: 'App',
    components: {
      Header, HelloWorld
    }
  }
</script>