/* =====================================
   1. HELPER FUNCTIONS
===================================== */

const $ = (selector, parent = document) =>
    parent.querySelector(selector);

const $$ = (selector, parent = document) =>
    [...parent.querySelectorAll(selector)];


function openModal(title, message, imageSrc = null) {

    const modal = $("#contentModal");
    const modalTitle = $("#modalTitle");
    const modalMessage = $("#modalMessage");

    modalTitle.textContent = title;

    modalMessage.textContent = message || "";

    // Remove an image from a previous modal.
    const oldImage = $(".modal-image", modal);

    if (oldImage) {
        oldImage.remove();
    }

    if (imageSrc) {

        const image = document.createElement("img");

        image.className = "modal-image";

        image.src = imageSrc;

        image.alt = title;

        image.addEventListener("error", () => {

            image.remove();

            modalMessage.textContent =
                "الصورة مش موجودة في المسار ده. راجعي اسم الملف ومكانه.";

        });

        modalMessage.before(image);

    }

    modal.classList.remove("hidden");

    document.body.style.overflow = "hidden";

    $("#closeModal").focus();

}


function closeModal() {

    $("#contentModal").classList.add("hidden");

    document.body.style.overflow = "";

}


$("#closeModal").addEventListener("click", closeModal);

$("#modalOkay").addEventListener("click", closeModal);


$("#contentModal").addEventListener("click", (event) => {

    if (event.target === $("#contentModal")) {
        closeModal();
    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeModal();

    }

});


/* =====================================
   2. OPEN BIRTHDAY SURPRISE
===================================== */

const intro = $("#intro");

const mainWebsite = $("#mainWebsite");

const envelope = $("#envelope");

const openSurpriseButton = $("#openSurprise");


openSurpriseButton.addEventListener("click", () => {

    envelope.classList.add("opened");

    openSurpriseButton.disabled = true;

    openSurpriseButton.textContent = "Opening your little world... 💜";

    setTimeout(() => {

        intro.classList.add("hidden");

        mainWebsite.classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "instant"
        });

        createConfetti(35);

    }, 900);

});


/* =====================================
   3. MOBILE NAVIGATION
===================================== */

const menuToggle = $("#menuToggle");

const navLinks = $("#navLinks");


menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuToggle.textContent = isOpen ? "×" : "☰";

});


$$(".nav-links a").forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    });

});


/* =====================================
   4. MEMORY GALLERY
===================================== */

$$(".memory-image-button").forEach((button) => {

    button.addEventListener("click", () => {

        const imageSrc = button.dataset.image;

        const caption = button.dataset.caption || "Our memory ♡";

        openModal(
            "A little memory ♡",
            caption,
            imageSrc
        );

    });

});


/* =====================================
   5. FRIENDS' LETTERS
===================================== */
document.querySelectorAll(".letter-card").forEach((card) => {

    card.addEventListener("click", () => {

        // لو الكارت فيه فويس، نشغّله بدل الرسالة
        const voicePath = card.dataset.voice;

        if (voicePath) {
            const audio = document.getElementById("letterVoice");

            if (!audio) return;

            audio.pause();
            audio.src = voicePath;
            audio.currentTime = 0;

            audio.play().catch((error) => {
                console.error("Voice playback failed:", error);
            });

            return;
        }

        // باقي الكروت تفضل تفتح الرسائل عادي
        const title = card.dataset.title || "A little letter 💌";
        const message = card.dataset.message || "";

        openModal(title, message);

    });

});


/* =====================================
   6. LITTLE THINGS ABOUT YOU
===================================== */

$$(".quality-card").forEach((card) => {

    card.addEventListener("click", () => {

        const message = card.dataset.message || "";

        openModal(
            "Something special about you ♡",
            message
        );

    });

});


/* =====================================
   7. SECRET MESSAGE
===================================== */

const secretButton = $("#secretButton");

const secretMessage = $("#secretMessage");


