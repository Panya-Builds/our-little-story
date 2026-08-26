/* =================================================
   SECRET PIN
================================================= */

const SECRET_PIN = "2426";


/* =================================================
   SCREEN ELEMENTS
================================================= */

const intro =
    document.getElementById("intro");

const openPage =
    document.getElementById("openPage");

const pinPage =
    document.getElementById("pinPage");

const loadingPage =
    document.getElementById("loadingPage");

const mainPage =
    document.getElementById("mainPage");


const openButton =
    document.getElementById("openButton");


/* =================================================
   PIN ELEMENTS
================================================= */

const dots =
    document.querySelectorAll(".dots span");

const keys =
    document.querySelectorAll(".keypad button");

const wrongPin =
    document.getElementById("wrongPin");


let enteredPin = "";



/* =================================================
   INTRO
================================================= */

intro.addEventListener("click", () => {

    intro.classList.add("hidden");

    openPage.classList.remove("hidden");

});



/* =================================================
   OPEN PAGE
================================================= */

openButton.addEventListener("click", (event) => {

    event.stopPropagation();

    openPage.classList.add("hidden");

    pinPage.classList.remove("hidden");

});



/* =================================================
   KEYPAD
================================================= */

keys.forEach(button => {

    button.addEventListener("click", () => {

        const key =
            button.dataset.key;


        /* CLEAR */

        if (key === "clear") {

            enteredPin =
                enteredPin.slice(0, -1);

            updateDots();

            return;
        }


        /* ENTER */

        if (key === "enter") {

            checkPin();

            return;
        }


        /* NUMBER */

        if (enteredPin.length < 4) {

            enteredPin += key;

            updateDots();

        }

    });

});



/* =================================================
   DOTS
================================================= */

function updateDots() {

    dots.forEach((dot, index) => {

        if (index < enteredPin.length) {

            dot.classList.add("active");

        } else {

            dot.classList.remove("active");

        }

    });

}



/* =================================================
   PIN CHECK
================================================= */

function checkPin() {

    if (enteredPin === SECRET_PIN) {

        wrongPin.textContent = "";

        pinPage.classList.add("hidden");

        loadingPage.classList.remove("hidden");


        setTimeout(() => {

            loadingPage.classList.add("hidden");

            mainPage.classList.remove("hidden");

            window.scrollTo(0, 0);

            revealPhotos();

        }, 3000);


    } else {

        wrongPin.textContent =
            "Hmm... that's not it ❤️";

        enteredPin = "";

        updateDots();

    }

}



/* =================================================
   PHOTO REVEAL
================================================= */

function revealPhotos() {

    const photos =
        document.querySelectorAll(".polaroid");


    photos.forEach((photo, index) => {

        setTimeout(() => {

            photo.classList.add("show");

        }, index * 300);

    });

}



/* =================================================
   SCROLL REVEAL
================================================= */

const observer =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList.add(
                        "show"
                    );

                }

            });

        },

        {
            threshold: 0.15
        }

    );


document
    .querySelectorAll(".polaroid")
    .forEach(photo => {

        observer.observe(photo);

    });

    /* =========================================================
   OPENING HEART BREAK ANIMATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const opening = document.getElementById("openingAnimation");

    if (!opening) return;

    /*
        Heart first stays on screen,
        then breaks open.
    */

    setTimeout(() => {

        opening.classList.add("break-open");

    }, 1800);


    /*
        Remove overlay after animation.
        Main website remains underneath,
        so it feels like the website is being revealed.
    */

    setTimeout(() => {

        opening.style.pointerEvents = "none";

        opening.style.opacity = "0";

        opening.style.transition =
            "opacity .45s ease";

    }, 2700);


    setTimeout(() => {

        opening.remove();

    }, 3200);

});

/* =========================================
   POLAROID SCROLL REVEAL
========================================= */

const photos = document.querySelectorAll(".polaroid");

const photoObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    }
);


/* Observe every photo */
photos.forEach((photo) => {
    photoObserver.observe(photo);
});


/*
   IMPORTANT:
   Trigger photos that are already visible
   when the website first opens.
*/

window.addEventListener("load", () => {

    setTimeout(() => {

        photos.forEach((photo) => {

            const rect = photo.getBoundingClientRect();

            if (
                rect.top < window.innerHeight &&
                rect.bottom > 0
            ) {
                photo.classList.add("show");
            }

        });

    }, 700);

});