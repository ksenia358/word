<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <InputTest></InputTest>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import InputTest from './components/Tests/InputTest';

  export default {
    name: 'App',
    components: {
      InputTest,
      Header,
    }
  }
</script>