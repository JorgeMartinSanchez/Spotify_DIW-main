//creamos las lista de canciones
let tema = document.querySelector("#cancion");

//TO-DO: CAMBIAR DISEÑO AL PONER BOTÓN ALEATORIO ACTIVO O INACTIVO
//TO-DO: CAMBIAR DISEÑO AL PONER BOTÓN REPETIR ACTIVO O INACTIVO
//TO-DO: PODER IR CAMBIANDO CON EL MENÚ LATERAL
//TO-DO: AÑADIR CANCIONES SUPER MERK-2
//TO-DO: CANCIONES DUKI NO CARGAN

tema.volume = 0.5;
let posicion = 0;
let repitiendo = false;
let randomOn = false;
let canciones;
var main = document.getElementsByTagName("main")[0];

window.addEventListener("load", () => {
  crearMain();

  var inicio = document.querySelector(
    "body > aside > div.menulink > a:nth-child(1)"
  );

  inicio.addEventListener("click", () => {
    main.innerHTML = "";
    crearMain();
  });
});

function crearMain() {
  let intro;
  let cartas;
  let carta = "";
  let cont = 0;
  fetch("audios.json")
    .then((response) => response.json())
    .then((audios) => {
      audios.forEach((audio) => {
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
        parrafo.innerHTML = audio.artista + " - " + audio.nombre;

        enlace.appendChild(imagen);

        carta.appendChild(enlace);
        carta.appendChild(parrafo);
        intro.appendChild(carta);
        if (cont == 2 || cont == 4) {
          main.appendChild(intro);
        }
      });

      var discos = document.getElementsByClassName("music-card");
      cont = 1;
      for (let i = 0; i < discos.length; i++) {
        discos[i].addEventListener("click", () => {
          main.innerHTML = "";
          var album = `<div class = "albumes">
          <div class="album">
              <img src="${audios[i].imagen}" alt="">
              <div class = "texto-album">
                <h1>${audios[i].nombre}</h1>
                <h3>${audios[i].artista}</h3> 
              </div>
          </div>
          <div class="cancion">
            <ol>`;

          cont = 1;
          audios[i].canciones.forEach((audio) => {
            album += ` <li class="canciones" id="${audio.audio}">
            <p>${cont} - ${audio.nombre}</p>
            <p>${audio.duracion}</p>
            </li>`;
            cont++;
          });

          album += `
              </ol>
            </div>
          </div>
        `;
          main.innerHTML = album;

          //Esto es para cambiar el color de todos los parrafos al clickar otro
          var parrafosMenu = [];
          parrafosMenu.push(document.querySelectorAll(".menu-p")[i]);
          var casita = document.querySelector("#casita");
          console.log(parrafosMenu);
          

          parrafosMenu.forEach(function (elemento) {
            // Establece que todos los elementos del menú tengan un color de texto negro

            parrafoHome.style.color = "#818181";
            casita.style.color = "#818181";
            parrafoHome.parentNode.style.borderLeft = "0px";
            elemento.style.color = "#818181";
            elemento.parentNode.style.borderLeft = "0px";


            // Cambia el color de texto del elemento seleccionado a blanco
            elemento.style.color = "white";
            elemento.parentNode.style.borderLeft = "2px solid green";

          });

          canciones = document.getElementsByClassName("canciones");
          for (let j = 0; j < canciones.length; j++) {
            canciones[j].addEventListener("click", () => {
              let tema = document.querySelector("#cancion");
              tema.src = canciones[j].id;
              posicion = j;
              cargarCancion(j);
              reproducir();
            });
          }
        });
      }
    });
}

//CONTROLES AUDIO
document.querySelector("#aleatorio").addEventListener("click", aleatorio);
document.querySelector("#anterior").addEventListener("click", retroceder);
document.querySelector("#siguiente").addEventListener("click", avanzar);
document.querySelector("#loop").addEventListener("click", repetir);

let boton_play = document.querySelector("#play");
boton_play.addEventListener("click", reproducir);

let mute = document.querySelector("#mute");
mute.addEventListener("click", () => {
  tema.volume = 0;
  control_volumen.value = 0;
});

let volum_max = document.querySelector("#volum_max");
volum_max.addEventListener("click", () => {
  tema.volume = 1;
  control_volumen.value = 1;
});

let control_volumen = document.querySelector("#volumen");
control_volumen.addEventListener("change", () => {
  tema.volume = control_volumen.value;
});

