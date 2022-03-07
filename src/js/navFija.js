function navegacionFija() {
    const header = document.querySelector("header");
    header.classList.toggle('fijo', window.scrollY > 0);
}
