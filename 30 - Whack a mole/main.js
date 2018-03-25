function initGame() {
    const holes = document.querySelectorAll(".hole");
    const scoreBoard = document.querySelector(".score");
    const moles = document.querySelectorAll(".mole");
    const startGame = document.querySelector("#start-game");
    let lastHole;
    let timeup = false;
    let score = 0;
    let currentLevel = 1;
    const levels = new Map();
    levels.set(1, 1000);
    levels.set(2, 800);
    levels.set(3, 600);
    levels.set(4, 400);
    levels.set(5, 200);

    function getRandNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Gets a random dom element that is a hole
    function getRandomHole(holes) {
        if (!holes || holes.length <= 0) {
            return;
        }
        const index = getRandNumber(0, holes.length - 1);
        if (index === lastHole) {
            return getRandomHole(holes);
        }
        lastHole = index;
        return holes[index];
    }

    function peep() {
        const time = levels.get(currentLevel);
        const hole = getRandomHole(holes);
        hole.classList.add("up");
        setTimeout(() => {
            hole.classList.remove("up");
            if (!timeup) {
                peep();
            }
        }, time);
    }

    function hit(e) {
        // If tried to hit programmatically don't allow it
        if (!e.isTrusted) {
            return;
        }
        scoreBoard.textContent = ++score;
        // increasing the level after every 5 points
        if (score % (currentLevel * 5) == 0) {
            ++currentLevel;
        }
        this.parentElement.classList.remove("up");
    }
    moles.forEach(function (mole) {
        mole.addEventListener("click", hit)
    });
    startGame.addEventListener("click", function (e) {
        this.disabled = true;
        scoreBoard.textContent = 0;
        score = 0;
        timeup = false;
        setTimeout(() => timeup = true, 25000)
        peep();
    });

}