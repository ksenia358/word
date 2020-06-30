<template>
    <div class="tests">
        <div class="tests__selection">
            <h2 class="tests__title">Выбери тест</h2>
            <div class="tests__list">
                <router-link to="/tests/option" class="test__list-item">Тест с вариантами перевода</router-link>
                <router-link to="/tests/input" class="test__list-item">Тест с вводом перевода</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Tests"
    }
</script>

<style lang="scss" src="./Tests.scss" scoped></style>