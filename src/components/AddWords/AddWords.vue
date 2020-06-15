<template>
  <div class="">
    <template v-if="state.finish==true && state.test==null">
      <p>Будет ли у вас проверочный диктант?</p>
      <Button id="yes"
              @click.native="test($event)"
              title="Да">
      </Button>
      <Button id="no"
              @click.native="test($event)"
              title="Нет">
      </Button>
    </template>

    <template v-if="state.test==true">
      <label>Введите дату диктанта:</label>
      <datepicker v-model="state.dateTest"
                  :language="ru"
                  :disabled-dates="disabledDates"
                  :format="format"
      ></datepicker>
    </template>

    <template v-if="state.test!==null">
      <p v-if="state.test==false">Слова добавлены в&nbsp;словарь.</p>
      <template v-if="state.dateTest!==null">
        <p><span class="bold">{{formatDate}}</span> добавленные вами слова будут занесены в&nbsp;основной словарь.</p>
        <p><span class="bold">До&nbsp;{{formatDate}}</span> слова будут находиться в&nbsp;разделе &laquo;Диктант&raquo;, где вы&nbsp;сможете себя по&nbsp;ним тестировать.</p>
      </template>
      <Button title="Ок">
      </Button>
    </template>

    <template v-if="state.showForm && state.finish==false">
      <AppInput id="word"
                label="Слово:"
                name="word"
                :value="state.list[state.indexWord] ? state.list[state.indexWord].word: ''"
                :on-change="InputChange"
      ></AppInput>
      <div class="red" v-show="state.word.error==true && state.word.buttonClick==true">Введите слово</div>
      <div class="red" v-show="state.found==true">Это слово уже было добавлено</div>
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
    <template v-if="!state.showForm && state.finish==false">
      <Button title="Добавить ещё"
              :onClick="addMore">
      </Button>
      <Button title="Закончить"
              @click.native="finish">
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
import Datepicker from 'vuejs-datepicker';
import {ru} from 'vuejs-datepicker/dist/locale'

export default {
  name: 'AddWords',
  components: {
    AppInput, AppTextarea, Button, Datepicker
  },
  data() {
    return {
      ru: ru,
      format: 'dd.MM.yyyy',
      disabledDates: {
        to: new Date(Date.now()-86400000)
      },
      state: {
        dateTest: null,
        finish: false,
        test: null,
        count: 0,
        indexWord: 0,
        showForm: true,
        list:[ { "word": "", "translation": [] } ],
        showEdit:false,
        indexEdit:null,
        found: false,
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
        },
      },
    }
  },
  props: {
  },
  computed: {
    formatDate() {
      let d = new Date(this.state.dateTest),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year ].join('.');
    }
  },
  methods: {
    countPlus(evt){
      const elem = evt.target,
            textarea = elem.parentElement.getElementsByTagName('textarea'),
            value = /^\s*$/.test(textarea[0].value) ? '':textarea[0].value;
      if (this.state.list[this.state.indexWord]==undefined) {
        let obj={
          word:'',
          translation:[]
        }
        this.state.list.push(obj);
      }
      if (value!=='') {
        let val = value.trim();
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
        const value = /^\s*$/.test(textarea.value) ? '':textarea.value;
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
            value = /^\s*$/.test(textarea.value) ? '':textarea.value;
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
      this.state.found = false;
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
          valueTextarea = /^\s*$/.test(textarea.value) ? '':textarea.value,
          valueInput = /^\s*$/.test(input.value) ? '':input.value,
          validData = () => {
            this.state.word.buttonClick = false;
            this.state.word.error = true;
            this.state.translation.buttonClick = false;
            this.state.translation.error = true;
            this.state.indexWord=this.state.list.length
            this.state.showForm = false;
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
          let valTextarea = valueTextarea.trim();
          if (valueTextarea!=='') {
            this.state.list[this.state.indexWord].translation.push(valTextarea);
            textarea.value='';
          }
          let valInput = valueInput.trim();
          for (let i=0; i<this.state.list.length;i++) {
            if (this.state.list[i].word === valInput && i!==this.state.indexWord) {
              this.state.found = true;
              break
            }
          }
          if (!this.state.found) {
            this.state.list[this.state.indexWord].word = valInput;
            this.state.list[this.state.indexWord].translation = this.state.list[this.state.indexWord].translation.filter(el => el !== null);
            validData()
          }
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
      this.state.found = false
    },
    editAddedWord(evt, key){
      this.state.showForm=true;
      this.state.indexWord=key
    },
    finish(){
      this.state.finish=true;
    },
    InputChange(){
    },
    textareaChange(){
    },
    test(evt){
      if(evt.target.id==='yes') {
        this.state.test=true
      }
      else {
        this.state.test=false
      }
    },
  }
}
</script>
<style lang="scss" src="./AddWords.scss" scoped />