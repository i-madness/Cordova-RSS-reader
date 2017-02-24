import store from '../store.js'
import { FeedParser } from './parser.js'

const UpdateScheduler = {
    intervalId: 0,

    update() {
        let subscriptions = store.getState().subscriptionReducer.subscriptions
        store.dispatch(FeedParser.parseSubscription(subscriptions))
    },

    scheduleCheckingTask() {
        this.intervalId = setInterval(this.update, store.getState().settingsReducer.checkDuration)
    },

    stop() {
        clearInterval(this.intrvalId)
    },

    restart() {
        this.stop()
        this.update()
        this.scheduleCheckingTask()
    }
}

export default UpdateScheduler