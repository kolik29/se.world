function fn_url(dispatch) {
    return 'https://se.madfrenzy.com/?dispatch=' + dispatch;
}

function post(dispatch, data = {}) {
    return new Promise((resolve, reject) => {
        $.post(fn_url(dispatch), {
            crossDomain: true,
            dataType: 'jsonp',
            data: data,
            store_access_key: 'csse',
            no_redirect: ''
        })
        .done(data => {
            resolve(JSON.parse(data));
        })
        .fail(data => {
            reject(data);
        });
    });
}