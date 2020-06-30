<template>
    <section class="input-test">
        <h2 class="visually-hidden">Тест с вводом перевода</h2>
        <div v-if="words.length > 0" class="input-test__wrapper">
            <span class="input-test__word">{{ words[currentWordIndex].word }}</span>
            <AppInput :id="words[currentWordIndex].word"
                      :value="inputValue"
                      name="translation"
                      label="Ваш перевод"
                      :is-disabled="inputDisabled"
                      :on-change="checkValue"
                      :class="inputClass"
            ></AppInput>
        </div>
        <div v-else class="input-test__empty">Слова закончились</div>
    </section>
</template>

<script>
    import AppInput from '../../Elements/Input/AppInput';
    import {mapGetters} from 'vuex';

    export default {
        name: "InputTest",
        components: {
            AppInput
        },
        data() {
            return {
                currentWordIndex: 0,
                inputDisabled: false,
                inputValue: '',
                inputValueIsCorrect: false,
                inputClass: ''
            };
        },
        computed: {
            ...mapGetters('words', {
                words: 'words'
            })
        },
        methods: {
            mixArray(array) {
                let j, temp;

                for (let i = array.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = array[j];
                    array[j] = array[i];
                    array[i] = temp;
                }
            },
            checkValue(evt) {
                this.inputDisabled = true;
                this.inputValueIsCorrect = false;

                this.inputValue = evt.target.value;

                for (let translation of this.words[this.currentWordIndex].translations) {
                    translation = translation.toLowerCase();

                    if (translation === this.inputValue) {
                        this.inputValueIsCorrect = true;
                        break;
                    }
                }

                this.inputClass = this.inputValueIsCorrect ? 'input--success' : 'input--error';

                setTimeout(this.nextWord, 1500);
            },
            nextWord() {
                if (this.words.length > 0) {
                    if (this.inputValueIsCorrect) {
                        this.words.splice(this.currentWordIndex, 1);
                    }

                    if (this.words.length > 0) {
                        this.inputValue = '';
                        this.inputClass = '';
                        this.currentWordIndex = Math.floor(Math.random() * this.words.length);
                        this.inputDisabled = false;
                    }
                }
            }
        },
        beforeMount() {
            this.mixArray(this.words);
        }
    }
</script>

<style scoped>

</style>