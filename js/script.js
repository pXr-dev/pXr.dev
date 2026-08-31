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