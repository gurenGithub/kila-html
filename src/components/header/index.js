const html = require('./index.html');
const fn = function ($wrap, data) {

    data = data || {};
    $wrap.append(_.template(html)(data));
}

export default fn;