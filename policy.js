window.onload = function () {
    // Menu
    var rotatingicon = document.querySelector('.rotating-icon')
    var bag = document.querySelector('.bag')

    rotatingicon.addEventListener('click', function(){
        if (!bag.classList.contains('open')) {
            bag.classList.add('open')
            $('header').css({
              'z-index': 20
            })
        } else {
            bag.classList.remove('open')
            $('header').css({
              'z-index': ''
            })
        }
    })
}