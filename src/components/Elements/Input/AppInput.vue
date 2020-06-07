<template>
    <div class="input">
        <label :for="id" class="input__label">{{ label }}</label>
        <input :id="id" :type="type" :name="name" class="input__field">
    </div>
</template>

<script>
    export default {
        name: "AppInput",
        props: {
            label: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" src="./AppInput.scss" scoped></style>