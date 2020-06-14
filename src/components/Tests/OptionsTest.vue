<template>
    <section class="options-test">
        <h2 class="visually-hidden">Тест с вариантами</h2>
        <div v-if="words.length > 0" class="options-test__wrapper">
            <span class="options-test__word">{{ words[currentWordIndex].word }}</span>
            <AppInput v-for="(option, index) in options"
                      :key="option.value + optionsKeyValue"
                      type="radio"
                      :value="option.value"
                      :id="option.value"
                      name="option"
                      :label="option.value"
                      :is-disabled="optionDisabled"
                      :on-change="optionChecked.bind(null, index)"
            ></AppInput>
            <Button :disabled="confirmButtonDisabled"
                    :on-click="checkOption"
                    type="button"
                    title="Подтвердить"
            ></Button>
            <Button :disabled="nextButtonDisabled"
                    :on-click="nextWord"
                    type="button"
                    title="Далее"
            ></Button>
            <div class="result">{{ result }}</div>
        </div>
        <div v-else class="options-test__empty">Слова закончились</div>
    </section>
</template>

<script>
    import AppInput from '../Elements/Input/AppInput';
    import Button from '../Elements/Button/Button';

    export default {
        name: "OptionsTest",
        components: {
            AppInput,
            Button
        },
        props: {
            optionsCount: {
                type: Number,
                required: false,
                default: 4
            }
        },
        data() {
            return {
                words: [
                    {
                        word: 'cat',
                        translations: ['кошка', 'кот']
                    },
                    {
                        word: 'car',
                        translations: ['автомобиль', 'машина']
                    },
                    {
                        word: 'table',
                        translations: ['таблица', 'стол']
                    },
                    {
                        word: 'row',
                        translations: ['ряд']
                    },
                    {
                        word: 'sacrifice',
                        translations: ['жертва']
                    },
                    {
                        word: 'honor',
                        translations: ['честь']
                    },
                    {
                        word: 'hope',
                        translations: ['надежда']
                    },
                    {
                        word: 'promise',
                        translations: ['обещание']
                    },
                    {
                        word: 'dog',
                        translations: ['собака']
                    },
                    {
                        word: 'sky',
                        translations: ['небо']
                    },
                    {
                        word: 'shadow',
                        translations: ['тень']
                    },
                    {
                        word: 'flower',
                        translations: ['цветок']
                    },
                    {
                        word: 'sheep',
                        translations: ['корабль']
                    },
                    {
                        word: 'sleep',
                        translations: ['спать']
                    },
                ],
                optionsWords: [],
                options: [],
                confirmButtonDisabled: true,
                nextButtonDisabled: true,
                optionDisabled: false,
                currentWordIndex: 0,
                optionsKeyValue: 0,
                checkedOptionCorrect: false,
                result: ''
            };
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
            setOptions() {
                this.options = [];
                const randomCorrectTranslationIndex = Math.floor(Math.random() * this.words[this.currentWordIndex].translations.length);
                const correctTranslation = this.words[this.currentWordIndex].translations[randomCorrectTranslationIndex];

                this.options.push({
                    checked: false,
                    value: correctTranslation
                });

                while (this.options.length < this.optionsCount) {
                    const randomTranslationIndex = Math.floor(Math.random() * this.optionsWords.length);
                    const randomTranslation = this.optionsWords[randomTranslationIndex];
                    const isExist = this.options.find((option) => option.value === randomTranslation);
                    const isInCorrectTranslations = this.words[this.currentWordIndex].translations
                        .find((translation) => translation === randomTranslation);

                    if (isExist || isInCorrectTranslations) {
                        continue;
                    }

                    this.options.push({
                        checked: false,
                        value: randomTranslation
                    });
                }

                this.mixArray(this.options);
            },
            optionChecked(checkedOptionIndex) {
                if (this.confirmButtonDisabled) {
                    this.confirmButtonDisabled = false;
                }

                this.options.forEach((option, index) => {
                    option.checked = index === checkedOptionIndex;
                });
            },
            checkOption() {
                this.optionDisabled = true;
                this.confirmButtonDisabled = true;
                this.nextButtonDisabled = false;

                const checkedOptionValue = (this.options.find((option) => option.checked)).value;
                this.checkedOptionCorrect = this.words[this.currentWordIndex].translations.includes(checkedOptionValue);

                this.result = this.checkedOptionCorrect ? 'Верно!' : 'Тююю, не верно...';
            },
            nextWord() {
                if (this.words.length > 0) {
                    this.optionsKeyValue++;

                    if (this.checkedOptionCorrect) {
                        this.words.splice(this.currentWordIndex, 1);
                    }

                    if (this.words.length > 0) {
                        this.currentWordIndex = Math.floor(Math.random() * this.words.length);
                        this.setOptions();
                        this.optionDisabled = false;
                        this.nextButtonDisabled = true;
                        this.result = '';
                    }
                }
            }
        },
        beforeMount() {
            this.words.forEach((word) => {
                this.optionsWords = this.optionsWords.concat(word.translations);
            });

            this.mixArray(this.optionsWords);
            this.mixArray(this.words);
            this.setOptions();
        }
    }
</script>

<style scoped>

</style>