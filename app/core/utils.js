/**
 * Вспомогательный функционал
 */
export default class Utils {
    /**
     * Наиболее часто используемые в Material Design цвета (согласно materialui.co)
     */
    static materialColors = ['#f44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#009688', '#4CAF50', '#8BC34A', '#FF5722', '#9E9E9E', '#607D8B', '#263238', '#424242', '#b71c1c', '#0D47A1' ]

    /**
     * Случайное число из области [min, max]
     */
    static randomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Случайно выбранный цвет из коллекции materialColors
     * @returns {String}
     */
    static randomColor = function () {
        return this.materialColors[this.randomInt(0, this.materialColors.length - 1)];
    }
}