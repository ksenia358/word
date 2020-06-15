<template>
    <section class="options-test">
        <h2 class="visually-hidden">Тест с вариантами</h2>
        <div v-if="words.length > 0" class="options-test__wrapper">
            <span class="options-test__word">{{ words[currentWordIndex].word }}</span>
            <AppInput v-for="option in options"
                      :key="option.value + optionsKeyValue"
                      type="radio"
                      :value="option.value"
                      :id="option.value"
                      name="option"
                      :label="option.value"
                      :is-disabled="optionDisabled"
                      :on-change="checkOption"
            ></AppInput>
        </div>
        <div v-else class="options-test__empty">Слова закончились</div>
    </section>
</template>

<script>
    import AppInput from '../Elements/Input/AppInput';

    export default {
        name: "OptionsTest",
        components: {
            AppInput
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
                optionDisabled: false,
                currentWordIndex: 0,
                optionsKeyValue: 0,
                checkedOptionCorrect: false,
                inputClass: ''
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
                const randomCorrectTranslationIndex = Math.floor(
                    Math.random() * this.words[this.currentWordIndex].translations.length
                );
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
            checkOption(evt) {
                const checkedOptionValue = evt.target.value;

                this.optionDisabled = true;
                this.checkedOptionCorrect = this.words[this.currentWordIndex].translations.includes(checkedOptionValue);
                this.inputClass = this.checkedOptionCorrect ? 'input--success' : 'input--error';

                evt.target.classList.add(this.inputClass);

                setTimeout(this.nextWord, 1500);
            },
            nextWord() {
                if (this.words.length > 0) {
                    this.optionsKeyValue++;

                    if (this.checkedOptionCorrect) {
                        this.words.splice(this.currentWordIndex, 1);
                    }

                    if (this.words.length > 0) {
                        this.inputClass = '';
                        this.currentWordIndex = Math.floor(Math.random() * this.words.length);
                        this.setOptions();
                        this.optionDisabled = false;
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

<style lang="scss" scoped></style>