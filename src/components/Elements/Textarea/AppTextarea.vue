<template>
    <div class="textarea">
        <label :for="id" class="textarea__label">{{ label }}</label>
        <textarea :id="id" :name="name" class="textarea__field"></textarea>
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
            }
        }
    }
</script>

<style lang="scss" src="./AppTextarea.scss" scoped></style>