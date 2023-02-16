// 'use strict'
// /*
// +-----------------------------------------------------------+
// |                                                           |
// |                   VARIABLES STATEMENTS                    |
// |                                                           |
// +-----------------------------------------------------------+
// */

// const nombres=["Quiero Ser Libre", "Vente Conmigo Gitana", "La Cachimba", "Son Ilusiones"];
// const canciones=["1 - Quiero.mp3", "2 - Vente.mp3", "3 - Cachimba.mp3", "4 - Ilusiones.mp3"];
// var cancionChichos=document.querySelector("#cancion");
// var tituloChichos=document.querySelector("#tituloChichos");
// var divCanciones=document.querySelector("#canciones");
// var tema=document.querySelector("#cancion");
// var barra=document.querySelector("#barra");
// var barraVolumen=document.querySelector("#volumen");
// var botonMute=document.querySelector("#mute");
// var botonVolume=document.querySelector("#volumeMax");
// var botonAnterior=document.querySelector("#anterior");
// var botonSiguiente=document.querySelector("#siguiente");
// var botonAleatorio=document.querySelector("#aleatorio");
// var botonBucle=document.querySelector("#bucle");
// var h4s=[];
// var numerosExcluidos=[];
// var indice=0;
// var bucle=false;
// var aleatorio=false;

// /*
// +-----------------------------------------------------------+
// |                                                           |
// |                   FUNCTION STATEMENTS                     |
// |                                                           |
// +-----------------------------------------------------------+
// */

// //Funcion para que carguen las canciones
// function cargarCancion(i){
//     cancionChichos.src="audio/"+canciones[i]+"";
//     tituloChichos.innerHTML=nombres[i];
//     cancionChichos.currentTime=0;
//     cancionChichos.play;   
// }

// //Funcion para que la barra se mueva a la par que la musica y que el icono de play se cambie por el de stop si esta sonando y viceversa
// function reproducir(){
//     if(tema.paused){
//         tema.play();
        
//         tema.addEventListener("timeupdate", ()=>{
//             document.querySelector("#barra").value=tema.currentTime;
//             barra.max=tema.duration;
//             //document.querySelector("#actual").innerHTML=tema.currentTime;
//             //document.querySelector("#final").innerHTML=tema.duration;
//         });

//         tema.addEventListener("ended", continuar);

//         document.querySelector("#play").src="img/pause.svg";
//     }else{
//         document.querySelector("#cancion").pause();
//         document.querySelector("#play").src="img/play.svg";
//     }
// }

// //Funcion para que pase a la siguiente cuando acabe una cancion
// function continuar(){
//     tema.removeEventListener("ended", continuar);
//     if(bucle==false && aleatorio==false){
//         if(indice==nombres.length-1){
//             cargarCancion(0);
//             indice=0;
//             actualizarSeleccion();
//         }else{
//             cargarCancion(indice+1);
//             indice++;
//             actualizarSeleccion();
//         }
//         tema.play();
//     }else if(bucle==true && aleatorio==false){
//         cargarCancion(indice);
//         reproducir();
//     }else{
//         numerosExcluidos.push(indice);
//         if(numerosExcluidos.length==canciones.length){
//             numerosExcluidos=[];
//         }
//         do{
//             indice=Math.floor(Math.random() * ((canciones.length-1) - 0 + 1)) + 0;
//         }while(numerosExcluidos.includes(indice));
//         console.log(indice+" - He entrado");
//         console.log(numerosExcluidos);
//         cargarCancion(indice);
//         tema.src="audio/"+canciones[indice];
//         actualizarSeleccion();
//         reproducir();
//     }
// }

// //Funcion para que puedas parar la cancion
// function parar(){
//     tema.pause();
//     tema.currentTime=0;
//     document.querySelector("#play").src="img/play.svg";
// }

// //Funcion para que se ponga en rojo la cancion que este sonando
// function actualizarSeleccion(){
//     for(let i=0; i<nombres.length; i++){
//         document.querySelector("#tituloCancion"+i).setAttribute("class", "");
//     }
//     document.querySelector("#tituloCancion"+indice).setAttribute("class", "btn_cancion_seleccionada");
// }

// //Funcion para que vaya alante
// function avanzar(){
//     indice++;
//     if(indice==canciones.length-1){
//         cargarCancion(0);
//         tema.src="audio/"+canciones[0];
//         actualizarSeleccion();
//         reproducir();
//     }else{
//         cargarCancion(indice);
//         tema.src="audio/"+canciones[indice];
//         actualizarSeleccion();
//         reproducir();
//     }
// }

// //Funcion para que vuelva atras
// function retroceder(){
//     indice--;
//     if(indice==0){
//         indice=canciones.length-1;
//         cargarCancion(indice);
//         tema.src="audio/"+canciones[indice];
//         actualizarSeleccion();
//         reproducir();
//     }else{
//         cargarCancion(indice);
//         tema.src="audio/"+canciones[indice];
//         actualizarSeleccion();
//         reproducir();
//     }
// }

