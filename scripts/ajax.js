function fn_url(dispatch) {
    return 'https://se.madfrenzy.com/?dispatch=' + dispatch + '&store_access_key=csse&no_redirect';
}

function post(dispatch, data = {}) {
    console.log(data);

    return new Promise((resolve, reject) => {
        $.post(fn_url(dispatch), data)
        .done(data => {
            try {
                resolve(JSON.parse(data));
            }
            catch {
                resolve(data);
            }
        })
        .fail(data => {
            reject(data);
        });
    });
}