$(() => {
    var url = new URL(location.href);
    
    // post('seworld.get_cart', {
    //     lang: 'en'
    // }).then(
    //     result => {
    //         if (result.products.length > 0) {
    //             $('#counter').text(result.products.length);
    //             $('#total').text(result.full_price);
    //             $('#total').text(result.full_price);
    //             $('#empty-bag').css({
    //                 display: 'none'
    //             });
    //             $('.bag-items').addClass('flex-open');
    //             $('#order-list').append($('<div>', {
    //                 class: 'order-item'
    //             }).append($('<div>', {
    //                 class: 'minus',
    //                 text: '–'
    //             }).append($('<div>', {
    //                 class: 'bag-product'
    //             }))
    //             .append($('<div>', {
    //                 class: 'plus',
    //                 text: '+'
    //             }))));
    //         }
    //     },
    //     error => {
    //         console.log(error)
    // });
        
    if (url.pathname == '/index.html' || url.pathname == '/' || url.pathname == '') {
        // post('seworld.products_expected').then(
        //     result => {
        //         $('#new-item').text(result[0].name);
        //         $('#new-element .item-name').text(result[0].name);
        //     },
        //     error => {
        //         console.log(error)
        //     }
        // );
            
        post('seworld.products_in_stock').then(
            result => {
                $('.grid-container .grid-item:not(#new-element)').remove();
                
                result.forEach((product) => {
                    console.log(product);
                    $('.grid-container').append($('<a>', {
                        href: '/product.html?id=' + product.id,
                        class: 'grid-item'
                    }).append($('<img>', {
                        src: product.pairs.main_pair
                    })).append($('<div>', {
                        class: 'bubble'
                    }).append($('<div>', {
                        class: 'item-name',
                        text: product.name
                    })).append($('<div>', {
                        class: 'price',
                        text: product.price
                    }))));
                });
            },
            error => {
                console.log(error)
            }
        );
    }
            
    // if (url.pathname == '/product.html' || url.search != '') {
    //     var currentProductId = Number(url.search.replace('?id=', ''));
        
    //     post('seworld.products_in_stock').then(
    //         result => {
    //             $('#related').empty();
    //             $('.slider').empty();
                
    //             result.forEach(product => {
    //                 if (product.id == Number(currentProductId)) {
    //                     $('#related').append($('<div>', {
    //                         class: 'related-item item-selected'
    //                     }).append($('<img>', {
    //                         'data-src': product.pairs.main_pair
    //                     })).append($('<div>', {
    //                         class: 'bubble'
    //                     }).append($('<div>', {
    //                         class: 'bubble-flex'
    //                     }).append($('<div>')
    //                     .append($('<div>', {
    //                         class: 'related-name',
    //                         text: product.name
    //                     })).append($('<div>', {
    //                         class: 'price',
    //                         text: product.price
    //                     }))).append($('<div>', {
    //                         class: 'show-more',
    //                         html: 'Show text <br> ↓'
    //                     }))).append($('<div>', {
    //                         class: 'slide-text',
    //                         text: product.pairs.pairs[0].desc
    //                     }))));
                        
    //                     product.pairs.pairs.forEach(img => {
    //                         $('.slider').append($('<figure>', {
    //                             class: 'slider-item'
    //                         }).append($('<img>', {
    //                             'data-src': img.src
    //                         })).append($('<figcaption>', {
    //                             class: 'description',
    //                             text: img.desc
    //                         })));
    //                     });
                        
    //                     $('#size-wrapper').empty();
    //                     var sizes = Object.keys(product.variations);
                        
    //                     var size = getSizeWord(sizes[0]);
                        
    //                     $('#size-wrapper').append($('<div>', {
    //                         id: 'size',
    //                         html: '<span class="short-size">' + sizes[0] + '</span>' + size[0] + ' <span class="chinese">' + size[1] +  '</span>',
    //                         'data-product-id': product.id,
    //                         'data-variation-id': product.variations[sizes[0]]
    //                     })).append($('<div>', {
    //                         class: 'size-arrow',
    //                         text: '^'
    //                     })).append($('<ul>', {
    //                         id: 'size-list'
    //                     }));
                        
    //                     for (key in product.variations) {
    //                         var size = getSizeWord(key);
                            
    //                         $('#size-list').append($('<li>', {
    //                             html: '<span class="short-size">' + key + '</span>' + size[0] + ' <span class="chinese">' + size[1] + '</span>',
    //                             'data-product-id': product.id,
    //                             'data-variation-id': product.variations[key]
    //                         }));
    //                     }
                        
    //                     $('#size-wrapper').on('click', '#size-list li', function() {
    //                         $(this).closest('#size-wrapper').find('#size').data('product-id', $(this).data('product-id')).data('variation-id', $(this).data('variation-id'));
    //                         setTimeout(() => {
    //                             $(this).closest('#size-wrapper').find('#size-list').removeClass('open');
    //                         }, 50);
    //                     });
    //                 } else
    //                 $('#related').append($('<div>', {
    //                     class: 'related-item'
    //                 }).append($('<img>', {
    //                     'data-src': product.pairs.main_pair
    //                 })).append($('<div>', {
    //                     class: 'bubble'
    //                 }).append($('<div>', {
    //                     class: 'related-name',
    //                     text: product.name
    //                 })).append($('<div>', {
    //                     class: 'price',
    //                     text: product.price
    //                 }))));
    //             });
                
    //             $('img[data-src]').each(function() {
    //                 $(this).attr('src', $(this).data('src')).css({
    //                     opacity: 1
    //                 });
    //             });
                
    //             $('#related').css({
    //                 opacity: 1
    //             });
                
    //             $('.slider').append($('<button>', {
    //                 id: 'prev-img'
    //             })).append($('<button>', {
    //                 id: 'next-img'
    //             }));
    //         },
    //         error => {
    //             console.log(error)
    //         }
    //     );
    // }

    // post('seworld.products_in_stock')
    // post('seworld.products_archive')
    // post('seworld.products_out_of_stock')
    // post('seworld.policy')
    // post('seworld.shipping')
    // post('seworld.add_to_cart')
    // post('seworld.get_cart')
});
        
function getSizeWord(size) {
    if (size[size.length - 1] == 'S')
    return ['mall', '小的'];
    
    if (size[size.length - 1] == 'M')
    return ['edium', '中等的'];
    
    if (size[size.length - 1] == 'L')
    return ['arge', '大的'];
}