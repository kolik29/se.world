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

if (url.pathname == '/' || url.pathname == '') {
    post('seworld.products_expected').then(
        result => {
            result.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
            
            if (result.length)
                $('#new-element .item-name').text(result[0].name);
            else
                $('#new-element .item-name').css({
                    display: 'none'
                })
        },
        error => {
            console.log(error)
        }
    );
        
    post('seworld.products_in_stock').then(
        result => {
            $('.grid-container .grid-item:not(#new-element)').remove();

            for (key in result) {
                try {
                    $('.grid-container').append($('<a>', {
                        href: '/' + result[key].seo_name,
                        class: 'grid-item'
                    }).append($('<img>', {
                        'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                        // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                        // 'sizes': '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                    })).append($('<div>', {
                        class: 'bubble'
                    }).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>').append($('<div>', {
                        class: 'item-name',
                        text: result[key].name
                    })).append($('<div>', {
                        class: 'price',
                        text: result[key].price
                    }))));
                } catch {}
            }

            post('seworld.products_out_of_stock').then(
                result => {
                    if (Object.keys(result).length)
                        $('.grid-container').append($('<div>', {
                            class: 'grid-item archive lazyload',
                            text: 'Archive 檔案'
                        }).prepend('<span class="js-archive-closer"></span>'));

                    for (key in result) {
                        $('.grid-container').append($('<a>', {
                            href: '/' + result[key].seo_name,
                            class: 'grid-item display_none'
                        }).append($('<img>', {
                            'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                            // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                            // 'sizes': '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>').append($('<div>', {
                            class: 'item-name',
                            text: result[key].name
                        })).append($('<div>', {
                            class: 'price',
                            text: result[key].price
                        }))));
                    }

                    lazyloadImg();

                    const observer = new MutationObserver(function(mutationsList, observer) {
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'attributes') {
                                if (mutation.attributeName == 'style') {
                                    $('.grid-item.archive.lazyload').css({
                                        'opacity': 1
                                    })
                                }
                            }
                        }
                    });

                    // Начинаем наблюдение за настроенными изменениями целевого элемента
                    observer.observe($('.grid-item.archive.lazyload').next('.grid-item').find('img').get(0), {
                        attributes: true,
                        childList: false,
                        subtree: false
                    });
                }
            )
        },
        error => {
            console.log(error)
        }
    );
}