secretButton.addEventListener("click", () => {

    const isHidden = secretMessage.classList.contains("hidden");

    secretMessage.classList.toggle("hidden");

    if (isHidden) {

        secretButton.textContent = "Your little secret is open 💜";

        createConfetti(20);

        secretMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    } else {

        secretButton.textContent = "Reveal the secret ✨";

    }

});


/* =====================================
   8. BLOW OUT THE CANDLES
===================================== */

const candles = $$(".candle");


candles.forEach((candle) => {

    candle.addEventListener("click", () => {

        candle.classList.add("blown");

    });

});


/* =====================================
   9. MAKE A WISH
===================================== */

const makeWishButton = $("#makeWish");

const wishResult = $("#wishResult");


makeWishButton.addEventListener("click", () => {

    candles.forEach((candle) => {

        candle.classList.add("blown");

    });

    wishResult.classList.remove("hidden");

    makeWishButton.textContent = "Wish sent to the universe 💫";

    makeWishButton.disabled = true;

    createConfetti(80);

    wishResult.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });

});


/* =====================================
   10. CONFETTI ANIMATION
===================================== */

function createConfetti(amount = 30) {

    const container = $("#confettiContainer");

    const decorations = [
        "💜",
        "🌸",
        "✨",
        "🦋",
        "♡",
        "🌷"
    ];

    for (let i = 0; i < amount; i++) {

        const piece = document.createElement("span");

        piece.className = "confetti-piece";

        piece.textContent =
            decorations[
                Math.floor(Math.random() * decorations.length)
            ];

        piece.style.left = `${Math.random() * 100}%`;

        piece.style.animationDelay = `${Math.random() * 1.5}s`;

        piece.style.animationDuration =
            `${2 + Math.random() * 2}s`;

        piece.style.fontSize =
            `${12 + Math.random() * 15}px`;

        container.appendChild(piece);

        setTimeout(() => {

            piece.remove();

        }, 5000);

    }

}


/* =====================================
   11. BACK TO TOP BUTTON
===================================== */

const backToTop = $("#backToTop");


window.addEventListener("scroll", () => {

    if (window.scrollY > 450) {

        backToTop.classList.add("visible");

    } else {

        backToTop.classList.remove("visible");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =====================================
   12. ACCESSIBILITY: PREVENT REPEATED WISH
===================================== */

makeWishButton.setAttribute(
    "aria-controls",
    "wishResult"
);

secretButton.setAttribute(
    "aria-controls",
    "secretMessage"
);


/* =====================================
   13. OPTIONAL: SCROLL REVEAL
===================================== */

const revealElements = $$(
    ".memory-card, .video-card, .letter-card, .quality-card"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.animate(
                        [
                            {
                                opacity: 0.3,
                                transform: "translateY(18px)"
                            },
                            {
                                opacity: 1,
                                transform: "translateY(0)"
                            }
                        ],
                        {
                            duration: 500,
                            easing: "ease-out",
                            fill: "both"
                        }
                    );

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

}


/* =====================================
   14. CONSOLE MESSAGE
===================================== */

console.log(
    "%cMade with love for the birthday girl 💜🐰",
    "color: #786293; font-size: 16px; font-weight: bold;"
);


const audio = document.getElementById("birthdayAudio");
let currentSongButton = null;

function playSong(button, songPath) {
    if (!audio) {
        console.error("Audio element not found!");
        return;
    }

    if (currentSongButton === button && !audio.paused) {
        audio.pause();
        button.textContent = "▶";
        return;
    }

    if (currentSongButton) {
        currentSongButton.textContent = "▶";
    }

    currentSongButton = button;
    audio.src = songPath;
    button.textContent = "⏸";

    audio.play()
        .then(() => {
            console.log("Song is playing!");
        })
        .catch((error) => {
            console.error("Audio error:", error);
            button.textContent = "▶";
            alert("الأغنية مش بتشتغل. افتحي Console وشوفي رسالة الخطأ.");
        });
}

if (audio) {
    audio.addEventListener("ended", () => {
        if (currentSongButton) {
            currentSongButton.textContent = "▶";
            currentSongButton = null;
        }
    });

    audio.addEventListener("error", () => {
        console.error("Audio file could not be loaded:", audio.error);
    });
}