import _ from 'lodash'
import moment from 'moment'
import Utils from './utils.js'
import { ActionTypes as SubActionTypes } from '../reducers/subscription-reducer.js'
import { ActionTypes as FeedActionTypes } from '../reducers/feed-reducer.js'

let fetch = window.fetch || cordovaFetch || (() => 0)

/**
 * Инстанс парсера XML-документов для анализа контента RSS-лент
 */
const PARSER_INSTANCE = new DOMParser();

/**
 * Строка формата даты, используемая moment.js для парсинга содержимого тега pubDate
 */
const MOMENT_FORMAT = 'DD MMM YYYY HH:mm:ss ZZ'

/**
 * Класс-базовое описание единицы содержимого RSS-ленты
 */
export class FeedItem {
    constructor(title, description, timestamp, link) {
        this.title = title
        this.description = description
        this.timestamp = timestamp
        this.link = link
    }
}

/**
 * Парсер RSS-лент
 */
export const FeedParser = (function () {
    let items;

    return {
        /**
         * Получает содержимое RSS-ленты
         * 
         * @param urls {Array<String>} список из URL каналов, для которых надо получить элементы ленты
         * @returns {Promise}
         */
        parseSubscription: (channels) =>
            dispatch => {
                dispatch({ type: FeedActionTypes.ENTRIES_LOADING })
                Promise.all(channels.map(channel => fetch(channel.url)))
                    .then(responses => Promise.all(responses.map(resp => resp.text())))
                    .then(texts => {
                        let commonResult = []
                        for (let txt of texts) {
                            try {
                                let doc = PARSER_INSTANCE.parseFromString(txt, "text/xml")
                                let items = Array.from(doc.querySelectorAll('item'))
                                let result = items.map(item => {
                                    let title = Utils.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'title').innerHTML)
                                    let link = Utils.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'link').innerHTML)
                                    let timestamp = Utils.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'pubDate').innerHTML)
                                    let description = Utils.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'description').innerHTML)
                                    return new FeedItem(title, description, timestamp, link);
                                }).filter(item => !!item)
                                commonResult = [...commonResult, ...result]
                            } catch (err) {
                                return Promise.reject('text:\n' + txt);
                            }
                        }
                        commonResult.sort((item1, item2) => - moment(item1.timestamp, MOMENT_FORMAT).diff(moment(item2.timestamp, MOMENT_FORMAT)))
                        return Promise.resolve(commonResult)
                    })
                    .then(result => dispatch({ type: FeedActionTypes.ENTRIES_LOADING_SUCCESS, payload: result }))
                    .catch(error => dispatch({ type: FeedActionTypes.ENTRIES_LOADING_FAILURE, payload: error }))
            },

        /**
         * Метод добавления новой RSS-ленты, основанный на fetch. Делает проверку ленты на валидность.
         * Если валидация выполнена без ошибок, соответствующий Redux Reducer обработает действие SubActionTypes.ADD_SUBSCRIPTION,
         * ведущее к добавлению новой подписки.
         * В случае, если проверка не пройдена (или в цепочке Promise произойдёт reject), Reducer обработает
         * действие SubActionTypes.SUBSCRIPTIONS_LOADING_FAILURE.
         * 
         * *** TODO: сделать проверку ресурсов, которые задаются в формате
         * *** 'http://resource.com/', добавляя к ним 'rss.xml' (типа традиционный URL для лент новостных сайтов)
         * 
         */
        addRssFeed: (url) =>
            dispatch => {
                if (!url) {
                    return dispatch({ type: SubActionTypes.SUBSCRIPTIONS_LOADING_FAILURE, payload: 'Поле "URL канала" не может быть пустым' })
                }
                dispatch({ type: SubActionTypes.SUBSCRIPTIONS_LOADING })
                fetch(url)
                    .then(response => response.text())
                    .then(txt => {
                        if (!txt.includes('<?xml') && !txt.includes('<rss version=')) {
                            return Promise.reject('Запрашиваемый ресурс "' + url + '" не является RSS-лентой')
                        }
                        let doc = PARSER_INSTANCE.parseFromString(txt, "text/xml");
                        return Promise.resolve({
                            title: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'title').innerHTML,
                            description: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'description').innerHTML,
                            url: url
                        })
                    })
                    .then(result => dispatch({ type: SubActionTypes.ADD_SUBSCRIPTION, payload: result }))
                    .catch(error => dispatch({ type: SubActionTypes.SUBSCRIPTIONS_LOADING_FAILURE, payload: error }))
            },


    }
})()