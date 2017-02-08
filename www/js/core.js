'use strict';

class SubscriptionItem {
    constructor(url) {
        let self = this;
        this.promise = FeedParser.validateRssFeed(url)
            .then(feedInfo => {
                self.url = url;
                self.title = feedInfo.title;
                self.description = feedInfo.description;
                let deferred = new $.Deferred();
                deferred.resolve(this);
                return deferred;
            })
            .fail(err => { throw new Error('Ошибка: указанный ресурс не является RSS-лентой') })
    }

    /**
     * Возвращает представление объекта в формате jQuery
     * @param selector {String|Object} DOM-объект, к которому необходимо присоединить данный элемент
     */
    jq(selector) {
        let item = $('<div class="subscription-item"/>').click(() => window.location.href = this.url);
        item.append(
            $('<div class="sub-item-head"><h1 class="sub-item-title">' + this.title + '</h1></div>'),
            $('<div class="sub-item-body">' + this.description + '</div>')
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
    subscriptions.push(
        new SubscriptionItem('/xml/example.xml'),
        new SubscriptionItem('/xml/example.xml')
    )
} catch (error) {
    console.error(error)
}

subscriptions.forEach(item => item.promise.then(resolved => resolved.jq('.item-container')));