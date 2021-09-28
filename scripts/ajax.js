function fn_url(dispatch) {
    return 'https://se.madfrenzy.com/?dispatch=' + dispatch + '&store_access_key=csse&no_redirect';
}

function post(dispatch, data = {}) {
    return new Promise((resolve, reject) => {
        $.post(fn_url(dispatch), {
            data: data,
        })
        .done(data => {
            resolve(JSON.parse(data));
        })
        .fail(data => {
            reject(data);
        });
    });
}