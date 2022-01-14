var url = new URL(location.href);

try {
    $(() => {
        var swiper_related;
        
        if ($('.js-swiper-related').length) {
            swiper_related = new Swiper('.js-swiper-related', {
                direction: 'vertical',
                slidesPerView: 'auto',
                loop: false,
                mousewheel: {
                    eventsTarget: 'body'
                },
                freeMode: true,
                centeredSlides: true,
                centeredSlidesBounds: true,
                slideToClickedSlide: true,
                activeIndex: 0,
                on: {
                    afterInit: function() {
                        swiperInited = true;

                        setTimeout(() => {
                            this.slideTo($('.js-swiper-related .related-item.item-selected').parent('.swiper-slide').index(), 0);
                        }, 30);
                    },
                    slideChange: function() {
                        $('.js-swiper-related .related-item[data-product-id="' + $('.js-swiper-related .related-item.item-selected').eq(0).data('product-id') + '"]').addClass('item-selected');
                    }
                }
            });

            $('body').on('mouseenter', '.shipping-info', () => swiper_related.disable());

            $('body').on('mouseleave', '.shipping-info', () => swiper_related.enable());
        }

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
                        if ($(this).hasClass('sticky-scroll'))
                            $('.js-swiper-related .related-item.item-selected .bubble').html($(this).find('.related-item.item-selected .bubble').html());

                    })

                    $('.fixed-wrapp .slider').html($(data).find('.fixed-wrapp .slider').html());
                    $('.fixed-wrapp #purchase').html($(data).find('.fixed-wrapp #purchase').html());
                    $('.fixed-wrapp #indicator').html($(data).find('.fixed-wrapp #indicator').html());
                    $('.fixed-wrapp .bubble.bubble-mobile').html($(data).find('.fixed-wrapp .bubble.bubble-mobile').html());

                    $('#slide-number').text('1/' + $('.slider .slider-item').length)

                    lazyloadImg();

                    swiper_related.update();

                    Change_slide();
                })
            }
        })

        $('body').on('click', '.item-selected .bubble', function() {
            if ($(this).hasClass('visible'))
                $(this).removeClass('visible').find('.show-more').html('Show text <br> ↓')
            else {
                $(this).addClass('visible').find('.show-more').html('Hide text <br> ↑')

                $('.related-item.item-selected .slide-text').css({
                    'width': '',
                    'white-space': ''
                })

                console.log([$('.related-item.item-selected .slide-text').width(), $('.related-item.item-selected .bubble').width()])

                if ($('.related-item.item-selected .slide-text').width() > $('.related-item.item-selected .bubble').width())
                    $('.related-item.item-selected .slide-text').css({
                        'width': $('.related-item.item-selected .slide-text').width(),
                        'white-space': 'initial'
                    })
            }
        })

        $('body').on('mousemove', function(e) {
            if ($('#slide-number').length) {
                if (
                    ($(e.target).hasClass('js-swiper-related') || $(e.target).closest('.js-swiper-related').length) ||
                    ($(e.target).hasClass('action-line') || $(e.target).closest('.action-line').length) ||
                    ($(e.target).hasClass('menu') || $(e.target).closest('.menu').length) ||
                    ($(e.target).hasClass('bag') || $(e.target).closest('.bag').length)
                )
                    $('#slide-number').css({
                        'display': 'none'
                    })
                else
                    $('#slide-number').css({
                        'display': ''
                    })
            }
        })

        $('input[name="phone"]').on('keydown', function(e) {
            if ("1234567890".indexOf(e.key) == -1 && (e.key != 'Backspace' && e.key != 'Delete' && e.key != 'ArrowRight' && e.key != 'ArrowLeft'))
                e.preventDefault();
        })
        
        $('input[name="phone"]').on('change', function() {
            $(this).val($(this).val().replace(/\D/, ''));
        })

        if ($('body.product-page').length) {
            productPage();
            sliderSwipe();
        }

        $('.rotating-icon').on('click', function() {
            setTimeout(() => {
                if ($('.bag').hasClass('open'))
                    $('#about span').text('close');
                else
                    $('#about span').text('info');
            }, 50);
        })

        $('form.bag-items').submit(function(e) {
            e.preventDefault();

            if (!$('#pay').data('form-send')) {
                console.log('test');
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
                    let delivery_price = 0;

                    if ($('#delivery').data('country-code') != 'RU')
                        delivery_price = (parseInt(order.total()) < 200) ? 20 : 0;

                    customer.country = $('#delivery').data('country-code');

                    data = Object.assign(
                        {
                            products: order.get()
                        }, {
                            customer: customer, custom_shipping: {
                                "delivery_name": "UPS Express®",
                                "delivery_time": $('#delivery-time').text() == '' ? 0 : parseInt($('#delivery-time').text().match(/\d+/)),
                                "delivery_price": delivery_price,
                                "payment_id": 21
                            }
                        }
                    );

                    $('#pay').data('form-send', true).text('WAIT');

                    post('seworld.create_order', data).then(
                        result => {
                            $('#pay').data('form-send', false).text('BUY');
                            if (result.payment_url)
                                location.href = result.payment_url;
                        },
                        error => {
                            console.log(error);
                        }
                    )
                }
            }
        });

        $('.input-wrapper input').on('keydown', function() {
            $(this).css({
                'background-color': ''
            });
        });

        $('body').on('click', '#size-list li', function() {
            $('#size').html($(this).html());
            $(this).closest('#size-wrapper').find('#size').data('product-id', $(this).data('product-id'))
                        
            $('#size-wrapper').removeClass('button-gray');

            setTimeout(() => {
                $('#size-list').removeClass('open');
            }, 1);
        });

        let order = new Order();

        updateOrder(order);

        $('body').on('click', '.js-order-add', function() {
            if ($(this).text() != 'ADDED!') {
                order.add($('#size').data('product-id').toString(), $('#size .short-size').text());
                updateOrder(order);
            }

            $(this).text('ADDED!')

            setTimeout(() => {
                $(this).text('ADD')
            }, 1000)
        });

        $('body').on('click', '.order-item .plus', function() {
            order.add($(this).closest('.order-item').data('product-id').toString());
            updateOrder(order);
        });

        $('body').on('click', '.order-item .minus', function() {
            order.remove($(this).closest('.order-item').data('product-id').toString());
            updateOrder(order);
        });

        if ($('.checkout-wrapper #products').length) {
            order.get().forEach((order_product) => {
                let product = order.product(order_product.id);

                try {
                    $('#products').append($('<div>', {
                        'class': 'checkout-item',
                        'data-product-id': product.id
                    }).css({
                        'grid-row-start': randomInt(1, 3),
                        'grid-row-end': 'span 3',
                        'grid-column-start': randomInt(1, 3),
                        'grid-column-end': 'span 3'
                    }).append($('<img>', {
                        'data-src': product.details_main_pair,
                    })));
                }

                catch {
                    order.clear();
                    order = new Order();
                }
            })
        }

        lazyloadImg();
    });
}

