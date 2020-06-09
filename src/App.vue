<template>
  <div id="app" class="page">
    <Header></Header>
    <div class="main">
      <AddWords></AddWords>
    </div>
  </div>
</template>

<script>
  import Header from './components/Header/Header.vue'
  import AddWords from './components/AddWords/AddWords.vue'

  export default {
    name: 'App',
    components: {
      Header, AddWords
    }
  }
</script>