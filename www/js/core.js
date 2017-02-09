/**
 * Application Core
 */
(function ($) {
    'use strict';
    /**
     * Класс, описывающий элемент списка подписок
     */
    class SubscriptionItem {
        constructor(base) {
            if (typeof base === 'string') {
                let url = base;
                let self = this;
                try {
                    this.iconUrl = url.match(/http:\/\/.*\//)[0] + 'favicon.ico';
                } catch (err) {
                    this.iconUrl = './img/rss-icon.png';
                }
                this.titleBgColor = Utils.randomColor();
                this.promise = FeedParser.validateRssFeed(url)
                    .then(feedInfo => {
                        self.url = url;
                        self.title = feedInfo.title;
                        self.description = feedInfo.description;
                        let deferred = new $.Deferred().resolve(this);
                        return deferred;
                    })
                    .fail(err => { throw new Error('Ошибка: указанный ресурс не является RSS-лентой') })
            } else if (typeof base === 'object') {
                this.url = base.url;
                this.title = base.title;
                this.description = base.description;
                this.promise = new $.Deferred().resolve(this);
                this.color = base.color;
                this.iconUrl = base.iconUrl;
            } else {
                throw new Error('SubscriptionItem: неправильный аргумент конструктора');
            }
        }

        /**
         * Возвращает представление объекта в формате jQuery
         * @param selector {String|Object} DOM-объект, к которому необходимо присоединить данный элемент
         */
        jq(selector) {
            let item = $('<div class="card card--big card--subscription-item"/>').click(() => window.location.href = this.url);
            item.append(
                $('<div class="card__image" style="background:' + this.titleBgColor + '"/>'),
                $('<h2 class="card__title card__title-icon">' + this.title + '</h2>')
                    .css({
                        'background-position-y': '50% !important',
                        'background-size': '24px',
                        'background': 'url(' + this.iconUrl + ') no-repeat'
                    }),
                $('<p class="card__text">' + this.description + '</p>')
            );
            if (selector) {
                $(selector).append(item);
            }
            return item;
        }

        /**
         * Возвращает предстваление объекта в формате JSON
         */
        json() {
            return JSON.stringify(this, null, 2);
        }
    }

    const subscriptions = [];
    try {
        /*    subscriptions.push(
                new SubscriptionItem('/xml/example.xml'),
                new SubscriptionItem('/xml/example2.xml')
            )*/
    } catch (error) {
        console.error(error)
    }

    subscriptions.forEach(item => item.promise.then(resolved => resolved.jq('.item-container')));
    if (!subscriptions.length) {
        $('#no-subs-msg').show()
    }
})(jQuery)