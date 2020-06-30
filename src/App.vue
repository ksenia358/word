<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';

  export default {
    name: 'App',
    components: {
      Header
    }
  }
</script>