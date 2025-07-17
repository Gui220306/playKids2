const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const gameOverMessage = document.querySelector('.game-over-message');

const jump = () => {
  if (!mario.classList.contains('jump') && gameOverMessage.classList.contains('hidden')) {
    mario.classList.add('jump');

    setTimeout(() => {
      mario.classList.remove('jump');
    }, 700); // Pulo um pouco mais longo
  }
};

const loop = setInterval(() => {
  const pipePosition = pipe.offsetLeft;
  const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

  if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
    // Para animações
    pipe.style.animation = 'none';
    pipe.style.left = `${pipePosition}px`;

    mario.style.animation = 'none';
    mario.style.bottom = `${marioPosition}px`;

    mario.src = './imagens/game-over.png';
    mario.style.width = '75px';
    mario.style.marginLeft = '50px';

    clearInterval(loop);

    // Mostrar mensagem Game Over
    gameOverMessage.classList.remove('hidden');
  }
}, 10);

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !gameOverMessage.classList.contains('hidden')) {
    location.reload();
  } else if (gameOverMessage.classList.contains('hidden')) {
    jump();
  }

});
