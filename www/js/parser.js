let subscriptions = ['/xml/example.xml'];
$.support.cors = true;

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

const Parser = (function ($) {
    let items;
    let sub = subscriptions[0];
    //let cutTag = (index, tag) => $(tag).html();

    return {
        /**
         * @returns {jQuery.Deferred}
         */
        parseSubscription: function () {
            return $.when($.ajax({
                type: "GET",
                dataType: 'text',
                url: '/xml/example.xml',
            })).then(response => {
                // ссылки парсим отдельно, т.к. $('link') внезапно выдаёт теги с пустым innerHTML
                let links = response.match(/(<link>)(.*)(<\/link>)/ig).map(link => link.match(/(http:\/\/.*)</ig)[0].replace('<',''));
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
        }
    }
})(jQuery)