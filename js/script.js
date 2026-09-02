const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector("#main-navigation");

navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";

    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navToggle.setAttribute(
        "aria-label",
        isOpen ? "Menü öffnen" : "Menü schließen"
    );

    navigation.classList.toggle("is-open", !isOpen);
});

const navigationLinks = navigation.querySelectorAll("a");

navigationLinks.forEach((link) => {
    link.addEventListener("click", () => {
        navigation.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menü öffnen");
    });
});

const sections = document.querySelectorAll("main section");

navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const targetId = link.getAttribute("href");
        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        navigation.classList.remove("is-open");

        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Menü öffnen");

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
            target.scrollIntoView();
            return;
        }

        const startPosition = window.scrollY;
        const targetPosition =
            target.getBoundingClientRect().top + window.scrollY;

        const distance = Math.abs(targetPosition - startPosition);

        const duration = Math.min(
            1200,
            Math.max(700, distance * 0.8)
        );

        const startTime = performance.now();

        function scrollAnimation(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            window.scrollTo(
                0,
                startPosition +
                    (targetPosition - startPosition) *
                        easedProgress
            );

            if (progress < 1) {
                requestAnimationFrame(scrollAnimation);
            }
        }

        requestAnimationFrame(scrollAnimation);
    });
});