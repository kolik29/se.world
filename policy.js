window.onload = function () {
    // Menu
    var rotatingicon = document.querySelector('.rotating-icon')
    var bag = document.querySelector('.bag')

    rotatingicon.addEventListener('click', function(){
        if (!bag.classList.contains('open')) {
            bag.classList.add('open')
        } else {
            bag.classList.remove('open')
        }
    })
}