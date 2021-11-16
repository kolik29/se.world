//P5 preloader

document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');

window.addEventListener('resize', () => { 
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
})

var images = new Array();
// var x = 102;
// var y = 214;
var x = 200
var y = 300
var width = 300,
    height = 300;

var container = document.getElementById('preloader'),
    urlImg = 'preloader.jpg?' + (Date.now()).toString(), preloaderImgWidth, preloaderImgHeight;

function setup() {
    var canvas = createCanvas(container.offsetWidth, container.offsetHeight);
    canvas.parent('preloader')
    // for (var i=1; i<=6; i++) {
    //     images[i] = loadImage('darvin'+i+'.svg');
    // }
    // console.log(preloaderData)
    // images[0] = loadImage(urlImg);

    var i = 0;
    try {
        preloaderData.images.forEach(item => {
            images[i] = loadImage(item);
            i++;
        })
    } catch {}
}
        function windowResized() {
            resizeCanvas(container.offsetWidth, container.offsetHeight);
        }
        
        var i = 0;
        function mouseMoved() {
            if (i<images.length) {
                console.log(images)
                getSize(images[Math.trunc(i)], (width, height) => {
                    preloaderImgWidth = width / 2;
                    preloderImgHeight = height / 2;
                    image(images[Math.trunc(i)], mouseX-preloaderImgWidth/2, mouseY-preloderImgHeight/2, preloaderImgWidth, preloderImgHeight);
                })
                i = i + 0.05;
            } else {
                i = 0;
            }
        }
        
        function mousePressed() { 
            clear(); 
            i = 1;
        }
        
        function touchMoved () {
            if (i<images.length) {
                getSize(images[Math.trunc(i)], (width, height) => {
                    preloaderImgWidth = width / 2;
                    preloderImgHeight = height / 2;
                    image(images[Math.trunc(i)], mouseX-preloaderImgWidth/2, mouseY-preloderImgHeight/2, preloaderImgWidth, preloderImgHeight);
                })
                i = i + 0.05;
            } else {
                i = 0;
            }
        }
        
        function touchMoved () {
            if (i<images.length) {       
                getSize(images[Math.trunc(i)], (width, height) => {
                    preloaderImgWidth = width / 2;
                    preloderImgHeight = height / 2;
                    image(images[Math.trunc(i)], mouseX-preloaderImgWidth/2, mouseY-preloderImgHeight/2, preloaderImgWidth, preloderImgHeight);
                })
                i = i + 0.05;
            } else {
                i = 0;
            }
        }
    
    
    window.onload = function() {
        
        try {
            function hidePreloader() {
                container.classList.add('gone')
                setTimeout(function() {
                    document.body.style.overflow = 'scroll'
                },800)

                $('body > .wrapper').removeClass('preloader-overflow').css({
                    'height': '',
                    'max-height': '',
                });
            }
            
            var preloader = document.getElementById('preloader');
            preloader.addEventListener('click', function() {
                hidePreloader()
            })
            preloader.addEventListener('wheel', function() {
                hidePreloader()
            }, {
                passive: true
            })
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
            } else {
                bag.classList.remove('open')
            }
        })
        
        // // Countdown
        try {
            countdownDate(preloaderData.name, preloaderData.date);
        } catch {}
        
    }

function countdownDate(name, date) {
    $('#new-item').text(name);

    var countDownDate = new Date(Number(date) * 1000);

    // Update the count down every 1 second
    if ($('.countdown').length)
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
        }, 0);
}

function getSize(img, callback){   
    callback(img.width, img.height);
}