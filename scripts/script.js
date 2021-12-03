var url = new URL(location.href),
    basket = {};

if (localStorage.getItem('basket') == null)
    basket = {
        products: [],
        full_price: 0,
        count: 0
    }
else
    basket = JSON.parse(localStorage.getItem('basket'));

function productPage() {
    $('body > .wrapper').addClass('preloader-overflow').css({
        'height': $('body').height(),
        'max-height': $('body').height(),
    }).on('scroll', function(e) {
        e.preventDefault();
    });
}

if (url.pathname == '/checkout') {
    basket = JSON.parse(localStorage.getItem('basket'));

    $(() => {
        basket.products.forEach(product => {
            $('#products').append($('<div>', {
                class: 'checkout-item',
                'data-product-id': product.id
            }).css({
                'grid-column-start': randomInt(1, 3),
                'grid-row-start': randomInt(1, 3),
                'grid-column-end': 'span 3',
                'grid-row-end': 'span 3',
            }).append($('<img>', {
                'data-src': product.details_main_pair
            })));
        });

        lazyloadImg();
    })
}

function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
}

function sliderSwipe() {
    $('body').on('click', 'a.related-item .bubble', function(e) {
        e.preventDefault();
    })

    let touchCoords = [];

    $('.slider').on('touchmove', function(e) {
        touchCoords.push([
            e.originalEvent.targetTouches[0].clientX,
            e.originalEvent.targetTouches[0].clientY
        ])
    })
    
    $('.slider').on('touchend', function() {
        let touchCoordsHalfLength = Math.trunc(touchCoords.length / 2), firstCoord = [0, 0], lastCoord = [0, 0];

        for (let i = 0; i < touchCoordsHalfLength; i++) {
            firstCoord[0] += touchCoords[i][0];
            firstCoord[1] += touchCoords[i][1];
        }

        for (let i = touchCoordsHalfLength; i < touchCoordsHalfLength * 2; i++) {
            lastCoord[0] += touchCoords[i][0];
            lastCoord[1] += touchCoords[i][1];
        }

        firstCoord = [firstCoord[0] / touchCoordsHalfLength, firstCoord[1] / touchCoordsHalfLength];
        lastCoord = [lastCoord[0] / touchCoordsHalfLength, lastCoord[1] / touchCoordsHalfLength];

        if (Math.abs(firstCoord[0] - lastCoord[0]) > Math.abs(firstCoord[1] - lastCoord[1])) {
            if (firstCoord[0] > lastCoord[0])
                $('#next-img').trigger('click');
            
            if (firstCoord[0] < lastCoord[0])
                $('#prev-img').trigger('click');
        }
        
        touchCoords = [];
    })
}

