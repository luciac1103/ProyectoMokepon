const sectionReiniciar = document.getElementById("reiniciar")
const btnMascotaJugador = document.getElementById('btn-mascota')

const sectionAtaque  = document.getElementById("seleccionar-ataque")
const btnReiniciar = document.getElementById("btn-reiniciar")

let sectionSelectMascota  = document.getElementById("seleccionar-mascota")
const spanMascotaJugador = document.getElementById("mascota-jugador")

const spanMascotaEnemigo = document.getElementById("mascota-enemigo")

const spanVidasJugador=document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const sectionMensajes = document.getElementById("resultado")
const ataquesJugador = document.getElementById("ataques-jugador")
const ataquesEnemigo = document.getElementById("ataques-enemigo")

const contenedorTarjetas = document.getElementById("contenedorTarjetas")
const contenedorAtaques = document.getElementById("contenedorAtaques")

const sectionVerMapa = document.getElementById("ver-mapa")
const mapa = document.getElementById("mapa")

let jugadorId = null
let enemigoId  = null
let mokepones = []
let mokeponesEnemigos = []
//let ataqueJugador
let ataqueEnemigo =[]
let opcionMokepones
let inHipodoge
let inCapipepo 
let inRatigueya
let mascotaJugador 
let mascotaJugadorObjeto
let ataquesMokepon
let ataquesMokeponEnemigo
let btnFuego 
let btnAgua 
let btnTierra 
let botones = []
let ataqueSeleccJugador =[]
let indexAtaquejugador 
let indexAtaqueEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0
let vidasJugador = 3
let vidasEnemigo = 3
let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"
let alturaBuscada
let anchoMapa = window.innerWidth - 20
const anchoMaxMapa = 350

if(anchoMapa > anchoMaxMapa){
    anchoMapa = anchoMaxMapa - 20
}

alturaBuscada = anchoMapa*600/800
mapa.width = anchoMapa
mapa.height = alturaBuscada

class Mokepon{
    constructor(nombre, foto, vida, fotoMapa, id = 0){
        this.id = id
        this.nombre = nombre
        this.foto = foto 
        this.vida = vida
        this.ataques =[]
        this.ancho = 40
        this.alto = 40
        this.x = aleatorio(0, mapa.width - this.ancho)
        this.y = aleatorio(0,mapa.height - this.alto)
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }
    pintarMokepon(){
        lienzo.drawImage(this.mapaFoto,this.x,this.y,this.ancho,this.alto)
    }
}

