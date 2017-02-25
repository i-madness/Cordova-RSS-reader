import store from '../store.js'
import { FeedParser } from './parser.js'

window.intervalId = 0

/**
 * Планировщик задания обновления ленты
 */
const UpdateScheduler = {
    /**
     * Обновляет ленту
     */
    update() {
        let subscriptions = store.getState().subscriptionReducer.subscriptions
        store.dispatch(FeedParser.parseSubscription(subscriptions))
    },

    /**
     * Запускает задание по обновлению в каждые checkDuration миллесекунд
     */
    scheduleCheckingTask() {
        window.intervalId = setInterval(this.update, store.getState().settingsReducer.checkDuration)
    },

    /**
     * Останавливает планировщик
     */
    stop() {
        clearInterval(window.intrvalId)
    },

    /**
     * Перезапускает планировщик
     */
    restart() {
        this.stop()
        this.update()
        this.scheduleCheckingTask()
    }
}

export default UpdateScheduler