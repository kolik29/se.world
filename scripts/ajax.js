function url(dispatch) {
    return 'https://madfrenzy.com/?dispatch=' + dispatch;
}

function post(dispatch) {
    return new Promise((resolve, reject) => {
        $.post(url(dispatch), {})
        .done(data => {
            resolve(JSON.parse(data));
        })
        .fail(data => {
            reject(data);
        })
    })
}