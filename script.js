/* For click animations and ting (From github javascript repo) */
function afterPageLoads() {
  var heading = document.getElementById('logo-main');
}

function addParticles() {
  var particles = 100;
  for (var i = 1; i <= particles; i++) {
      var particle = document.createElement("div");
      particle.setAttribute("class", "particle transparent particle" + i); /* Add numbered and generic classname to each image element */
      var h = $(window).height(); /* these negative values only push the particles up and left, need to fix this with margin of some sort*/
      var w = $(window).width();

      var randH = Math.floor(Math.random() * h - 5);
      var randW = Math.floor(Math.random() * w - 5);

      particle.style.top = randH / h * 100 + "%";
      particle.style.left = randW / w * 100 + "%";
      document.querySelector(".logo").appendChild(particle);
    }
    /* Particles appear 1/4 of total at a time in 4 parts */
    setTimeout(() => {
      for (var i = 0; i <= particles/4; i++) {
        $(".particle" + i).toggleClass("transparent");
      }
    },1500)
    setTimeout(() => {
      for (var i = particles/4+1; i <= particles/2; i++) {
        $(".particle" + i).toggleClass("transparent");
      }
    },2000)
    setTimeout(() => {
      for (var i = particles/2+1; i <= particles*0.75; i++) {
        $(".particle" + i).toggleClass("transparent");
      }
    },2500)
    setTimeout(() => {
      for (var i = particles*0.75+1; i <= particles; i++) {
        $(".particle" + i).toggleClass("transparent");
      }
    },3000)
};

$(document).ready(function() {
  animations();
  addParticles();
  moveParticles();
  /*addLeaves();
  for (var i = 1; i <= 14; i++) {
    animateDiv($('.leaf' + i));
  }
  leafDelay();*/
});

/* Moves particles */
var translate = 0;
function moveParticles() {
  var particles = document.getElementsByClassName("particle");
  for (var i = 0; i < particles.length; i++) {
    var currentParticle = particles[i];
    translate += 5;
    random = Math.random() * 100;
    random2 = Math.random() * 100;
    randomSize = Math.floor(Math.random() * 5); /* Scale favors the larger number - this needs work, as they just get bigger */
    currentParticle.style.transform = "translate(" + random + "px, " + random2 + "px)" + "scale(" + randomSize + "," + randomSize + ")";
  }
  console.log(randomSize);
  setTimeout(function() { moveParticles(); }, 100);
}


function makeNewPosition($container) {
    // Get viewport dimensions (remove the dimension of the div)
    var h = $container.height() - 50;
    var w = $container.width() - 50;

    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);

    return [nh, nw];
}

function animateDiv($target) {
    var newq = makeNewPosition($target.parent());
    var oldq = $target.offset();
    var speed = calcSpeed([oldq.top, oldq.left], newq);

    $target.animate({
        top: newq[0],
        left: newq[1]
    }, speed, function() {
        animateDiv($target);
    });
};

function calcSpeed(prev, next) {
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);

    var greatest = x > y ? x : y;
    var speedModifier = 0.05;
    var speed = Math.ceil(greatest / speedModifier);

    return speed;
}

/* When logo is clicked, zoom logo, fade to black & audio plays */
function logoZoom() {
  console.log('It Works');
  var audio = new Audio('audio/taliwahvoice.wav');
  audio.volume = 0.5;
  audio.play();
  setTimeout(() => {
    $("#logo-image").animate({zoom: '2000%'}, "slow");
    $("#black").animate({opacity: 1}, "slower");
  }, 300);
    $("#logo-image").zIndex = "999";
  /* Makes particles white when fade to black happens */
  var particles = document.getElementsByClassName("particle");
  for (var i = 0; i < particles.length; i++) {
    var currentParticle = particles[i];
    /*currentParticle.style.zIndex = "999";*/
    currentParticle.style.backgroundColor = "#FFF";
    currentParticle.style.border = "1px solid #FFF";
    currentParticle.style.background = "0";
  }

  setTimeout(() => {
    location.href = "about.html";
  },2000);
}

/* Fade out "S" logo and fade in full logo afterwards differing delays */
function animations() {
  setTimeout(() => {
    $("#logo-s").toggleClass("transparent");
  },700)

  setTimeout(() => {
    $("#logo-main").toggleClass("transparent");
  },1500)

  var logoMain = document.getElementById("logo-main");
  setTimeout(() => {
    logoMain.style.transform = "translateY(-30vh)";
  },2400)

  setTimeout(() => {
    $("#logo-image").toggleClass("transparent");
  },3000)

  /* Disable transitions once previous animations have finished - prevents resizing delay of logo and images when altering window size */
  setTimeout(() => {
    $("#logo-image").toggleClass("noTransition");
    $("#logo-main").toggleClass("noTransition");
  },4600)
};

function leafDelay() {
  setTimeout(() => {
    $(".leaf").toggleClass("transparent");
  },2700)
};

/* Resize currently causes bug of image being inverted transparency on resize/load
$(window).resize(function() {
  if (window.innerHeight <= 300) $("#logo-image").addClass('transparent');
  else $("#logo-image").removeClass('transparent');
}); */

document.addEventListener('DOMContentLoaded', afterPageLoads);
document.addEventListener('click', logoZoom);
