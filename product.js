document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');

window.addEventListener('resize', () => { 
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
    })

window.onload = function() {
    
    //Img Preload
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'))
            img.onload = function() {
                // img.removeAttribute('data-src')
                // related.style.opacity = '1'
                // img.style.opacity = '1'
            }
        })
        //Scroll to selected item
        const el = document.getElementsByClassName('item-selected')[0]
        setTimeout(function() {
            if (el.offsetTop > window.innerHeight/2) {
                window.scrollTo ({
                    top: (el.offsetTop - window.innerHeight/2),
                    left: 0,
                    behavior: 'smooth'
                })
            }
        }, 1000)


    var purchase = document.getElementById('purchase')

    // ShowBlock
    function showBlock(el) {
        if (el.classList.contains('open')) {
            el.classList.remove('open')
            if (el.classList.contains('bag')) {
                header.style.backgroundColor = 'transparent'
                // fixedwrapp.style.zIndex = '1'
            }
            if (el.classList.contains('shipping-info')) {
                shippingButton[0].classList.remove('button-gray')
                shippingButton[0].innerHTML = 'Shipping'
            }
            if (el.id == 'size-list') {
                sizeWrapper.classList.remove('button-gray')
            }
        } else {
            if (el.classList.contains('bag')) {
                header.style.backgroundColor = 'white'
                header.style.zIndex = '2'
                // fixedwrapp.style.zIndex = '20'
                var gray = document.getElementsByClassName('button-gray')[0]
                if (gray) {
                    gray.classList.remove('button-gray')
                    shippingButton[0].innerHTML = 'Shipping'
                }
            }
            if (el.classList.contains('shipping-info')) {
                shippingButton[0].classList.add('button-gray')
                shippingButton[0].innerHTML = 'X'
                sizeWrapper.classList.remove('button-gray')
                header.style.backgroundColor = 'transparent'
                header.style.zIndex = ''
            }
            if (el.id == 'size-list') {
                sizeWrapper.classList.add('button-gray')
                shippingButton[0].classList.remove('button-gray')
                shippingButton[0].innerHTML = 'Shipping'
                header.style.backgroundColor = 'transparent'
                header.style.zIndex = ''
            }
            var otherOpen = document.getElementsByClassName('open')
            if (otherOpen[0]) {
                otherOpen[0].classList.remove('open')
            }
            el.classList.add('open')
        }
    }

    // Triangles
    var triangle = document.querySelector('.triangle')
    var bubbles = document.getElementsByClassName('bubble')

    for (i=0; i<bubbles.length; i++) {
        var clone = triangle.cloneNode(true)
        bubbles[i].append(clone);
    }

    // Menu
    var rotatingicon = document.querySelector('.rotating-icon')
    var header = document.querySelector('header')
    var bag = document.querySelector('.bag')
    var fixedwrapp = document.querySelector('.fixed-wrapp')
    rotatingicon.addEventListener('click', function(){showBlock(bag)})

    //Change slider text
    var showMore = document.getElementsByClassName('show-more')
    var selectedItem = document.querySelector('.item-selected .bubble')
    var bubbleMobile = document.querySelector('.bubble-mobile')

    function showText(el) {
        if (el.classList.contains('visible')) {
            el.classList.remove('visible')
            showMore[0].innerHTML = 'Show text <br> ↓'
            showMore[1].innerHTML = 'Show text <br> ↓'
            
        } else {
            el.classList.add('visible')
            showMore[0].innerHTML = 'Hide text <br> ↑'
            showMore[1].innerHTML = 'Hide text <br> ↑'
        
        }
    }

    bubbleMobile.addEventListener('click', function() {showText(bubbleMobile)})
    // selectedItem.addEventListener('click', function() {showText(selectedItem)})    

    Change_slide();

    try {
        //Size
        var size
        var sizeWrapper
        var sizeList
        size = document.getElementById('size')
        sizeWrapper = document.getElementById('size-wrapper')
        sizeList = document.getElementById('size-list')

        $('body').on('click', '#size-wrapper', function() {
            size = document.getElementById('size')
            sizeWrapper = document.getElementById('size-wrapper')
            sizeList = document.getElementById('size-list')
            
            showBlock(sizeList)
            
            var sizes = document.querySelectorAll('#size-list li')
            for (i=0; i < sizes.length; i++) {
                sizes[i].addEventListener('click', function (e) {
                    // e.stopPropagation()
                    size.innerHTML = e.target.innerHTML
                    sizeList.classList.remove('open')
                    sizeWrapper.classList.remove('button-gray')
                })
            }
        })
    }
    catch(err) {
        console.log(err)
    }

    //Shipping
    var shippingButton
    var shippingInfo
    shippingButton = document.getElementsByClassName('shipping')
    shippingInfo = document.getElementsByClassName('shipping-info')
    
    // shippingButton[0].addEventListener('click', function() {showBlock(shippingInfo[0])})

    $('body').on('click', '.shipping', function() {
        //Shipping
        shippingButton = document.getElementsByClassName('shipping')
        shippingInfo = document.getElementsByClassName('shipping-info')
        
        showBlock(shippingInfo[0])
    })

    // Add to cart
    var addButton = document.getElementsByClassName('add')[0]
    var bagItems = document.querySelector('.bag-items')
    var orderItem = document.getElementsByClassName('order-item')
    var orderItemClone = document.getElementById('order-item-clone')
    var name = document.querySelector('.item-selected .related-name')
    var price = document.querySelector('.item-selected .price')
    var emptyBag = document.getElementById('empty-bag')
    // var counter = document.getElementById('counter')
    // var total = document.getElementById('total')

    //Update bag
    var updateBag = function() {
        // var products = document.getElementsByClassName('product-quantity')
        // var prices = document.getElementsByClassName('product-price')
        // var quantityAll = 0
        // var priceAll = 0
        // for (i=1; i<products.length; i++) {
        //     quantityAll = quantityAll + parseInt(products[i].innerHTML)
        //     priceAll = priceAll + parseInt(prices[i].innerHTML) * parseInt(products[i].innerHTML)
        // }
        // counter.innerHTML = quantityAll
        // total.innerHTML = priceAll
    }

    //Update quantity
    var updateQuantity = function(el, b) {
        var quantity = parseInt(el.querySelector('.product-quantity').innerHTML)
        el.querySelector('.product-quantity').innerHTML = quantity + b
        if ((quantity == 1) && (b == -1)) {
            el.remove()
            if (orderItem.length == 0) {
                bagItems.classList.remove('flex-open')
                emptyBag.style.display = 'block'
            }
        }
    }

    function addToCart(e) {
        bagItems.classList.add('flex-open')
        emptyBag.style.display = 'none'

        try {
            var clone = orderItemClone.cloneNode(true)
            
            clone.classList.add('order-item')
            clone.removeAttribute('id')
            
            //quantity
            // clone.querySelector('.minus').addEventListener('click', function () {updateQuantity(clone, -1)})
            // clone.querySelector('.plus').addEventListener('click', function () {updateQuantity(clone, 1)})

            //data
            // clone.querySelector('.product-name').innerHTML = name.innerHTML
            // clone.querySelector('.product-size').innerHTML = size.childNodes[0].innerHTML
            // clone.querySelector('.product-price').innerHTML = price.innerHTML

            if (orderItem.length > 0) {
                for (i=0; i < orderItem.length; i++) {
                    if (clone.querySelector('.product-size').innerHTML == orderItem[i].querySelector('.product-size').innerHTML) {
                        updateQuantity(orderItem[i], 1)
                        break
                    } else if (i == orderItem.length - 1) {
                        bagItems.querySelector('#order-list').prepend(clone)
                    }
                }
            } else {
                bagItems.querySelector('#order-list').prepend(clone)
            }
        } catch {}
        // $('.add').text('ADDED!')
        // setTimeout(function() {
        //     $('.add').text('ADD')
        // }, 1000)
    }

    // addButton.addEventListener('click', addToCart)

    // $('body').on('click', '.add', function() {
    //     addToCart();
    // })

}

