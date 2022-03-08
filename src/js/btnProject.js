function btnProject(){
    const buttonView = document.querySelector('.button--view');
    const btnProject = document.querySelector('#btnProject');
    const projectsWeb = document.querySelector('.projects--web');

    btnProject.addEventListener("click", () => {
        if (projectsWeb.classList.contains("oculto")) {
            projectsWeb.classList.remove("oculto");
            buttonView.textContent = "Ocultar";
        } else {
            projectsWeb.classList.add("oculto");
            buttonView.textContent = "View";
        }
      });
}