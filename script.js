//P5 preloader

document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');

window.addEventListener('resize', () => { 
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
  })

var images = new Array();
// var x = 102;
// var y = 214;
var x = 258
var y = 168

var container = document.getElementById('preloader');

function setup() {
    var canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('preloader')

    var i = 0;

    let preloader_images = $('#preloader').data('images')

    try {
      preloader_images.forEach(item => {
          images[i] = loadImage(item);
          i++;
      })
    } catch {}
}

function windowResized() {
  resizeCanvas(container.offsetWidth, container.offsetHeight);
}

var i = 1;
function mouseMoved() {
    if (i<7) {
        try {
          image(images[0], mouseX-x/2, mouseY-y/2, x, y);
        } catch {}
        i = i + 0.05;
    } else {
        i = 1;
    }
}

// function mousePressed() { 
//     clear(); 
//     i = 1;
// }

// function touchMoved () {
//     if (i<6) {
//         image(images[Math.trunc(i)], mouseX-x/2, mouseY-y/2, x, y);
//         i = i + 0.05;
//     } else {
//         i = 1;
//     }
// }

function touchMoved () {
  try {
    if (i<6) {
        image(images[0], mouseX-x/2, mouseY-y/2, x, y);
        i = i + 0.05;
    } else {
        i = 1;
    }
  } catch {}
}



window.onload = function() {

function hidePreloader() {
  container.classList.add('gone')
  setTimeout(function() {
    document.body.style.overflow = 'scroll'
  },800)
}

try {
  var preloader = document.getElementById('preloader');
  preloader.addEventListener('click', function() {
    hidePreloader()
  }, { passive: true })
  preloader.addEventListener('wheel', function() {
    hidePreloader()
  }, { passive: true })
} catch {}



// Triangles
var triangle = document.querySelector('.triangle')
var bubbles = document.getElementsByClassName('bubble')

for (i=0; i<bubbles.length; i++) {
    var clone = triangle.cloneNode(true)
    bubbles[i].append(clone);
}

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

// // Countdown

// Set the date we're counting down to
var countDownDate = new Date("Sept 10, 2021 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  var milliseconds = Math.floor((distance % (1000)));

  try {
    var countdown = document.getElementsByClassName('countdown')
    // Display the result in the element with id="demo"
    countdown[0].innerHTML = 'Drop in ' + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s " + milliseconds + 'ms';
    countdown[1].innerHTML = 'Drop in ' + days + "d " + hours + "h "
    + minutes + "m " + seconds + "s " + milliseconds + 'ms';

    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      countdown[0].innerHTML = "EXPIRED";
      countdown[1].innerHTML = "EXPIRED";
    }
  } catch {}
}, 0);

}