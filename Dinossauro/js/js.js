const dino = document.querySelector('.dino');
const background = document.querySelector('.background');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if(!isJumping) {
            jump();
        }
    }
}

function jump() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            //descendo
            clearInterval(upInterval);
            
            let donwInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(donwInterval)
                    isJumping = false;
                } else {
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            }, 25);
        } else {
            //subindo
            position += 20;
            dino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPositon = 1000;
    let randomTime = Math.random() * 6000;

    if (isGameOver) return;

    cactus.classList.add('cactus');
    cactus.style.left = 1000 + 'px';
    background.appendChild(cactus);

    let leftInternal = setInterval(() => {
        if(cactusPositon < -60) {
            clearInterval(leftInternal)
            background.removeChild(cactus);
        } else if(cactusPositon > 0 && cactusPositon < 60 && position < 60) {
            //game over
            clearInterval(leftInternal);
            isGameOver = true;
            document.body.innerHTML = '<h1 class="game-over">Fim de Jogo</h1>';
        } else {
            cactusPositon -= 10;
            cactus.style.left = cactusPositon + 'px';
        }
    }, 20);

    setTimeout(createCactus, randomTime)
}

createCactus();

document.addEventListener('keyup',handleKeyUp)