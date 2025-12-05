/*Criação de váriaveis 'altura' e 'largura' no escopo global para atualização dos valores sempre que a 
função ajustaTamanhoPalco for chamada.
*/
var altura = 0
var largura = 0
var vidas = 1
var tempo = 15

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?','')

if(nivel === 'normal'){
    criaMosquitoTempo =1500

} else if(nivel === 'dificil'){

    criaMosquitoTempo = 1000
} else if(nivel === 'impossivel'){
    
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
    
    altura = window.innerHeight
    largura = window.innerWidth

    console.log('Altura = ' + altura, '/ Largura = ' + largura)
}

ajustaTamanhoPalcoJogo() //chamada da função para ter o valor inicial da largura e altura.

var cronometro = setInterval(function() {
    tempo -= 1

    if(tempo < 0){

        clearInterval(cronometro)
        clearInterval(criaMosquito)
        window.location.href = 'vitoria.html'
    } else{

        document.getElementById('cronometro').innerHTML = tempo
    }


},1000)



function posicaoRandomica() { 

    //remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if(vidas>3) {

            window.location.href = 'fim_de_jogo.html'
        } else{
            document.getElementById('v' + vidas).src = 'imagens/coracao_vazio.png'

            vidas++

        }
    }

    var posicaoAltura =  Math.floor(Math.random() * altura) - 90 //posição aleátoria e inteira, arredondada para baixo, que vai de 0 até a altura da página.(O -90 é por conta da imagem do mosquito ter 50px de heigth e width. Logo nâo irá criar a barraa de scroll vertical ou horizontal)
    var posicaoLargura =  Math.floor(Math.random() * largura) - 90 //posição aleátoria e inteira, arredondada para baixo, que vai de 0 até a largura da página.(O -90 é por conta da imagem do mosquito ter 50px de heigth e width. Logo nâo irá criar a barraa de scroll vertical ou horizontal)

    posicaoAltura = posicaoAltura < 0 ? 0 : posicaoAltura //controle para evitar posições negativas usando o operador ternário
    posicaoLargura = posicaoLargura < 0 ? 0 : posicaoLargura

    console.log('Posição Altura = ' + posicaoAltura,'/ Posição Largura = ' + posicaoLargura)

    //Criação do elemento html de forma programática

    var mosquito = document.createElement('img') //criação do elemento do tipo img e encapsulando a variável mosquito
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() +' '+ ladoAleatorio()
    mosquito.id = 'mosquito'
    mosquito.onclick = function(){
        this.remove()
    }
    mosquito.style.top = posicaoAltura + 'px'
    mosquito.style.left = posicaoLargura + 'px'
    
    mosquito.style.position = 'absolute' //definir position como absolute, pois o padrão é estar em static, mas em static.

    document.body.appendChild(mosquito) //anexando o elemento filho ao body da página
}

function tamanhoAleatorio() { //tamanho aleátorio do mosquito

    var classe = Math.floor(Math.random() * 3) //valor aleátorio de 0 a 2

    switch(classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() {

    var lado = Math.floor(Math.random() *2) //valor aleátorio de 0 ou 1

    switch(lado) {

        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'
    }   
}