<template>
    <div :class="{'checkable': isCheckable}" class="input">
        <label v-if="label" :for="id" class="input__label">{{ label }}</label>
        <input @change="onChange"
               :value="value"
               :id="id"
               :type="type"
               :name="name"
               :disabled="isDisabled"
               class="input__field"
        >
    </div>
</template>

<script>
    export default {
        name: "AppInput",
        props: {
            label: {
                type: String,
                required: false,
                default: ''
            },
            id: {
                type: [String, Number],
                required: true
            },
            value: {
                type: [String, Number],
                required: false,
                default: ''
            },
            isDisabled: {
                type: Boolean,
                required: false,
                default: false
            },
            type: {
                type: String,
                required: false,
                default: 'text'
            },
            name: {
                type: String,
                required: true
            },
            onChange: {
                type: Function,
                required: false,
                default() {}
            }
        },
        computed: {
            isCheckable() {
                return this.type === 'radio' || this.type === 'checkbox';
            }
        }
    }
</script>

<style lang="scss" src="./AppInput.scss" scoped></style>