// //Funcion shuffle
// function shuffle(){
//     if(aleatorio==true){
//         aleatorio=false;
//         botonAleatorio.setAttribute("class", "");
//     }else{
//         aleatorio=true;
//         bucle=false;
//         botonBucle.setAttribute("class", "");
//         botonAleatorio.setAttribute("class", "botonSeleccionado");
//     }
// }

// //Funcion Loop
// function loop(){
//     if(bucle==true){
//         bucle=false;
//         botonBucle.setAttribute("class", "");
//     }else{
//         bucle=true;
//         aleatorio=false;
//         botonAleatorio.setAttribute("class", "");
//         botonBucle.setAttribute("class", "botonSeleccionado");
//     }
// }

// /*
// +-----------------------------------------------------------+
// |                                                           |
// |                   EVENTS STATEMENTS                       |
// |                                                           |
// +-----------------------------------------------------------+
// */

// document.querySelector("#play").addEventListener("click", reproducir);
// document.querySelector("#stop").addEventListener("click", parar);

// //Que cada vez que des a la barra la canciÃ³n se mueva
// barra.addEventListener("change", ()=> {
//     tema.currentTime=barra.value;
//     tema.play();
// });

// //Cambia la opacidad de los botones de volumen en caso de cambio
// barraVolumen.addEventListener("change", ()=> {
//     tema.volume=barraVolumen.value;
//     if(barraVolumen.value>=0.5){
//         if(barraVolumen.value>0.9){
//             botonMute.style.opacity=0.1;
//             botonVolume.style.opacity=0.9
//         }else{
//             botonMute.style.opacity=1-barraVolumen.value;
//             botonVolume.style.opacity=barraVolumen.value;
//         }
//     }else{
//         if(barraVolumen.value<0.1){
//             botonVolume.style.opacity=0.1;
//             botonMute.style.opacity=0.9
//         }else{
//             botonVolume.style.opacity=barraVolumen.value;
//             botonMute.style.opacity=1-barraVolumen.value;
//         }
//     }
// });

// //Lo mismo de la opacidad pero pulsando el boton y no la barra
// botonMute.addEventListener("click", ()=> {
//     tema.volume=0;
//     barraVolumen.value=0;
//     botonMute.style.opacity=0.9;
//     botonVolume.style.opacity=0.1;
// });

// //Lo mismo de la opacidad pero pulsando el boton y no la barra
// botonVolume.addEventListener("click", ()=> {
//     tema.volume=1;
//     barraVolumen.value=1;
//     botonVolume.style.opacity=0.9;
//     botonMute.style.opacity=0.1;
// });

// botonAleatorio.addEventListener("click", shuffle);
// botonAnterior.addEventListener("click", retroceder);
// botonSiguiente.addEventListener("click", avanzar);
// botonBucle.addEventListener("click", loop);


// /*
// +-----------------------------------------------------------+
// |                                                           |
// |                MAIN EXECUTION STATEMENTS                  |
// |                                                           |
// +-----------------------------------------------------------+
// */

// tema.volume=0.5;

// for(let i=0; i<canciones.length; i++){
//     let h4=document.createElement("h4");
//     h4.innerHTML=(i+1)+" - "+nombres[i];
//     h4.classList.add("btn_cancion");
//     h4.setAttribute("id", "tituloCancion"+i);
//     divCanciones.appendChild(h4);
//     if(i==0){
//         document.querySelector("#tituloCancion"+i).classList.add("btn_cancion_seleccionada");
//     }
//     h4.addEventListener("click", ()=>{
//         cargarCancion(i);
//         document.querySelector("#play").src="img/play.svg";
//         for(x=0; x<canciones.length; x++){
//             if(h4.innerHTML==h4s[x].innerHTML){
//                 document.querySelector("#tituloCancion"+x).classList.add("btn_cancion_seleccionada");
//                 indice=x;
//                 console.log(indice);
//             }else{
//                 document.querySelector("#tituloCancion"+x).classList.remove("btn_cancion_seleccionada");
//             }
//         }
//     });
//     h4s.push(h4);
// }


var audiosHTML;
var main = document.getElementsByTagName("main")[0];
console.log(main);
fetch("audios.json").then(response=>response.json()).then(audios=>{
    console.log(audios);
    audios.forEach(audio => {
        audiosHTML = `
    </div>
      <div class=" container-flex text-center col-12">
        <div class="music-card col-6">
          <a id="fary" href="#"><img src="${audio.imagen}" alt=""></a>
          <p>${audio.artista} - ${audio.nombre}</p>
        </div>
      </div>
        `;
        main.insertAdjacentHTML("afterbegin", audiosHTML);
    });
});
