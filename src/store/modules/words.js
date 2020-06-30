export default {
    namespaced: true,
    state: {
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
            }
        ]
    },
    getters: {
        words(state) {
            return state.words;
        }
    },
    mutations: {

    }
};