let barra = document.querySelector("#barra");
barra.addEventListener("change", () => {
  tema.currentTime = barra.value;
});

function reproducir() {
  cargarCancion(posicion);
  if (tema.paused) {
    tema.play();
    boton_play.className = "fas fa-pause-circle";
    tema.addEventListener("timeupdate", () => {
      barra.value = tema.currentTime;
      barra.max = tema.duration;
    });
    tema.addEventListener("ended", continuar);
  } else {
    tema.pause();
    boton_play.className = "fas fa-play-circle";
  }
}

function pausar() {
  tema.pause();
}

function continuar() {
  tema.removeEventListener("ended", continuar);
  if (randomOn) {
    posicion = Math.floor(Math.random() * canciones.length);
  } else if (!repitiendo) {
    if (posicion >= canciones.length - 1) {
      posicion = 0;
    } else {
      posicion++;
    }
  }

  cargarCancion(posicion);
  tema.src = canciones[posicion].id;
  reproducir();
}

function retroceder() {
  if (posicion == 0) {
    posicion = canciones.length - 1;
  } else {
    posicion--;
  }

  tema.src = canciones[posicion].id;
  reproducir();
}

function avanzar() {
  if (posicion >= canciones.length - 1) {
    posicion = 0;
  } else {
    posicion++;
  }

  tema.src = canciones[posicion].id;
  reproducir();
}

function repetir() {
  document.querySelector("#loop").classList.toggle("activo");
  if (repitiendo) {
    repitiendo = false;
  } else {
    repitiendo = true;
    randomOn = false;
  }
}

function cargarCancion(i){
  document.querySelector("#nombreCancion").innerHTML = (i + 1) + ". " + canciones[i].innerHTML;
}

function aleatorio() {
  document.querySelector("#aleatorio").classList.toggle("activo");
  if (randomOn) {
    randomOn = false;
  } else {
    randomOn = true;
    repitiendo = false;
  }
}

//Esto es para cambiar el color de todos los parrafos al clickar otro
var parrafosMenu = document.querySelectorAll(".menu-p");
var parrafoHome = document.querySelector(".home-p");
var casita = document.querySelector("#casita");

parrafosMenu.forEach(function (elemento) {
  parrafoHome.addEventListener("click", () => {
    parrafoHome.style.color = "white";
    casita.style.color = "white";
    parrafoHome.parentNode.style.borderLeft = "2px solid green";
    elemento.style.color = "#818181";
    elemento.parentNode.style.borderLeft = "0px";
  });
  elemento.addEventListener("click", () => {
    // Establece que todos los elementos del menú tengan un color de texto negro
    parrafosMenu.forEach(function (elemento) {
      parrafoHome.style.color = "#818181";
      casita.style.color = "#818181";
      parrafoHome.parentNode.style.borderLeft = "0px";
      elemento.style.color = "#818181";
      elemento.parentNode.style.borderLeft = "0px";
    });

    // Cambia el color de texto del elemento seleccionado a blanco
    elemento.style.color = "white";
    elemento.parentNode.style.borderLeft = "2px solid green";
  });
});

fetch("audios.json")
  .then((response) => response.json())
  .then((audios) => {
    var parrafosMenu = document.getElementsByClassName("menu-p");
    var cont = 1;

    for (let i = 0; i < parrafosMenu.length; i++) {
      parrafosMenu[i].addEventListener("click", () => {
        main.innerHTML = "";
        var album = `
                <div class = "albumes">
                  <div class="album">
                      <img src="${audios[i].imagen}" alt="">
                      <div class = "texto-album">
                        <h1>${audios[i].nombre}</h1>
                        <h3>${audios[i].artista}</h3> 
                      </div>
                  </div>
                  <div class="cancion">
                    <ol>`;
        cont = 1;
        audios[i].canciones.forEach((audio) => {
          album += ` <li class="canciones" id="${audio.audio}">
          <p>${cont} - ${audio.nombre}</p>
          <p>${audio.duracion}</p>
          </li>`;
          cont++;
        });

        album += `
                    </ol>
                  </div>
                </div>
              `;
        main.innerHTML = album;

        canciones = document.getElementsByClassName("canciones");
        for (let j = 0; j < canciones.length; j++) {
          canciones[j].addEventListener("click", () => {
            let tema = document.querySelector("#cancion");
            tema.src = canciones[j].id;
            posicion = j;
            cargarCancion(j);
            reproducir();
          });
        }
      });
    }
  });