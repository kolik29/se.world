window.onload = function() {

    //Img Preload
    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'))
            img.onload = function() {
                img.removeAttribute('data-src')
                img.style.opacity = '1'
            }
        })
        
    var items = document.getElementsByClassName('checkout-item')
    
    for (i=0; i<items.length; i++) {
        var gridXa = Math.floor(Math.random()*3 + 1)
        var gridYa = Math.floor(Math.random()*3 + 1)
        items[i].style.gridColumn = gridXa + ' / ' + (gridXa + 3)
        items[i].style.gridRow = gridYa + ' / ' + (gridYa + 3)
    }

    var bagProducts = document.getElementsByClassName('order-item')
    var total = document.getElementById('total')
    var deliveryCost = document.getElementById('delivery-cost')

    //Update bag
    var updateBag = function() {
        var products = document.getElementsByClassName('product-quantity')
        var prices = document.getElementsByClassName('product-price')
        var priceAll = 0
        for (i=0; i<products.length; i++) {
            priceAll = priceAll + parseInt(prices[i].innerHTML) * parseInt(products[i].innerHTML)
        }
        total.innerHTML = priceAll
        if (priceAll < 200) {
            deliveryCost.innerHTML = '$' + (200 - priceAll) + ' left for free shipping'
            deliveryCost.style.backgroundColor = '#77B2D6'
            deliveryCost.style.opacity = '0.5'
        } else {
            deliveryCost.innerHTML = 'Free Express UPS delivery'
            deliveryCost.style.backgroundColor = '#FFDC00'
            deliveryCost.style.opacity = '1'
        }
    }

    //Update quantity
    var updateQuantity = function(el, b) {
        var quantity = parseInt(el.querySelector('.product-quantity').innerHTML)
        el.querySelector('.product-quantity').innerHTML = quantity + b
        if ((quantity == 1) && (b == -1)) {
            el.remove()
            if (bagProducts.length == 0) {
                console.log('epmtyyyyy')
            }
        }
        updateBag()
    }

    // for (i=0; i<bagProducts.length; i++) {
    //     let prod = bagProducts[i]
    //     //quantity
    //     prod.querySelector('.minus').addEventListener('click', function () {updateQuantity(prod, -1)})
    //     prod.querySelector('.plus').addEventListener('click', function () {updateQuantity(prod, 1)})
    // }

    document.addEventListener('click', function(e) {
        if (e.target)
            if (e.target.classList.contains('minus'))
                updateQuantity(e.target.closest('.order-item'), -1);
            else if (e.target.classList.contains('plus'))
                updateQuantity(e.target.closest('.order-item'), 1);
    })

    updateBag()
}
    