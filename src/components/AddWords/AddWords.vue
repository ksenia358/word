<template>
  <div class="">
    <AppInput id="word"
              label="Слово:"
              name="word"
              @on-change="change"
    ></AppInput>
    <div v-for="(n,key) in state.counts"
         :key="n"
         :id="'block-' + n">
      <AppTextarea id="translation"
                   :label="key==0?'Перевод:':''"
                   name="translation"
                   @on-change="textareaChange">
      </AppTextarea>
      <Button title="Удалить"
              v-if="key>0 || state.counts.length>1"
              @click.native="countMinus($event, key)">
      </Button>
      <Button title="Ещё"
              v-if="key+1==state.counts.length"
              @click.native="countPlus($event, key)"
      >
      </Button>
    </div>
    <Button class="full"
            title="Добавить"
            :onClick="addWord">
    </Button>
  </div>
</template>

<script>
import AppInput from '../Elements/Input/AppInput.vue'
import AppTextarea from '../Elements/Textarea/AppTextarea.vue'
import Button from '../Elements/Button/Button.vue'
export default {
  name: 'AddWords',
  components: {
    AppInput, AppTextarea, Button
  },
  data() {
    return {
      state: {
        counts: [1],
        count: 1,
        list:[]
      }
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    countPlus(evt, key){
      let elem = evt.target,
          textarea = elem.parentElement.getElementsByTagName('textarea');
      if (textarea[0].value!=='') {
        this.state.list.push(textarea[0].value)
        console.log(this.state.list)
        console.log(key)
        this.state.count = this.state.count+1
        this.state.counts.push(this.state.count)
      }
    },
    countMinus(evt, key){
      this.state.counts.splice(key, 1)
    },
    addWord(){
      console.log('789789');
    },
    change(evt){
      console.log(evt);
    },
    textareaChange(evt){
      console.log(evt);
    }
  }
}
</script>
<style lang="scss" src="./AddWords.scss" scoped />