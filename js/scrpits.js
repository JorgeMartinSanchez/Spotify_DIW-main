window.addEventListener("load", () => {
  var main = document.getElementsByTagName("main")[0];
  let intro;
  let cartas;
  let carta = "";
  let cont = 0;
  fetch("audios.json").then(response => response.json()).then(audios => {
    audios.forEach(audio => {
      cont++;
      if (cont == 1 || cont == 3) {
        intro = document.createElement("div");
        intro.classList.add("container-flex");
        intro.classList.add("text-center");
        intro.classList.add("col-12");
      }
      carta = document.createElement("div");
      carta.classList.add("music-card");
      carta.classList.add("col-6");
      carta.setAttribute("id", "carta");
        let enlace = document.createElement("a");
        enlace.setAttribute("id", "enlace");
        enlace.setAttribute("href", "#");
          let imagen = document.createElement("img");
          imagen.setAttribute("src", audio.imagen);
          let parrafo = document.createElement("p");
          parrafo.innerHTML=audio.artista + " - " + audio.nombre;
      
      enlace.appendChild(imagen);

      carta.appendChild(enlace);
      carta.appendChild(parrafo);
      intro.appendChild(carta);
      if (cont == 2 || cont == 4) {
        main.appendChild(intro);
      }
    });

    let primeraFila = main.firstChild;
    let segundaFila = main.lastChild;

    let fary = primeraFila.firstChild;
    let supermerk = primeraFila.lastChild;
    let banger = segundaFila.firstChild;
    let duki = segundaFila.lastChild;

    fary.addEventListener("click", ()=>{
      main.innerHTML="";
    });

    supermerk.addEventListener("click", ()=>{
      main.innerHTML="";
    });

    banger.addEventListener("click", ()=>{
      main.innerHTML="";
    });

    duki.addEventListener("click", ()=>{
      main.innerHTML="";
    });
  });
});
