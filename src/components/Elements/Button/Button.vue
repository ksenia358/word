<template>
  <button :class="getClass"
          :type="type"
          :disabled="disabled"
          @click="Click">
    <template>
      {{title}}
    </template>
  </button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      required: false,
      default: 'submit'
    },
    title: {
      type: String,
      required: false,
      default: null
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    fullwidth: {
      type: Boolean,
      required: false,
      default: false
    },
    onClick: {
      type: Function,
      required: false,
      default: () => {}
    },

  },
  computed: {
    getClass() {
      return {
        "full": this.fullwidth,
      };
    }
  },
  methods: {
    Click(){
      this.onClick();
    }
  }
}
</script>
<style lang="scss" src="./Button.scss" scoped />