let objHipodoge = new Mokepon('Hipodoge', "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
let objCapipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
let objRatigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png",5, "./assets/ratigueya.png")

//let objHipodogeEnemigo = new Mokepon('Hipodoge', "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png")
//let objCapipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png")
//let objRatigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png",5, "./assets/ratigueya.png")
const HIPODOGE_ATAQUES = [
    {nombre: "Agua", id: "btn-agua"},
    {nombre: "Agua", id: "btn-agua"},
    {nombre: "Agua", id: "btn-agua"},
    {nombre: "Tierra", id: "btn-tierra"},
    {nombre: "Fuego", id: "btn-fuego"},
]

const CAPIPEPO_ATAQUES = [
    {nombre: "Tierra", id: "btn-tierra"},
    {nombre: "Tierra", id: "btn-tierra"},
    {nombre: "Tierra", id: "btn-tierra"},
    {nombre: "Agua", id: "btn-agua"},
    {nombre: "Fuego", id: "btn-fuego"},
]

const RATIGUEYA_ATAQUES = [
    {nombre: "Fuego", id: "btn-fuego"},
    {nombre: "Fuego", id: "btn-fuego"},
    {nombre: "Fuego", id: "btn-fuego"},
    {nombre: "Agua", id: "btn-agua"},
    {nombre: "Tierra", id: "btn-tierra"},
]

objHipodoge.ataques.push(...HIPODOGE_ATAQUES)
//objHipodogeEnemigo.ataques.push(...HIPODOGE_ATAQUES)
objCapipepo.ataques.push(...CAPIPEPO_ATAQUES)
//objCapipepoEnemigo.ataques.push(...CAPIPEPO_ATAQUES)
objRatigueya.ataques.push(...RATIGUEYA_ATAQUES)
//objRatigueyaEnemigo.ataques.push(...RATIGUEYA_ATAQUES)

mokepones.push(objHipodoge, objCapipepo, objRatigueya)
//console.log(mokepones)

function iniciarJuego(){
    sectionAtaque.style.display = "none"
    sectionVerMapa.style.display = "none"
    mokepones.forEach((mokepon) =>{
        opcionMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre} />
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
        
    contenedorTarjetas.innerHTML += opcionMokepones

     inHipodoge = document.getElementById("Hipodoge")
     //console.log(inHipodoge)
     inCapipepo = document.getElementById("Capipepo")
     inRatigueya = document.getElementById("Ratigueya")
    })
    
    sectionReiniciar.style.display = "none"
    btnMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    btnReiniciar.addEventListener("click", reiniciarJuego)
    unirseAlJuego()
}
function unirseAlJuego(){
    //fetch("http://localhost:8080/unirse")
    fetch("http://192.168.1.10:8080/unirse")
        .then((res) => {
            //console.log(res)
            if(res.ok){
                res.text()
                    .then((respuesta) => {
                        console.log(respuesta)
                        jugadorId = respuesta
                    })
            }
        })
}
function seleccionarMascotaJugador(){    
    if(inHipodoge.checked){
        spanMascotaJugador.innerHTML = inHipodoge.id
        mascotaJugador = inHipodoge.id
    }else if(inCapipepo.checked){
        spanMascotaJugador.innerHTML = inCapipepo.id
        mascotaJugador = inCapipepo.id
    }else if(inRatigueya.checked){
        spanMascotaJugador.innerHTML = inRatigueya.id
        mascotaJugador = inRatigueya.id
    }else{
        alert("Debe seleccionar alguna de las mascotas")
        return
    }
    sectionSelectMascota.style.display = "none" 

    seleccionarMokepon(mascotaJugador)
    extraerAtaques(mascotaJugador)
    sectionVerMapa.style.display = "flex"
    iniciarMapa()
}
function seleccionarMokepon(mascotaJugador){
    fetch(`http://192.168.1.10:8080/mokepon/${jugadorId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: mascotaJugador
        })
    })
}
function extraerAtaques(mascotaJugador){
    let ataques 
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            ataques = mokepones[i].ataques
        }        
    }
    mostrarAtaques(ataques)
}
function mostrarAtaques(ataques){
    ataques.forEach((ataque) => {
        ataquesMokepon = `<button id=${ataque.id} class="btn-ataque BAtaque">${ataque.nombre}</button>`

        contenedorAtaques.innerHTML += ataquesMokepon        
    })
    btnFuego = document.getElementById("btn-fuego")
    btnAgua = document.getElementById("btn-agua")
    btnTierra = document.getElementById("btn-tierra")
    botones = document.querySelectorAll(".BAtaque")

    //btnFuego.addEventListener("click", ataqueFuego)
    //btnAgua.addEventListener("click", ataqueAgua)
    //btnTierra.addEventListener("click", ataqueTierra)
}
function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e)=>{
            if(e.target.textContent === "Fuego"){
                ataqueSeleccJugador.push("Fuego")
                console.log(ataqueSeleccJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else if(e.target.textContent === "Agua"){
                ataqueSeleccJugador.push("Agua")
                console.log(ataqueSeleccJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }else{
                ataqueSeleccJugador.push("Tierra")
                console.log(ataqueSeleccJugador)
                boton.style.background = '#112f58'
                boton.disabled = true
            }
            //ataqueAleatorioEnemigo()
            if(ataqueSeleccJugador.length == 5){
                enviarAtaques()
            }
            
        })
    })
    
}
function enviarAtaques(){
    console.log('Enviar ataques', ataqueSeleccJugador);
    fetch(`http://192.168.1.10:8080/mokepon/${jugadorId}/ataques`, {
        method: "post",
        headers: {
            "Content-type":"application/json"
        },
        body:  JSON.stringify({
            ataques: ataqueSeleccJugador
        })
    })

    intervalo = setInterval(obtenerAtaques, 50)
}
function obtenerAtaques(){
    console.log('OBTENER ATAQUES');
    fetch(`http://192.168.1.10:8080/mokepon/${enemigoId}/ataques`)
        .then(function(res) {
            if(res.ok){
                res.json()
                .then(function({ ataques }){
                    if(ataques.length === 5){
                        ataqueEnemigo = ataques
                        combate()
                    }
                })
            }
        })
}
function seleccionarMascotaEnemigo(enemigo){
    //let mascotaAleatoria = aleatorio(0,mokepones.length-1)
    spanMascotaEnemigo.innerHTML = enemigo.nombre
    ataquesMokeponEnemigo = enemigo.ataques
    //console.log("enemigo"+enemigo.ataques);
    secuenciaAtaque()
}

