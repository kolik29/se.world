function fn_url(dispatch) {
    let domain = window.location.hostname.split('.');

    if (domain.length == 2)
        domain = domain[0];
    else if (domain.length == 3)
        domain = domain[0] + '-' + domain[1];
    else
        throw "Error of forming a link to which the request for creating an order will be sent.";

    return 'https://' + domain + '.madfrenzy.com/?dispatch=' + dispatch + '&store_access_key=csse&no_redirect';
}

function post(dispatch, data = {}) {
    console.log(fn_url(dispatch))
    
    data['crossDomain'] = true;
    data['xhrFields'] = {
        withCredentials: true,
    };

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