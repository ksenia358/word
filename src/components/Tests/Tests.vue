<template>
    <section class="test">
        <h2 class="visually-hidden">Тест</h2>
        <div v-if="words.length > 0" class="test__wrapper">
            <h3 class="test__word">{{ words[currentWordIndex].word }}</h3>
            <p class="test__result">{{ result.text }}</p>
            <form @submit.prevent="">
                <template v-if="testType === 'options'">
                    <AppInput v-for="(answer) in answers"
                              type="radio"
                              :value="answer"
                              :id="answer"
                              name="option"
                              :label="answer"
                              :key="answer + answersStartKeyValue"
                              :is-disabled="answerDisabled"
                              :on-change="checkAnswer"
                    ></AppInput>
                </template>
                <template v-else>
                    <AppInput :id="words[currentWordIndex].word"
                              name="introduce"
                              label="Перевод"
                              :is-disabled="answerDisabled"
                              :on-change="checkAnswer"
                    ></AppInput>
                </template>
                <Button :disabled="buttonDisabled"
                        :on-click="nextQuestion"
                        type="button"
                        title="Далее"
                ></Button>
            </form>
        </div>
        <div v-else class="empty-words">Слова закончились</div>
    </section>
</template>

<script>
    import AppInput from '../Elements/Input/AppInput';
    import Button from '../Elements/Button/Button';

    export default {
        name: "Tests",
        components: {
            AppInput,
            Button
        },
        props: {
            testType: {
                type: String, // options | introduce
                required: false,
                default: 'options'
            },
            answersCount: {
                type: Number,
                required: false,
                default: 4
            }
        },
        data() {
            return {
                result: {
                    text: '',
                    status: false
                },
                answers: [],
                answersStartKeyValue: 0,
                currentWordIndex: 0,
                buttonDisabled: true,
                answerDisabled: false,
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
                ]
            };
        },
        methods: {
            checkAnswer(evt) {
                this.answerDisabled = true;
                this.buttonDisabled = false;
                const answer = evt.target.value.toLowerCase();
                let isCorrect = false;

                switch (this.testType) {
                    case 'options':
                        if (this.words[this.currentWordIndex].translations.indexOf(evt.target.value) !== -1) {
                            this.result.text = 'Верно!';
                            this.result.status = true;
                        } else {
                            this.result.text = 'Провал! Даже не пытайся съехать на том, что ты в школе французкий учил, дурик!';
                        }

                        break;
                    case 'introduce':
                        for (let translation of this.words[this.currentWordIndex].translations) {
                            translation = translation.toLowerCase();

                            if (translation === answer) {
                                isCorrect = true;
                                break;
                            }
                        }

                        if (isCorrect) {
                            this.result.text = `Верно! Это ${answer}`;
                        } else {
                            this.result.text = 'Ага, щас, не верно!';
                        }

                        break;
                }
            },
            nextQuestion() {
                if (this.words.length > 0) {
                    if (this.testType === 'options') {
                        if (this.result.status && this.words.length > 0) {
                            this.words.splice(this.currentWordIndex, 1);
                        }

                        this.answersStartKeyValue++;
                        this.result.status = false;
                        this.getAnswers();
                    } else {
                        this.words.splice(this.currentWordIndex, 1);
                    }

                    this.reset();
                }
            },
            reset() {
                this.result.text = '';
                this.currentWordIndex = Math.floor(Math.random() * this.words.length);
                this.answerDisabled = false;
                this.buttonDisabled = true;
            },
            getAnswers() {
                if (this.answers.length > 0) {
                    this.answers = [];
                }

                const randomCorrectAnswerIndex = Math.floor(Math.random() * this.words[this.currentWordIndex].translations.length);
                const correctAnswer = this.words[this.currentWordIndex].translations[randomCorrectAnswerIndex];

                this.answers.push(correctAnswer);

                if (this.words.length > 1) {
                    outer: while (this.answers.length < this.answersCount) {
                        let randomWordIndex = Math.floor(Math.random() * this.words.length);

                        if (randomWordIndex === this.currentWordIndex) {
                            randomWordIndex = Math.floor(Math.random() * this.words.length);
                        }

                        const randomWord = this.words[randomWordIndex];
                        const randomTranslationIndex = Math.floor(Math.random() * randomWord.translations.length);

                        for (let translation of randomWord.translations) {
                            if (this.answers.indexOf(translation) !== -1) {
                                continue outer;
                            }
                        }

                        const answer = randomWord.translations[randomTranslationIndex];

                        if (this.answers.indexOf(answer) !== -1) {
                            continue;
                        }

                        this.answers.push(answer);

                        if (this.words.length < this.answersCount && this.answers.length == this.words.length) {
                            break;
                        }
                    }

                    this.mixArray(this.answers);
                }
            },
            mixArray(array) {
                let j, temp;

                for (let i = array.length - 1; i > 0; i--) {
                    j = Math.floor(Math.random() * (i + 1));
                    temp = array[j];
                    array[j] = array[i];
                    array[i] = temp;
                }
            }
        },
        beforeMount() {
            this.mixArray(this.words);

            if (this.testType === 'options') {
                this.getAnswers();
            }
        }
    }
</script>

<style scoped>

</style>