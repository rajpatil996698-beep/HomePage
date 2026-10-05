/* =========================================
   RAJ PAWAR PORTFOLIO
   PROFESSIONAL JAVASCRIPT
========================================= */


/* ---------- GET ELEMENTS ---------- */

const slides =
    document.querySelectorAll(".slide");

const dots =
    document.querySelectorAll(".dot");

const slider =
    document.querySelector(".slider");


/* ---------- SLIDER STATE ---------- */

let currentSlide = 0;

let autoSlide;


/* =========================================
   SHOW SLIDE
========================================= */

function showSlide(index) {

    if (index >= slides.length) {
        index = 0;
    }

    if (index < 0) {
        index = slides.length - 1;
    }


    /* Remove active state */

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });


    dots.forEach(function(dot) {

        dot.classList.remove("active");

    });


    /* Activate selected slide */

    slides[index].classList.add("active");

    dots[index].classList.add("active");


    currentSlide = index;


    /* Animate skill bars */

    animateSkills();

}


/* =========================================
   NEXT SLIDE
========================================= */

function nextSlide() {

    showSlide(currentSlide + 1);

}


/* =========================================
   PREVIOUS SLIDE
========================================= */

function previousSlide() {

    showSlide(currentSlide - 1);

}


/* =========================================
   GO TO SPECIFIC SLIDE
========================================= */

function goToSlide(index) {

    showSlide(index);

    restartAutoSlide();

}


/* =========================================
   AUTO SLIDER
========================================= */

function startAutoSlide() {

    autoSlide = setInterval(function() {

        nextSlide();

    }, 7000);

}


function stopAutoSlide() {

    clearInterval(autoSlide);

}


function restartAutoSlide() {

    stopAutoSlide();

    startAutoSlide();

}


/* =========================================
   PAUSE ON MOUSE HOVER
========================================= */

if (slider) {

    slider.addEventListener(
        "mouseenter",
        stopAutoSlide
    );


    slider.addEventListener(
        "mouseleave",
        startAutoSlide
    );

}


/* =========================================
   SKILL BAR ANIMATION
========================================= */

function animateSkills() {

    const activeSlide =
        document.querySelector(
            ".slide.active"
        );


    if (!activeSlide) {
        return;
    }


    const skillBars =
        activeSlide.querySelectorAll(
            ".skill-progress"
        );


    skillBars.forEach(function(bar) {

        const width =
            bar.getAttribute(
                "data-width"
            );


        bar.style.setProperty(
            "--skill-width",
            width
        );


        bar.style.width = width;

    });

}


/* =========================================
   SAY HELLO
========================================= */

function sayHello() {

    const message =
        document.getElementById(
            "helloMessage"
        );


    if (!message) {
        return;
    }


    message.textContent =
        "✨ Thanks for visiting Raj Pawar's portfolio!";


    message.style.opacity = "0";


    setTimeout(function() {

        message.style.transition =
            "opacity 0.4s ease";

        message.style.opacity = "1";

    }, 50);


    setTimeout(function() {

        message.style.opacity = "0";

    }, 4000);

}


/* =========================================
   SHOW SKILLS
========================================= */

function showSkills() {

    const message =
        document.getElementById(
            "skillMessage"
        );


    if (!message) {
        return;
    }


    animateSkills();


    message.textContent =
        "✓ My current technical skills are displayed above.";


    setTimeout(function() {

        message.textContent = "";

    }, 4000);

}


/* =========================================
   KEYBOARD CONTROLS
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextSlide();

            restartAutoSlide();

        }


        if (event.key === "ArrowLeft") {

            previousSlide();

            restartAutoSlide();

        }

    }
);


/* =========================================
   TOUCH / SWIPE SUPPORT
========================================= */

let touchStartX = 0;

let touchEndX = 0;


if (slider) {

    slider.addEventListener(
        "touchstart",
        function(event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        { passive: true }
    );


    slider.addEventListener(
        "touchend",
        function(event) {

            touchEndX =
                event.changedTouches[0].screenX;

            handleSwipe();

        },
        { passive: true }
    );

}


function handleSwipe() {

    const minimumSwipe = 50;

    const distance =
        touchEndX - touchStartX;


    if (
        Math.abs(distance) <
        minimumSwipe
    ) {
        return;
    }


    if (distance < 0) {

        nextSlide();

    } else {

        previousSlide();

    }


    restartAutoSlide();

}


/* =========================================
   INITIALIZE
========================================= */

showSlide(0);

startAutoSlide();

animateSkills();