//function ataqueAleatorioEnemigo(){
  //  let ataqueAleatorio = aleatorio(0,ataquesMokeponEnemigo.length-1)
    //if(ataqueAleatorio==0 || ataqueAleatorio ==1){
      //  ataqueEnemigo.push("Fuego")
    //}else if(ataqueAleatorio == 3 || ataqueAleatorio == 4){
      //  ataqueEnemigo.push("Agua")
    //}else{
      //  ataqueEnemigo.push("Tierra")
    //}
    //console.log(ataqueEnemigo)
    //combate()
    //iniciarPelea()
//}
//function iniciarPelea(){
  //  if(ataqueSeleccJugador.length == 5){
    //    combate()
    //}
//}
function indexAmbosOponentes(jugador,enemigo){
    indexAtaquejugador = ataqueSeleccJugador[jugador]
    indexAtaqueEnemigo = ataqueEnemigo[enemigo]
}
function combate(){
    clearInterval(intervalo)

    for (let i = 0; i < ataqueSeleccJugador.length; i++) {
       if(ataqueSeleccJugador[i]===ataqueEnemigo[i]){
            indexAmbosOponentes(i,i)
            crearMensaje("EMPATE")
        }else if(ataqueSeleccJugador[i] === "Fuego" && ataqueEnemigo[i] ==="Tierra"){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueSeleccJugador[i] === "Agua" && ataqueEnemigo[i] === "Fuego"){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else if(ataqueSeleccJugador[i] === "Tierra" && ataqueEnemigo[i] === "Agua"){
            indexAmbosOponentes(i,i)
            crearMensaje("GANASTE")
            victoriasJugador++
            spanVidasJugador.innerHTML = victoriasJugador
        }else{
            indexAmbosOponentes(i,i)
            crearMensaje("PERDISTE")
            victoriasEnemigo++
            spanVidasEnemigo.innerHTML = victoriasEnemigo
        }         
    }
    revisarVidas()
}
function revisarVidas(){
    if(victoriasJugador === victoriasEnemigo){
        crearMensajeFinal("Esto fue un empate!!")        
    }else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("FELICIDADES!! GANASTE 😄")        
    }else{
        crearMensajeFinal("LO SIENTO, PERDISTE 😞")
    }
}
function crearMensaje(resultado){    
    let nuevoAtaqueJugador = document.createElement("p")
    let nuevoAtaqueEnemigo = document.createElement("p")

    sectionMensajes.innerHTML = resultado
    nuevoAtaqueJugador.innerHTML = indexAtaquejugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    ataquesJugador.appendChild(nuevoAtaqueJugador)
    ataquesEnemigo.appendChild(nuevoAtaqueEnemigo)
}
function crearMensajeFinal(resultadoF){
    sectionMensajes.innerHTML = resultadoF
    sectionReiniciar.style.display = "block"
}
function reiniciarJuego(){
    location.reload()
}
function aleatorio(min, max){
    return Math.floor(Math.random()*(max-min+1)+min)
}
function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0,0, mapa.clientWidth, mapa.clientHeight)
    lienzo.drawImage(mapaBackground, 0,0, mapa.width,mapa.height)
    mascotaJugadorObjeto.pintarMokepon()
    enviarPosicion(mascotaJugadorObjeto.x, mascotaJugadorObjeto.y)
    mokeponesEnemigos.forEach(function (mokepon) {
        mokepon.pintarMokepon()
        revisarColision(mokepon)
    })
    //objHipodogeEnemigo.pintarMokepon()
    //objCapipepoEnemigo.pintarMokepon()
    //objRatigueyaEnemigo.pintarMokepon()
}
function enviarPosicion(x, y){
    fetch(`http://192.168.1.10:8080/mokepon/${jugadorId}/posicion`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then(function(res) {
        if(res.ok){
            res.json()
            .then(function({ enemigos }){
                mokeponesEnemigos = enemigos.map(function(enemigo) {
                    //console.log({enemigo});
                    let mokeponEnemigo = null
                    console.log(enemigo.mokepon.nombre)
                    const mokeponNombre = enemigo.mokepon.nombre || ""
                    if(mokeponNombre === "Hipodoge"){
                        mokeponEnemigo = new Mokepon('Hipodoge', "./assets/mokepons_mokepon_hipodoge_attack.png", 5, "./assets/hipodoge.png", enemigo.id)
                    }else if(mokeponNombre === "Capipepo"){
                        mokeponEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5, "./assets/capipepo.png", enemigo.id)
                    }else if(mokeponNombre === "Ratigueya"){
                        mokeponEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png",5, "./assets/ratigueya.png", enemigo.id)
                    }
                            
                    mokeponEnemigo.x = enemigo.x || 0
                    mokeponEnemigo.y = enemigo.y || 0
                    return mokeponEnemigo
                    //mokeponEnemigo.pintarMokepon()
                })  
            })
        }
    })
}
function moverArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}
function moverAbajo(){
   mascotaJugadorObjeto.velocidadY = 5
}
function moverDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}
function moverIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}
function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}
function sePresionoTecla(event){
    //console.log(event.key)
    switch (event.key) {
        case 'ArrowUp':
            moverArriba()            
            break
        case 'ArrowDown':
            moverAbajo()          
            break
        case 'ArrowRight':
            moverDerecha()           
            break
        case 'ArrowLeft':
            moverIzquierda()           
            break    
        default:
            break
    }
}
function iniciarMapa(){
    //mapa.width = 320
    //mapa.height = 240
    mascotaJugadorObjeto = obtenerObjetoMascota(mascotaJugador)
    intervalo = setInterval(pintarCanvas, 50)
    //lienzo.fillRect(5,15,20,40)
    window.addEventListener("keydown", sePresionoTecla)
    window.addEventListener("keyup", detenerMovimiento)
}
function obtenerObjetoMascota(mascotaJugador){
    for (let i = 0; i < mokepones.length; i++) {
        if(mascotaJugador === mokepones[i].nombre){
            return mokepones[i]
        }        
    }
}
function revisarColision(enemigo){
    const arribaEnemigo = enemigo.y
    const abajoEnemigo = enemigo.y + enemigo.alto
    const derechaEnemigo = enemigo.x + enemigo.ancho
    const izquierdaEnemigo = enemigo.x

    const arribaMascota = mascotaJugadorObjeto.y
    const abajoMascota = mascotaJugadorObjeto.y + mascotaJugadorObjeto.alto
    const derechaMascota = mascotaJugadorObjeto.x + mascotaJugadorObjeto.ancho
    const izquierdaMascota = mascotaJugadorObjeto.x
    if(abajoMascota < arribaEnemigo || arribaMascota > abajoEnemigo || derechaMascota < izquierdaEnemigo || izquierdaMascota > derechaEnemigo){
        return
    } 
    detenerMovimiento()
    clearInterval(intervalo)
    enemigoId = enemigo.id
    sectionAtaque.style.display = "flex"
    sectionVerMapa.style.display = "none"
    seleccionarMascotaEnemigo(enemigo)

    //alert("Hay colision con "+enemigo.nombre)
}
window.addEventListener('load', iniciarJuego)