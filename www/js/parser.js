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
                dataType: 'xml',
                url: '/xml/example.xml',
            })).then(response => {
                response = $.parseXML(response);
                let result = [];
                items = response.map((index, item) => {
                    let $item = $(item);
                    return new FeedItem(
                        $item.find('title').html(),
                        $item.find('description').html(),
                        $item.find('link').html()
                    )
                });
                let deferred = new $.Deferred();
                deferred.resolve(result); // данная версия jQuery вынуждает делать так вместо "return Promise.resolve(result)"
                return deferred;
            });
        }
    }
})(jQuery)