function menuFlotante() {
  // Seleccionando el botón flotante
  const btnFlotante = document.querySelector(".btn-flotante");

  // Seleccionando el nav
  const nav = document.querySelector(".nav");

  // Seleccionando el div follow
  const enlaceIcon = document.querySelector("#icon");
  enlaceIcon.classList.add("fas", "fa-bars");

//   console.log(enlaceIcon);
//   console.log(enlaceIcon.classList);
//   console.log(enlaceIcon.classList.value);

  btnFlotante.addEventListener("click", () => {
    if (nav.classList.contains("nav--float")) {
      nav.classList.remove("nav--float");
      enlaceIcon.classList.add("fas", "fa-bars");
      enlaceIcon.classList.remove("fa", "fa-remove");
    } else {
      nav.classList.add("nav--float");
      enlaceIcon.classList.remove("fas", "fa-bars");
      enlaceIcon.classList.add("fa", "fa-remove");
    }
  });
}
