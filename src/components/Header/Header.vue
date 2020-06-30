<template>
  <header class="header">
    <div class="main">
      <nav class="header__nav nav">
        <ul class="nav__list">
          <router-link v-for="(item, index) in navItems"
                       tag="li"
                       :key="index"
                       :to="item.route"
                       class="nav__item"
                       active-class="nav__item--active"
          >
            <a class="nav__link">{{ item.name }}</a>
          </router-link>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
  },
  data() {
    return {
      navItems: [
        {
          name: 'Добавить слово',
          route: '/add'
        },
        {
          name: 'Тест',
          route: '/test'
        },
        {
          name: 'Тест с вводом',
          route: '/test-inp'
        }
      ]
    };
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style lang="scss" src="./Header.scss" scoped />