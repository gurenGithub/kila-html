import header from '@c/header/index.js';
import body from '@c/body/index.js';
import footer from '@c/footer/index.js';
const onLayout = function (callback) {

    var $wrap = $('.kila-html_wrap');
    header($wrap, {})
    body($wrap, {});
    footer($wrap, {})
    callback($('.kila-html_body'))
}

export default onLayout;