import { CardActions, Card } from '../components/basic/card.jsx'
import _ from 'lodash'
const parserInstance = new DOMParser();
/**
 * Класс-базовое описание единицы содержимого RSS-ленты
 */
export class FeedItem {
    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
    }
}

/**
 * Парсер RSS-лент
 */
export const FeedParser = (function ($) {
    let items;

    return {
        /**
         * Получает содержимое RSS-ленты
         * 
         * @returns {Promise}
         */
        parseSubscription: function () {
            return fetch('/www/xml/example.xml')
                .then(resp => resp.text())
                .then(txt => {
                    try {
                        let doc = parserInstance.parseFromString(txt, "text/xml");
                        let items = Array.from(doc.querySelectorAll('item'));
                        let result = items.map(item => {
                            let title = _.find(item.childNodes, child => child.nodeName === 'title').innerHTML;
                            let link = _.find(item.childNodes, child => child.nodeName === 'link').innerHTML;
                            let description = _.find(item.childNodes, child => child.nodeName === 'description').innerHTML;
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
            return fetch(url)
                .then(response => response.text())
                .then(txt => {
                    if (!txt.includes('<?xml') && !txt.includes('<rss version=')) {
                        return Promise.reject('запрашиваемый ресурс "' + url + '" не является RSS-лентой');
                    }
                    let doc = parserInstance.parseFromString(txt, "text/xml");
                    return Promise.resolve({
                        title: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'title').innerHTML,
                        description: _.find(Array.from(doc.querySelector('channel').childNodes), node => node.nodeName === 'description').innerHTML
                    });
                });
        }
    }
})(jQuery)