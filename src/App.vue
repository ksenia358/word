<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <OptionsTest></OptionsTest>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import OptionsTest from './components/Tests/OptionsTest';

  export default {
    name: 'App',
    components: {
      OptionsTest,
      Header,
    }
  }
</script>