var arrowNumber = document.getElementById('slide-number'),
    thisImg = document.getElementsByClassName('slider-item');

arrowNumber.innerHTML = 1 + '/' + thisImg.length;

function moveNumber(e) {
    var pageX = e.pageX,
        pageY = e.pageY;
    
    arrowNumber.style.opacity = 1;
    arrowNumber.style.left = pageX + 'px';
    arrowNumber.style.top = pageY - pageYOffset + 'px';
}

document.addEventListener('mousemove', moveNumber);