catch (err) {
    $.post(
        '/console_log_save',
        {
            error: err
        },
        data => console.log(data)
    )
}

class Order {
    constructor() {
        this.products = products_in_stock;
        
        let order = this.get(), products_list = [];

        for (let product_index in this.products) {
            products_list.push({
                id: this.products[product_index].id,
                basket_count: this.products[product_index].basket_count
            })

            if ('variations' in this.products[product_index])
                for (let size in this.products[product_index].variations)
                    products_list.push({
                        id: this.products[product_index].variations[size].product_id,
                        basket_count: this.products[product_index].variations[size].basket_count
                    })
        }

        products_list.forEach(product_item => {
            let product_order = order.filter(product => product.id == product_item.id);

            if (product_order.length) {
                if (Number(product_item.basket_count) == 0)
                    this.remove(product_item.id, true);
                else {
                    if (Number(product_item.basket_count) < product_order[0].basket_count) {
                        let basket_count_difference = product_order[0].basket_count - Number(product_item.basket_count);

                        for (let i = 0; i < basket_count_difference; i++)
                            this.remove(product_item.id);
                    }
                }
            } else
                this.remove(product_item.id, true);
        })
    }

    get() {
        let order = JSON.parse(localStorage.getItem('order'));

        if (order == null)
            return [];
        else
            return order;
    }

    add(product_id, size = '') {
        let order = this.get(),
            products_list = [],
            product_order = order.filter(product => product.id == product_id);

        if (product_order.length) {
            for (let product_index in this.products) {
                products_list.push({
                    id: this.products[product_index].id,
                    basket_count: this.products[product_index].count
                })
        
                if ('variations' in this.products[product_index])
                    for (let size in this.products[product_index].variations) {
                        products_list.push({
                            id: this.products[product_index].variations[size].product_id,
                            basket_count: this.products[product_index].variations[size].count
                        })

                        console.log(this.products[product_index].variations)
                    }
            }
        
            products_list.forEach(product_item => {
                console.log(Number(product_item.basket_count), Number(product_order[0].basket_count))
                if (
                    Number(product_item.id) == Number(product_id) &&
                    Number(product_item.basket_count) > Number(product_order[0].basket_count)
                ) {
                    order.forEach((product, index) => {
                        if (product.id == product_id)
                            order[index].basket_count = Number(order[index].basket_count) + 1;
                    });
                }
            })
        } else
            order.push({
                id: product_id,
                basket_count: 1,
                size: size
            })

        this.save(order);
    }

