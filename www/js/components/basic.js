class Page {
    constructor(options) {
        this.id = options.id || '';
        this.base = $('<div data-role="page" id="'+ this.id +'"/>');
        this.base.append(options.content);
    }

    render() {
        $('body').append(this.base);
    }
}