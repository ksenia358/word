<template>
  <div class="">
    <template>
      <p>Будет ли у вас проверочный диктант?</p>
      <Button
          title="Да">
      </Button>
      <Button
          title="Нет">
      </Button>
    </template>

    <template>
      <AppInput id="word"
                label="Введите дату диктанта:"
                name="word"
      ></AppInput>
      <Button
          title="Ок">
      </Button>
    </template>

    <template>
      <p>Слова добавлены в&nbsp;словарь.</p>
      <p><span class="bold">15.06.2005</span> добавленные вами слова будут занесены в&nbsp;основной словарь.</p>
      <p><span class="bold">До&nbsp;15.06.2005</span> слова будут находиться в&nbsp;разделе &laquo;Диктант&raquo;, где вы&nbsp;сможете себя по&nbsp;ним тестировать.</p>
      <Button
          title="Ок">
      </Button>
    </template>

    <template v-if="state.showForm">
      <AppInput id="word"
                label="Слово:"
                name="word"
                :value="state.list[state.indexWord] ? state.list[state.indexWord].word: ''"
                :on-change="InputChange"
      ></AppInput>
      <div class="red" v-show="state.word.error==true && state.word.buttonClick==true">Введите слово</div>
      <div v-if="state.list[state.indexWord]">
        <div v-for="(n,key) in state.list[state.indexWord].translation" :key="key" class="listWords">
          <div class="medium" v-if="state.indexEdit!==key">{{n}}</div>
          <AppTextarea v-if="state.showEdit && state.indexEdit==key"
                       id="edit"
                       name="edit"
                       label=""
                       :value="n">
          </AppTextarea>
          <div class="red" v-if="state.indexEdit==key && state.editInput.error==true && state.editInput.buttonClick==true">Введите новый перевод или удалите</div>
          <div class="row">
            <div class="item" v-if="state.indexEdit!==key">
              <Button
                      title="Редактировать"
                      @click.native="edit($event, key)"
                      class="blueButton">
              </Button>
            </div>
            <div class="item" v-if="state.indexEdit==key">
              <Button title="Ок"
                      @click.native="editWord($event, key)">
              </Button>
            </div>
            <div class="item">
              <Button class="redButton"
                      title="Удалить"
                      @click.native="countMinus($event, key)">
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <AppTextarea v-if="!state.showEdit"
                     id="translation"
                     name="translation"
                     label="Перевод"
                     :on-change="textareaChange">
        </AppTextarea>
        <div class="red" v-if="state.translation.error==true && state.translation.buttonClick==true">Напишите перевод</div>
        <Button v-if="!state.showEdit"
                title="Ещё"
                @click.native="countPlus($event)">
        </Button>
      </div>
      <Button v-if="!state.showEdit"
              class="full"
              title="Добавить"
              :onClick="addWord">
      </Button>
    </template>
    <template v-if="!state.showForm">
      <Button title="Добавить ещё"
              :onClick="addMore">
      </Button>
      <Button title="Закончить">
      </Button>
      <div v-for="(item,key) in state.list" :key="key">
        <div class="bold">{{item.word}}</div>
        <div v-for="(n,key) in item.translation" :key="key">{{n}}</div>
        <Button
            title="Редактировать"
            class="blueButton"
            @click.native="editAddedWord($event, key)">
        </Button>
      </div>
    </template>
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
        add: true,
        count: 0,
        indexWord: 0,
        showForm: true,
        list:[ { "word": "", "translation": [] } ],
        showEdit:false,
        indexEdit:null,
        word: {
          error: true,
          buttonClick: false
        },
        translation: {
          error: true,
          buttonClick: false
        },
        editInput: {
          error: true,
          buttonClick: false
        }
      },
    }
  },
  props: {
  },
  computed: {
  },
  methods: {
    countPlus(evt){
      const elem = evt.target,
            textarea = elem.parentElement.getElementsByTagName('textarea'),
            value = textarea[0].value;
      if (this.state.list[this.state.indexWord]==undefined) {
        let obj={
          word:'',
          translation:[]
        }
        this.state.list.push(obj);
      }
      if (value!=='') {
        let val = value.replace(/\s+/g, ' ').trim();
        this.state.list[this.state.indexWord].translation.push(val)
        this.state.count = this.state.count+1;
        this.state.translation.buttonClick = true;
        this.state.translation.error = false;
        textarea[0].value='';
      }
      else {
        this.state.translation.buttonClick = true;
        this.state.translation.error = true;
      }
    },
    countMinus(evt, key){
      delete this.state.list[this.state.indexWord].translation[key]
      this.state.list[this.state.indexWord].translation = this.state.list[this.state.indexWord].translation.filter(el => el !== null);
      this.state.count = this.state.count-1
      if (key==this.state.indexEdit) {
        this.state.showEdit = false;
        this.state.indexEdit = null
      }
      this.state.editInput.error = true;
      this.state.editInput.buttonClick = false;
    },
    edit(evt, key) {
      const textarea = document.getElementById('translation');
      if (textarea) {
        const value = textarea.value;
        if (value!==''){
          let index = this.state.list[this.state.indexWord].translation.length
          let val = value.replace(/\s+/g, ' ').trim();
          this.state.list[this.state.indexWord].translation[index] = val;
        }
      }
      this.state.showEdit = true;
      this.state.indexEdit = key;
    },
    editWord(evt, key){
      const textarea = document.getElementById('edit'),
            value = textarea.value;
      if (value!=='') {
        let val = value.replace(/\s+/g, ' ').trim();
        this.state.list[this.state.indexWord].translation[key] = val;
        this.state.editInput.error = true;
        this.state.editInput.buttonClick = false;
        this.state.showEdit = false;
        this.state.indexEdit = null
      }
      else {
        this.state.editInput.error = true;
        this.state.editInput.buttonClick = true;
      }
    },
    addWord(){
      const noWord = () => {
            this.state.word.buttonClick = true;
            this.state.word.error = true;
            this.state.translation.buttonClick = false;
            this.state.translation.error = true;
          },
          noTranslation = () => {
            this.state.word.buttonClick = false;
            this.state.word.error = true;
            this.state.translation.buttonClick = true;
            this.state.translation.error = true;
          },
          emptyData = () => {
            this.state.word.buttonClick = true;
            this.state.word.error = true;
            this.state.translation.buttonClick = true;
            this.state.translation.error = true;
          },
          textarea = document.getElementById('translation'),
          input = document.getElementById('word'),
          valueTextarea = textarea.value,
          valueInput = input.value,
          validData = () => {
            let valInput = valueInput.replace(/\s+/g, ' ').trim();



            this.state.word.buttonClick = false;
            this.state.word.error = true;
            this.state.translation.buttonClick = false;
            this.state.translation.error = true;
            this.state.list[this.state.indexWord].word = valInput;
            this.state.list[this.state.indexWord].translation = this.state.list[this.state.indexWord].translation.filter(el => el !== null);
            this.state.indexWord=this.state.list.length
            this.state.showForm = false;
            this.state.add = true;
          },
          createObj = () => {
            let obj={
              word:'',
              translation:[]
            }
            this.state.list.push(obj);
          };
        if (this.state.list[this.state.indexWord]==undefined) {
          createObj()
        }
        if ((this.state.list[this.state.indexWord].translation.length !== 0 || valueTextarea!=='') && valueInput!=='') {
          if (valueTextarea!=='') {
            let valTextarea = valueTextarea.replace(/\s+/g, ' ').trim();
            this.state.list[this.state.indexWord].translation[this.state.count] = valTextarea;
          }
          validData()
        }
        else if ((this.state.list[this.state.indexWord].translation.length !== 0 || valueTextarea!=='') && valueInput=='') {
          noWord()
        }
        else if ((this.state.list[this.state.indexWord].translation.length == 0 || valueTextarea=='') && valueInput!=='') {
          noTranslation()
        }
        else {
          emptyData()
        }
    },
    addMore(){
      if (this.state.list[this.state.indexWord]==undefined) {
        let obj={
          word:'',
          translation:[]
        }
        this.state.list.push(obj);
      }
      this.state.showForm=true;
    },
    editAddedWord(evt, key){
      this.state.showForm=true;
      this.state.indexWord=key
    },
    InputChange(){
    },
    textareaChange(){
    }
  }
}
</script>
<style lang="scss" src="./AddWords.scss" scoped />