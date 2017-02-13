import _ from 'lodash'
import { ActionTypes } from '../reducers/subscription-reducer.js'

const PARSER_INSTANCE = new DOMParser();
/**
 * Регулярки для чистки респонса от ненужных тегов
 */
const DIRTY_REGEXPS = [
    /<!\[CDATA\[/i,
    /\]\]>/,
    /<(\/){0,}a.*>/,
    /<(\/){0,}script.*>/,

]
/**
 * Класс-базовое описание единицы содержимого RSS-ленты
 */
export class FeedItem {
    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
        //this.img = 'https://i.stack.imgur.com/mAtCl.png'
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
         * @returns {Promise}
         */
        parseSubscription: function (url = '/www/xml/example.xml') {
            return fetch(url)
                .then(resp => resp.text())
                .then(txt => {
                    try {
                        let doc = PARSER_INSTANCE.parseFromString(txt, "text/xml");
                        let items = Array.from(doc.querySelectorAll('item'));
                        let result = items.map(item => {
                            let title = this.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'title').innerHTML);
                            let link = this.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'link').innerHTML);
                            let description = this.cleanupContent(_.find(item.childNodes, child => child.nodeName === 'description').innerHTML);
                            if (title && link && description) {
                                return new FeedItem(title, description, link);
                            }
                            return null;
                        }).filter(item => !!item)
                        return Promise.resolve(result);
                    } catch (err) {
                        return Promise.reject(err);
                    }
                });
        },

        /**
         * Простейшая проверка того, что запрашиваемый ресурс является RSS-лентой
         * 
         * *** TODO: сделать проверку ресурсов, которые задаются в формате
         * *** 'http://resource.com/', добавляя к ним 'rss.xml' (типа традиционный URL для лент новостных сайтов)
         * 
         * @returns {Promise}
         */
        validateRssFeed: function (url) {
            return dispatch => {
                dispatch({ type: ActionTypes.SUBSCRIBERS_LOADING })
                fetch(url)
                    .then(response => response.text())
                    .then(txt => {
                        if (!txt.includes('<?xml') && !txt.includes('<rss version=')) {
                            return Promise.reject('запрашиваемый ресурс "' + url + '" не является RSS-лентой');
                        }
                        let doc = PARSER_INSTANCE.parseFromString(txt, "text/xml");
                        return Promise.resolve({
                            title: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'title').innerHTML,
                            description: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'description').innerHTML
                        })
                    })
                    .then(result => dispatch({ type: ActionTypes.ADD_SUBSCRIPTION, payload: result }))
                    .catch(error => dispatch({ type: ActionTypes.SUBSCRIBERS_LOADING_FAILURE, payload: error }))

            }
        },

        /**
         * Чистит строку от "мусорных" тегов
         * @param   {String} responseElement строка, которую необходимо очистить
         * @returns {String} нормализованную строку
         */
        cleanupContent: function (responseElement) {
            DIRTY_REGEXPS.forEach(regexp => responseElement = responseElement.split(regexp).join(''))
            return responseElement
        }
    }
})()