$(() => {
    var swiper = new Swiper('.js-swiper-related', {
        direction: 'vertical',
        slidesPerView: 'auto',
        autoHeight: true,
        loop: true,
        mousewheel: true,
        freeMode: true,
        centeredSlides: true,
        slideToClickedSlide: true,
        on: {
            afterInit: function() {
                swiperInited = true;
                this.slideToLoop($('.swiper-related .swiper-slide .related-item.item-selected').closest('.swiper-slide').data('swiper-slide-index'));
            }
        }
    })

    $('body').on('click', '.grid-item.archive', function() {
        $(this).toggleClass('active').nextAll('.grid-item').toggleClass('display_none');
    })

    $('body').on('click', 'a.related-item', function(e) {
        e.preventDefault();

        if (!$(e.target).hasClass('item-selected') && $(e.target).closest('.item-selected').length == 0) {
            $(this).find('img').removeAttr('data-src');

            let prevRelatedItem = $('a.related-item.item-selected')

            prevRelatedItem.removeClass('item-selected');
            prevRelatedItem.find('.show-more').remove();
            prevRelatedItem.find('.slide-text').remove();

            $(this).addClass('item-selected');

            window.history.pushState('Product', 'Product', $(this).attr('href'));
            url = new URL(location.href);

            $.get($(this).attr('href'), data => {
                $(data).each(function() {
                    if ($(this).hasClass('js-swiper-related'))
                        $('.js-swiper-related .related-item.item-selected .bubble').html($(this).find('.related-item.item-selected .bubble').html());
                })

                $('.fixed-wrapp').html($(data).find('.fixed-wrapp').html());

                $('#slide-number').text('1/' + $('.slider .slider-item').length)

                lazyloadImg();
            })
        }
    })

    $('body').on('click', '.item-selected .bubble', function() {
        if ($(this).hasClass('visible'))
            $(this).removeClass('visible').find('.show-more').html('Show text <br> ↓')
        else
            $(this).addClass('visible').find('.show-more').html('Hide text <br> ↑')
    })

    $('body').on('mousemove', function(e) {
        if ($(e.target).hasClass('js-swiper-related') || $(e.target).closest('.js-swiper-related'))
            $('#slider-number').css({
                'display': 'none'
            })
        else
            $('#slider-number').css({
                'display': ''
            })
    })

    $('input[name="phone"]').on('keydown', function(e) {
        if ("1234567890".indexOf(e.key) == -1 && (e.key != 'Backspace' && e.key != 'Delete' && e.key != 'ArrowRight' && e.key != 'ArrowLeft'))
            e.preventDefault();
    })
    
    $('input[name="phone"]').on('change', function() {
        $(this).val($(this).val().replace(/\D/, ''));
    })

    if ($('body.product-page').length)
        productPage();

    sliderSwipe();

    showBasket();

    $('.rotating-icon').on('click', function() {
        setTimeout(() => {
            if ($('.bag').hasClass('open'))
                $('#about span').text('close');
            else
                $('#about span').text('info');
        }, 50);
    })

    $('body').on('click', '.checkout-button.add', function() {
        let order_item, product_size;

        if ($(this).hasClass('plus') || $(this).hasClass('minus')) {
            order_item = $(this).closest('.order-item');
            product_size = {
                [order_item.find('.product-size').text()]: order_item.data('variation-id')
            }
        }

        if ($(this).hasClass('add')) {
            order_item = $('#size');
            product_size = {
                [order_item.find('.short-size').text()]: order_item.data('variation-id')
            }
        }

        addToBasket(
            basket,
            order_item.data('product-id'),
            order_item.data('product-name'),
            order_item.data('product-type'),
            product_size,
            order_item.data('product-price'),
            [],
            order_item.data('max-count'),
            '',
            $(this).hasClass('minus')
        );
        basketUpdateTotal();
        showBasket();
        updateBag();
    });

    $('form.bag-items').submit(function(e) {
        e.preventDefault();

        var formSubmit = true, customer = {};

        $(this).find('input').each(function() {
            if ($(this).val() == '') {
                $(this).css({
                    'background-color': 'red'
                });

                if (formSubmit == undefined)
                    formSubmit = false;

                formSubmit = formSubmit && false;
            } else {
                $(this).css({
                    'background-color': ''
                });

                if (formSubmit == undefined)
                    formSubmit = true;

                formSubmit = formSubmit && true;

                customer[$(this).attr('name')] = $(this).val();
            }
        });

        if (formSubmit) {
            basket = JSON.parse(localStorage.getItem('basket'));

            let delivery_price = 0;

            basket.full_price = Number(basket.full_price.match(/\d+/));

            if ($('.input-wrapper input[name="country"]').data('country-code') != 'RU')
                delivery_price = (parseInt(basket.full_price) < 200) ? 20 : 0;

            customer.country = $('.input-wrapper input[name="country"]').data('country-code');

            data = Object.assign(basket, { customer: customer, custom_shipping: {
                "delivery_name": "UPS Express®",
                "delivery_time": $('#delivery-time').text() == '' ? 0 : parseInt($('#delivery-time').text().match(/\d+/)),
                "delivery_price": delivery_price,
                "payment_id": 21
            }});

            post('seworld.create_order', data).then(
                result => {
                    location.href = result.payment_url;
                },
                error => {
                    console.log(error);
                }
            )
        }
    });

    $('.input-wrapper input').on('keydown', function() {
        $(this).css({
            'background-color': ''
        });
    });

    $('body').on('click', '#size-list li', function() {
        $('#size').html($(this).html());
    });

    updateBag();

    lazyloadImg();
});

function updateBag() {
    if ($('#delivery-cost').length) {
        var priceAll = 0;

        $('.bag-product').each(function() {
            priceAll += parseInt($(this).find('.product-price').text()) * parseInt($(this).find('.product-quantity').text())
        })

        if ($('.input-wrapper input[name="country"]').data('country-code') == '') {
            if (priceAll < 200) {
                $('#delivery-cost').text('$' + (200 - priceAll) + ' left for free shipping');
                $('#delivery').css({
                    'background-color': '#77B2D6',
                    'opacity': '0.5'
                })
                priceAll += 20;
            } else {
                $('#delivery-cost').text('Free Express UPS delivery');
                $('#delivery').css({
                    'background-color': '#FFDC00',
                    'opacity': '1'
                })
            }
        } else if ($('.input-wrapper input[name="country"]').data('country-code') == 'RU') {
            $('#delivery-cost').text('Free Express UPS delivery');
            $('#delivery').css({
                'background-color': '#FFDC00',
                'opacity': '1'
            })
        }

        $('#total').text('$' + priceAll)
    }
}

