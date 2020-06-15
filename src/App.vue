<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <div style="display: flex; flex-direction: column;">
        <InputTest></InputTest>
        <br>
        <OptionsTest></OptionsTest>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue';
  import InputTest from './components/Tests/InputTest';
  import OptionsTest from './components/Tests/OptionsTest';

  export default {
    name: 'App',
    components: {
      InputTest,
      Header,
      OptionsTest
    }
  }
</script>