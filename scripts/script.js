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

    console.log(url.pathname);

    if (url.pathname == '/index.html' || url.pathname == '/' || url.pathname == '') {
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
                            href: '/product.html?id=' + result[key].id,
                            class: 'grid-item'
                        }).append($('<img>', {
                            src: result[key].pairs.main_pair
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append($('<div>', {
                            class: 'item-name',
                            text: result[key].name
                        })).append($('<div>', {
                            class: 'price',
                            text: result[key].price
                        }))));
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
            
    if (url.pathname == '/product.html' || url.search != '') {
        var currentProductId = Number(url.search.replace('?id=', ''));
        
        post('seworld.products_in_stock').then(
            result => {
                $('#related').empty();
                $('.slider').empty();

                var product_name = '';
                
                result.forEach(product => {
                    if (product.id == Number(currentProductId)) {
                        product_name = product.name;

                        var img_desk = '';

                        if (typeof product.pairs.pairs == 'array' && product.pairs.pairs.length > 0)
                            if (product.pairs.pairs[0]['desk'] !== undefined)
                                product.pairs.pairs[0];

                        $('#related').append($('<div>', {
                            class: 'related-item item-selected'
                        }).append($('<img>', {
                            'data-src': product.pairs.main_pair
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append($('<div>', {
                            class: 'bubble-flex'
                        }).append($('<div>')
                        .append($('<div>', {
                            class: 'related-name',
                            text: product.name
                        })).append($('<div>', {
                            class: 'price',
                            text: product.price
                        }))).append($('<div>', {
                            class: 'show-more',
                            html: 'Show text <br> ↓'
                        }))).append($('<div>', {
                            class: 'slide-text',
                            text: img_desk
                        }))));
                        
                        product.pairs.pairs.forEach(img => {
                            $('.slider').append($('<figure>', {
                                class: 'slider-item'
                            }).append($('<img>', {
                                'data-src': img.src
                            })).append($('<figcaption>', {
                                class: 'description',
                                text: img.desc
                            })));
                        });
                        
                        $('#size-wrapper').empty();
                        var sizes = Object.keys(product.variations);
                        
                        var size = getSizeWord(sizes[0]);

                        $('#size-wrapper').append($('<div>', {
                            id: 'size',
                            html: '<span class="short-size">' + sizes[0] + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
                            'data-product-id': product.id,
                            'data-variation-id': product.variations[sizes[0]],
                            'data-price': product.price,
                            'data-product-name': product.name
                        })).append($('<div>', {
                            class: 'size-arrow',
                            text: '^'
                        })).append($('<ul>', {
                            id: 'size-list'
                        }));
                        
                        for (key in product.variations) {
                            var size = getSizeWord(key);
                            
                            $('#size-list').append($('<li>', {
                                html: '<span class="short-size">' + key + '</span>' + size[0] + ' <span class="chinese">' + size[1] + '</span>',
                                'data-product-id': product.id,
                                'data-variation-id': product.variations[key],
                                'data-price': product.price,
                                'data-product-name': product.name
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
                    } else
                        $('#related').append($('<a>', {
                            class: 'related-item',
                            href: '/product.html?id=' + product.id
                        }).append($('<img>', {
                            'data-src': product.pairs.main_pair
                        })).append($('<div>', {
                            class: 'bubble'
                        }).append($('<div>', {
                            class: 'related-name',
                            text: product.name
                        })).append($('<div>', {
                            class: 'price',
                            text: product.price
                        }))));
                });
                
                $('img[data-src]').each(function() {
                    $(this).attr('src', $(this).data('src')).css({
                        opacity: 1
                    });
                });
                
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

                    addToBasket(
                        basket,
                        product_size_obj.data('product-id'),
                        product_size_obj.data('product-name'),
                        {
                            [product_size_obj.find('.short-size').text()]: product_size_obj.data('variation-id')
                        },
                        product_size_obj.data('price')
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

    if (url.pathname == '/checkout.html') {

    }

    // post('seworld.products_in_stock')
    // post('seworld.products_archive')
    // post('seworld.products_out_of_stock')
    // post('seworld.policy')
    // post('seworld.shipping')
    // post('seworld.add_to_cart')
    // post('seworld.get_cart')

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
            $(this).hasClass('minus')
        );
        basketUpdateTotal();
        showBasket();
    });

    $('form.bag-items').submit(function(e) {
        e.preventDefault();

        $(this).find('input').each(function() {
            if ($(this).val() == '')
                $(this).css({
                    'background-color': 'red'
                });
            else
                $(this).css({
                    'background-color': ''
                });
        });
    });

    $('.input-wrapper input').on('keydown', function() {
        $(this).css({
            'background-color': ''
        });
    });
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
            console.log(item.price)
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

function addToBasket(basket, product_id, product_name, size, price, remove = false) {
    var addProduct = true;

    if (basket.products.length > 0) {
        basket.products.forEach((product, id) => {
            if (product.id == product_id)
                if (JSON.stringify(product.variation) == JSON.stringify(size)) {
                    if (remove)
                        basket.products[id].basket_count = Number(basket.products[id].basket_count) - 1;
                    else
                        basket.products[id].basket_count = Number(basket.products[id].basket_count) + 1;

                    addProduct = false;
                }

            console.log(basket.products[id].basket_count)

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
            price: price
        });

    localStorage.setItem('basket', JSON.stringify(basket));
    basketUpdateTotal();
    showBasket();
}