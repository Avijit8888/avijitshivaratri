document.addEventListener("DOMContentLoaded", function () {

    const intro = document.getElementById("intro");
    const introTitle = document.getElementById("introTitle");
    const introSub = document.getElementById("introSub");
    const main = document.getElementById("mainContent");
    const sections = document.querySelectorAll("section");

    let currentScene = 0;
    let snowInterval = null;

    /* ---------------- INTRO SEQUENCE ---------------- */

    document.body.style.overflow = "hidden";

    setTimeout(() => {
        introTitle.style.opacity = 1;
    }, 1500);

    setTimeout(() => {
        introSub.style.opacity = 1;
    }, 4500);

    setTimeout(() => {
        intro.style.opacity = 0;
        intro.style.pointerEvents = "none";
        main.style.opacity = 1;
        startCinematicFlow();
    }, 9000);


    /* ---------------- SCENE DURATIONS ---------------- */

    const sceneTimings = [
        8000,  // Before Time (slow build)
        10000, // Sati (emotional intensity)
        11000, // Grief (long pause, heavy)
        9000,  // Parvati (calm strength)
        12000  // Mahashivaratri (final union, longest)
    ];


    /* ---------------- CINEMATIC FLOW ---------------- */

    function startCinematicFlow() {
        playScene(currentScene);
    }

    function playScene(index) {

        if (index >= sections.length) {
            document.body.style.overflowY = "auto"; // unlock scroll at end
            return;
        }

        const section = sections[index];

        section.classList.add("active");

        window.scrollTo({
            top: section.offsetTop,
            behavior: "smooth"
        });

        // Scene-specific effects
        handleSceneEffects(section);

        setTimeout(() => {
            currentScene++;
            playScene(currentScene);
        }, sceneTimings[index]);
    }


    /* ---------------- SCENE EFFECTS ---------------- */

    function handleSceneEffects(section) {

        // Reset previous effects
        stopSnow();
        section.classList.remove("heartbeat");

        // Sati Section (dark-red)
        if (section.classList.contains("dark-red")) {
            section.classList.add("heartbeat");
        }

        // Parvati Section (snow)
        if (section.classList.contains("snow")) {
            startSnow();
        }
    }


    /* ---------------- SNOW EFFECT ---------------- */

    function startSnow() {

        if (snowInterval) return;

        snowInterval = setInterval(() => {

            const snow = document.createElement("div");
            snow.classList.add("snowflake");
            snow.innerText = "❄";

            snow.style.left = Math.random() * window.innerWidth + "px";
            snow.style.animationDuration = (Math.random() * 5 + 5) + "s";

            document.body.appendChild(snow);

            setTimeout(() => {
                snow.remove();
            }, 10000);

        }, 300);
    }

    function stopSnow() {
        if (snowInterval) {
            clearInterval(snowInterval);
            snowInterval = null;
        }
    }


    /* ---------------- RESTART FUNCTION ---------------- */

    window.restart = function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => location.reload(), 1500);
    };

});