function productPage() {
    $('body > .wrapper').addClass('preloader-overflow').css({
        'height': $('body').height(),
        'max-height': $('body').height(),
    }).on('scroll', function(e) {
        e.preventDefault();
    });

    var currentProductId;

    post('seworld.products_in_stock').then(
        result => {
            $('#related').empty();
            $('.slider').empty();

            if (typeof result == 'object')
                currentProductId = (Object.values(result).find(product => product.seo_name === url.pathname.replace('/', '')))
            else
                currentProductId = (result.find(product => product.seo_name === url.pathname.replace('/', '')));

            if (currentProductId)
                currentProductId = currentProductId.id;

            getProductContent(result, currentProductId);

            lazyloadImg();
            
            $('#related').css({
                opacity: 1
            });
            
            $('.checkout-button.add').on('click', function() {
                var product_size_obj = $(this).closest('#purchase').find('#size');
                var image = $(this).data('main-pair');

                addToBasket(
                    basket,
                    product_size_obj.data('product-id'),
                    product_size_obj.data('product-name'),
                    product_size_obj.data('product-type'),
                    {
                        [product_size_obj.find('.short-size').text()]: product_size_obj.data('variation-id')
                    },
                    product_size_obj.data('price'),
                    image,
                    product_size_obj.data('max-count'),
                    product_size_obj.data('details-main-pair')
                );
                basketUpdateTotal();
                showBasket();
            });

            post('seworld.products_out_of_stock').then(
                result => {
                    if (Object.keys(result).length) {         
                        if (typeof result == 'object')
                            currentProductId = (Object.values(result).find(product => product.seo_name === url.pathname.replace('/', '')))
                        else
                            currentProductId = (result.find(product => product.seo_name === url.pathname.replace('/', '')));
            
                        if (currentProductId)
                            currentProductId = currentProductId.id;
               
                        getProductContent(result, currentProductId);
            
                        lazyloadImg();
                        
                        $('#related').css({
                            opacity: 1
                        });
                    }
                        
                    $('.slider').append($('<button>', {
                        id: 'prev-img'
                    })).append($('<button>', {
                        id: 'next-img'
                    }));
                },
                error => {
                    console.log(error);
                }
            );
        },
        error => {
            console.log(error);
        }
    );
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
    $('input[name="phone"]').on('keydown', function(e) {
        if ("1234567890".indexOf(e.key) == -1 && (e.key != 'Backspace' && e.key != 'Delete' && e.key != 'ArrowRight' && e.key != 'ArrowLeft'))
            e.preventDefault();
    });
    
    $('input[name="phone"]').on('change', function() {
        $(this).val($(this).val().replace(/\D/, ''));
    });

    if ($('body.product-page').length)
        productPage();

    $('body').on('click', '.related-scroll .bubble, .sticky-scroll .bubble.bubble-mobile', function() {
        $(this).toggleClass('visible');
        $('.bubble .slide-text').html('');

        if ($(this).hasClass('visible')) {
            $(this).find('.show-more').html('Hide text <br> ↑');
            $('.bubble .slide-text').html(textSplit($('.slider-item.img-selected').text()));
        } else
            $(this).find('.show-more').html('Show text <br> ↓');
    });
    
    $('body').on('click', '#next-img', () => {
        let currentIndicator = $('#indicator .line.line-selected');
        let currentSlide = $('.slider .slider-item.img-selected');

        if (currentSlide.next('.slider-item').length) {
            currentIndicator.removeClass('line-selected').next().addClass('line-selected');
            currentSlide.removeClass('img-selected').next().addClass('img-selected');
        } else {
            currentIndicator.removeClass('line-selected');
            $('#indicator .line').first().addClass('line-selected');
            currentSlide.removeClass('img-selected');
            $('.slider .slider-item').first().addClass('img-selected');
        }

        // window.location.hash = 'slide-' + ($('.slider .slider-item.img-selected').index() + 1)

        $('#slide-number').text(($('.slider .slider-item.img-selected').index() + 1) + '/' + $('.slider .slider-item').length);
    })

    $('body').on('click', '#prev-img', () => {
        let currentIndicator = $('#indicator .line.line-selected');
        let currentSlide = $('.slider .slider-item.img-selected');
        
        if (currentSlide.prev('.slider-item').length) {
            currentIndicator.prev().addClass('line-selected');
            currentSlide.prev().addClass('img-selected');
        } else {
            $('#indicator .line').last().addClass('line-selected');
            $('.slider .slider-item').last().addClass('img-selected');
        }

        currentIndicator.removeClass('line-selected');
        currentSlide.removeClass('img-selected');

        // window.location.hash = 'slide-' + ($('.slider .slider-item.img-selected').index() + 1)

        $('#slide-number').text(($('.slider .slider-item.img-selected').index() + 1) + '/' + $('.slider .slider-item').length);
    })

    sliderSwipe();

    $('body').on('click', '.grid-item.archive', function() {
        $(this).toggleClass('active').nextAll('.grid-item').toggleClass('display_none');
    })

    showBasket();
    bodyPosition();

    $('.rotating-icon').on('click', function() {
        setTimeout(() => {
            if ($('.bag').hasClass('open'))
                $('#about').text('close');
            else
                $('#about').text('info');
        }, 50);
    })

    $('header .menu img').on('load', () => {
        updateBagTop();
    });

    $('body').resize(() => {
        updateBagTop();
    });

    if ($('.bubble.bubble-mobile').length) {
        let observer = new MutationObserver(() => {
            if ($('.bubble.bubble-mobile').hasClass('visible'))
                $('.slider').css({
                    'max-height': $('.slider').height()
                })
            else
                $('.slider').css({
                    'max-height': ''
                })
        });

        observer.observe($('.bubble.bubble-mobile').get(0), {
            attributes: true
        })
    }

    $('body').on('click', '#order-list .order-item .plus, #order-list .order-item .minus', function() {
        var order_item = $(this).closest('.order-item');

        addToBasket(
            basket,
            order_item.data('product-id'),
            order_item.data('product-name'),
            order_item.data('product-type'),
            {
                [order_item.find('.product-size').text()]: order_item.data('variation-id')
            },
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

            if ($('.input-wrapper input[name="country"]').data('country-code') != 'RU')
                delivery_price = (parseInt(basket.full_price.match(/\d+/)) < 200) ? 20 : 0;

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

    $('#related').on('click', 'a.related-item', function(e) {
        e.preventDefault();

        if (!$(e.target).hasClass('bubble'), $(e.target).closest('.bubble').length == 0) {
            $(this).find('img').removeAttr('data-src');

            let prevRelatedItem = $('#related a.related-item.item-selected'),
                currentProductId;

            prevRelatedItem.removeClass('item-selected');

            $(this).addClass('item-selected');

            window.history.pushState('Product', 'Product', $(this).attr('href'));
            url = new URL(location.href);
            
            let linkURL = new URL(window.location.origin + $(this).attr('href'));
            
            post('seworld.products_in_stock').then(
                result => {
                    let resultKeys = Object.keys(result);
                    key = resultKeys[resultKeys.length - 1];
                    
                    prevRelatedItem.find('.bubble').remove();
                    prevRelatedItem.find('.triangle-mobile').remove();
                    prevRelatedItem.append($('<div>', {
                        class: 'bubble'
                    }).append($('<div>', {
                        class: 'related-name',
                        text: result[key].name
                    })).append($('<div>', {
                        class: 'price',
                        text: result[key].price
                    })).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'));

                    $('.slider').empty();

                    if (typeof result == 'object')
                        currentProductId = (Object.values(result).find(product => product.seo_name === url.pathname.replace('/', '')))
                    else
                        currentProductId = (result.find(product => product.seo_name === url.pathname.replace('/', '')));
        
                    if (currentProductId)
                        currentProductId = currentProductId.id;

                    getProductContent(result, currentProductId, true);

                    lazyloadImg();
                    
                    $('.slider').append($('<button>', {
                        id: 'prev-img'
                    })).append($('<button>', {
                        id: 'next-img'
                    }));

                    post('seworld.products_out_of_stock').then(
                        result => {
                            if (Object.keys(result).length) {       
                                if (typeof result == 'object')
                                    currentProductId = (Object.values(result).find(product => product.seo_name === url.pathname.replace('/', '')))
                                else
                                    currentProductId = (result.find(product => product.seo_name === url.pathname.replace('/', '')));
                    
                                if (currentProductId)
                                    currentProductId = currentProductId.id;
     
                                getProductContent(result, currentProductId, true);
                    
                                lazyloadImg();
                                
                                $('#related').css({
                                    opacity: 1
                                });
                            }
                                
                            $('.slider').append($('<button>', {
                                id: 'prev-img'
                            })).append($('<button>', {
                                id: 'next-img'
                            }));
                        },
                        error => {
                            console.log(error);
                        }
                    );
                },
                error => {
                    console.log(error);
                }
            );
        }
    })
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

function getSizeWord(size) {
    try {
        if (size == 'one size')
            return ['ONE SIZE', ''];

        if (size[size.length - 1] == 'S')
            return ['mall', '小的'];
        
        if (size[size.length - 1] == 'M')
            return ['edium', '中等的'];
        
        if (size[size.length - 1] == 'L')
            return ['arge', '大的'];
    }
    catch {
        return ['', ''];
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
                        'data-product-id': product.id,
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

function slider() {
    var slideText = document.getElementsByClassName('slide-text')
    var addText = function(slideN) {
        slideText[0].innerHTML = textSplit(thisImg[slideN].children[1].innerHTML)
        slideText[1].innerHTML = textSplit(thisImg[slideN].children[1].innerHTML)
    }

    $('#indicator .line').remove();

    $('.slider .slider-item').each(() => {
        $('#indicator').append($('<div>', {
            class: 'line'
        }))
    })

    var nextButton = document.getElementById('next-img')
    var prevButton = document.getElementById('prev-img')
    thisImg = document.getElementsByClassName('slider-item')
    var arrowNumber = document.getElementById('slide-number')

    j = 0
    if (window.location.hash) {
        var slideNumber = window.location.hash.substring(1).match(/\d+/)[0]
        j = (slideNumber - 1)
    } else {
        j = 0
    }

    thisImg[j].classList.add('img-selected')
    arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
    
    document.addEventListener('click', function(e) {
        if (e.target) {
            if (e.target.id == 'next-img')
            if (j < thisImg.length-1) {
                // thisImg[j].classList.remove('img-selected')
                // thisImg[j+1].classList.add('img-selected')
                j++
                // window.location.hash = 'slide-' + (j + 1)
                addText(j)
            } else {
                // thisImg[j].classList.remove('img-selected')
                // thisImg[0].classList.add('img-selected')
                j = 0
                // window.location.hash = 'slide-' + (j + 1)
                addText(j)
            }
            // arrowNumber.innerHTML = j + 1 + '/' + thisImg.length

            if (e.target.id == 'prev-img')
            if (j>0) {
                // thisImg[j].classList.remove('img-selected')
                // thisImg[j-1].classList.add('img-selected')
                j--
                // window.location.hash = 'slide-' + (j + 1)
                addText(j)
            } else {
                // thisImg[j].classList.remove('img-selected')
                // thisImg[thisImg.length-1].classList.add('img-selected')
                j = thisImg.length-1
                // window.location.hash = 'slide-' + (j + 1)
                addText(j)
            }
            // arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
        }
    })
    
    //Slide number position
    function moveNumber(e) {
        var pageX = e.pageX
        var pageY = e.pageY
        arrowNumber.style.opacity = 1
        arrowNumber.style.left = pageX + 'px'
        arrowNumber.style.top = pageY - pageYOffset + 'px'
    }

    document.addEventListener('mousemove', moveNumber)

    //Mouse out of document
    document.addEventListener('mouseout', function(){
        arrowNumber.style.opacity = '0'
    })

    var purchase = document.getElementById('purchase')
    var header = document.querySelector('header')
    var related = document.getElementById('related')
    
    related.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    related.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})
    header.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    header.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})
    purchase.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    purchase.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})
}

function lazyloadImg(i = 0, callback = '') {
    let images = $('img[data-src]');

    try {
        images.eq(i)
        .attr('width', Math.trunc(images.eq(i).width()))
        .attr('height', Math.trunc(images.eq(i).height()))
        .attr('src', images.eq(i).data('src'))
        .on('load', function() {
            $(this)
            .off('load')
            .css({
                opacity: 1
            })
            .addClass('loaded');

            if ($(window).width() < 768 && $(this).closest('grid-item'))
                $(this).next('.bubble').css({
                    'opacity': 1
                });

            i++;

            if (i < images.length)
                lazyloadImg(i, callback);
            else {
                if (callback != '')
                    try {
                        callback();
                    } catch {}
            }
        });
    } catch {}
}

function srcConvert(src) {
    if (navigator.sayswho[0] == 'Safari' && parseInt(navigator.sayswho[1]) < 15)
        return src.image_path + '?store_access_key=csse';
    else
        return 'images/' + src.absolute_path.split(/(\\|\/)/g).pop().split('.')[0] + '.webp' + '?store_access_key=csse';
}

function getProductContent(result, currentProductId, related = false) {
    for (key in result) {
        if (result[key].id == Number(currentProductId)) {
            product_name = result[key].name;

            var img_desk = '';

            if (typeof result[key].pairs.pairs == 'array' && result[key].pairs.pairs.length > 0)
                if (result[key].pairs.pairs[0]['desk'] !== undefined)
                    result[key].pairs.pairs[0];

            if (!related) {
                $('#related')
                .append($('<a>', {
                    class: 'related-item item-selected',
                    href: '/' + result[key].seo_name
                }).append($('<img>', {
                    'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                    // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                    // 'sizes': '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                })).append($('<div>', {
                    class: 'bubble'
                }).append($('<div>', {
                    class: 'bubble-flex'
                }).append($('<div>')
                .append($('<div>', {
                    class: 'related-name',
                    text: result[key].name
                })).append($('<div>', {
                    class: 'price',
                    text: result[key].price
                }))).append($('<div>', {
                    class: 'show-more',
                    html: 'Show text <br> ↓'
                }))).append($('<div>', {
                    class: 'slide-text',
                    // html: textSplit(img_desk)
                })).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'))
                .append('<svg class="triangle-mobile" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'));

                $('.js-swiper-related .swiper-wrapper')
                .append($('<div>', {
                    class: 'swiper-slide'
                })
                .append($('<a>', {
                    class: 'related-item item-selected',
                    href: '/' + result[key].seo_name
                }).append($('<img>', {
                    'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                    // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                    // 'sizes': '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                }))
                .append($('<div>', {
                    class: 'bubble'
                })
                .append($('<div>', {
                    class: 'bubble-flex'
                })
                .append($('<div>')
                .append($('<div>', {
                    class: 'related-name',
                    text: result[key].name
                }))
                .append($('<div>', {
                    class: 'price',
                    text: result[key].price
                })))
                .append($('<div>', {
                    class: 'show-more',
                    html: 'Show text <br> ↓'
                })))
                .append($('<div>', {
                    class: 'slide-text',
                    // html: textSplit(img_desk)
                }))
                .append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'))
                .append('<svg class="triangle-mobile" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>')));

                const observer = new MutationObserver(function(mutationsList, observer) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'attributes') {
                            if (mutation.attributeName == 'style') {
                                $('.related-item.item-selected .bubble').css({
                                    'opacity': 1
                                })
                            }
                        }
                    }
                });

                observer.observe($('.related-item.item-selected img').get(0), {
                    attributes: true,
                    childList: false,
                    subtree: false
                });
            } else {
                $('.related-item.item-selected .bubble').remove();
                $('.related-item.item-selected').append($('<div>', {
                    class: 'bubble'
                }).append($('<div>', {
                    class: 'bubble-flex'
                }).append($('<div>')
                .append($('<div>', {
                    class: 'related-name',
                    text: result[key].name
                })).append($('<div>', {
                    class: 'price',
                    text: result[key].price
                }))).append($('<div>', {
                    class: 'show-more',
                    html: 'Show text <br> ↓'
                }))).append($('<div>', {
                    class: 'slide-text',
                    // html: textSplit(img_desk)
                })).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'))
                .append('<svg class="triangle-mobile" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>');
            }

            $('.bubble.bubble-mobile .related-name').text(result[key].name)
            $('.bubble.bubble-mobile .price').text(result[key].price)

            var i = 0;

            for (img_key in result[key].pairs.pairs) {
                $('.slider').append($('<figure>', {
                    class: 'slider-item'
                }).append($('<img>', {
                    'data-src': srcConvert(result[key].pairs.pairs[img_key]['1600']),
                    // 'data-srcset': getSrcset(result[key].pairs.pairs[img_key]),
                    // 'sizes': '(max-width: 400px) 400px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                })).append($('<figcaption>', {
                    class: 'description',
                    text: result[key].pairs.descriptions[i]
                })));

                i++;
            }
            
            $('#size-wrapper').empty();

            if (result[key].variations == undefined) {
                let size = getSizeWord(result[key].size);

                $('#size-wrapper')
                .addClass('one_size')
                .append($('<div>', {
                    id: 'size',
                    html: '<span class="short-size">' + (result[key].size == 'one size' ? '' : result[key].size) + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
                    'data-product-id': result[key].id,
                    'data-variation-id': result[key].id,
                    'data-price': result[key].price,
                    'data-product-name': result[key].name,
                    'data-max-count': result[key].count,
                    'data-product-type': result[key].type,
                    'data-details-main-pair': ('detailed' in result[key].details_main_pair) ? result[key].details_main_pair.detailed.image_path : ''
                }))
            } else {
                let sizes = Object.keys(result[key].variations),
                    size = getSizeWord(result[key].size);

                if (result[key].count > 0) {
                    $('#size-wrapper').append($('<div>', {
                        id: 'size',
                        html: '<span class="short-size">' + result[key].size + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
                        'data-product-id': result[key].id,
                        'data-variation-id': result[key].variations[sizes[0]].product_id,
                        'data-price': result[key].price,
                        'data-product-name': result[key].name,
                        'data-max-count': result[key].variations[sizes[0]].count,
                        'data-product-type': result[key].type,
                        'data-details-main-pair': ('detailed' in result[key].details_main_pair) ? result[key].details_main_pair.detailed.image_path : ''
                    })).append($('<div>', {
                        class: 'size-arrow',
                        text: '^'
                    })).append($('<ul>', {
                        id: 'size-list'
                    }));

                    $('#size-list').append($('<li>', {
                        html: '<span class="short-size">' + result[key].size + '</span>' + size[0] + ' <span class="chinese">' + size[1] + '</span>',
                        'data-product-id': result[key].id,
                        'data-variation-id': result[key].id,
                        'data-price': result[key].price,
                        'data-product-name': result[key].name,
                        'data-max-count': result[key].count,
                        'data-details-main-pair': ('detailed' in result[key].details_main_pair) ? result[key].details_main_pair.detailed.image_path : ''
                    }));
                } else {
                    let variationSizeLetter = Object.keys(result[key].variations)[0];
                        size = getSizeWord(variationSizeLetter);

                        if (size == undefined)
                            size = ['', ''];

                        $('#size-wrapper').append($('<div>', {
                            id: 'size',
                            html: '<span class="short-size">' + variationSizeLetter + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
                            'data-product-id': result[key].id,
                            'data-variation-id': result[key].variations[sizes[0]].product_id,
                            'data-price': result[key].price,
                            'data-product-name': result[key].name,
                            'data-max-count': result[key].variations[sizes[0]].count,
                            'data-product-type': result[key].type,
                            'data-details-main-pair': ('detailed' in result[key].details_main_pair) ? result[key].details_main_pair.detailed.image_path : ''
                        })).append($('<div>', {
                            class: 'size-arrow',
                            text: '^'
                        })).append($('<ul>', {
                            id: 'size-list'
                        }));
                    }

                    ['S', 'M', 'L', 'XL'].forEach(variation_key => {
                        size = getSizeWord(variation_key);

                        if (result[key].variations[variation_key] != undefined && result[key].variations[variation_key].count > 0)
                            $('#size-list').append($('<li>', {
                                html: '<span class="short-size">' + variation_key + '</span>' + size[0] + ' <span class="chinese">' + size[1] + '</span>',
                                'data-product-id': result[key].id,
                                'data-variation-id': result[key].variations[variation_key].product_id,
                                'data-price': result[key].price,
                                'data-product-name': result[key].name,
                                'data-max-count': result[key].variations[variation_key].count,
                                'data-details-main-pair': ('detailed' in result[key].details_main_pair) ? result[key].details_main_pair.detailed.image_path : ''
                            }));
                    });
            }

            if ($('#size').data('max-count') == 0)
                $('.checkout-button.add').css({
                    'display': 'none'
                })
            else
                $('.checkout-button.add').css({
                    'display': ''
                })

            $('#size-wrapper').on('click', '#size-list li', function() {
                $(this).closest('#size-wrapper').find('#size')
                    .data('product-id', $(this).data('product-id'))
                    .data('variation-id', $(this).data('variation-id'))
                    .data('price', $(this).data('price'))
                    .data('product-name', $(this).data('product-name'))
                    .data('max-count', $(this).data('max-count'));

                setTimeout(() => {
                    $(this).closest('#size-wrapper').find('#size-list').removeClass('open');
                }, 50);
            });

            $('.checkout-button.add').data('main-pair', result[key].pairs.main_pair);

            slider();
        } else {
            if (!related) {
                if (Object.keys(result[key].pairs.main_pair[420]).length)
                    $('#related')
                    .append($('<a>', {
                        class: 'related-item',
                        href: '/' + result[key].seo_name
                    }).append($('<img>', {
                        'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                        // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                        // 'sizes': '(max-width: 420px) 420px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                    })).append($('<div>', {
                        class: 'bubble'
                    }).append($('<div>', {
                        class: 'related-name',
                        text: result[key].name
                    })).append($('<div>', {
                        class: 'price',
                        text: result[key].price
                    })).append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>')));

                    $('.js-swiper-related .swiper-wrapper')
                    .append($('<div>', {
                        class: 'swiper-slide'
                    })
                    .append($('<a>', {
                        class: 'related-item',
                        href: '/' + result[key].seo_name
                    })
                    .append($('<img>', {
                        'data-src': srcConvert(result[key].pairs.main_pair['1600']),
                        // 'data-srcset': getSrcset(result[key].pairs.main_pair),
                        // 'sizes': '(max-width: 420px) 420px, (max-width: 800px) 800px, (max-width: 1200px) 1200px, 1600px'
                    }))
                    .append($('<div>', {
                        class: 'bubble'
                    })
                    .append($('<div>', {
                        class: 'related-name',
                        text: result[key].name
                    }))
                    .append($('<div>', {
                        class: 'price',
                        text: result[key].price
                    }))
                    .append('<svg class="triangle" viewBox="0 0 72 73" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-4" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><path vector-effect="non-scaling-stroke" d="M70.7928932,1.47534962 L3.11398865,69.1542542 L47.6661307,1.47534962 L70.7928932,1.47534962 Z" id="Path-3" stroke="#B7AFA6" fill="#FFFFFF"></path></g></svg>'))));
            }
        }
    }

    lazyloadImg(0, () => {
        // $(window).scrollTop($('.related-item.item-selected').offset().top - (($(window).height() / 2) - ($('.related-item.item-selected').height() / 2)));
    });

    let swiper_related = new Swiper('.js-swiper-related', {
        direction: 'vertical',
        slidesPerView: 'auto',
        autoHeight: true,
        loop: true,
        mousewheel: true,
        freeMode: true,
        centeredSlides: true
    })
}

function getSrcset(pair) {
    if ((typeof pair == 'array' && pair.length > 0) || (typeof pair == 'object' && Object.keys(pair).length > 0))
        if (pair[420].image_path != undefined)
            return JSON.stringify(pair);
            
    return undefined;
}

function updateBagTop() {
    // if ($(window).width() > 768)
        // $('header > .bag').css({
        //     'top': $('header .menu').outerHeight()
        // });
}

function bodyPosition() {
    if ($('#preloader').length && !$('#preloader').hasClass('display_none')) {
        $('body').css({
            'position': 'fixed'
        });
        
        const callback = function(mutationsList, observer) {
            if ($(mutationsList[0].target).hasClass('gone'))
                $('body').css({
                    'position': ''
                });
                setTimeout(() => {
                    $('#preloader').remove();
                }, 800);
        };

        const observer = new MutationObserver(callback);

        observer.observe($('#preloader').get(0), {
            attributes: true,
            childList: false,
            subtree: false
        });
    }
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