function basketUpdateTotal() {
    var basket = JSON.parse(localStorage.getItem('basket')), count = 0, full_price = 0;

    if (basket) {
        basket.products.forEach(item => {
            count += item.basket_count;
            full_price += (typeof item.price == 'string' ? Number(item.price.replace(/\D+/g, '')) : item.price) * item.basket_count;
        })

        basket.count = count;
        basket.full_price = priceFormat(full_price);

        localStorage.setItem('basket', JSON.stringify(basket));
    }
}

function priceFormat(price) {
    var currency = '';

    if (true)
        currency = '$';

    if (price > 10000)
        return currency + price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');

    return currency + price.toString();
}

function showBasket() {
    var basket = JSON.parse(localStorage.getItem('basket'));

    if (basket) {
        if (basket.count > 0) {
            $('#empty-bag').css({
                display: 'none'
            });

            $('.bag-items').addClass('flex-open');
            $('.order-item').remove();
            $('#counter').text(basket.count);

            $('#total').text('$' + Number(basket.full_price.replace(/[^\d]/g, '')));

            basket.products.forEach(product => {
                var size = Object.keys(product.variation)[0];

                $('#order-list').prepend(
                    $('<div>', {
                        class: 'order-item',
                        'data-product-id': product.variation[size],
                        'data-variation-id': product.variation[size],
                        'data-product-price': product.price,
                        'data-product-name': product.name,
                        'data-max-count': product.count,
                        'data-product-type': product.type
                        }).append($('<div>', {
                            class: 'minus',
                            text: '–'
                        })).append($('<div>', {
                            class: 'bag-product'
                            }).append($('<div>', {
                                class: 'product-type',
                                text: product.type
                            })).append($('<div>', {
                                class: 'product-name',
                                text: product.name
                            })).append($('<div>', {
                                class: 'product-size',
                                text: size
                            })).append($('<div>', {
                                class: 'product-quantity',
                                text: product.basket_count
                            })).append($('<div>', {
                                class: 'product-price',
                                text: product.price
                        }))).append($('<div>', {
                            class: 'plus',
                            text: '+'
                    }))
                );
            });
        } else {
            $('.bag-items.flex-open').removeClass('flex-open');
            $('#empty-bag').css({
                display: ''
            });
            $('#counter').text(0);
            localStorage.removeItem('basket');
        }
    }
}

function addToBasket(basket, product_id, product_name, product_type, size, price, image, max_count, details_main_pair = '', remove = false) {
    var addProduct = true;

    if (basket.products.length > 0) {
        basket.products.forEach((product, id) => {
            if (product.id == product_id)
                if (JSON.stringify(product.variation) == JSON.stringify(size)) {
                    if (remove) {
                        basket.products[id].basket_count = Number(basket.products[id].basket_count) - 1;

                        if (basket.products[id].basket_count <= 0)
                            $('.checkout-wrapper #products .checkout-item[data-product-id=' + basket.products[id].id + ']').eq(0).remove()
                    } else if (basket.products[id].basket_count < max_count)
                        basket.products[id].basket_count = Number(basket.products[id].basket_count) + 1;

                    addProduct = false;
                }

            if (basket.products[id].basket_count <= 0)
                basket.products.splice(id, 1)
        });
    }
    
    if (addProduct && !remove && max_count > 0)
        basket['products'].push({
            id: product_id,
            name: product_name,
            basket_count: 1,
            type: product_type,
            variation: size,
            price: price,
            main_pair: image,
            count: max_count,
            details_main_pair: details_main_pair
        });

    localStorage.setItem('basket', JSON.stringify(basket));
    basketUpdateTotal();
    showBasket();
}

function lazyloadImg(i = 0, callback = '') {
    // let images = $('img[data-src]');

    // try {
    //     images.eq(i)
    //     .attr('width', Math.trunc(images.eq(i).width()))
    //     .attr('height', Math.trunc(images.eq(i).height()))
    //     .attr('src', images.eq(i).data('src'))
    //     .on('load', function() {
    //         $(this)
    //         .off('load')
    //         .css({
    //             opacity: 1
    //         })
    //         .addClass('loaded');

    //         i++;

    //         if (i < images.length)
    //             lazyloadImg(i, callback);
    //         else {
    //             if (callback != '')
    //                 try {
    //                     callback();
    //                 } catch {}
    //         }
    //     });
    // } catch {}

    $('img[data-src]').each(function() {
        $(this).attr('src', $(this).data('src')).on('load', function() {
            $(this)
                .off('load')
                .css({
                    opacity: 1
                })
                .addClass('loaded');
        })
    })
}

function textSplit(text) {
    text = text.split('/');

    text.forEach((item, i) => {
        text[i] = '<div>' + item.trim() + '</div>';
    })

    return text.join('');
}

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M;
})();