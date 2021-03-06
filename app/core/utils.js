/**
 * Вспомогательный функционал
 */
export default class Utils {
    /**
     * Пытается выполнить действие до тех пор, пока не будет достигнуто определённое условие.
     * Является тщательно закаррированным костылём, используемым, если при определённом стечении обстоятельств некоторая
     * асинхронная функция не возвращает Promise.
     * TODO: подлежит яростному (!) выпиливанию
     * Пример использования: Utils.tryUntil( param => doSomething(param) )( 100 )( result => result === 42 )
     * @param callback  {Function} функция, которая выполняется в случае успеха
     * @param time      {Number} время интервала выполнения функции
     * @param predicate {Function} функция проверки условия
     */
    static tryUntil = (callback) => (time) => (predicate) => {
        let intervalId = setInterval(() => {
            try {
                if (predicate()) {
                    callback()
                    clearInterval(intervalId)
                }
            } catch (err) {
                clearInterval(intervalId)
            }

        })
        setTimeout(() => clearInterval(intervalId), 10000)
    }

    /**
     * Регулярки для чистки респонса от ненужных тегов
     */
    static DIRTY_REGEXPS = [
        /<!\[CDATA\[/i,
        /\]\]>/,
        /<(\/){0,}a.*>/,
        /<(\/){0,}script.*>/,
        /<(\/){0,}div.*>/,
        /<(\/){0,}b.*>/,
        /<(\/){0,}i>/,
        /<(\/){0,}p>/,
        /<(\/){0,}code>/,
        /<(\/){0,}strong>/,
        /<(\/){0,}em>/,
        /<(\/){0,}italic>/,
        /<(\/){0,}h[1-5]{1,}>/,
        /<(\/){0,}pre>/,
        /<(\/){0,}li.*>/,
        /<(\/){0,}ul.*>/,
    ]

    /**
     * Чистит строку от "мусорных" тегов
     * @param   {String} responseElement строка, которую необходимо очистить
     * @returns {String} нормализованную строку
     */
    static cleanupContent(responseElement) {
        this.DIRTY_REGEXPS.forEach(regexp => responseElement = responseElement.split(regexp).join(''))
        return responseElement
    }

    /**
     * Наиболее часто используемые в Material Design цвета (согласно materialui.co)
     */
    static materialColors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#009688', '#4CAF50', '#8BC34A', '#FF5722', '#9E9E9E', '#607D8B', '#263238', '#424242', '#b71c1c', '#0D47A1']

    /**
     * Случайное число из области [min, max]
     */
    static randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    /**
     * Случайно выбранный цвет из коллекции materialColors
     * @returns {String}
     */
    static randomColor() {
        return this.materialColors[this.randomInt(0, this.materialColors.length - 1)]
    }
}