    remove(product_id, all = false) {
        let order = this.get();

        if (order.filter(product => product.id == product_id).length)
            order.forEach((product, index) => {
                if (product.id == product_id) {
                    if (all)
                        order.splice(index, 1);
                    else {
                        order[index].basket_count--;

                        if (order[index].basket_count == 0)
                            order.splice(index, 1);
                    }
                }
            })

        this.save(order);
    }

    save(order) {
        localStorage.setItem('order', JSON.stringify(order));
    }

    count() {
        let order = this.get(), basket_count = 0;

        order.forEach(product => basket_count += Number(product.basket_count));

        return basket_count;
    }

    total() {
        let order = this.get(), price = 0;

        order.forEach(product_order => {
            for (let product_index in this.products) {
                if (Number(product_order.id) == Number(this.products[product_index].id))
                    price += Number(this.products[product_index].price.replace('$', '')) * product_order.basket_count;
    
                if ('variations' in this.products[product_index])
                    for (let size in this.products[product_index].variations)
                        if (Number(product_order.id) == Number(this.products[product_index].variations[size].product_id))
                            price += Number(this.products[product_index].price.replace('$', '')) * product_order.basket_count;
            }
        })

        return price;
    }

    product(product_id) {
        let product;

        for (let product_index in this.products) {
            if (Number(product_id) == Number(this.products[product_index].id))
                product = this.products[product_index];

            if ('variations' in this.products[product_index])
                for (let size in this.products[product_index].variations)
                    if (Number(product_id) == Number(this.products[product_index].variations[size].product_id)) {
                        product = this.products[product_index];
                        product.basket_count = this.products[product_index].variations[size].basket_count;
                    }
        }

        return product;
    }

    clear() {
        localStorage.removeItem('order');
    }
}

function updateOrder(order) {
    if (isNaN(order.count())) {
        order.clear();
        order = new Order();
    } else
        $('#cart #counter').text(order.count());

    $('#order-list .order-item').remove();

    let order_products = order.get()

    if (order_products.length) {
        order_products.forEach(product => {
            let product_list_item = order.product(product.id);

            console.log(product)

            try {
                $('#order-list')
                .append($('<div>', {
                    'class': 'order-item',
                    'data-product-id': product.id
                })
                    .append($('<div>', {
                        'class': 'minus'
                    })
                    .append($('<div>', {
                        'text': '–'
                    }))
                    )
                    .append($('<div>', {
                        'class': 'bag-product'
                    })
                        // .append(`${product_list_item.type} <span class="product-name">${product_list_item.name}</span> ${product_list_item.size == 'one size' ? '' : 'size '}<span class="product-size">${product_list_item.size}</span> x <span class="product-quantity">${product.count}</span> <span class="product-price">${product_list_item.price}</span>`)
                        .append($('<span>', {
                            'class': 'product-type',
                            'text': product_list_item.type
                        }))
                        .append($('<span>', {
                            'class': 'product-name',
                            'text': product_list_item.name
                        }))
                        .append($('<span>', {
                            'class': 'product-size' + (product_list_item.size == 'one size' ? ' one-size' : ''),
                            'text': product.size
                        }))
                        .append($('<span>', {
                            'class': 'product-quantity',
                            'text': product.basket_count
                        }))
                        .append($('<span>', {
                            'class': 'product-price',
                            'text': product_list_item.price
                        }))
                    )
                    .append($('<div>', {
                        'class': 'plus',
                        'text': '+'
                    }))
                )
            }

            catch {
                order.clear();
                order = new Order();
            }
        });

        $('#empty-bag').addClass('display_none');
        $('.bag-items').addClass('flex-open');
        $('#total').text(priceFormat(order.total()));
    } else {
        $('#empty-bag').removeClass('display_none');
        $('.bag-items').removeClass('flex-open');
    }
}

function lazyloadImg() {
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

function productPage() {
    $('body > .wrapper').addClass('preloader-overflow').css({
        'height': $('body').height(),
        'max-height': $('body').height(),
    }).on('scroll', function(e) {
        e.preventDefault();
    });
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

function randomInt(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand)
}

function textSplit(text) {
    text = text.split('/');

    text.forEach((item, i) => {
        text[i] = '<div>' + item.trim() + '</div>';
    })

    return text.join('');
}

function priceFormat(price) {
    var currency = '';

    if (true)
        currency = '$';

    if (price > 10000)
        return currency + price.toString().replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + ' ');

    return currency + price.toString();
}

function updateBag() {
    let order = new Order();

    if ($('#delivery-cost').length) {
        var priceAll = order.total();

        if ($('#delivery').data('country-code') == '') {
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
        } else if ($('#delivery').data('country-code') == 'RU') {
            $('#delivery-cost').text('Free Express UPS delivery');
            $('#delivery').css({
                'background-color': '#FFDC00',
                'opacity': '1'
            })
        }

        $('#total').text('$' + priceAll)
    }
}