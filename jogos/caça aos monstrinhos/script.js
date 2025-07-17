
const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const timeBar = document.getElementById('timeBar');
const popSound = document.getElementById('popSound');
const errorSound = document.getElementById('errorSound');
const screamSound = document.getElementById('screamSound');
const tickTock = document.getElementById('tickTock');

let score = 0;
let timeLeft = 30;
let gameInterval;
let timeInterval;
let monsterTimeouts = [];

function startGame() {
    clearGame();
    score = 0;
    timeLeft = 30;
    scoreElement.textContent = score;

    updateTimeBar();

    Swal.fire({
        title: '🎉 Boa sorte!',
        text: 'Capture o maior número de monstrinhos possível em 30 segundos!',
        icon: 'info',
        confirmButtonText: 'Começar!'
    });

    tickTock.loop = true;
    tickTock.play();

    gameInterval = setInterval(spawnMonster, 800);
    timeInterval = setInterval(updateTimer, 1000);
    setTimeout(endGame, 30000);
}

function spawnMonster() {
    const monster = document.createElement('div');
    monster.classList.add('monster', 'animate__animated', 'animate__bounceIn');
    monster.innerHTML = "👾";

    const maxX = gameArea.clientWidth - 80;
    const maxY = gameArea.clientHeight - 80;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    monster.style.left = `${randomX}px`;
    monster.style.top = `${randomY}px`;

    monster.addEventListener('click', () => {
        score++;
        scoreElement.textContent = score;
        screamSound.play();

        monster.classList.remove('animate__bounceIn');
        monster.classList.add('animate__tada');

        setTimeout(() => monster.remove(), 500);
    });

    gameArea.appendChild(monster);

    const timeout = setTimeout(() => {
        if (gameArea.contains(monster)) {
            errorSound.play();
            monster.classList.add('animate__fadeOut');
            setTimeout(() => monster.remove(), 500);
        }
    }, 1500);

    monsterTimeouts.push(timeout);
}

function updateTimer() {
    timeLeft--;
    updateTimeBar();

    if (timeLeft <= 0) {
        clearInterval(timeInterval);
    }
}

function updateTimeBar() {
    const percentage = (timeLeft / 30) * 100;
    timeBar.style.width = percentage + '%';
    timeBar.textContent = timeLeft + 's';

    if (timeLeft <= 10) {
        timeBar.style.backgroundColor = 'red';
    } else {
        timeBar.style.backgroundColor = 'green';
    }
}

function endGame() {
    clearInterval(gameInterval);
    clearInterval(timeInterval);
    monsterTimeouts.forEach(clearTimeout);
    monsterTimeouts = [];

    tickTock.pause();
    tickTock.currentTime = 0;

    Swal.fire({
        title: '⏰ Fim de jogo!',
        text: `Sua pontuação foi: ${score} ⭐`,
        icon: 'success',
        confirmButtonText: 'Jogar Novamente'
    });

    clearGame();
}

function clearGame() {
    gameArea.innerHTML = '';
}
