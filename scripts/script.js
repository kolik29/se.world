var url = new URL(location.href);

$(() => {
    var basket = {};

    if (localStorage.getItem('basket') == null)
        basket = {
            products: [],
            full_price: 0,
            count: 0
        }
    else {
        basket = JSON.parse(localStorage.getItem('basket'));
        showBasket();
    }

    if (url.pathname == '/' || url.pathname == '') {
        post('seworld.products_expected').then(
            result => {
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
                    if (Number(result[key].count) > 0)
                        $('.grid-container').append($('<a>', {
                            href: '/product?id=' + result[key].id,
                            class: 'grid-item'
                        }).append($('<img>', {
                            'data-src': result[key].pairs.main_pair
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append($('<div>', {
                            class: 'item-name',
                            text: result[key].name
                        })).append($('<div>', {
                            class: 'price',
                            text: result[key].price
                        }))));

                    lazyloadImg();
                }

                post('seworld.products_out_of_stock').then(
                    result => {
                        for (key in result) {
                            $('.grid-container').append($('<div>', {
                                class: 'grid-item archive',
                                text: 'Archive 檔案'
                            }));
                        }
                    }
                )
            },
            error => {
                console.log(error)
            }
        );
    }
            
    if (url.pathname == '/product' || url.search != '') {
        var currentProductId = Number(url.search.replace('?id=', ''));
        
        post('seworld.products_in_stock').then(
            result => {
                $('#related').empty();
                $('.slider').empty();

                var product_name = '';
                for (key in result)
                    if (result[key].id == Number(currentProductId)) {
                        product_name = result[key].name;

                        var img_desk = '';

                        if (typeof result[key].pairs.pairs == 'array' && result[key].pairs.pairs.length > 0)
                            if (result[key].pairs.pairs[0]['desk'] !== undefined)
                                result[key].pairs.pairs[0];

                        $('#related').append($('<div>', {
                            class: 'related-item item-selected'
                        }).append($('<img>', {
                            'data-src': result[key].pairs.main_pair
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
                            text: img_desk
                        }))));

                        for (img_key in result[key].pairs.pairs)
                            $('.slider').append($('<figure>', {
                                class: 'slider-item'
                            }).append($('<img>', {
                                'data-src': result[key].pairs.pairs[img_key].detailed.https_image_path
                            })).append($('<figcaption>', {
                                class: 'description',
                                // text: img.desc
                            })));
                        
                        $('#size-wrapper').empty();
                        var sizes = Object.keys(result[key].variations);
                        
                        var size = getSizeWord(sizes[0]);

                        $('#size-wrapper').append($('<div>', {
                            id: 'size',
                            html: '<span class="short-size">' + sizes[0] + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
                            'data-product-id': result[key].id,
                            'data-variation-id': result[key].variations[sizes[0]].product_id,
                            'data-price': result[key].price,
                            'data-product-name': result[key].name,
                            'data-max-count': result[key].count
                        })).append($('<div>', {
                            class: 'size-arrow',
                            text: '^'
                        })).append($('<ul>', {
                            id: 'size-list'
                        }));
                        
                        for (variation_key in result[key].variations) {
                            var size = getSizeWord(variation_key);

                            $('#size-list').append($('<li>', {
                                html: '<span class="short-size">' + variation_key + '</span>' + size[0] + ' <span class="chinese">' + size[1] + '</span>',
                                'data-product-id': result[key].id,
                                'data-variation-id': result[key].variations[variation_key].product_id,
                                'data-price': result[key].price,
                                'data-product-name': result[key].name
                            }));
                        }
                        
                        $('#size-wrapper').on('click', '#size-list li', function() {
                            $(this).closest('#size-wrapper').find('#size')
                                .data('product-id', $(this).data('product-id'))
                                .data('variation-id', $(this).data('variation-id'))
                                .data('price', $(this).data('price'))
                                .data('product-name', $(this).data('product-name'));

                            setTimeout(() => {
                                $(this).closest('#size-wrapper').find('#size-list').removeClass('open');
                            }, 50);
                        });

                        $('.slider .slider-item').eq(0).addClass('img-selected');

                        $('.checkout-button.add').data('main-pair', result[key].pairs.main_pair);

                        slider();
                    } else
                        $('#related').append($('<a>', {
                            class: 'related-item',
                            href: '/product?id=' + result[key].id
                        }).append($('<img>', {
                            'data-src': result[key].pairs.main_pair
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append($('<div>', {
                            class: 'related-name',
                            text: result[key].name
                        })).append($('<div>', {
                            class: 'price',
                            text: result[key].price
                        }))));

                lazyloadImg();
                
                $('#related').css({
                    opacity: 1
                });
                
                $('.slider').append($('<button>', {
                    id: 'prev-img'
                })).append($('<button>', {
                    id: 'next-img'
                }));
                
                $('.checkout-button.add').on('click', function() {
                    var product_size_obj = $(this).closest('#purchase').find('#size');
                    var image = $(this).data('main-pair');

                    addToBasket(
                        basket,
                        product_size_obj.data('product-id'),
                        product_size_obj.data('product-name'),
                        {
                            [product_size_obj.find('.short-size').text()]: product_size_obj.data('variation-id')
                        },
                        product_size_obj.data('price'),
                        image,
                        product_size_obj.data('max-count')
                    );
                    basketUpdateTotal();
                    showBasket();
                });
            },
            error => {
                console.log(error);
            }
        );
    }

    if (url.pathname == '/checkout') {
        basket = JSON.parse(localStorage.getItem('basket'));

        console.log(basket.products)

        basket.products.forEach(item => {
            $('#products').append($('<img>', {
                class: 'checkout-item',
                'data-src': item.main_pair
            }));
        });
    }

    $('body').on('click', '#order-list .order-item .plus, #order-list .order-item .minus', function() {
        var order_item = $(this).closest('.order-item');

        addToBasket(
            basket,
            order_item.data('product-id'),
            order_item.data('product-name'),
            {
                [order_item.find('.product-size').text()]: order_item.data('variation-id')
            },
            order_item.data('product-price'),
            [],
            order_item.data('max-count'),
            $(this).hasClass('minus')
        );
        basketUpdateTotal();
        showBasket();
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
            data = Object.assign(basket, { customer: customer });
            console.log(data);

            post('se_world.create_order', data).then(
                result => {
                    console.log(result);
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
    
    lazyloadImg();        
});

function getSizeWord(size) {
    if (size[size.length - 1] == 'S')
    return ['mall', '小的'];
    
    if (size[size.length - 1] == 'M')
    return ['edium', '中等的'];
    
    if (size[size.length - 1] == 'L')
    return ['arge', '大的'];
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
            $('#total').text(basket.full_price);

            basket.products.forEach(product => {
                var size = Object.keys(product.variation)[0];

                $('#order-list').prepend(
                    $('<div>', {
                        class: 'order-item',
                        'data-product-id': product.id,
                        'data-variation-id': product.variation[size],
                        'data-product-price': product.price,
                        'data-product-name': product.name
                        }).append($('<div>', {
                            class: 'minus',
                            text: '–'
                        })).append($('<bag-product>', {
                            class: 'bag-product'
                            }).append($('<div>', {
                                class: 'product-type',
                                text: product.type || ''
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
            localStorage.removeItem('basket')
        }
    }
}

function addToBasket(basket, product_id, product_name, size, price, image, max_count, remove = false) {
    var addProduct = true;

    if (basket.products.length > 0) {
        basket.products.forEach((product, id) => {
            if (product.id == product_id)
                if (JSON.stringify(product.variation) == JSON.stringify(size)) {
                    if (remove)
                        if (basket.products[id].basket_count < max_count)
                            basket.products[id].basket_count = Number(basket.products[id].basket_count) - 1;
                    else
                        basket.products[id].basket_count = Number(basket.products[id].basket_count) + 1;

                    addProduct = false;
                }

            if (basket.products[id].basket_count <= 0)
                basket.products.splice(id, 1)
        });
    }
    
    if (addProduct && !remove)
        basket['products'].push({
            id: product_id,
            name: product_name,
            basket_count: 1,
            type: 'T-shirt',
            variation: size,
            price: price,
            main_pair: image,
        });

    localStorage.setItem('basket', JSON.stringify(basket));
    basketUpdateTotal();
    showBasket();
}

function slider() {
    var slideText = document.getElementsByClassName('slide-text')
    var addText = function(slideN) {
        slideText[0].innerHTML = thisImg[slideN].children[1].innerHTML
        slideText[1].innerHTML = thisImg[slideN].children[1].innerHTML
    }

    var nextButton = document.getElementById('next-img')
    var prevButton = document.getElementById('prev-img')
    thisImg = document.getElementsByClassName('slider-item')
    var line = document.getElementsByClassName('line')
    var indicator = document.getElementById('indicator')
    var arrowNumber = document.getElementById('slide-number')

    for (i=0; i<thisImg.length-1; i++) {
        var clone = line[0].cloneNode(true)
        indicator.append(clone)
    }

    j = 0
    if (window.location.hash) {
        var slideNumber = window.location.hash.substring(1).match(/\d+/)[0]
        j = (slideNumber - 1)
    } else {
        j = 0
    }

    thisImg[j].classList.add('img-selected')
    line[j].classList.add('line-selected')
    arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
    
    document.addEventListener('click', function(e) {
        if (e.target) {
            if (e.target.id == 'next-img')
            if (j < thisImg.length-1) {
                thisImg[j].classList.remove('img-selected')
                line[j].classList.remove('line-selected')
                thisImg[j+1].classList.add('img-selected')
                line[j+1].classList.add('line-selected')
                j++
                window.location.hash = 'slide-' + (j + 1)
                addText(j)
            } else {
                thisImg[j].classList.remove('img-selected')
                line[j].classList.remove('line-selected')
                thisImg[0].classList.add('img-selected')
                line[0].classList.add('line-selected')
                j = 0
                window.location.hash = 'slide-' + (j + 1)
                addText(j)
            }
            arrowNumber.innerHTML = j + 1 + '/' + thisImg.length

            if (e.target.id == 'prev-img')
            if (j>0) {
                thisImg[j].classList.remove('img-selected')
                line[j].classList.remove('line-selected')
                thisImg[j-1].classList.add('img-selected')
                line[j-1].classList.add('line-selected')
                j--
                window.location.hash = 'slide-' + (j + 1)
                addText(j)
            } else {
                thisImg[j].classList.remove('img-selected')
                line[j].classList.remove('line-selected')
                thisImg[thisImg.length-1].classList.add('img-selected')
                line[thisImg.length-1].classList.add('line-selected')
                j = thisImg.length-1
                window.location.hash = 'slide-' + (j + 1)
                addText(j)
            }
            arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
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

function lazyloadImg() {
    $('img[data-src]').each(function() {
        $(this).attr('src', $(this).data('src'))
        $(this).on('load', function() {
            $(this).css({
                opacity: 1
            })
        })
    })
}