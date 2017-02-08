'use strict';
$.support.cors = true;

/**
 * Класс-базовое описание единицы содержимого RSS-ленты
 */
class FeedItem {
    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
    }

    toDomElement() {
        return $(
            '<div/>',
            {
                'class': 'feed-item'
            }
        )
    }
}

/**
 * Парсер RSS-лент
 */
const FeedParser = (function ($) {
    let items;
    let query = url => $.ajax({ type: "GET", dataType: 'text', url: url })

    return {
        /**
         * Получает содержимое RSS-ленты
         * 
         * @returns {jQuery.Deferred}
         */
        parseSubscription: function () {
            return query('/xml/example.xml').then(response => {
                // ссылки парсим отдельно, т.к. $('link') внезапно выдаёт теги с пустым innerHTML
                let links = response.match(/(<link>)(.*)(<\/link>)/ig).map(link => link.match(/(http:\/\/.*)</ig)[0].replace('<', ''));
                let result = $(response).find('item').slice(1).map((index, item) => {
                    let $item = $(item);
                    return new FeedItem(
                        $item.find('title').html(),
                        $item.find('description').html(),
                        links[index]
                    )
                }).toArray();
                let deferred = new $.Deferred();
                deferred.resolve(result); // данная версия jQuery вынуждает делать так вместо "return Promise.resolve(result)"
                return deferred;
            });
        },

        /**
         * Простейшая проверка того, что запрашиваемый ресурс является RSS-лентой
         * 
         * *** TODO: сделать проверку ресурсов, которые задаются в формате
         * *** 'http://resource.com/', добавляя к ним 'rss.xml' (типа традиционный URL для лент новостных сайтов)
         * 
         * @returns {jQuery.Deferred}
         */
        validateRssFeed: function (url) {
            return query(url).then(response => {
                let deferred = new $.Deferred();
                if (!response.includes('<?xml') && !response.includes('<rss version=')) {
                    deferred.reject();
                    return deferred;
                }
                let channel = $(response).find('channel');
                deferred.resolve({
                    title: channel.find('title:first').html(),
                    description: channel.find('description:first').html()
                });
                return deferred;
            });
        }
    }
})(jQuery)