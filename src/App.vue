<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <Test></Test>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  import Test from './components/Test/Test';

  export default {
    name: 'App',
    components: {
      Header, Test
    }
  }
</script>