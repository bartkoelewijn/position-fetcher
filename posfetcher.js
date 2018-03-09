let posArray = [];
let dataElement;
let index;

$(function() {
    dataElement = $('<ol class="data-pos-array" style="position: fixed; bottom: 10px; left: 10px; max-height: 500px; overflow-y: auto; padding-right: 16px;"></ol>');
    dataElement.appendTo('body');
    index = 1;

    $('.js-pos-fetcher').each(function(index, item) {
        item = $(item);
        if (!item.data('PosFetcher')) {
            item.data('PosFetcher', new PosFetcher(item));
        }
    });
});

class PosFetcher {
    constructor(element) {
        this.element = element;
        this.element.css('position', 'relative');
        this.element.on('click', this.fetch.bind(this));
    }

    fetch(e) {
        let mousePosX = (e.pageX - this.element.offset().left) / this.element.width() * 100;
        let mousePosY = (e.pageY - this.element.offset().top ) / this.element.height() * 100;

        let newPos = {
            left: mousePosX,
            top: mousePosY
        };

        posArray.push(newPos);

        let box = $(`<div>${index}</div>`);
        box.css({
            'width': '16px',
            'height': '16px',
            'color': '#fff',
            'text-align': 'center',
            'font-weight': 'bold',
            'font-size': '13px',
            'background-color': 'red',
            'position': 'absolute',
            'top': `${mousePosY}%`,
            'left': `${mousePosX}%`,
            'transform': 'translate(-50%, -50%)',
            'pointer-events': 'none'
        });

        this.element.append(box);

        index ++;

        let mappedPosArray = posArray.map((item, index)=> {
            return `<li>left: ${item.left}%;<br>top: ${item.top}%;</li>`;
        });

        dataElement.html(mappedPosArray);

    }
}