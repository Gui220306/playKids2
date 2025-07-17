//Elementos
var vbtIniciar
var vbola
var vcpu
var vjogador
var vPaineltxtPontos

// 🟣 Novos elementos dos placares
var vPlacarJogador
var vPlacarBot

//Controle de animação
var gameLoop, frames

//Posições
var posBolaX, posBolaY
var posJogadorX, posJogadorY
var posCpuX, posCpuY

//Direção
var dirJy

//Posições iniciais
var posJogIniY = 180
var posCpuIniY = 180
var posBolaIniX = 475
var posBolaIniY = 240

//Tamanhos
var campoX = 0
var campoY = 0
var campoW = 960
var campoH = 500
var barraW = 20
var barraH = 140
var bolaW = 20
var bolaH = 20

//Direção bola
var bolaX, bolaY
var cpuY = 0

//Velocidades
var velBola, velCpu, velJogador

//Pontos separados
var pontosJogador = 0
var pontosBot = 0

//Tecla
var tecla
var jogo = false

function controlajog() {
  if (jogo) {
    posJogadorY += velJogador * dirJy
    if ((posJogadorY + barraH >= campoH) || (posJogadorY <= 0)) {
      posJogadorY += (velJogador * dirJy) * (-1)
    }
    vjogador.style.top = posJogadorY + 'px'
  }
}

function controlacpu() {
  if (jogo) {
    if ((posBolaX > (campoW / 2)) && (bolaX > 0)) {
      if ((posBolaY + (bolaH / 2)) > ((posCpuY + (barraH / 2)) + velCpu)) {
        if ((posCpuY + barraH) <= campoH) posCpuY += velCpu
      } else if ((posBolaY + (bolaH / 2)) < ((posCpuY + (barraH / 2)) - velCpu)) {
        if (posCpuY >= 0) posCpuY -= velCpu
      }
    } else {
      if ((posCpuY + (barraH / 2)) < (campoH / 2)) {
        posCpuY += velCpu
      } else if ((posCpuY + (barraH / 2)) > (campoH / 2)) {
        posCpuY -= velCpu
      }
    }
    vcpu.style.top = posCpuY + 'px'
  }
}

function controlaBola() {
  posBolaX += velBola * bolaX
  posBolaY += velBola * bolaY

  // Colisão jogador
  if ((posBolaX <= posJogadorX + barraW) && ((posBolaY + bolaH) >= posJogadorY) && (posBolaY <= posJogadorY + barraH)) {
    bolaY = ((posBolaY + (bolaH / 2)) - (posJogadorY + (barraH / 2))) / 16
    bolaX *= -1
  }

  // Colisão CPU
  if ((posBolaX >= posCpuX - barraW) && ((posBolaY + bolaH) >= posCpuY) && (posBolaY <= posCpuY + barraH)) {
    bolaY = ((posBolaY + (bolaH / 2)) - (posCpuY + (barraH / 2))) / 16
    bolaX *= -1
  }

  // Limites superior/inferior
  if ((posBolaY >= 480) || (posBolaY <= 0)) {
    bolaY *= -1
  }

  // GOL do Jogador (bola passa pela CPU)
  if (posBolaX >= (campoW - bolaW)) {
    pontosJogador++
    atualizarPlacar()
    resetarBola()
  }
  // GOL do Bot (bola passa pelo jogador)
  else if (posBolaX <= 0) {
    pontosBot++
    atualizarPlacar()
    resetarBola()
  }

  vbola.style.top = posBolaY + 'px'
  vbola.style.left = posBolaX + 'px'
}

function atualizarPlacar() {
  vPlacarJogador.textContent = pontosJogador
  vPlacarBot.textContent = pontosBot
}

function resetarBola() {
  jogo = false
  velBola = 0
  posBolaX = posBolaIniX
  posBolaY = posBolaIniY
  posJogadorY = posJogIniY
  posCpuY = posCpuIniY
  vjogador.style.top = posJogadorY + 'px'
  vcpu.style.top = posCpuY + 'px'
  vbola.style.left = posBolaX + 'px'
  vbola.style.top = posBolaY + 'px'

  // Mostrar botão novamente para reiniciar
  vbtIniciar.classList.remove('hidden')
}

function teclaDw(e) {
  tecla = e.keyCode
  if (tecla == 38) dirJy = -1
  else if (tecla == 40) dirJy = +1
}

function teclaUp(e) {
  tecla = e.keyCode
  if (tecla == 38 || tecla == 40) dirJy = 0
}

function gameLoopHandler() {
  if (jogo) {
    controlajog()
    controlaBola()
    controlacpu()
  }
  frames = requestAnimationFrame(gameLoopHandler)
}

function iniciaJogo() {
  if (!jogo) {
    vbtIniciar.classList.add('hidden') // 🟣 Oculta botão
    velBola = 8
    velCpu = 8
    velJogador = 8
    cancelAnimationFrame(frames)
    jogo = true
    dirJy = 0
    bolaX = (Math.random() * 10 < 5) ? -1 : 1
    bolaY = 0
    posJogadorX = 10
    posCpuX = 930
    posBolaX = posBolaIniX
    posBolaY = posBolaIniY
    posJogadorY = posJogIniY
    posCpuY = posCpuIniY
    gameLoopHandler()
  }
}

function inicializa() {
  vbtIniciar = document.getElementById('btIniciar')
  vbola = document.getElementById('dvBola')
  vcpu = document.getElementById('dvCpu')
  vjogador = document.getElementById('dvJogador')
  vPaineltxtPontos = document.getElementById('txtPontos')

  // 🟣 Selecionar placares
  vPlacarJogador = document.getElementById('placarJogador')
  vPlacarBot = document.getElementById('placarBot')

  vbtIniciar.addEventListener('click', iniciaJogo)
  document.addEventListener('keydown', teclaDw)
  document.addEventListener('keyup', teclaUp)

  // Reset visual inicial
  atualizarPlacar()
}

window.addEventListener('load', inicializa)