function Change_slide() {
    // Change slide
    var nextButton = document.getElementById('next-img')
    var prevButton = document.getElementById('prev-img')
    thisImg = document.getElementsByClassName('slider-item')
    var line = document.getElementsByClassName('line')
    var indicator = document.getElementById('indicator')
    var arrowNumber = document.getElementById('slide-number')

    // for (i=0; i<thisImg.length-1; i++) {
    //     var clone = line[0].cloneNode(true)
    //     indicator.append(clone)
    // }

    j = 0
    if (window.location.hash) {
        var slideNumber = window.location.hash.substring(1).match(/\d+/)[0]
        j = (slideNumber - 1)
    } else {
        j = 0
    }
    thisImg[j].classList.add('img-selected')
    line[j].classList.add('line-selected')
    addText(j)

    arrowNumber.innerHTML = j + 1 + '/' + thisImg.length

    $('#next-img').on('click', function() {
        if (j < thisImg.length-1) {
            thisImg[j].classList.remove('img-selected')
            line[j].classList.remove('line-selected')
            thisImg[j+1].classList.add('img-selected')
            line[j+1].classList.add('line-selected')
            j++
            // window.location.hash = 'slide-' + (j + 1)
            addText(j)
        } else {
            thisImg[j].classList.remove('img-selected')
            line[j].classList.remove('line-selected')
            thisImg[0].classList.add('img-selected')
            line[0].classList.add('line-selected')
            j = 0
            // window.location.hash = 'slide-' + (j + 1)
            addText(j)
        }
        arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
    })

    $('#prev-img').on('click', function() {
        if (j>0) {
            thisImg[j].classList.remove('img-selected')
            line[j].classList.remove('line-selected')
            thisImg[j-1].classList.add('img-selected')
            line[j-1].classList.add('line-selected')
            j--
            // window.location.hash = 'slide-' + (j + 1)
            addText(j)
        } else {
            thisImg[j].classList.remove('img-selected')
            line[j].classList.remove('line-selected')
            thisImg[thisImg.length-1].classList.add('img-selected')
            line[thisImg.length-1].classList.add('line-selected')
            j = thisImg.length-1
            // window.location.hash = 'slide-' + (j + 1)
            addText(j)
        }
        arrowNumber.innerHTML = j + 1 + '/' + thisImg.length
    })


    //Mouse out of document
    document.addEventListener('mouseout', function(){
        arrowNumber.style.opacity = '0'
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

    var related = document.getElementById('related')

    var header = document.querySelector('header')

    related.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    related.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})
    header.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    header.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})
    purchase.addEventListener('mouseenter', function(){arrowNumber.style.display = 'none'})
    purchase.addEventListener('mouseleave', function(){arrowNumber.style.display = 'block'})

}

var addText = function(slideN) {
    var slideText = document.getElementsByClassName('slide-text')

    slideText[0].innerHTML = thisImg[slideN].children[1].innerHTML

    if (slideText.length > 1)
        slideText[1].innerHTML = thisImg[slideN].children[1].innerHTML

    if (thisImg[slideN].children[1].innerHTML == '')
        $('.slide-text').addClass('display_none')
    else
        $('.slide-text').removeClass('display_none').text(thisImg[slideN].children[1].innerHTML)


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