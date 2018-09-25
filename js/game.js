const mineImage = {
    image: "images/bomb-5.png",
    identifier: "mine"
};
const minesBoard = document.getElementById("minesweeper");
let mines = []
let selected = null
let cont = 0

function minesBuilder() {
    mines.forEach(function (row, x) {
        row.forEach(function (mine, y) {
            let result = (mine == -1) ? createBomb() : createEmpty(mine);
            if (mine == -1) { mineCounter(x, y) }
            result.addEventListener("click", flip);
            minesBoard.appendChild(result);
        });
    });
}

function flip() {
    this.classList.toggle("square--flip");
    this.removeEventListener("click", flip);
    selectedSquare(this)
}

function selectedSquare(selected) {
    mineFound(selected)
}

function mineFound(selected) {
    if (selected.dataset.mine == "mine") {
        setTimeout(gameOver, 1500);
    } else {
        cont++
        contEmptySquare(cont)
    }
}
function contEmptySquare(cont) {
    if (cont == 71) {
        gameWon()
    }
}

function gameWon() {
    window.location.href = "../Minesweeper/gameWon.html";
}

function gameOver() {
    window.location.href = "../Minesweeper/gameOver.html";
}

function createBomb() {
    let square = document.createElement("div")
    square.className = "square"
    square.dataset.mine = mineImage.identifier
    console.log(square);

    let back = document.createElement("img");
    back.className = 'back--face';
    back.src = mineImage.image
    square.appendChild(back)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)
    return square
}

function createEmpty(mine) {
    let square = document.createElement("div")
    square.className = "square"

    let back = document.createElement("div");
    back.className = 'back--face';
    back.innerText = mine
    square.appendChild(back)

    let front = document.createElement("img");
    front.className = 'front--face';
    square.appendChild(front)
    return square
}

function createMines() {
    for (let i = 0; i < 9; i++) {
        mines.push([])
        for (let j = 0; j < 9; j++) {
            mines[i].push(0)
        }
    }
    for (let i = 0; i < 10; i++) {
        let num1 = Math.floor(Math.random() * 9)
        let num2 = Math.floor(Math.random() * 9)
        if (mines[num1][num2]) {
            num1 = Math.floor(Math.random() * 9)
            num2 = Math.floor(Math.random() * 9)
        }
        mines[num1][num2] = -1;
    }
}

(function initializeGame() {
    createMines()
    minesBuilder()
    console.log(mines);

})()

function mineCounter(x, y) {
    isMine(x - 1, y - 1) ? mines[x - 1][y - 1]++ : 0
    isMine(x - 1, y) ? mines[x - 1][y]++ : 0
    isMine(x - 1, y + 1) ? mines[x - 1][y + 1]++ : 0
    isMine(x, y - 1) ? mines[x][y - 1]++ : 0
    isMine(x, y + 1) ? mines[x][y + 1]++ : 0
    isMine(x + 1, y - 1) ? mines[x + 1][y - 1]++ : 0
    isMine(x + 1, y) ? mines[x + 1][y]++ : 0
    isMine(x + 1, y + 1) ? mines[x + 1][y + 1]++ : 0
}

function isMine(x, y) {
    return mines[y] && mines[x] && mines[x][y] > -1 && x >= 0 && y >= 0 && x < 9 && y < 9
}