<template>
    <div class="textarea">
        <label :for="id" class="textarea__label">{{ label }}</label>
        <textarea @change="onChange" :id="id" :name="name" class="textarea__field" :value="value"></textarea>
    </div>
</template>

<script>
    export default {
        name: "AppTextarea",
        props: {
            label: {
                type: String,
                required: true
            },
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            value: {
              type: String,
              required: false,
              default: ''
            },
            onChange: {
                type: Function,
                required: false,
                default() {}
            }
        }
    }
</script>

<style lang="scss" src="./AppTextarea.scss" scoped></style>